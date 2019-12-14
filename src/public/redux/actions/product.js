import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getProduct = () => {
    const jwt = getJwt();
    return {
        type: 'GET_PRODUCT',
        payload: axios.get (
            'http://localhost:8080/products', 
            {headers: {'Authorization': jwt}}
        ),
    };
};
export function postProduct(data){
    const jwt = getJwt();
    return {
        type: 'POST_PRODUCT',
        payload: axios.post (
            'http://localhost:8080/products',data,
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function putProduct(data){
    const jwt = getJwt();
    return {
        type: 'PUT_PRODUCT',
        payload: axios.put (
            `http://localhost:8080/products/${data.id_product}`,
            {
                id_product : data.id,
                name_product : data.name_product,
                desc_product : data.desc_product,
                image_product : data.image_product,
                id_category : data.id_category,
                price_product : data.price_product,
                quantity_product : parseInt(data.quantity_product),
            },
            { headers: {"Authorization" : jwt} },
        ),
    };
};
export function deleteProduct(id){
    const jwt = getJwt();
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete (
            `http://localhost:8080/products/${id}`,
            { headers: {"Authorization" : jwt} },
        ),
    };
};