import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

const useShowSnackbar = () => {
    const [open, setOpen] = userState(false);
    const [toastMessage, setToastMessage] = useState({ title: '', description: '', status: 'success' });    
    const handleClose = () => {
        setOpen(false);
    };
    const showToast = (title, description, status) => {
        setToastMessage({ title, description, status });
        setOpen(true);
    };
    return(
    <>
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={`${toastMessage.title}: ${toastMessage.description}`}
            severity={toastMessage.status === 'success' ? 'success' : 'error'}
        />
        {showToast}
    </>);
};

export default useShowToast;
