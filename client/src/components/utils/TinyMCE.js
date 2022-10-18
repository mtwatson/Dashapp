import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '@mui/material';
import FicToDoContext from '../../contexts/FicToDoContext';
import './tinyMce.css'

export default function TinyMCE(props) {
    const [ficToDoContext, setFicToDoContext] = useContext(FicToDoContext);
    const editorRef = useRef(null);
    const [content, setContent] = useState();

    const handleGetContent = () => {
        if (editorRef.current) {
            setContent(editorRef.current.getContent());
        }
    };
    const enc = new TextDecoder('utf-8');
    // console.log(enc.decode(ficToDoContext.selectedFic.ficDetails));
    console.log(ficToDoContext.selectedFic.ficDetails)
    
    const handleClearContent = () => {
        editorRef.current.setContent('');
    };
    
    const updateFic = (value, editor) => {
        console.log(value);
        const updatedState = {...ficToDoContext};
        updatedState.selectedFic.ficDetails = value;
        setFicToDoContext((prevState) => {
            return (updatedState);
        });
    };

    return (
        <>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => editorRef.current = editor}
                value={ficToDoContext.selectedFic.ficDetails || ''}
                disabled={ficToDoContext.editorDisabled}
                onEditorChange={(value, editor)=>{updateFic(value, editor)}} 
                init={{
                    height: 500,
                    menubar: false,
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
            />
        </>
    );
}