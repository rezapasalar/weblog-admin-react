import { useSelector } from 'react-redux'
import { setIsSelectAll, setSelectedRows } from '../../store/slices/todos'
import GridViewItemTodos from './gridViewItem'
import { Table, TableHead, TableFooter } from '../global/table'

export default function GridViewTodos () {

    const {todosCurrentPage: todos} = useSelector(state => state.todos)

    return (
        <Table>
            <TableHead slice="todos" setIsSelectAll={setIsSelectAll} setSelectedRows={setSelectedRows} titles={['متن', 'عملیات']}/>
            <tbody>{todos.map(todo => <GridViewItemTodos key={todo.id} {...todo} />)}</tbody>
            <TableFooter dataLength={todos.length} colSpan="3"/>
        </Table>
    )
}