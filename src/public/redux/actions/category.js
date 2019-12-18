import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getCategory = () => {
    const jwt = getJwt();
    return {
        type: 'GET_CATEGORY',
        payload: axios.get (
            'http://localhost:8080/categories', 
            {headers: {'Authorization': jwt}}
        ),
    };
};
export function postCategory(data){
    const jwt = getJwt();
    return {
        type: 'POST_CATEGORY',
        payload: axios.post (
            'http://localhost:8080/categories',data,
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function putCategory(data){
    const jwt = getJwt();
    return {
        type: 'PUT_CATEGORY',
        payload: axios.put (
            `http://localhost:8080/categories/${data.id_product}`,
            {
                id_category : data.id,
                name_category : data.name_category,
            },
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function deleteCategory(id){
    console.log('id', id)
    const jwt = getJwt();
    return {
        type: 'DELETE_CATEGORY',
        payload: axios.delete (
            `http://localhost:8080/categories/${id}`,
            { headers: {"Authorization" : jwt} },
        ),
    };
};