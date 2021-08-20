/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { USERLOGIN, USERSIGNUP, GET_STATES, GET_CITIES, GET_SUBS, VERIFY_CODE } from './../actions/ActionTypes';

// USERSIGNUP, USERUPDATE, SOCIAL_LOGIN, EDIT_PRO_PIC, ADDLOCATION, SAVE_PROFILE } 

const initialState = {
  isFetchingData: false,
  userData: {},
  signUpData: {},
  updateData: {},
  socialData: {},
  editData: {},
  changeLocData: {},
  saveProfile: {},
  stateData: {},
  cityData: {},
  subsData: {},
  verifyData: {}
};

export default (state = initialState, actions) => {
  console.log("actions.type", actions.type)

  switch (actions.type) {
    case USERLOGIN:
      return ({ ...state, userData: actions })

    // case EDIT_PRO_PIC:
    //   return ({ ...state, editData: actions })

    // case SAVE_PROFILE:
    //   return ({ saveProfile: actions })

    case USERSIGNUP:
      return ({ ...state, signUpData: actions })

    case GET_STATES:
      return ({ ...state, stateData: actions })

    case GET_CITIES:
      return ({ ...state, cityData: actions })

    case GET_SUBS:
      return ({ ...state, subsData: actions })

    case VERIFY_CODE:
      return ({ ...state, verifyData: actions })

    // case SOCIAL_LOGIN:
    //   return ({ ...state, socialData: actions })

    // case ADDLOCATION:
    //   return ({ ...state, changeLocData: actions })


    default:
      return state;
  }

};