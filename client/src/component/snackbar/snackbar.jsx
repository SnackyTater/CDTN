import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomAlert = React.forwardRef(function CustomAlert(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarNotification({isOpen, closeSnackbar, message, severity}) {
    return (
        <Snackbar 
            open={isOpen} 
            autoHideDuration={6000} 
            onClose={closeSnackbar}
        >
            <CustomAlert 
                severity={severity} 
                sx={{ width: '100%' }}
            >
                {message}
            </CustomAlert>
        </Snackbar>
    )
}