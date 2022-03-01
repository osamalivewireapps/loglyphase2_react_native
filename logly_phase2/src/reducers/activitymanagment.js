/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import { GET_ACTIVITY_LISTING, RESET_SCHEDULING_LISTING } from "../actions/ActionTypes";


const initialState = {
  activityListing: {},
  //groupDetail: {},
};

export default (state = initialState, actions) => {
  console.log("actions.payload-------->", actions)

  switch (actions.type) {
    case GET_ACTIVITY_LISTING:
      return ({ ...state, activityListing: actions })

    case RESET_SCHEDULING_LISTING:
      return ([]);
    default:
      return state;
  }

};