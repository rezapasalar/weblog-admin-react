import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { FormTitle, FormButtonGroup, InputFormik, ButtonLoading } from '../../components/global/formik'
import { setTodosArchive, updateTodo, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetTodosState } from '../../store/slices/todos'
import { initialValues as initVals, todoSchema } from '../../schemas/todo'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { getTodosService, createTodoService, updateTodoService } from '../../services/todos'
import { getTheme } from '../../modules/helperFunctions'

 export default function FormTodos () {

    const {todosCurrentPage, idForUpdate, isShowModal} = useSelector(state => state.todos)

    const [initialValues, setInitialValues] = useState(initVals)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setInitialValues(todosCurrentPage.filter(({id}) => id === idForUpdate)[0])
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        dispatch(setIsShowModal(false))
        dispatch(setIdForUpdate(null))
    }

    const submitHandler = async (values, {setErrors}) => {
        try {
            idForUpdate ? await update(values) : await insert(values)
            cancelHandler()
            toast.success(SUCCESSFUL_OPERATION, {...getTheme()})
        } catch (errors) {
            toast.error(AXIOS_ERROR, {...getTheme()})
        }
    }

    const insert = values => {
        return new Promise(async (resolve, reject) => {
            try {
                await createTodoService({...values, created_at: Date.now()})
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

    const update = values => {
        return new Promise(async (resolve, reject) => {
            try {
                values = {...values, done: Number(values.done)}
                const {data: {data}} = await updateTodoService(values)
                dispatch(updateTodo(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    const checkFormError = isError => isError && toast.error(FORM_ERRORS, {...getTheme()})

    return (
        <Modal size="sm" isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <FormTitle>{idForUpdate ? 'ویرایش کار' : 'ثبت کار'}</FormTitle>

            <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={todoSchema} onSubmit={submitHandler}>
                {({errors, isSubmitting}) => (
                    <Form>
                        <InputFormik name="text" />
                        
                        <FormButtonGroup>
                            <ButtonLoading onClick={() => checkFormError(Object.keys(errors).length)} isSubmit={isSubmitting} isSubmitEffect={isSubmitting} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                            <ButtonLoading isSubmit={false} onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                        </FormButtonGroup>
                    </Form>
                )}
            </Formik>  

        </Modal>
    )
}




/*
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import useForm from '../../hooks/useForm'
import { setTodosArchive, updateTodo, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetTodosState } from '../../store/slices/todos'
import { initialValues, todoSchema } from '../../schemas/todo'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { InputForm, ButtonLoading, FormTitle, FormButtonGroup } from '../global/form'
import { getTodosService, createTodoService, updateTodoService } from '../../services/todos'
import { getTheme } from '../../modules/helperFunctions'

 export default function FormTodos () {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialValues)

    const {todosCurrentPage, idForUpdate, isShowModal} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setData(todosCurrentPage.filter(({id}) => id === idForUpdate)[0])
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        setData(initialValues)
        setErrors({})
        dispatch(setIsShowModal(false))
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
                await createTodoService({...data, created_at: Date.now()})
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
        <Modal size="sm" isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <form onSubmit={submitHandler}>

                <FormTitle>{idForUpdate ? 'ویرایش کار' : 'ثبت کار'}</FormTitle>

                <InputForm label="متن" keyname="text" value={data.text} error={errors.text} inputHandler={inputHandler} />
                
                <FormButtonGroup>
                    <ButtonLoading isSubmit={isSubmit} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                    <ButtonLoading isSubmit={isSubmit} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                </FormButtonGroup>

            </form>

        </Modal>
    )
}
*/