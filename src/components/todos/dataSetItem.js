import useDeleteAndUpdateTodos from '../../hooks/useDeleteAndUpdateTodos'
import { ColumnGridWrap, DataSetWrap } from '../global/wraps'
import SelectItemTodos from './selectItem'
import ButtonLoading from '../global/loadings/button'

export default function DataSetItemTodos ({id, text, done}) {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler, toggleDoneHandler} = useDeleteAndUpdateTodos(id)

    return (
        <div className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'bg-gray-200 dark:bg-gray-900'} p-3 rounded-lg space-y-3 relative`}>
            
            <SelectItemTodos type="dataset" todoId={id} isSelect={isSelect} setIsSelect={setIsSelect} />

            <DataSetWrap>
                {done ? <span className="line-through opacity-50 py-5 h-20">{text}</span> : <span className="py-5 h-20">{text}</span>}
            </DataSetWrap>

            <ColumnGridWrap cols="3" gap="2" responsive="off">
                <ButtonLoading onClick={toggleDoneHandler} isSubmit={getIsSubmit('toggle')} size="xs" variant={`${done ? 'warning' : 'success'}`}>{done ? 'ناتمام' : 'تمــام'}</ButtonLoading>
                <ButtonLoading onClick={updateHandler} isSubmitEffect={getIsSubmit()} isSubmit={getIsSubmit()} size="sm">ویرایش</ButtonLoading>
                <ButtonLoading onClick={deleteHandler} isSubmit={getIsSubmit('delete')} size="sm" variant="danger">حذف</ButtonLoading>
            </ColumnGridWrap>
        </div>
    )
}