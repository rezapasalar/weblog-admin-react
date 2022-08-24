import { Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import FormGroup from '../form/group'
import attributes from '../../../constants/attributes'

function SelectFormik ({children, label = null, options, widthFull = true, className: classes = '', ...props}) {
    return (
        <FormGroup label={label ? label : attributes[props.name] ?? props.name}  error={<ErrorMessage name={props.name} />}>
            <Field as="select" {...props} className={`${widthFull && 'w-full'} mt-1 p-[.66rem] rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 border dark:border-0 border-gray-300 focus:ring-2 focus:outline-none ${classes}`}>
                {props.placeholder && <option value="" disabled className="text-gray-300">{props.placeholder}</option>}
                {options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </Field>
        </FormGroup>
    )
}

SelectFormik.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    widthFull: PropTypes.string,
    className: PropTypes.string,
    props: PropTypes.any
}

export default SelectFormik