import { createContext, useState } from 'react';

export const PopupContext = createContext(null);

export const PopupContextStore = () => {
    const [isOpen, setOpen] = useState(false);
    const [content, setContent] = useState(null);

    const store = {
        isOpen, setOpen, content, setContent 
    };

    return store;
}
