/* eslint-disable prettier/prettier */
import users from './../reducers/users';
import animal from './animal';
import product from './product';
import contacts from './contacts';
import team_members from './team_members';
import group from './groups';
;


import { combineReducers } from 'redux';
import Loader from './Loader';
import groups from './groups';

const allReducers = combineReducers({
    user: users,
    loader: Loader,
    animal: animal,
    product: product,
    contacts: contacts,
    team_members: team_members,
    group:groups

});

export default allReducers;