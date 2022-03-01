/* eslint-disable prettier/prettier */
import { GET_NOTIFICATION_LISTING } from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../webconfig/globalConfig';
import { EnableLoader, DisableLoader } from './LoaderProgress';
import utils from '../utils';
import DataHandler from '../utils/DataHandler';

const timeOut = 500;

export const getNotifications = (type = 'breeder') => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/notification?type=${type}`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    console.log('response--->', response.data.data);
                    resolve({ type: GET_NOTIFICATION_LISTING, payload: response.data.data });
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

export const deleteNotifications = (id) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .delete(`${baseUrl}/notification/${id}`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    console.log('response--->', response.data.data);
                    utils.topAlertError(response.data.message);
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