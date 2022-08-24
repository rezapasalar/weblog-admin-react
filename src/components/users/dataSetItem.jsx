import useDeleteAndUpdateUsers from '../../hooks/useDeleteAndUpdateUsers'
import { timestampToPersianDate } from '../../modules/helperFunctions'
import { DataSetWrap, ColumnGridWrap } from '../global/wraps'
import SelectItemUsers from './selectItem'
import ButtonLoading from '../global/loadings/button' 

export default function DataSetItemUsers ({id, name, family, day, month, year, email, is_admin, created_at}) {

    const {isSelect, setIsSelect, getIsSubmit, deleteHandler, updateHandler} = useDeleteAndUpdateUsers(id)

    return (
        <div className={`${isSelect ? 'bg-indigo-100 dark:bg-slate-400/50' : 'bg-gray-200 dark:bg-gray-900'} p-3 rounded-lg space-y-3 relative`}>
            
            <SelectItemUsers type="dataset" userId={id} isSelect={isSelect} setIsSelect={setIsSelect} />

            <DataSetWrap className="text-lg font-semibold">
                <div className="ml-1">{name}</div>
                <div>{family}</div>
            </DataSetWrap>

            <DataSetWrap>
                <div className="ml-1 opacity-60">متولد</div>
                <div>{year.toLocaleString('fa-IR').replace(/٬/g, '')}/{month.toLocaleString('fa-IR')}/{day.toLocaleString('fa-IR')}</div>
            </DataSetWrap>

            <DataSetWrap>
                <div className="ml-1 opacity-60">نوع کاربری</div>
                <div>{is_admin ? 'مدیر' : 'معمولی'}</div>
            </DataSetWrap>

            <DataSetWrap>
                <div className="ml-1 opacity-60">تاریخ عضویت</div>
                <div>{timestampToPersianDate(created_at)}</div>
            </DataSetWrap>

            <DataSetWrap className="text-left">
                {email}
            </DataSetWrap>

            <ColumnGridWrap gap="2" responsive="off">
                <ButtonLoading onClick={updateHandler} isSubmitEffect={getIsSubmit()} isSubmit={getIsSubmit()} size="sm">ویرایش</ButtonLoading>
                <ButtonLoading onClick={deleteHandler} isSubmit={getIsSubmit('delete')} size="sm" variant="danger">حذف</ButtonLoading>
            </ColumnGridWrap>

        </div>
    )
}