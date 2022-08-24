import { memo } from 'react'
import PropTypes from 'prop-types'

function TextAreaElement ({rows = "5", value, size = 'lg', widthFull = true, dir = 'rtl', placeholder = null, onChange = null, className: classes = ''}) {

    const sizes = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-2 py-1',
        md: 'text-md px-4 py-2',
        lg: 'text-lg px-5 py-3',
        xl: 'text-xl px-5 py-3',
    }

    return (
        <textarea 
            rows={rows}
            value={value}
            dir={dir}
            placeholder={placeholder}
            onChange={onChange}
            className={`${sizes[size]} ${widthFull && 'w-full'} text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-3 mt-1 rounded-lg outline-none border dark:border-gray-800 border-gray-300 focus:ring-2 ${classes}`}
        >
        </textarea>
    )
}

TextAreaElement.propTypes = {
    rows: PropTypes.string,
    value: PropTypes.string.isRequired,
    size: PropTypes.string,
    widthFull: PropTypes.bool,
    dir: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default memo(TextAreaElement)    