import { combineReducers } from 'redux';
import user from './user';
import product from './product';

const appReducer = combineReducers({
    user,product
});

export default appReducer;