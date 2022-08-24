export default function DataSetWrap ({className: classes, children}) {
    return (
        <div className={`flex text-md font-semibold text-gray-500 dark:text-gray-100 ${classes}`}>
            {children}
        </div>
    )
}