/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { USERSIGNUP, GET_STATES, GET_CITIES, GET_SUBS, VERIFY_CODE } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils';
import { Platform } from 'react-native';

const timeOut = 500;
export const userSignUpRequest = (data1) => (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        let userSignUpData = {
            zipcode: data1.zipcode,
            city: data1.city,
            email: data1.email,
            name: data1.name,
            packageId: data1.packageId,
            packageType: data1.packageType,
            password: data1.password,
            phone: data1.phone,
            state: data1.state,
            businessName: data1.businessName ? data1.businessName : "",
            noOfEmployees: data1.noOfEmployees ? data1.noOfEmployees : "",
            website: data1.website ? data1.website : "",
            mobile: true,
        }

        const formData = new FormData();
        
        if (data1.image){
            formData.append('files', {
                uri: Platform.OS === 'android' ? data1.image : data1.image,
                type: 'image/*',
                name: `${Date.now()}.jpg`
            });
        }
        for (const key in userSignUpData) {
            formData.append(key,userSignUpData[key]);
        }

        console.log("formdata-->", formData);

        axios.post(`${baseUrl}/user/breeder/register`,
            
               formData
            
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

export const registerPackage = (data1) => (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());
        axios.post(`${baseUrl}/user/breeder/registerPackage`,
            {
                //for register same above endpoint and then subscribe to package
                //top 4 fields are compulsory

                userId: data1._id,
                packageType: data1.packageType,
                packageId: data1.packageId,
                type: data1.type.toLowerCase(),
                productId: "",
                transactionId: "",
                transactionDate: "",
                transactionReceipt: ""
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    //dispatch({ type: USERSIGNUP, payload: response.data.data });
                    resolve(true)
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


export const emailCheckRequest = (data1) => (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/emailCheck`,
            {
                email: data1.email,
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve(true)
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



export const userVerifyCode = (data1) => dispatch => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/verifyByCode`,
            {
                code: data1,
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve(true);
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
};

export const resendVerifyCode = (data1) => dispatch => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/resendCodeVerification`,
            {
                email: data1,
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                    resolve(true)
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
            get(`${baseUrl}/subscription/minimum`)
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

export const getPackagesByType = (type) => dispatch => {

    dispatch(EnableLoader());
    return new Promise((resolve) => {
        axios.
            get(`${baseUrl}/subscription/packageByType/` + type)
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

