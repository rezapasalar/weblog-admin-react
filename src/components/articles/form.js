import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import useForm from '../../hooks/useForm'
import { setArticlesArchive, updateArticle, setModalStatus, setIdForUpdate, setFilterValue, setPagination, resetArticlesState } from '../../store/slices/articles'
import { initialData, articleSchema } from '../../schemas/article'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { InputForm, SelectForm, TextAreaForm, CKEditorForm, ColumnGridWrap, ButtonLoading, HeaderForm, FooterForm } from '../global/form'
import { getArticlesService, createArticleService, updateArticleService } from '../../services/articles'
import { getTheme } from '../../modules/helperFunctions'

export default function FormArticles () {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialData)

    const {articlesCurrentPage, idForUpdate, modalStatus} = useSelector(state => state.articles)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setData(articlesCurrentPage.filter(({id}) => id === idForUpdate)[0])
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
            await articleSchema().validate(data, {abortEarly: false})
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
                await createArticleService({...data, createdAt: Date.now()})
                dispatch(setFilterValue('all'))
                const {data: {data: resData, meta: {totalDocs, limit, page}}} = await getArticlesService()
                dispatch(resetArticlesState())
                dispatch(setArticlesArchive({page, data: resData, totalDocs, limit}))
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
                await updateArticleService(data)
                dispatch(updateArticle(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    return (
        <Modal modalStatus={modalStatus} cancelHandler={cancelHandler} keyboard>

            <form onSubmit={submitHandler}>

                <HeaderForm>{idForUpdate ? 'ویرایش مقاله' : 'ثبت مقاله'}</HeaderForm>

                <ColumnGridWrap cols="1">
                    <InputForm label="عنوان" keyname="title" value={data.title} error={errors.title} inputHandler={inputHandler} />
                </ColumnGridWrap>

                <ColumnGridWrap cols="1">
                    <TextAreaForm label="توضیحات" keyname="description" value={data.description} error={errors.description} maxLength={150} inputHandler={inputHandler} />
                </ColumnGridWrap>

                <ColumnGridWrap cols="1">
                    <CKEditorForm label="متن" keyname="body" value={data.body} error={errors.body} inputHandler={inputHandler} />
                </ColumnGridWrap>

                <ColumnGridWrap cols="1">
                    <SelectForm label="وضعیت مقاله" keyname="status" value={data.status} options={[{value: 'draft', label: 'پیش نویس'}, {value: 'public', label: 'انتشار'}]} error={errors.status} inputHandler={inputHandler} />
                </ColumnGridWrap>

                <FooterForm>
                    <ButtonLoading isSubmit={isSubmit} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                    <ButtonLoading isSubmit={isSubmit} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                </FooterForm>
                
            </form>
            
        </Modal>
    )
}