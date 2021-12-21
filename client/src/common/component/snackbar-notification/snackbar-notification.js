import React, {useState, useEffect} from 'react';

import { Snackbar, Alert } from '@mui/material';

const CustomAlert = React.forwardRef(function CustomAlert(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SnackbarNotification({message, severity}) {
    const [isOpen, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({type: 'success', content: null})

    useEffect(() => {
        if(message && severity){
            setSnackbar({type: severity, content: message})
            setOpen(true)
        }
    }, [message, severity])

    const snackbarCloseHandler = (e) => {
        setOpen(false);
        setSnackbar({type: 'success', content: null});
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={snackbarCloseHandler}>
            <CustomAlert severity={snackbar.type} sx={{ width: '100%' }}>
                {snackbar.content}
            </CustomAlert>
        </Snackbar>
    )
}
