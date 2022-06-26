import GroupForm from './group'
import SelectElement from '../elements/select'

export default function SelectForm ({label = '', options, value, keyname, type = 'string', inputHandler, error = ''}) {
    return (
        <GroupForm label={label} error={error}>
            <SelectElement 
                value={value}
                options={options}
                onChange={({target: {value}}) => inputHandler(keyname, value, type)}
            />
        </GroupForm>
    )
}