import {axios} from 'axios';
import { useState, useEffect } from 'react';

export const PostFetch = (url, input) => {
    const [data, setData ] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.post(url, input)
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

export const GetFetch = (url) => {
    const [data, setData ] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url)
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


