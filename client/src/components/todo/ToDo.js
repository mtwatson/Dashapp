import React from 'react';
import ToDoTable from './TodoTable';
import ToDoDetails from './ToDoDetails';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Button } from '@mui/material';
import FicToDoContext from '../../contexts/FicToDoContext';
import './toDo.css'

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
        // return axios.get(`${finalApiServer}/data`)
        //     .then(response =>  {
        //         setFicToDoContext(...response.data);
        //     }).catch(error => console.error(error));
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
        } = ficToDoContext;
        
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
                // setFicToDoContext(...response.data);
            }).catch(error => console.error(error));
    };


    return (
        <Grid container spacing={2}>
            <Grid xs={12} md={12}>
                <div>
                    <ToDoTable></ToDoTable>
                </div>
            </Grid>
            <Grid xs={12} md={12}>
                <div>
                    <ToDoDetails></ToDoDetails>
                </div>
            </Grid>
            <Grid xs={12} md={12}>
                <div>
                    <div className="populate-data">
                        <Button variant="contained" onClick={getData}>Get Data</Button>
                    </div>
                    <div className="tiny-mce-save">
                        <Button variant="contained" onClick={handleSaveContent}>Save</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default ToDo;