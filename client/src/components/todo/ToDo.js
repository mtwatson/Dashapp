import React from 'react';
import ToDoTable from './TodoTable';
import ToDoDetails from './ToDoDetails';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Button } from '@mui/material';
import FicToDoContext from '../../contexts/FicToDoContext';
import './toDo.css';
import ficSchema from '../../schemas/FicSchema';
import { YupVerboseError } from '../../schemas/YupVerboseError';
import { useSnackbar } from 'notistack';
import errorDictionary from '../../data/errorDictionary';

const env = process.env.NODE_ENV;
const apiDevServer = 'http://localhost:3001';
const apiProdServer =  '/api';
const finalApiServer = env === 'production' ? apiProdServer : apiDevServer;

function ToDo() {
    const [ficToDoContext, setFicToDoContext] = useContext(FicToDoContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClickVariant = (text, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(text, { variant });
    };
    useEffect(() => {
        getData();
    }, []);

    const setSelectedFic = (uuid) => {
        const updatedState = {...ficToDoContext};
        const newSelected = ficToDoContext.fics.filter(fic => {
            return fic.uuid === uuid;
        });
        
        updatedState.selectedFic = newSelected[0];
        updatedState.editorDisabled = false;
        setFicToDoContext((prevState) => {
            return (updatedState);
        });
    };

    const getData = () => {
        return axios.get(`${finalApiServer}/data`)
            .then(response =>  {
                const finalFicData = response.data[0].map(entry => {
                    const {
                        uuid, 
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
                        editorDisabled: true,
                        selectedFic: {},
                        fics: finalFicData
                    });
                });
            }).catch(error => console.error(error));
    };

    const handleDeleteContent = () => {
        const {uuid} = ficToDoContext.selectedFic;

        return axios.delete(`${finalApiServer}/delete/${uuid}`, {
            uuid
        })
            .then(response =>  {
                getData();
            }).catch(error => console.error(error));
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

        const payload = {
            uuid,
            ficName,
            ficPriority,
            ficCompletion,
            ficCategory,
            ficStatus,
            ficDetails,
            ficColor
        };
        ficSchema.validate(payload, { abortEarly: false })
            .then(response => {
                if (uuid) {
                    return axios.put(`${finalApiServer}/update`, payload)                
                        .then(async (response) =>  {
                            await getData();
                            return await setSelectedFic(uuid);
                        }).catch(error => console.error(error));
                } else {
                    return axios.post(`${finalApiServer}/insert`, payload)
                        .then(async (response) =>  {
                            return await getData();
                        }).catch(error => console.error(error));
                }
            })
            .catch(err => {
                Object.values(YupVerboseError(err)).forEach(error => {
                    Object.entries(errorDictionary).forEach((entry) => {
                        const dictKeyString= entry[0];
                        const validationErrorString = error[0];
                        const dictErrorString = entry[1]
                        const errorText = validationErrorString.includes(dictKeyString) ? dictErrorString : validationErrorString;
                        handleClickVariant(errorText, 'error');
                    });
                });
            });
    };

    const determineText = () => ficToDoContext.selectedFic.uuid ? 'Update' : 'Save';

    const requiredFieldsEmpty = () => {
        const {
            ficName,
            ficPriority,
            ficCompletion,
            ficCategory,
            ficStatus,
        } = ficToDoContext.selectedFic;

        return [ficName, ficPriority, ficCategory, ficStatus, ficCompletion].some(val => !val);
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
                        <Button variant="contained" sx="background-color: #1b5e20;" onClick={handleSaveContent} disabled={ficToDoContext.editorDisabled || requiredFieldsEmpty()}>{determineText()}</Button>
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