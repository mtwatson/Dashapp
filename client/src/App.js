import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ToDo from './components/todo/ToDo';
import { Container } from '@mui/system';
import FicToDoContext from './contexts/FicToDoContext';
import Button from '@mui/material/Button';
import { SnackbarProvider} from 'notistack';

function App() {
    const [ficToDoContext, setFicToDoContext] = useState({
        fics: [],
        editorDisabled: true,
        selectedFic: {}
    });
    const [snackPack, setSnackPack] = useState([]);
    
    const className='app-root';
    return (
        <SnackbarProvider maxSnack={6}>
            <FicToDoContext.Provider value={[ficToDoContext, setFicToDoContext]}>
                <Container className={className}>
                    <ToDo></ToDo>
                </Container>
            </FicToDoContext.Provider>
        </SnackbarProvider>
    ) 
}

export default App;
