import LabelElement from '../elements/label'
import ErrorElement from './error'

export default function GroupForm ({children, label, error, alert = null, className: classes = ''}) {
    return (
        <div className={`mb-5 ${classes}`}>
            <LabelElement text={label} alert={alert} />
            {children}
            <ErrorElement text={error} />
        </div>
    )
}