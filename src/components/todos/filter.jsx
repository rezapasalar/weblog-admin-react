import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { setTodosArchive, setFilterValue, resetTodosState } from '../../store/slices/todos'
import { setIsLoading } from '../../store/slices/global'
import StatisticsRowsTodos from './statisticsRows'
import { getTodosService } from '../../services/todos'
import SelectElement from '../global/elements/select'

export default function FilterTodos () {

    const {filterValue} = useSelector(state => state.todos)

    const dispatch = useDispatch()

    const [, setSearchParams] = useSearchParams()
    
    const filterSelectHandler = (value) => {
        dispatch(setIsLoading(true))
        const filter = value !== 'all' ? value : 'all'
        setSearchParams({page: 1, filter})
        getTodosService(1, filter !== 'all' && filter).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetTodosState())
            dispatch(setFilterValue(value))
            dispatch(setTodosArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end md:py-2">
            <SelectElement
                className="w-full md:w-64 !bg-white dark:!bg-gray-700"
                value={filterValue}
                options={[{value: 'all', label: 'همه'}, {value: 'done:1', label: 'تکمیل شده'}, {value: 'done:0', label: 'تکمیل نشده'}]}
                onChange={({target: {value}}) => filterSelectHandler(value)}
            />
            <StatisticsRowsTodos />
        </div>
    )
}