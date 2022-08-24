import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'

import { FormTitle, FormButtonGroup, InputFormik, SelectFormik, CKEditorFormik, TextareaFormik, ButtonLoading } from '../../components/global/formik'
import { setArticlesArchive, updateArticle, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetArticlesState } from '../../store/slices/articles'
import { initialValues as initVals, articleSchema } from '../../schemas/article'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { getArticlesService, createArticleService, updateArticleService } from '../../services/articles'
import { getTheme } from '../../modules/helperFunctions'

export default function FormArticles () {

    const {articlesCurrentPage, idForUpdate, isShowModal} = useSelector(state => state.articles)

    const [initialValues, setInitialValues] = useState(initVals)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setInitialValues(articlesCurrentPage.filter(({id}) => id === idForUpdate)[0])
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
                await createArticleService({...values, created_at: Date.now()})
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

    const update = values => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data: {data}} = await updateArticleService(values)
                dispatch(updateArticle(data))
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    const checkFormError = isError => isError && toast.error(FORM_ERRORS, {...getTheme()})

    return (
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <FormTitle>{idForUpdate ? 'ویرایش مقاله' : 'ثبت مقاله'}</FormTitle>

            <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={articleSchema} onSubmit={submitHandler}>
                {({values, errors, isSubmitting, setValues}) => (
                    <Form>
                        <InputFormik name="title" />
                        <TextareaFormik rows="3" name="description" />
                        <CKEditorFormik name="body" values={values} errors={errors} setValues={setValues} />
                        <SelectFormik options={[{value: 'draft', label: 'پیش نویس'}, {value: 'public', label: 'انتشار'}]} name="status" />

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
import { setArticlesArchive, updateArticle, setIsShowModal, setIdForUpdate, setFilterValue, setPagination, resetArticlesState } from '../../store/slices/articles'
import { initialValues, articleSchema } from '../../schemas/article'
import { FORM_ERRORS, AXIOS_ERROR, SUCCESSFUL_OPERATION } from '../../constants/responses'
import Modal from '../global/modal/main'
import { InputForm, SelectForm, TextAreaForm, CKEditorForm, ColumnGridWrap, ButtonLoading, FormTitle, FormButtonGroup } from '../global/form'
import { getArticlesService, createArticleService, updateArticleService } from '../../services/articles'
import { getTheme } from '../../modules/helperFunctions'

export default function FormArticles () {

    const {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler} = useForm(initialValues)

    const {articlesCurrentPage, idForUpdate, isShowModal} = useSelector(state => state.articles)

    const dispatch = useDispatch()

    useEffect(() => {
        if (idForUpdate) {
            setData(articlesCurrentPage.filter(({id}) => id === idForUpdate)[0])
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
                await createArticleService({...data, created_at: Date.now()})
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
        <Modal isShowModal={isShowModal} cancelHandler={cancelHandler} keyboard>

            <form onSubmit={submitHandler}>

                <FormTitle>{idForUpdate ? 'ویرایش مقاله' : 'ثبت مقاله'}</FormTitle>

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

                <FormButtonGroup>
                    <ButtonLoading isSubmit={isSubmit} size="md" type="submit">{idForUpdate ? 'ویرایش' : 'ثبت'}</ButtonLoading>
                    <ButtonLoading isSubmit={isSubmit} isSubmitEffect onClick={cancelHandler} size="md" variant="danger">انصراف</ButtonLoading>
                </FormButtonGroup>
                
            </form>
            
        </Modal>
    )
}
*/