import axios from 'axios';
import { getJwt } from '../../../components/helpers/Helpers';

export const getInformation = () => {
    const jwt = getJwt();
    return {
        type: 'GET_INFO',
        payload: axios.get (
            'http://localhost:8080/informations', 
            {headers: {'Authorization': jwt}}
        ),
    };
};