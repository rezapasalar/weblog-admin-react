import PropTypes from 'prop-types'
import LabelElement from '../elements/label'
import ErrorElement from './error'

function FormGroup ({children, label = '', error = '', alert = null, className: classes = ''}) {
    return (
        <div className={`mb-5 ${classes}`}>
            <LabelElement text={label} alert={alert} />
            {children}
            <ErrorElement message={error} />
        </div>
    )
}

FormGroup.propTypes = {
    children: PropTypes.node,
    label: PropTypes.any,
    error: PropTypes.any,
    alert: PropTypes.any,
    className: PropTypes.string
}

export default FormGroup