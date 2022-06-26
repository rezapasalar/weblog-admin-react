import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setTodosArchive, deleteTodo, setModalStatus, setFilterValue } from '../../store/slices/todos'
import { setIsLoading } from '../../store/slices/global'
import todoFactory from '../../modules/dataFactory/todo'
import swal from '../../modules/sweetAlert'
import { getTodosService, deleteTodoService } from '../../services/todos'
import { SUCCESSFUL_OPERATION, SUCCESSFUL_REMOVAL } from '../../constants/responses'
import TitleAndViewType from '../global/titleAndViewType'
import ButtonElement from '../global/elements/button'
import { getTheme } from '../../modules/helperFunctions'

export default function HeaderTodos ({viewType, changeViewType}) {

    const {todosCurrentPage, filterValue, selectedRows, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    const lastPage = Math.ceil(totalCount / pageSize)

    const [, setSearchParams] = useSearchParams()

    const multiDeleteHandler = async () => {
        try {
            const result = await swal.question()
            if (!result) return

            dispatch(setIsLoading(true))
            await deleter()
            const filter = filterValue === 'all' ? '' : filterValue

            if (todosCurrentPage.length) {
                const page = currentPage < lastPage ? currentPage : selectedRows.length < todosCurrentPage.length ? currentPage : currentPage - 1
                const {data: {data, meta: {totalDocs, limit}}} = await getTodosService(page, filter)
                dispatch(setTodosArchive({page, data, totalDocs, limit}))
                setSearchParams({page: currentPage - 1 > 1 ? currentPage - 1 : 1 , filter: filterValue})
            }

            toast.success(SUCCESSFUL_REMOVAL, {...getTheme()})
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    const deleter = async () => {
        for (const todoId of selectedRows) {
            await deleteTodoService(todoId)
            dispatch(deleteTodo(todoId))
        }
    }

    const dataFactoryHandler = async () => {
        try {
            dispatch(setIsLoading(true))
            await todoFactory.count(20).create()
            dispatch(setFilterValue('all'))
            setSearchParams({page: 1, filter: 'all'})
            const {data: {data, meta: {totalDocs, limit, page}}} = await getTodosService()
            dispatch(setTodosArchive({page, data, totalDocs, limit}))
            window.scrollTo({top: 0, behavior: 'smooth'})
            toast.success(SUCCESSFUL_OPERATION, {...getTheme()})
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
         <div className="flex flex-wrap justify-between items-center">

            <TitleAndViewType title="لیست کارها" viewType={viewType} changeViewType={changeViewType} />

            <div className="block md:flex items-center w-full md:w-auto md:space-x-reverse space-x-0 md:space-x-2 space-y-3 md:space-y-0 my-2 md:my-0">
                {selectedRows.length ? <ButtonElement size="md" variant="danger" onClick={multiDeleteHandler} className="w-full md:w-auto">حذف {selectedRows.length} کار</ButtonElement> : null}
                <ButtonElement size="md" onClick={() => dispatch(setModalStatus(true))} className="w-full md:w-auto">کار جدید</ButtonElement>
                <ButtonElement size="md" variant="secondary" outline onClick={dataFactoryHandler} className="w-full md:w-auto">کارهای فیک</ButtonElement>
            </div>
        </div>
    )
}