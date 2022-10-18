import './App.css';
import * as React from 'react';
import { useState } from 'react';
import ToDo from './components/todo/ToDo';
import { Container } from '@mui/system';
import FicToDoContext from './contexts/FicToDoContext';

function App() {
    const [ficToDoContext, setFicToDoContext] = useState({
        fics: [],
        editorDisabled: true,
        selectedFic: {}
    });
    
    const className='app-root';
    return (
        <FicToDoContext.Provider value={[ficToDoContext, setFicToDoContext]}>
            <Container className={className}>
                <ToDo></ToDo>
            </Container>
        </FicToDoContext.Provider>
    ) 
}

export default App;
