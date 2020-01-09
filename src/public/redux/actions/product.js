import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getProduct = () => {
    const jwt = getJwt();
    return {
        type: 'GET_PRODUCT',
        payload: axios.get (
            `${process.env.REACT_APP_BASE_URL}/products`, 
            {headers: {'Authorization': jwt}}
        ),
    };
};
export function postProduct(data){
    const jwt = getJwt();
    return {
        type: 'POST_PRODUCT',
        payload: axios.post (
            `${process.env.REACT_APP_BASE_URL}/products`,data,
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function putProduct(data){
    const jwt = getJwt();
    return {
        type: 'PUT_PRODUCT',
        payload: axios.put (
            `${process.env.REACT_APP_BASE_URL}/products/${data.id}`,
            {
                id : data.id,
                name_product : data.name_product,
                desc_product : data.desc_product,
                image_product : data.image_product,
                id_category : parseInt(data.id_category),
                price_product : data.price_product,
                quantity_product : data.quantity_product,
            },
            { headers: {"Authorization" : jwt}},
        ),
    };
};
export function deleteProduct(id){
    const jwt = getJwt();
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete (
            `${process.env.REACT_APP_BASE_URL}/products/${id}`,
            { headers: {"Authorization" : jwt} },
        ),
    };
};