import { useCallback, useState } from 'react'

export default function UseForm (initialData) {
    
    const [data, setData] = useState(initialData)

    const [errors, setErrors] = useState({})

    const [isSubmit, setIsSubmit] = useState('')

    const inputHandler = useCallback((key, value, type = 'string') => setData(prevState => ({...prevState, [key]: type === 'number' ? Number(value) : value})), [data[Object.keys(data)]])

    const mapYupErrors = (errors) => {
        let errorsObj = {}
        errors = errors.inner.map(err => ({[err.path]: err.message}))
        errors.reverse().forEach(err => errorsObj = {...errorsObj, ...err})
    
        return errorsObj
    }

    return {data, setData, errors, setErrors, mapYupErrors, isSubmit, setIsSubmit, inputHandler}
}