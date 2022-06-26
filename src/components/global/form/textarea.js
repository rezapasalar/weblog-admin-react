import GroupForm from './group'
import TextAreaElement from '../elements/textarea'

export default function TextAreaForm ({label = '', rows = 5, value = '', keyname, error, size = 'lg', widthFull = true, placeholder = '', className: classes = '', inputHandler = null}) {
    return (
        <GroupForm label={label} error={error}>
            <TextAreaElement 
                size={size}
                widthFull={widthFull}
                rows={rows}
                value={value} 
                onChange={({target: {value}}) => inputHandler(keyname, value)} 
                placeholder={placeholder}
                className={classes}
            >
            </TextAreaElement>
        </GroupForm>
    )
}