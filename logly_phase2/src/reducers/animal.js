/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { GET_ANIMALS, GET_ANIMALS_DETAILS, GET_ANIMALS_CATEGORIES } from '../actions/ActionTypes';


const initialState = {
  animalListing: {},
  animalDetail: {},
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case GET_ANIMALS:
      return ({ ...state, animalListing: actions.payload })

    case GET_ANIMALS_DETAILS:
      return ({ ...state, animalDetail: actions.payload })

  
    default:
      return state;
  }

};