/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { GET_ANIMALS } from '../actions/ActionTypes';


const initialState = {
  animalListing: {},
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_ANIMALS:
      return ({ ...state, animalListing: actions.payload })

    default:
      return state;
  }

};