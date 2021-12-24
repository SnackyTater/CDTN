import axios from 'axios';

const host = (process.env.NODE_ENV === 'development') ? 'http://localhost:5000' : 'https://cosmitto.herokuapp.com'; 

const config = ({token, type}) => {
    return {
        headers: {
            'Authorization': `Bearer ${token || ''}`,
            'Accept': type || '*/*'
        }
    }
}

export const fetcher = {
    get: async({url, token, type}) => {
        try{
            const {data} = await axios.get(`${host}/${url}`, config({token, type}));
            return data;
        } catch(error) {
            throw new Error(error.message);
        }
    },
    post: async({url, token, type, body}) => {
        try{
            const {data} = await axios.post(`${host}/${url}`, body, config({token, type}));
            return data;
        } catch(error) {
            throw new Error(error?.response?.data);
        }
    },
    put: async({url, token, type, body}) => {
        try{
            const {data} = await axios.put(`${host}/${url}`, body, config({token, type}));
            return data;
        } catch(error) {
            throw new Error(error.message);
        } 
    },
    delete: async({url, token, type}) => {
        try{
            const {data} = await axios.delete(`${host}/${url}`, config({token, type}));
            return data;
        } catch(error) {
            throw new Error(error.message);
        }
    }
}