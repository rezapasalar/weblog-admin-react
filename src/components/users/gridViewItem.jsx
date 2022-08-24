import useDeleteAndUpdateUsers from '../../hooks/useDeleteAndUpdateUsers'
import { timestampToPersianDate } from '../../modules/helperFunctions'
import { TableRow, TableData } from '../../components/global/table'
import ButtonLoading from '../global/loadings/button'
import SelectItemUsers from './selectItem'

export default function GridViewItemUsers ({id, name, family, day, month, year, email, is_admin, created_at}) {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler} = useDeleteAndUpdateUsers(id)

    return (
        <TableRow isSelect={isSelect}>
            <TableData>
                <SelectItemUsers type="gridview" userId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableData>
            <TableData>{name} {family}</TableData>
            <TableData>{year.toLocaleString('fa-IR').replace(/٬/g, '')}/{month.toLocaleString('fa-IR')}/{day.toLocaleString('fa-IR')}</TableData>
            <TableData>{email}</TableData>
            <TableData>{is_admin ? 'مدیر' : 'معمولی'}</TableData>
            <TableData>{timestampToPersianDate(created_at)}</TableData>
            <TableData className="space-x-reverse space-x-1">
                <ButtonLoading onClick={updateHandler} isSubmitEffect={getIsSubmit()} isSubmit={getIsSubmit()} size="xs">ویرایش</ButtonLoading>
                <ButtonLoading onClick={deleteHandler} isSubmit={getIsSubmit('delete')} size="xs" variant="danger">حذف</ButtonLoading>
            </TableData>
        </TableRow>
    )
}