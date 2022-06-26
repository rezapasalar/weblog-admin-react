import { useSelector } from 'react-redux'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/users'
import GridViewItemUsers from './gridViewItem'
import { Table, TableHead, TableFooter } from '../global/table'

export default function GridViewUsers () {

    const {usersCurrentPage: users} = useSelector(state => state.users)

    return (
        <Table>
            <TableHead slice="users" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['نام', 'متولد', 'ایمیل', 'کاربری', 'تاریخ عضویت', 'عملیات']} />
            <tbody>{users.map(user => <GridViewItemUsers key={user.id} {...user} />)}</tbody>
            <TableFooter dataLength={users.length} colSpan="8"/>
        </Table>
    )
}