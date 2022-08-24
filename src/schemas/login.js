import * as Yup from 'yup'

export const initialValues = {
    email: 'mitra@yahoo.com',
    password: '12345678'
}

export const loginSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8).max(32)
})