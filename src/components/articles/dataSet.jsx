import { useSelector } from 'react-redux'
import DataSetItem from './dataSetItem'
import { EMPTY_DATA } from '../../constants/responses'

export default function DataSetArticles () {

    const {articlesCurrentPage: articles} = useSelector(state => state.articles)

    return (
        <div className="my-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => <DataSetItem key={article.id} {...article} />)}
            </div>
            {!articles.length && <div className="bg-indigo-100 dark:bg-gray-600 rounded-lg p-4 text-gray-500 dark:text-gray-100 text-md">{EMPTY_DATA}</div>}
        </div>
    )
}