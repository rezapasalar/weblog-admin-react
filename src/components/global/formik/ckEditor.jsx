import PropTypes from 'prop-types'
import {  CKEditor  } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import FormGroup from '../form/group'
import attributes from '../../../constants/attributes'

function MyCKEditor ({label = null, name, values, errors, setValues}) {
    return(
        <FormGroup label={label ? label : attributes[name] ?? name} error={errors[name]} className={`${localStorage.theme === 'dark' && 'ck-dark'}`}>
            <CKEditor
                config={{language: 'fa', toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']}}
                editor={ClassicEditor} 
                data={values[name]}
                onBlur={( event, editor ) => setValues({...values, [name]: editor.getData()})}
            />
        </FormGroup>
    )
}

MyCKEditor.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    setValues: PropTypes.func.isRequired
}

export default MyCKEditor