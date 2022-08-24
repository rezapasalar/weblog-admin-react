import { memo } from 'react'
import PropTypes from 'prop-types'

function Button ({children, label = '', type = 'button', size = 'lg', variant = 'primary', outline = false , widthFull = false, disabled = '', onClick = null, className: classes = ''}) {

    const sizes = {
        xs : 'text-xs px-2 py-1',
        sm : 'text-sm px-2 py-1',
        md : 'text-md px-4 py-2',
        lg : 'text-md px-5 py-[.7rem]',
        xl : 'text-xl px-5 py-3',
    }

    const styles = {
        fill: {
            primary: 'bg-indigo-600 border border-indigo-600 hover:!bg-indigo-700 focus:bg-indigo-800',
            danger: 'bg-red-600 border border-red-600 hover:!bg-red-700 focus:bg-red-800',
            success: 'bg-green-600 border border-green-600 hover:!bg-green-700 focus:bg-green-800',
            warning: 'bg-orange-600 border border-orange-600 hover:!bg-orange-700 focus:bg-orange-800',
            secondary: 'bg-gray-600 border border-gray-600 hover:!bg-gray-700 focus:bg-gray-800',
            dark: 'bg-gray-800 border border-gray-600 hover:!bg-gray-900 focus:bg-gray-800',
        },
        outline: {
            primary: 'border border-indigo-600 !text-indigo-600 hover:bg-indigo-700 hover:!text-white hover:border-indigo-700 focus:border-indigo-800',
            danger: 'border border-red-600 !text-red-600 hover:bg-red-700 hover:!text-white hover:border-red-700 focus:border-red-800',
            success: 'border border-green-600 !text-green-600 hover:bg-green-700 hover:!text-white hover:border-green-700 focus:border-green-800',
            warning: 'border border-orange-600 !text-orange-600 hover:bg-orange-700 hover:!text-white hover:border-orange-700 focus:border-orange-800',
            secondary: 'border border-gray-400 !text-gray-500 dark:!text-gray-200 hover:bg-gray-400 hover:!text-white hover:border-gray-400 focus:border-gray-600',
            dark: 'border border-gray-800 !text-gray-800 hover:bg-gray-900 hover:!text-white hover:border-gray-900 focus:border-black',
        }
    }

    return (
        <button 
            disabled={disabled} 
            onClick={onClick} 
            type={type} 
            className={`${styles[outline ? 'outline' : 'fill'][variant]} ${sizes[size]} ${widthFull && 'w-full'} focus:outline-none text-white rounded-lg duration-300 select-none ${classes}`}
        >
            {children || label}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    outline: PropTypes.bool,
    widthFull: PropTypes.bool,
    disabled: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default memo(Button)