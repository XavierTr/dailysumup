import axios from 'axios';
import Cookies from 'js-cookie';

const serverAPI = axios.create({
    baseURL: '/'
});

const getAxiosAuthHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${Cookies.get('jwt-token')}`
        }
    };
}

const storeToken = (token) => {
    Cookies.set('jwt-token', token);
}

const removeToken = () => {
    Cookies.remove('jwt-token');
}

const isUserLogged = () => {
    return (typeof Cookies.get('jwt-token') !== 'undefined') ? true : false;
}
export { serverAPI, storeToken, removeToken, getAxiosAuthHeader, isUserLogged };