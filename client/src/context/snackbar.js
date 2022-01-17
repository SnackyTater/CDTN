import { createContext, useState } from 'react';

export const SnackbarContext = createContext(null);

export const SnackbarContextStore = () => {
    const [isOpen, setOpen] = useState(false);
    const [severity, setSeverity] = useState('info');
    const [message, setMessage] = useState('');

    const store = {
        isOpen, setOpen, severity, setSeverity, message, setMessage
    };

    return store;
}
