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
    
    const handleClearContent = () => {
        editorRef.current.setContent('');
    };

    const updateFic = (value, editor) => {
        setFicToDoContext((prevState) => {
            return ({
                ...prevState,
                'ficDetails' : value
            });
        });
    };

    return (
        <>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => editorRef.current = editor}
                value={ficToDoContext.ficDetails}
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