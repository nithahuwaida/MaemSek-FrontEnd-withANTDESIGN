import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export function login(data){
    return {
        type : 'POST_LOGIN',
        payload : axios.post(
            `${process.env.REACT_APP_BASE_URL}/login`,
            data,
        )
    }
}

export function register(data){
    return {
        type : 'POST_REGISTER',
        payload : axios.post(
            `${process.env.REACT_APP_BASE_URL}/register`,
            data,
        )
    }
}

export function getUserById(id){
    const jwt = getJwt();
    return{
        type : 'GET_USER',
        payload : axios.get(
            `${process.env.REACT_APP_BASE_URL}/users/${id}`,
            { headers: {"Authorization" : jwt} }
        )
    }
}

export function putUserById(data){
    const jwt = getJwt();
    return{
        type : 'PUT_USER',
        payload : axios.put(
            `${process.env.REACT_APP_BASE_URL}/users/${data.id}`,
            {
                id : data.id,
                fullname : data.fullname,
                username : data.username,
                email : data.email,
            },
            { headers: {"Authorization" : jwt} }
        )
    }
}