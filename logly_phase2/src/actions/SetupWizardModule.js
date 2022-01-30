/* eslint-disable prettier/prettier */
import { GET_FORMS } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils'
import DataHandler from '../utils/DataHandler';

const timeOut = 500;

export const getSetupWizardForm = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log("config-->", config)

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/form/all/forms`, config)
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: GET_FORMS, payload: response.data.data });
                    resolve({ type: GET_FORMS, payload: response.data.data });
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

export const getBusDetails = (id) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log("config-->", config)

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/businessDetails/${id}`, config)
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    //dispatch({ type: GET_FORMS, payload: response.data.data });
                    resolve({ payload: response.data.data });
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


export const postSetupWizard = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/user/v2/setupwizard`, dataToSubmit, config)
            .then(response => {

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    console.log('response-->', response);
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

export const uploadSetupWizardImages = (dataToSubmit) => async (dispatch) => {

    console.log("upload images--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/user/v2/image/upload`, dataToSubmit, config)
            .then(response => {

                console.log('upload images--->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve(response.data.data.imageUrl);
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



