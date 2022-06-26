export default function Button ({children, onClick = null, type = 'button', size = 'lg', variant = 'primary', outline = false , widthFull = false, disabled = '', className: classes = ''}) {

    const getSize = () => {
        switch (size) {
            case 'xs' : return 'text-xs p-1'
            case 'sm' : return 'text-sm px-2 py-1'
            case 'md' : return 'text-md px-4 py-2'
            case 'lg' : return 'text-md px-5 py-[.7rem]'
            case 'xl' : return 'text-xl px-5 py-3'
            default : return 'text-md px-5 py-[.7rem]'
        }
    }

    const getVariant = () => {
        if (outline) {
            switch (variant) {
                case 'primary' : return 'border border-indigo-600 !text-indigo-600 hover:bg-indigo-700 hover:!text-white hover:border-indigo-700 focus:border-indigo-800'
                case 'danger' : return 'border border-red-600 !text-red-600 hover:bg-red-700 hover:!text-white hover:border-red-700 focus:border-red-800'
                case 'success' : return 'border border-green-600 !text-green-600 hover:bg-green-700 hover:!text-white hover:border-green-700 focus:border-green-800'
                case 'warning' : return 'border border-orange-600 !text-orange-600 hover:bg-orange-700 hover:!text-white hover:border-orange-700 focus:border-orange-800'
                case 'secondary' : return 'border border-gray-400 !text-gray-500 dark:!text-gray-200 hover:bg-gray-400 hover:!text-white hover:border-gray-400 focus:border-gray-600'
                case 'dark' : return 'border border-gray-800 !text-gray-800 hover:bg-gray-900 hover:!text-white hover:border-gray-900 focus:border-black'
                default : return 'border border-indigo-600 !text-indigo-600 hover:bg-indigo-700 hover:!text-white hover:border-indigo-700 focus:border-indigo-800'
            }
        } else {
            switch (variant) {
                case 'primary' : return 'bg-indigo-600 border border-indigo-600 hover:!bg-indigo-700 focus:bg-indigo-800'
                case 'danger' : return 'bg-red-600 border border-red-600 hover:!bg-red-700 focus:bg-red-800'
                case 'success' : return 'bg-green-600 border border-green-600 hover:!bg-green-700 focus:bg-green-800'
                case 'warning' : return 'bg-orange-600 border border-orange-600 hover:!bg-orange-700 focus:bg-orange-800'
                case 'secondary' : return 'bg-gray-600 border border-gray-600 hover:!bg-gray-700 focus:bg-gray-800'
                case 'dark' : return 'bg-gray-800 border border-gray-600 hover:!bg-gray-900 focus:bg-gray-800'
                default : return 'bg-gray-800 border border-gray-600 hover:!bg-gray-900 focus:bg-gray-800'
            }
        }
    }

    return (
        <button 
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`${getVariant()} ${getSize()} ${widthFull ? 'w-full' : ''} focus:outline-none text-white rounded-lg duration-300 select-none ${classes}`}
        >
            {children}
        </button>
    )
}