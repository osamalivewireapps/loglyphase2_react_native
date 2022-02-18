/* eslint-disable prettier/prettier */
import axios from 'axios';
import { baseUrl } from '../webconfig/globalConfig';
import { EnableLoader, DisableLoader } from './LoaderProgress';
import utils from '../utils';
import DataHandler from '../utils/DataHandler';

const timeOut = 500;

export const globalSearch = (keyword) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config isShowloader-->', keyword);

    return new Promise((resolve) => {
        //dispatch(EnableLoader()); 
        axios
            .get(`${baseUrl}/search/${keyword}?type=all`, config)
            .then(response => {

                console.log('response globalSearch-->', response);

                //dispatch(DisableLoader()); 

                if (response.data.status === 200) {
                    resolve({ payload: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {

                console.log('response error-->', error.message);

                //dispatch(DisableLoader()); 

                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};

export const getRecentResearch = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config isShowloader-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/recent`, config)
            .then(response => {

                console.log('response recent Search-->', response);

                dispatch(DisableLoader());

                if (response.data.status === 200) {
                    resolve({ payload: response.data.data });
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

export const addRecentResearch = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/recent`, dataToSubmit, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    //resolve({ payload: response.data.data });
                }
                else {
                    setTimeout(() => {
                        //utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {

                console.log('response error-->', error.message);
                dispatch(DisableLoader());
                setTimeout(() => {
                   // utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};

export const deleteRecentResearch = (id) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .delete(`${baseUrl}/recent/${id}`, config)
            .then(response => {

                console.log('response-->', response);

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