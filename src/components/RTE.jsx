import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import conf from '../conf/conf'

//created a component of editor this 

function RTE({name, control, label, labelclass="", defaultValue=''}) {
    return (
        <div className='w-full'>
            {label && <label className={`inline-block mb-1 pl-1 ${labelclass}`}>{label}</label>}

            <Controller
                name = {name || 'content'}
                control = {control}
                //if any change happens on this field then inform the controller
                render = {({field})=>(
                    <Editor
                        apiKey = {conf.editor_api}
                        initialValue = {defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        value={field.value}  // ✅ Ensures the editor stays in sync with form state
                        onEditorChange={field.onChange}  // ✅ Updates form state on editor changes
                    />
                )}
            />
        </div>
    )
}

export default RTE
