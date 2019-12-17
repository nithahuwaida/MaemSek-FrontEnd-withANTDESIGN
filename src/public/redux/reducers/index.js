import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import category from './category';

const appReducer = combineReducers({
    user,product,category
});

export default appReducer;