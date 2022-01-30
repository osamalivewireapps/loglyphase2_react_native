/* eslint-disable prettier/prettier */
import { GET_GROUPS } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils'
import DataHandler from '../utils/DataHandler';
import Loader from '../components/Loader';
import { reject } from 'lodash';

const timeOut = 500;

export const getGroups = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log("config-->", config)

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/group`, config)
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: GET_GROUPS, payload: response.data.data });
                    resolve({ type: GET_GROUPS, payload: response.data.data });
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


export const addGroup = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/group`, dataToSubmit, config)
            .then(response => {

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    console.log('response-->', response.data.data);
                    resolve({ data: response.data.data });
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


export const editGroup = (id, dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', `${baseUrl}/group/${id}`);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .patch(`${baseUrl}/group/${id}`, dataToSubmit, config)
            .then(response => {

                console.log('response-edit-group-->', response);

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

export const deleteGroup = (id) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', id);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .delete(`${baseUrl}/group/${id}`, config)
            .then(response => {

                console.log('response-delete-group-->', response);

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


