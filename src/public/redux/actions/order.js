import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getProductInOrder = () => {
    const jwt = getJwt();
    return {
      type: "GET_PRODUCT_IN_ORDER",
      payload: axios.get(
        `${process.env.REACT_APP_BASE_URL}/products`, 
        {headers: {'Authorization': jwt}}
    )}
};

export const addItemInOrder = product => {
    return { 
        type: "ADD_ITEM_IN_ORDER", 
        product 
    };
};
 
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

export const checkoutOrder = (order) => {
    const jwt = getJwt();
    console.log('order',order)
    return {
        type: "CHECKOUT_IN_ORDER",
        payload: axios.post(
            `${process.env.REACT_APP_BASE_URL}/transactions`, 
            order,
            {headers: {'Authorization': jwt}}
        )
    }
};

export const getRecentOrder = () => {
    const jwt = getJwt();
    return {
        type: "GET_RECENT_ORDER",
        payload: axios.get(
            `${process.env.REACT_APP_BASE_URL}/transactions`,
            {headers: {'Authorization': jwt}}
        )
    };
};
