import React from 'react';
import ToDoTable from './TodoTable';
import ToDoDetails from './ToDoDetails';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Button } from '@mui/material';
import FicToDoContext from '../../contexts/FicToDoContext';
import './toDo.css';

const env = process.env.NODE_ENV;
const apiDevServer = 'http://localhost:3001';
const apiProdServer =  '/api';
const finalApiServer = env === 'production' ? apiProdServer : apiDevServer;

function ToDo() {
    const [ficToDoContext, setFicToDoContext] = useContext(FicToDoContext);
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        return axios.get(`${finalApiServer}/data`)
            .then(response =>  {
                const finalFicData = response.data[0].map(entry => {
                    const {
                        uuid, 
                        id,
                        fic_name, 
                        fic_priority, 
                        fic_completion, 
                        fic_category, 
                        fic_status, 
                        fic_details, 
                        fic_color
                    } = entry;

                    return {
                        uuid,
                        ficName: fic_name,
                        ficPriority: fic_priority,
                        ficCompletion: fic_completion,
                        ficCategory: fic_category,
                        ficStatus: fic_status,
                        ficDetails: fic_details,
                        ficColor: fic_color,
                    };
                });

                setFicToDoContext((prevState) => {
                    return ({
                        ...prevState,
                        fics: finalFicData
                    });
                });
            }).catch(error => console.error(error));
    };

    const handleDeleteContent = () => {

    };

    const handleSaveContent = () => {
        const {
            uuid,
            ficName,
            ficPriority,
            ficCompletion,
            ficCategory,
            ficStatus,
            ficDetails,
            ficColor,
        } = ficToDoContext.selectedFic;
        
        return axios.post(`${finalApiServer}/insert`, {
            uuid,
            ficName,
            ficPriority,
            ficCompletion,
            ficCategory,
            ficStatus,
            ficDetails,
            ficColor
        })
            .then(response =>  {
                getData();
            }).catch(error => console.error(error));
    };


    return (
        <Grid container spacing={2}> 
            <Grid xs={12} md={12} className='fic-editor-border'>
                <div>
                    <ToDoTable></ToDoTable>
                </div>
            </Grid>
            <Grid xs={12} md={12} className={`${ficToDoContext.editorDisabled ? 'disabled' : ''}`}>
                <div>
                    <ToDoDetails></ToDoDetails>
                </div>
            </Grid>
            <Grid xs={12} md={12} className={`${ficToDoContext.editorDisabled ? 'disabled' : ''}`}>
                <div>
                    <div className="actions populate-data">
                        <Button variant="contained" onClick={getData} disabled={ficToDoContext.editorDisabled}>Get Data</Button>
                    </div>
                    <div className="actions fic-editor-save">
                        <Button variant="contained" sx="background-color: #1b5e20;" onClick={handleSaveContent} disabled={ficToDoContext.editorDisabled}>Save</Button>
                    </div>
                    <div className="actions fic-editor-delete">
                        <Button variant="contained" sx="background-color: #c62828;" onClick={handleDeleteContent} disabled={ficToDoContext.editorDisabled}>Delete</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default ToDo;