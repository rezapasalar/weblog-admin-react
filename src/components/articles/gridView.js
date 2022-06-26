import { useSelector } from 'react-redux'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/articles'
import GridViewItemArticles from './gridViewItem'
import { Table, TableHead, TableFooter } from '../global/table'

export default function GridViewArticles () {

    const {articlesCurrentPage: articles} = useSelector(state => state.articles)

    return (
        <Table>
            <TableHead slice="articles" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['عنوان', 'وضعیت', 'تاریخ ثبت', 'عملیات']} />
            <tbody>{articles.map(article => <GridViewItemArticles key={article.id} {...article} />)}</tbody>
            <TableFooter dataLength={articles.length} colSpan="5"/>
        </Table>
    )
}