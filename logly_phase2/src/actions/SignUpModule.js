/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { USERSIGNUP, GET_STATES, GET_CITIES, GET_SUBS, VERIFY_CODE } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils';

const timeOut = 500;
export const userSignUpRequest = (data1) => (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/breeder/register`,
            {
                city: data1.city,
                email: data1.email,
                name: data1.name,
                packageId: data1.packageId,
                packageType: data1.packageType,
                password: data1.password,
                phone: data1.phoneNo,
                state: data1.state,
                businessName: data1.businessName ? data1.businessName : "",
                noOfEmployees: data1.noOfEmployees ? data1.noOfEmployees : "",
                website: data1.website ? data1.website : "",
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: USERSIGNUP, payload: response.data.data });
                    resolve({ type: USERSIGNUP, payload: response.data.data })
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);

                }

            })
            .catch(error => {

                console.log("response error-->", error.message);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
}



export const userVerifyCode = (verifyCode) => dispatch => {

    console.log('url-->', `${baseUrl}/user/verify/` + verifyCode);
    dispatch(EnableLoader());
    return new Promise(() => {
        axios.
            get(`${baseUrl}/user/verify/` + verifyCode)
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: VERIFY_CODE, payload: response.data.message });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {

                console.log("response error123-->", error.message);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            })
    });
};


export const getStateRequest = () => dispatch => {

    dispatch(EnableLoader());
    return new Promise(() => {
        axios.
            get(`${baseUrl}/state/all`)
            .then(response => {
                dispatch(DisableLoader());

                console.log("response-->", response);

                if (response.data.status === 200) {
                    dispatch({ type: GET_STATES, payload: response.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            })
    });
};

export const getCityRequest = (stateId) => dispatch => {

    console.log('url-->', `${baseUrl}/city/all?stateId=` + stateId);
    dispatch(EnableLoader());
    return new Promise((resolve) => {
        axios.
            get(`${baseUrl}/city/all?stateId=` + stateId)
            .then(response => {

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: GET_CITIES, payload: response.data });
                    resolve({ type: GET_CITIES, payload: response.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            })
    });
};

export const getSubscriptionRequest = () => dispatch => {

    dispatch(EnableLoader());
    return new Promise((resolve) => {
        axios.
            get(`${baseUrl}/subscription`)
            .then(response => {
                dispatch(DisableLoader());

                console.log("response-->", response);

                if (response.data.status === 200) {
                    dispatch({ type: GET_SUBS, payload: response.data });
                    resolve({ type: GET_SUBS, payload: response.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};



