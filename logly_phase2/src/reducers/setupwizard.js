/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import { GET_FORMS } from "../actions/ActionTypes";


const initialState = {
  wizardListing: {},
  //groupDetail: {},
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_FORMS:
      return ({ ...state, groupListing: actions.payload })

    // case GET_PRODUCTS_DETAILS:
    //   return ({ ...state, productDetail: actions.payload })

  
    default:
      return state;
  }

};