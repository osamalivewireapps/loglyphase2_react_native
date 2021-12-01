/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { GET_CONTACTS, GET_CONTACTS_DETAILS } from '../actions/ActionTypes';


const initialState = {
  contactsListing: {},
  contactDetail: {}
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_CONTACTS:
      return ({ ...state, contactsListing: actions.payload })

    case GET_CONTACTS_DETAILS:
      return ({ ...state, contactDetail: actions.payload })

    default:
      return state;
  }

};