import React from 'react';
import { useContext } from 'react';
import TinyMCE from '../utils/TinyMCE';
import { MenuItem, Box, TextField, Select, InputLabel } from '@mui/material';
import FicToDoContext from '../../contexts/FicToDoContext';
import Grid from '@mui/material/Unstable_Grid2';
import './toDo.css'

const ToDoDetails = (props) => {
    const [ficToDoContext, setFicToDoContext] = useContext(FicToDoContext);
    const dropdownStyles = {
        marginLeft: '10px'
    };
    const updateFic = (id, event) => {
        const {value} = event.target;
        setFicToDoContext((prevState) => {
            return ({
                ...prevState,
                [id] : value
            });
        });
    };

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
            <Grid xs={6} md={6}>
                <div className="fic-field">
                    <InputLabel id="fic-name-label">Name</InputLabel>
                    <TextField
                        id="fic-name"
                        labelId="fic-name-label"
                        value={ficToDoContext.ficName}
                        onChange={(e)=>{updateFic('ficName', e)}}
                    />
                </div>
                <div className="fic-field">
                    <InputLabel id="fic-priority-label">Priority</InputLabel>
                    <TextField 
                        id="fic-priority"
                        labelId="fic-priority-label"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={ficToDoContext.ficPriority}
                        onChange={(e)=>{updateFic('ficPriority', e)}}
                    />
                </div>
                <div className="fic-field">
                    <InputLabel id="fic-completion-label">Completion</InputLabel>
                    <TextField 
                        id="fic-completion"
                        labelId="fic-completion-label"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        value={ficToDoContext.ficCompletion}
                        onChange={(e)=>{updateFic('ficCompletion', e)}}
                    />
                </div>
            </Grid>
            <Grid xs={6} md={6}>
                <div className="fic-field">
                    <InputLabel id="fic-category-label">Category</InputLabel>
                    <TextField
                        id="fic-category"
                        labelId="fic-category-label"
                        value={ficToDoContext.ficCategory}
                        onChange={(e)=>{updateFic('ficCategory', e)}}
                    />
                </div>
                <div className="fic-field">
                    <InputLabel id="fic-color-label">Color</InputLabel>
                    <TextField
                        id="fic-color"
                        labelId="fic-color-label"
                        label="Error"
                        value={ficToDoContext.ficColor}
                        onChange={(e)=>{updateFic('ficColor', e)}}
                    />
                </div>
                <div className="fic-field">
                    <InputLabel id="fic-status-label">Status</InputLabel>
                    <Select
                        labelId="fic-status-label"
                        id="fic-status"
                        sx={dropdownStyles}
                        label="Age"
                        value={ficToDoContext.ficStatus}
                        onChange={(e)=>{updateFic('ficStatus', e)}}
                    >
                        <MenuItem value={'Rewrite in progress'}>Rewrite in progress</MenuItem>
                        <MenuItem value={'Complete'}>Complete</MenuItem>
                        <MenuItem value={'In progress'}>In progress</MenuItem>
                    </Select>
                </div>
            </Grid>
            <Grid xs={12} md={12}>
                <div className="tinymce-holder">
                    <TinyMCE id="fic-details"/>
                </div>
            </Grid>
        </Grid>
    )
}
  
export default ToDoDetails
