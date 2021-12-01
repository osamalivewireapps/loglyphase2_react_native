/* eslint-disable prettier/prettier */
import users from './../reducers/users';
import animal from './animal';
import product from './product';
import contacts from './contacts'

import { combineReducers } from 'redux';
import Loader from './Loader';

const allReducers = combineReducers({
    user: users,
    loader: Loader,
    animal: animal,
    product: product,
    contacts: contacts

});

export default allReducers;