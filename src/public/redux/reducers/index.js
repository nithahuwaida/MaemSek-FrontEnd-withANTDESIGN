import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import category from './category';
import order from './order';
import info from './information';

const appReducer = combineReducers({
    user,product,category,order, info
});

export default appReducer;