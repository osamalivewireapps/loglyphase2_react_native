/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import { GET_GROUPS } from "../actions/ActionTypes";


const initialState = {
  groupListing: {},
  groupDetail: {},
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_GROUPS:
      return ({ ...state, groupListing: actions.payload })

    // case GET_PRODUCTS_DETAILS:
    //   return ({ ...state, productDetail: actions.payload })

  
    default:
      return state;
  }

};