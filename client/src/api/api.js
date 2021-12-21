import axios from 'axios';

const host = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : 'https://cosmitto.herokuapp.com'; 

const config = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}

export const fetcher = {
    get: async({url, token}) => {
        try{
            const {data} = await axios.get(`${host}/${url}`, config(token || ''));
            return data;
        } catch(error) {
            throw error;
        }
    },
    post: async({url, token, body}) => {
        try{
            const {data} = await axios.post(`${host}/${url}`, body, config(token || ''));
            return data;
        } catch(error) {
            return new Error(error.message);
        }
    },
    put: async({url, token, body}) => {
        try{

        } catch(error) {
            return new Error(error.message);
        }
        const {data} = await axios.put(`${host}/${url}`, body, config(token || ''));
        return data;
    },
    delete: async({url, token}) => {
        try{

        } catch(error) {
            return new Error(error.message);
        }
        const {data} = await axios.delete(`${host}/${url}`, config(token || ''));
        return data;
    }
}