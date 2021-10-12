import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Fetcher() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const Get = (url, config) => {
        useEffect(() => {
            setIsLoading(true)
            axios.get(url, config)
                .then((res) => {
                    setData(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.response.data);
                    setIsLoading(false);
                })
        }, [url])
    }

    const Post = (url, data, config) => {
        setIsLoading(true);
        axios.post(url, data, config)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.response.data);
                setIsLoading(false);
            })
    }

    return {data, isLoading, error, Get, Post}
}