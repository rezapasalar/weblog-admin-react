import useDeleteAndUpdateArticles from '../../hooks/useDeleteAndUpdateArticles'
import { timestampToPersianDate } from '../../modules/helperFunctions'
import { TableRow, TableData } from '../../components/global/table'
import ButtonLoading from '../global/loadings/button'
import SelectItemArticles from './selectItem'

export default function GridViewItemArticles ({id, title, status, created_at}) {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler} = useDeleteAndUpdateArticles(id)

    return (
        <TableRow isSelect={isSelect}>
            <TableData>
                <SelectItemArticles type="gridview" articleId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableData>
            <TableData>{title.length > 30 ? title.slice(0, 30) + '...' : title}</TableData>
            <TableData>{status === 'draft' ? <div>پیش نویس</div> : <div className="flex justify-center space-x-reverse space-x-2 text-green-600"><span className="pr-6">منتشر شده</span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>}</TableData>
            <TableData>{timestampToPersianDate(created_at)}</TableData>
            <TableData className="space-x-reverse space-x-1">
                <ButtonLoading onClick={updateHandler} isSubmitEffect={getIsSubmit()} isSubmit={getIsSubmit()} size="xs">ویرایش</ButtonLoading>
                <ButtonLoading onClick={deleteHandler} isSubmit={getIsSubmit('delete')} size="xs" variant="danger">حذف</ButtonLoading>
            </TableData>
        </TableRow>
    )
}