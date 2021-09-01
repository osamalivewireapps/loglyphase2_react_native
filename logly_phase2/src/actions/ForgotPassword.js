/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { USERSIGNUP, GET_STATES, GET_CITIES, GET_SUBS, VERIFY_CODE } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils';

const timeOut = 500;


export const userForgotPassword = (data1) => dispatch => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/forgetpassword`,
            {
                email: data1,
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

export const userVerifyForgotCode = (data1) => dispatch => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/verifyByCodePassword`,
            {
                code: data1.pinCode,
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

export const userPasswordResetCode = (data1) => dispatch => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());

        axios.post(`${baseUrl}/user/resetForgetPasswordByCode`,
            {
                code: data1.pinCode,
                password:data1.password,
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