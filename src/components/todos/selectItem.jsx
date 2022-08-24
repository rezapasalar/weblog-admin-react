import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/todos'
import CheckedSvg from '../global/svg/checked'

export default function SelectItemTodos ({type = 'gridview', todoId, isSelect, setIsSelect}) {

    const {isSelectAll, selectedRows} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isSelectAll) {
            setIsSelect(true)
            if (!selectedRows.includes(todoId)) dispatch(setSelectedRows(todoId))
        } else if (!selectedRows.includes(todoId)) {
            setIsSelect(false)
        }   
    }, [isSelectAll, dispatch, todoId, setIsSelect, selectedRows])

    const selectHandler = () => {
        setIsSelect(!isSelect)
        if (isSelect) dispatch(setIsSelectAll(false))
        dispatch(setSelectedRows(todoId))
    }

    return (
        <div onClick={selectHandler} className={`${isSelect ? 'bg-indigo-700' : 'bg-gray-400/50  dark:bg-gray-400 shadow-sm'} ${type === 'dataset' && 'absolute top-2 left-2'} h-5 w-5 rounded-md cursor-pointer duration-500`}>
            {isSelect && <CheckedSvg className="h-5 w-5 text-white" />}
        </div>
    )
}