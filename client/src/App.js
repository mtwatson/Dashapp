import './App.css';
import * as React from 'react';
import { useState } from 'react';
import ToDo from './components/todo/ToDo';
import { Container } from '@mui/system';
import FicToDoContext from './contexts/FicToDoContext';
import {v4 as uuidv4 } from 'uuid';

function App() {
    const [ficToDoContext, setFicToDoContext] = useState({
        uuid:  uuidv4(),
        ficName: 'example',
        ficPriority: '1',
        ficCompletion: '1',
        ficCategory: 'example cat',
        ficStatus: 'Rewrite in Progress',
        ficDetails: '<p>blahblah</p>',
        ficColor: 'ffffff',
        fics: [],
        selectedFic: ''
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
