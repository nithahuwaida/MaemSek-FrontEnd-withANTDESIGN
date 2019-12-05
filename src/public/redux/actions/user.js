import axios from 'axios';

export function login(data){
    return {
        type : 'POST_LOGIN',
        payload : axios.post(
            'http://localhost:8080/login',
            data,
        )
    }
}

export function register(data){
    return {
        type : 'POST_REGISTER',
        payload : axios.post(
            'http://localhost:8080/register',
            data,
        )
    }
}