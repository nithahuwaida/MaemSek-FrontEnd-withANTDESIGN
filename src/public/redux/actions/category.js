import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getCategory = () => {
    const jwt = getJwt();
    return {
        type: 'GET_CATEGORY',
        payload: axios.get (
            `${process.env.REACT_APP_BASE_URL}/categories`, 
            {headers: {'Authorization': jwt}}
        ),
    };
};
export function postCategory(data){
    const jwt = getJwt();
    return {
        type: 'POST_CATEGORY',
        payload: axios.post (
            `${process.env.REACT_APP_BASE_URL}/categories`,data,
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function putCategory(data){
    const jwt = getJwt();
    return {
        type: 'PUT_CATEGORY',
        payload: axios.put (
            `${process.env.REACT_APP_BASE_URL}/categories/${data.id}`,
            {
                id_category : data.id,
                name_category : data.name_category,
            },
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function deleteCategory(id){
    const jwt = getJwt();
    return {
        type: 'DELETE_CATEGORY',
        payload: axios.delete (
            `${process.env.REACT_APP_BASE_URL}/categories/${id}`,
            { headers: {"Authorization" : jwt} },
        ),
    };
};