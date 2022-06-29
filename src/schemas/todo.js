import { object, string } from 'yup'
import { transfer } from '.'

export const initialData = {
    text: '',
    done: 0,
    created_at: ''
}

export const todoSchema = () => { 
    return object({
        text:
            string()
            .required(transfer('required', 'text'))
            .min(5, transfer('min', 'text', 5))
            .max(100, transfer('max', 'text', 100))
    })
}