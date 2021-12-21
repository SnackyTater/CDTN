import { useState } from 'react';

const User = () => {
    const [token, setToken] = useState('');

    return {token, setToken};
}

export default User;