import myAxios from 'axios';
import { getToken } from './localstroage';

export const BASE_URL = "http://localhost:4000"; //http://localhost:8888

export const exportAxios = myAxios.create({
    baseURL: BASE_URL
});


export const privateAxios = myAxios.create({
    baseURL: BASE_URL
})

privateAxios.interceptors.request.use(config => {

    const token = getToken();

    if (token) {
        //console.log('enter if token');
        config.headers['Authorization'] = `Bearer ${token}`;
        //console.log(config);
    }
    return config;
}, (error) => Promise.reject(error))