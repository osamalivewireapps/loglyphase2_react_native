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
        dispatch(EnableLoader()); 
        axios
            .get(`${baseUrl}/search/fai?type=${keyword}`, config)
            .then(response => {

                console.log('response globalSearch-->', response);

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