export default function Label ({text, alert = null}) {

    const getVariant = () => {
        switch (alert?.variant) {
            case 'success' : return 'bg-green-600'
            case 'danger' : return 'bg-red-600'
            default: return 'bg-white'
        }
    }

    return <label className="flex items-center text-gray-400 dark:text-gray-400 text-sm space-x-reverse space-x-2 select-none">
        <div>{text}</div>
        <div className={`${getVariant()} text-white text-xs p-1 rounded-lg`}>{alert?.label}</div>
    </label>
}