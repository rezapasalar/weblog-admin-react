import { object, string } from 'yup'

export const initialValues = {
    title: '',
    description: '',
    body: '',
    slug: '',
    status: 'draft', // draft - public
    created_at: ''
}

export const articleSchema = () => { 
    return object({
        title: string().required(),
        description: string().required().min(20).max(150),
        body: string().required().min(20),
        status: string().required()
    })
}