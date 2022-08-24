import { setLocale } from 'yup'
import attributes from '../constants/attributes'

setLocale({
    mixed: {
        required: ({path: attribute}) => `فیلد ${attributes[attribute]} الزامی است`,
        oneOf: ({path: attribute}) => attribute === 'passwordConfirmation' ? 'رمز عبور باید با تایید رمز عبور مطابقت داشته باشد' : '',
        notType: ({path: attribute}) => `فرمت ${attributes[attribute]} نامعتبر است`,
    },
    string: {
        email: 'فرمت ایمیل نامعتبر است',
        min: ({path: attribute, min}) => `فیلد ${attributes[attribute]} نباید کمتر از ${min} حرف باشد`,
        max: ({path: attribute, max}) => `فیلد ${attributes[attribute]} نباید بیشتر از ${max} حرف باشد`,
        length: ({path: attribute, length}) => `طول ${attributes[attribute]} باید ${length} کاراکتر باشد`,
    },
    number: {
        min: ({min}) => `حداقل عدد ${min} است`,
        max: ({max}) => `حداکثر عدد ${max} است`,
    },
})