import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useForm from '../../hooks/useForm'
import { setUsersArchive, updateUser, setModalStatus, setIdForUpdate, setFilterValue, setPagination, resetUsersState } from '../../store/slices/users'
import { initialData, userSchema } from '../../schemas/user'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { InputForm, SelectForm, DateBirthForm, ColumnGridWrap, ButtonLoading, HeaderForm, FooterForm } from '../global/form'
import swal from '../../modules/sweetAlert'
import { getUsersService, createUserService, updateUserService } from '../../services/users'

 export default function FormUsers () {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialData)

    const {usersCurrentPage, idForUpdate, modalStatus} = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setData({...usersCurrentPage.filter(({id}) => id === idForUpdate)[0], password: '', passwordConfirmation: ''})
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
            await userSchema(idForUpdate ? 'update' : 'create').validate(data, {abortEarly: false})
            idForUpdate ? await update() : await create()
            cancelHandler()
            swal.toast('success', SUCCESSFUL_OPERATION)
        } catch (errors) {
            if (errors?.name === 'AxiosError') return swal.toast('error', AXIOS_ERROR)
            setErrors(mapYupErrors(errors))
            console.log(mapYupErrors(errors))
            swal.toast('error', FORM_ERRORS)
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
        <Modal modalStatus={modalStatus} cancelHandler={cancelHandler} keyboard>

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

                <FooterForm>
                    <ButtonLoading isSubmit={isSubmit} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                    <ButtonLoading isSubmit={isSubmit} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                </FooterForm>
                
            </form>
            
        </Modal>
    )
}