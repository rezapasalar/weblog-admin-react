import InsertSvg from '../svg/insert'

export default function Header ({children}) {
    return (
        <h4 className="flex items-center text-2xl mb-8 font-semibold text-gray-500 dark:text-gray-100 select-none">
            <InsertSvg className="h-7 w-7 ml-2" />
            <span>{children}</span>
        </h4>
    )
}