import { object, string } from 'yup'

export const initialValues = {
    text: '',
    done: 0,
    created_at: ''
}

export const todoSchema = () => { 
    return object({
        text: string().required().min(5).max(100)
    })
}