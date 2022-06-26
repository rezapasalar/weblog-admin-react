import {  CKEditor  } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function CKEditorElement ({keyname, value, inputHandler}) {
    return (
        <CKEditor
            config={{language: 'fa', toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']}}
            editor={ClassicEditor} 
            data={value} 
            onBlur={( event, editor ) => inputHandler(keyname, editor.getData())}
        />
    )
}