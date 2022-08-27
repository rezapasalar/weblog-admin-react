import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { setArticlesArchive, setArticlesCurrentPage, setSelectedRows } from '../store/slices/articles'
import { setIsLoading } from '../store/slices/global'
import HeaderArticles from '../components/articles/header'
import ModalFormArticles from '../components/articles/form'
import GridViewArticles from '../components/articles/gridView'
import DataSetArticles from '../components/articles/dataSet'
import FilterArticles from '../components/articles/filter'
import Pagination from '../components/global/pagination'
import { getArticlesService } from '../services/articles'

export default function ArticlesPage () {

    const {articlesArchive, filterValue, isShowModal, pagination: {totalCount, pageSize, currentPage}} = useSelector(state => state.articles)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const [viewType, setViewType] = useState(localStorage.viewType ? localStorage.viewType !== 'false' : true)

    useEffect(() => {
        document.title = 'مقالات'
        const page = searchParams.get('page') ? Number(searchParams.get('page')) : currentPage
        setSearchParams({page, filter: filterValue})
        pageChangeHandler(page)
    }, [])
    
    const changeViewType = type => {
        setViewType(type)
        dispatch(setSelectedRows([]))
        localStorage.viewType = type
    }

    const pageChangeHandler = async (page) => {
        if (!articlesArchive.filter(item => item.page === page).length) {
            try {
                dispatch(setIsLoading(true))
                const filter = searchParams.get('filter') ? searchParams.get('filter') : filterValue
                const {data: {data, meta: {totalDocs, limit}}} = await getArticlesService(page, (filter === 'all' || filter === 'status:all') ? null : filter)
                dispatch(setArticlesArchive({page, data, totalDocs, limit}))
                window.scrollTo({top: 0, behavior: 'smooth'})
            } finally {
                dispatch(setIsLoading(false))
            }
        } else {
            dispatch(setArticlesCurrentPage(page))
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }

    return (
        <div className="animate-slow-1000">

            <HeaderArticles viewType={viewType} changeViewType={changeViewType} />

            <FilterArticles />

            {viewType ? <GridViewArticles /> : <DataSetArticles />}

            <Pagination onPageChange={page => pageChangeHandler(page)} currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} filter={searchParams.get('filter')} />

            {isShowModal && <ModalFormArticles />}
            
        </div>
    )
}