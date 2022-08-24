import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { setUsersArchive, deleteUser, setIsShowModal, setIdForUpdate, setPagination, resetUsersState } from '../store/slices/users'
import { SUCCESSFUL_REMOVAL } from '../constants/responses'
import { getUsersService, deleteUserService } from '../services/users'
import swal from '../modules/sweetAlert'
import { getTheme } from '../modules/helperFunctions'

export default function UseDeleteAndUpdateUsers (id) {

    const {usersCurrentPage, filterValue, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.users)

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
            await deleteUserService(id)
            dispatch(deleteUser(id))

            if (usersCurrentPage.length > 1) {
                dispatch(setPagination({pageSize, currentPage, totalCount: totalCount - 1}))
                toast.success(SUCCESSFUL_REMOVAL, {...getTheme()})
                return
            }

            if (Math.ceil(totalCount / pageSize) > 1) {
                const filter = filterValue === 'all' ? '' : filterValue
                const {data: {data, meta: {totalDocs, limit, page}}} = await getUsersService(currentPage - 1, filter)
                dispatch(resetUsersState())
                dispatch(setUsersArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage -1, filter: filterValue})
                toast.success(SUCCESSFUL_REMOVAL, {...getTheme()})
            }
        } finally {
            setIsSubmit('')
        }
    }

    const updateHandler = () => {
        dispatch(setIdForUpdate(id))
        dispatch(setIsShowModal(true))
    }

    return {isSelect, setIsSelect, getIsSubmit, deleteHandler: useCallback(deleteHandler, []), updateHandler: useCallback(updateHandler, [])}
}