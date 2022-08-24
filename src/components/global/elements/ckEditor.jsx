import { memo } from 'react'
import PropTypes from 'prop-types'
import {  CKEditor  } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function CKEditorElement ({keyname, value, inputHandler}) {
    return (
        <CKEditor
            config={{language: 'fa', toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']}}
            editor={ClassicEditor} 
            data={value} 
            onBlur={( event, editor ) => inputHandler(keyname, editor.getData())}
        />
    )
}

CKEditorElement.propTypes = {
    keyname: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    inputHandler: PropTypes.func.isRequired,
}

export default memo(CKEditorElement)