/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { GET_TEAM_MEMBERS, MEMBER_DETAILS } from '../actions/ActionTypes';


const initialState = {
  teamListing: {},
  memberDetail: {}
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_TEAM_MEMBERS:
      return ({ ...state, contactsListing: actions.payload })

    case MEMBER_DETAILS:
      return ({ ...state, memberDetail: actions.payload })

    default:
      return state;
  }

};