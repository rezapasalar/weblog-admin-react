import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { ColumnGridWrap, FormTitle, ButtonGroup, InputFormik, SelectFormik, NameFamilyFormik, DateBirthFormik, PassPassConfirmFormik, ButtonLoading } from '../../components/global/formik'
import { setUsersArchive, updateUser, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetUsersState } from '../../store/slices/users'
import { initialValues as initVals, userSchema } from '../../schemas/user'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { getUsersService, createUserService, updateUserService } from '../../services/users'
import { getTheme } from '../../modules/helperFunctions'

 export default function FormUsers () {

    const {usersCurrentPage, idForUpdate, isShowModal} = useSelector(state => state.users)

    const [initialValues, setInitialValues] = useState(initVals)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setInitialValues({...usersCurrentPage.filter(({id}) => id === idForUpdate)[0], password: '', passwordConfirmation: ''})
        }
    }, [idForUpdate])

    const cancelHandler = () => {
        dispatch(setIsShowModal(false))
        dispatch(setIdForUpdate(null))
    }

    const submitHandler = async (values, {setErrors}) => {
        try {
            values.is_admin = Number(values.is_admin)
            idForUpdate ? await update(values) : await create(values)
            cancelHandler()
            toast.success(SUCCESSFUL_OPERATION, {...getTheme()})
        } catch (errors) {
            toast.error(AXIOS_ERROR, {...getTheme()})
        }
    }

    const create = values => {
        return new Promise(async (resolve, reject) => {
            try {
                await createUserService({...values, created_at: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getUsersService()
                dispatch(resetUsersState())
                dispatch(setUsersArchive({page, data: resData, totalDocs, limit}))
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
                const {data: {data}} = await updateUserService(values)
                dispatch(updateUser(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    const checkFormError = isError => isError && toast.error(FORM_ERRORS, {...getTheme()})

    return (
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <FormTitle>{idForUpdate ? 'ویرایش کاربر' : 'ثبت کاربر'}</FormTitle>

            <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={() => userSchema(idForUpdate ? 'update' : 'create')} onSubmit={submitHandler}>
                {({errors, isSubmitting}) => (
                    <Form>
                        <ColumnGridWrap>
                            <NameFamilyFormik />
                            <DateBirthFormik />
                        </ColumnGridWrap>
                        <ColumnGridWrap>
                            <SelectFormik options={[{label: 'معمولی', value: 0}, {label: 'مدیر', value: 1}]} name="is_admin" />
                            <InputFormik name="email" dir="ltr" />
                        </ColumnGridWrap>
                        <PassPassConfirmFormik />
                        
                        <ButtonGroup>
                            <ButtonLoading onClick={() => checkFormError(Object.keys(errors).length)} isSubmit={isSubmitting} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                            <ButtonLoading isSubmit={isSubmitting} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                        </ButtonGroup>
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
import { setUsersArchive, updateUser, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetUsersState } from '../../store/slices/users'
import { initialValues, userSchema } from '../../schemas/user'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { InputForm, SelectForm, DateBirthForm, ColumnGridWrap, ButtonLoading, HeaderForm, ButtonGroup } from '../global/form'
import { getUsersService, createUserService, updateUserService } from '../../services/users'
import { getTheme } from '../../modules/helperFunctions'

 export default function FormUsers () {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialValues)

    const {usersCurrentPage, idForUpdate, isShowModal} = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setData({...usersCurrentPage.filter(({id}) => id === idForUpdate)[0], password: '', passwordConfirmation: ''})
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
            await userSchema(idForUpdate ? 'update' : 'create').validate(data, {abortEarly: false})
            idForUpdate ? await update() : await create()
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

    const create = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await createUserService({...data, created_at: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getUsersService()
                dispatch(resetUsersState())
                dispatch(setUsersArchive({page, data: resData, totalDocs, limit}))
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
                await updateUserService(data)
                dispatch(updateUser(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    return (
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <form onSubmit={submitHandler}>

                <HeaderForm>{idForUpdate ? 'ویرایش کاربر' : 'ثبت کاربر'}</HeaderForm>

                <ColumnGridWrap>
                    <ColumnGridWrap>
                        <InputForm label="نام" keyname="name" value={data.name} error={errors.name} inputHandler={inputHandler} />
                        <InputForm label="فامیل" keyname="family" value={data.family} error={errors.family} inputHandler={inputHandler} />
                    </ColumnGridWrap>

                    <ColumnGridWrap cols="1">
                        <DateBirthForm value={{day: data.day, month: data.month, year: data.year}} label="متولد" error={errors.day || errors.month || errors.year ? true : false} inputHandler={inputHandler} />
                    </ColumnGridWrap>
                </ColumnGridWrap>

                <ColumnGridWrap>
                    <SelectForm label="نوع کاربری" keyname="is_admin" value={data.is_admin} type="number" options={[{value: 0, label: 'معمولی'}, {value: 1, label: 'مدیر'}]} error={errors.is_admin} inputHandler={inputHandler} />
                    <InputForm label="ایمیل" keyname="email" value={data.email} error={errors.email} inputHandler={inputHandler} dir="ltr" />
                </ColumnGridWrap>

                <ColumnGridWrap>
                    <InputForm type="password" label="رمز عبور" value={data.password} keyname="password" error={errors.password} inputHandler={inputHandler} dir="ltr" />
                    <InputForm type="password" label="تایید رمز عبور" value={data.passwordConfirmation} keyname="passwordConfirmation" error={errors.passwordConfirmation} inputHandler={inputHandler} dir="ltr" />
                </ColumnGridWrap>

                <ButtonGroup>
                    <ButtonLoading isSubmit={isSubmit} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                    <ButtonLoading isSubmit={isSubmit} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                </ButtonGroup>
                
            </form>
            
        </Modal>
    )
}
*/