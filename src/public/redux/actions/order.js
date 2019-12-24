import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getProductInOrder = () => {
    const jwt = getJwt();
    return {
      type: "GET_PRODUCT_IN_ORDER",
      payload: axios.get(
        'http://localhost:8080/products', 
        {headers: {'Authorization': jwt}}
    )}
};
export const addItemInOrder = product => {
    return { 
        type: "ADD_ITEM_IN_ORDER", 
        product 
    };
};
  
// export const removeItemInOrder = id => {
//     return { 
//         type: "REMOVE_ITEM_IN_ORDER", 
//         id 
//     };
// };  
export const removeItemInOrder = product => {
    return { 
        type: "REMOVE_ITEM_IN_ORDER", 
        product 
    };
};

export const quantityChange = product => {
    return { 
        type: "QUANTITY_CHANGE_IN_ORDER", 
        product 
    };
};
