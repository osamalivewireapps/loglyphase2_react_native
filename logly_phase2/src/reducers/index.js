/* eslint-disable prettier/prettier */
import users from './../reducers/users';

import { combineReducers } from 'redux';
import Loader from './Loader';

const allReducers = combineReducers({
    user: users,
    loader: Loader,

});

export default allReducers;