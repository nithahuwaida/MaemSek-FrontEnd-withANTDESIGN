import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getInformation = () => {
    const jwt = getJwt();
    return {
        type: 'GET_INFO',
        payload: axios.get (
            `${process.env.REACT_APP_BASE_URL}/informations`, 
            {headers: {'Authorization': jwt}}
        ),
    };
};