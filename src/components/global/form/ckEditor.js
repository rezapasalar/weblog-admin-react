import GroupForm from './group'
import CKEditorElement from '../elements/ckEditor'

export default function CKEditorForm ({label = '', keyname, inputHandler, value = '', error = ''}) {
    return (
        <GroupForm label={label} error={error} className={`${localStorage.theme === 'dark' ? 'ck-dark' : ''}`}>
            <div className="mt-2">
                <CKEditorElement 
                    value={value}
                    keyname={keyname}
                    inputHandler={inputHandler}
                />
            </div>
        </GroupForm>
    )
}