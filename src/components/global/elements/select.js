export default function SelectElement ({value, options, onChange, placeholder = null, className: classes = ''}) {
    return (
        <select 
            value={value}
            onChange={onChange}
            className={`w-full mt-1 p-[.66rem] rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none ${classes}`}
        >
            {placeholder ? <option value="" disabled className="text-gray-300">{placeholder}</option> : null}
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    )
}