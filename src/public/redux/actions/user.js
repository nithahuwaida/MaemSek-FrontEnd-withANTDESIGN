import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export function login(data){
    return {
        type : 'POST_LOGIN',
        payload : axios.post(
            `http://localhost:8080/login`,
            data,
        )
    }
}

export function register(data){
    return {
        type : 'POST_REGISTER',
        payload : axios.post(
            `http://localhost:8080/register`,
            data,
        )
    }
}

export function getUserById(id){
    const jwt = getJwt();
    return{
        type : 'GET_USER',
        payload : axios.get(
            `http://localhost:8080/users/${id}`,
            { headers: {"Authorization" : jwt} }
        )
    }
}