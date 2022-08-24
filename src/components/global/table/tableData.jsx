export default function TableData ({children, className: classes = ''}) {
    return (
        <td className={`p-4 dark:text-gray-100 text-gray-500 text-center truncate ${classes}`}>
            {children}
        </td>
    )
}