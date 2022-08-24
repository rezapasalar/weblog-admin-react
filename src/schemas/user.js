import { object, string, boolean, number, ref } from 'yup'
import { searchUserService } from '../services/users'

export const initialValues = {
    is_admin: 0,
    name: '',
    family: '',
    day: '',
    month: '',
    year: '',
    email: '',
    code: '',
    mobile: '',
    password: '',
    passwordConfirmation: '',
    created_at: ''
}

export const userSchema = (type = 'create') => { 
    return object({
        name: string().required(),
        family: string().required(),
        day: number().required().min(1).max(31),
        month: number().required().min(1).max(12),
        year: number().required().min(1300).max(new Date().getFullYear()),
        is_admin: boolean().required(),
        email: string().required().email()
            .test({
                message: () => 'فیلد ایمیل تکراری است',
                test: async (email, {parent: {id}}) => {
                    if (type === 'create') {
                        const {data: {data}} = await searchUserService('email', email)
                        return data.length ? false : true
                    } else {
                        const {data: {data}} = await searchUserService('email', email)
                        return data.length && data[0].id !== id ? false : true
                    }                
                }
            }),
        password:
            type === 'create'
                ? string().required().min(8).max(32)
                : string().nullable(true).transform((o, c) => o === "" ? null : c).min(8).max(32),
        passwordConfirmation:
            type === 'create'
                ? string().oneOf([ref('password')])
                : string()
                    .test('passwordConfirmation', function (value) {
                        return this.parent.password !== null ? this.parent.password === value : true
                    })
    })
}