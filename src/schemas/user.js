import { object, string, boolean, ref } from 'yup'
import { messages, transfer } from '.'
import { searchUserService } from '../services/users'

const {email, confirmed} = messages

export const initialData = {
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
        name: 
            string()
            .required(transfer('required', 'name'))
        ,family:
            string()
            .required(transfer('required', 'family'))
        ,day: 
            string()
            .required(transfer('required', 'day'))
        ,month: 
            string()
            .required(transfer('required', 'month'))
        ,year: 
            string()
            .required(transfer('required', 'year'))
        ,is_admin:
            boolean()
            .required(transfer('required', 'isAdmin'))
        ,email:
            string()
            .required(transfer('required', 'email'))
            .email(email)
            .test({
                message: () => transfer('duplicate', 'email'),
                test: async (email, {parent: {id}}) => {
                    if (type === 'create') {
                        const {data: {data}} = await searchUserService('email', email)
                        return data.length ? false : true
                    } else {
                        const {data: {data}} = await searchUserService('email', email)
                        return data.length && data[0].id !== id ? false : true
                    }                
                }
            })
        ,password:
            type === 'create'
                ?
                    string()
                    .required(transfer('required', 'password'))
                    .min(8, transfer('min', 'password', 8))
                    .max(32, transfer('max', 'password', 32))
                :
                    string()
                    .nullable(true)
                    .transform((o, c) => o === "" ? null : c)
                    .min(8, transfer('min', 'password', 8))
                    .max(32, transfer('max', 'password', 32))
        ,passwordConfirmation:
            type === 'create'
                ?
                    string()
                    .oneOf([ref('password'), null], confirmed)
                :
                    string()
                    .test('passwordConfirmation', confirmed, function (value) {
                        return this.parent.password != null ? this.parent.password === value : true
                    })
    })
}