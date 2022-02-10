/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { CUSTOMER_DETAILS, CUSTOMER_PURCHASE_HISTORY, SALE_DETAIL, PAYMENT_DETAILS } from '../actions/ActionTypes';


const initialState = {
  teamListing: {},
  saleDetail: {},
  payDetail: {},
  customerDetail: {},
  saleWithPurchaseHistory:{}
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case CUSTOMER_PURCHASE_HISTORY:
      return ({ ...state, saleWithPurchaseHistory: actions.payload })

    case SALE_DETAIL:
      return ({ ...state, saleDetail: actions.payload })

    case PAYMENT_DETAILS:
      return ({ ...state, payDetail: actions.payload })

    case CUSTOMER_DETAILS:
      return ({ ...state, customerDetail: actions.payload })

    default:
      return state;
  }

};