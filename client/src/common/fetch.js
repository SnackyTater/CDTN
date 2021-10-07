import { useState, useEffect } from 'react';
import axios from "axios";

const Get = (url, config) => {
    const [data, setData ] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url, config)
            .then((res) => {
                if(!res.ok) throw Error(res.message);
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
            }).catch((err) => {
                setError(err);
                setIsPending(false);
            })
    }, [url])

    return {data, isPending, error}
}

export default Get;


