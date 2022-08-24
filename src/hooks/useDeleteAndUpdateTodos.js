import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { setTodosArchive, deleteTodo, setIsShowModal, setIdForUpdate, toggleDoneTodo, setPagination, resetTodosState } from '../store/slices/todos'
import { SUCCESSFUL_REMOVAL } from '../constants/responses'
import { getTodosService, deleteTodoService, updateTodoService } from '../services/todos'
import swal from '../modules/sweetAlert'
import { getTheme } from '../modules/helperFunctions'

export default function UseDeleteAndUpdateTodos (id) {

    const {todosCurrentPage: todos, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    const [isSubmit, setIsSubmit] = useState('')

    const [isSelect, setIsSelect] = useState(false)

    const [, setSearchParams] = useSearchParams()

    const getIsSubmit = (value = '') => (isSubmit === value && value.length) ? true : false

    const deleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            setIsSubmit('delete')
            await deleteTodoService(id)
            dispatch(deleteTodo(id))

            if (todos.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                toast.success(SUCCESSFUL_REMOVAL, {...getTheme()})
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getTodosService(currentPage - 1, filter)
                dispatch(resetTodosState())
                dispatch(setTodosArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                toast.success(SUCCESSFUL_REMOVAL, {...getTheme()})
            }
        } finally {
            setIsSubmit('')
        }
    }

    const toggleDoneHandler = async () => {
        try {
            setIsSubmit('toggle')
            const todo = todos.filter(todo => todo.id === id)[0]
            await updateTodoService({...todo, done: Number(!todo.done)})
            dispatch(toggleDoneTodo(id))
        } finally {
            setIsSubmit('')
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setIsShowModal(true))
    }

    return {isSelect, setIsSelect, getIsSubmit, deleteHandler: useCallback(deleteHandler, []), updateHandler: useCallback(updateHandler, []), toggleDoneHandler: useCallback(toggleDoneHandler, [])}
}