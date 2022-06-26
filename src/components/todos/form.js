import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import useForm from '../../hooks/useForm'
import { setTodosArchive, updateTodo, setModalStatus, setIdForUpdate, setFilterValue, setPagination, resetTodosState } from '../../store/slices/todos'
import { initialData, todoSchema } from '../../schemas/todo'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { InputForm, ButtonLoading, HeaderForm, FooterForm } from '../global/form'
import { getTodosService, createTodoService, updateTodoService } from '../../services/todos'
import { getTheme } from '../../modules/helperFunctions'

 export default function FormTodos () {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialData)

    const {todosCurrentPage, idForUpdate, modalStatus} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setData(todosCurrentPage.filter(({id}) => id === idForUpdate)[0])
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        setData(initialData)
        setErrors({})
        dispatch(setModalStatus(false))
        dispatch(setIdForUpdate(null))
    }

    const submitHandler = async e => {
        try {
            e.preventDefault()
            setIsSubmit('form')
            await todoSchema().validate(data, {abortEarly: false})
            idForUpdate ? await update() : await insert()
            cancelHandler()
            toast.success(SUCCESSFUL_OPERATION, {...getTheme()})
        } catch (errors) {
            if (errors?.name === 'AxiosError') return toast.error(AXIOS_ERROR, {...getTheme()})
            setErrors(mapYupErrors(errors))
            toast.error(FORM_ERRORS, {...getTheme()})
        } finally {
            setIsSubmit('')
        }
    }

    const insert = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await createTodoService({...data, createdAt: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getTodosService()
                dispatch(resetTodosState())
                dispatch(setTodosArchive({page, data: resData, totalDocs, limit}))
                dispatch(setPagination({totalCount: totalDocs, pageSize: limit, currentPage: page}))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    const update = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await updateTodoService(data)
                dispatch(updateTodo(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    return (
        <Modal size="sm" modalStatus={modalStatus} cancelHandler={cancelHandler} keyboard>

            <form onSubmit={submitHandler}>

                <HeaderForm>{idForUpdate ? 'ویرایش کار' : 'ثبت کار'}</HeaderForm>

                <InputForm label="متن" keyname="text" value={data.text} error={errors.text} inputHandler={inputHandler} />
                
                <FooterForm>
                    <ButtonLoading isSubmit={isSubmit} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                    <ButtonLoading isSubmit={isSubmit} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                </FooterForm>

            </form>

        </Modal>
    )
}