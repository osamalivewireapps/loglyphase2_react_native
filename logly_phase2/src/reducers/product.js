/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { GET_PRODUCTS,GET_PRODUCTS_DETAILS } from '../actions/ActionTypes';


const initialState = {
  productListing: {},
  productDetail: {},
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_PRODUCTS:
      return ({ ...state, productListing: actions.payload })

    case GET_PRODUCTS_DETAILS:
      return ({ ...state, productDetail: actions.payload })

  
    default:
      return state;
  }

};