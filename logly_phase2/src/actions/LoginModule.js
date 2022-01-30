/* eslint-disable prettier/prettier */
import { USERLOGIN } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from './../utils'
import DataHandler from '../utils/DataHandler';

const timeOut = 500;
export const userLoginRequest = (data1) =>  (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());
        axios.post(`${baseUrl}/user/login`,
            {
                email: data1.email,
                password: data1.password,
                role: "breeder"
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: USERLOGIN, payload: response.data.data });
                    resolve({ status: response.data.status, accountType: response.data.data.user.packageType ? response.data.data.user.packageType : response.data.data.subscriber.subscriptionId.packageType, loginResponse: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                    if (response.data.message.startsWith("Email"))
                        resolve({ status: response.data.status, userData: response.data.message, message: response.data.message });
                    else
                        resolve({ status: response.data.status, userData: response.data.data, message: response.data.message });

                }

            })
            .catch(error => {

                console.log("response error-->", error);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
}

export const updateUser = (data1) => async(dispatch) => {

    console.log("fields-->", data1);

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    return new Promise((resolve) => {

        dispatch(EnableLoader());
        axios.put(`${baseUrl}/user`,
            data1,config
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    //dispatch({ type: USERLOGIN, payload: response.data.data });
                    resolve({ status: response.data.status, payload: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);

                }

            })
            .catch(error => {

                console.log("response error-->", error);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
}

export const getUser = () => async (dispatch) => {

  
    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    return new Promise((resolve) => {

        //dispatch(EnableLoader());
        axios.get(`${baseUrl}/user`,
            config
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve({ status: response.data.status, payload: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);

                }

            })
            .catch(error => {

                console.log("response error-->", error);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
}

export const uploadUserImage = (dataToSubmit) => async (dispatch) => {

    console.log("upload user images images--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/user/image/upload`, dataToSubmit, config)
            .then(response => {

                console.log('upload images1234--->', response);

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

                console.log('response error-->', error.message);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};

export const uploadUserGallery = (dataToSubmit) => async (dispatch) => {

    console.log("upload videos--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/user/gallery/upload`, dataToSubmit, config)
            .then(response => {

                console.log('upload images1234--->', response);

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

                console.log('response error-->', error.message);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};

export const DeleteImage = (dataToSubmit) => async (dispatch) => {

    console.log("delete images--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/user/gallery/delete`, dataToSubmit, config)
            .then(response => {

                console.log('upload images--->', response);

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

                console.log('response error-->', error.message);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};