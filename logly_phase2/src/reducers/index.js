/* eslint-disable prettier/prettier */
import users from './../reducers/users';
import animal from './animal';
import product from './product'

import { combineReducers } from 'redux';
import Loader from './Loader';

const allReducers = combineReducers({
    user: users,
    loader: Loader,
    animal: animal,
    product: product

});

export default allReducers;