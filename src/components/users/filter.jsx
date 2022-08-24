import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { setUsersArchive, setFilterValue, resetUsersState } from '../../store/slices/users'
import { setIsLoading } from '../../store/slices/global'
import StatisticsRowsUsers from './statisticsRows'
import { getUsersService } from '../../services/users'
import SelectElement from '../global/elements/select'

export default function FilterUsers () {

    const {filterValue} = useSelector(state => state.users)

    const dispatch = useDispatch()

    const [, setSearchParams] = useSearchParams()
    
    const filterSelectHandler = (value) => {
        dispatch(setIsLoading(true))
        const filter = value !== 'all' ? value : 'all'
        setSearchParams({page: 1, filter: value})
        getUsersService(1, filter !== 'all' && filter).then(({data: {data, meta: {totalDocs, limit, page}}}) => {
            dispatch(resetUsersState())
            dispatch(setFilterValue(value))
            dispatch(setUsersArchive({page, data, totalDocs, limit}))
        }).finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className="flex flex-wrap justify-between items-end md:py-2">
            <SelectElement
                className="w-full md:w-64 !bg-white dark:!bg-gray-700"
                value={filterValue}
                options={[{value: 'all', label: 'همه'}, {value: 'is_admin:0', label: 'معمولی'}, {value: 'is_admin:1', label: 'مدیر'}]}
                onChange={({target: {value}}) => filterSelectHandler(value)}
            />
            <StatisticsRowsUsers />
        </div>
    )
}