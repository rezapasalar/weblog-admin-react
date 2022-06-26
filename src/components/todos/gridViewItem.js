import useDeleteAndUpdateTodos from '../../hooks/useDeleteAndUpdateTodos'
import { TableRow, TableData } from '../../components/global/table'
import ButtonLoading from '../global/loadings/button'
import SelectItemTodos from './selectItem'

export default function GridViewItemTodos ({id, text, done}) {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, toggleDoneHandler, updateHandler} = useDeleteAndUpdateTodos(id)

    return (
        <TableRow isSelect={isSelect}>
            <TableData>
                <SelectItemTodos type="gridview" todoId={id} isSelect={isSelect} setIsSelect={setIsSelect} />
            </TableData>
            <TableData>
                {done ? <span className="line-through opacity-50">{text}</span> : <span>{text}</span>}
            </TableData>
            <TableData className="space-x-reverse space-x-1">
                <ButtonLoading onClick={toggleDoneHandler} isSubmitEffect={getIsSubmit('toggle')} isSubmit={getIsSubmit('toggle')} size="xs" variant={`${done ? 'warning' : 'success'}`}>{done ? 'ناتمام' : 'تمــام'}</ButtonLoading>
                <ButtonLoading onClick={updateHandler} isSubmitEffect={getIsSubmit()} isSubmit={getIsSubmit()} size="xs">ویرایش</ButtonLoading>
                <ButtonLoading onClick={deleteHandler} isSubmitEffect={getIsSubmit('delete')} isSubmit={getIsSubmit('delete')} size="xs" variant="danger">حذف</ButtonLoading>
            </TableData>
        </TableRow>
    )
}