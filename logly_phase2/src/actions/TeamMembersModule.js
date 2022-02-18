/* eslint-disable prettier/prettier */
import { GET_TEAM_MEMBERS,MEMBER_DETAILS } from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../webconfig/globalConfig';
import { EnableLoader, DisableLoader } from './LoaderProgress';
import utils from '../utils';
import DataHandler from '../utils/DataHandler';

const timeOut = 500;

export const getTeamMembers = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/user/breeder/employees`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    let tmp = [];
                    console.log('response--->', response.data.data);

                    dispatch({ type: GET_TEAM_MEMBERS, payload: response.data.data });
                    resolve({ type: GET_TEAM_MEMBERS, payload: response.data.data });
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

export const getMemberDetails = (id) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/user/employee/${id}`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: MEMBER_DETAILS, payload: response.data.data });
                    resolve({ type: MEMBER_DETAILS, payload: response.data.data });
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

export const addMemberDetails = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('add member details dataToSubmit-->', dataToSubmit);
    console.log('url---->', `${baseUrl}/user/employee/register`);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/user/employee/register`, dataToSubmit, config)
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

export const addBreeder = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('add member details dataToSubmit-->', dataToSubmit);
    console.log('url---->', `${baseUrl}/user/breeder/register`);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/user/breeder/register`, dataToSubmit, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve(response.data.data);
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

export const editMemberDetails = (id, dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);
    console.log("dataToSubmit--->", dataToSubmit + "--id--", id)

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/user/employee/${id}`, dataToSubmit, config)
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

export const removeMember = (id) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', id);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .delete(`${baseUrl}/user/employee/${id}`, config)
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

export const getTeamMembersByEmail = (keyword) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log("config-->", config)

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/user/v2/userDetail?email=${keyword}`, config)
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve({ payload: response.data.data });
                }
                else {
                    //setTimeout(() => {
                        //utils.topAlertError(response.data.message);
                    //}, timeOut);
                    resolve({ payload: false });
                }

            })
            .catch(error => {

                console.log("response error-->", error);
                dispatch(DisableLoader());
                setTimeout(() => {
                    //utils.topAlertError(error.message);
                }, timeOut);
            });
    });
}

