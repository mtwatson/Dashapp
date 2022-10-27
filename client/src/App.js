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

    const [snackPack, setSnackPack] = useState([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClick = (message) => () => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
    };
    
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
    };
    
    const handleExited = () => {
    setMessageInfo(undefined);
    };
    
    const className='app-root';
    return (
        <FicToDoContext.Provider value={[ficToDoContext, setFicToDoContext]}>
            <Container className={className}>
                <ToDo></ToDo>
                <Snackbar
                    key={messageInfo ? messageInfo.key : undefined}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    TransitionProps={{ onExited: handleExited }}
                    message={messageInfo ? messageInfo.message : undefined}
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                        UNDO
                        </Button>
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                        >
                        <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </Container>
        </FicToDoContext.Provider>
    ) 
}

export default App;
