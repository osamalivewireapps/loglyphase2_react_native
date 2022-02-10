/* eslint-disable prettier/prettier */
import axios from 'axios';
import { baseUrl } from '../webconfig/globalConfig';
import { EnableLoader, DisableLoader } from './LoaderProgress';
import utils from '../utils';
import DataHandler from '../utils/DataHandler';
import { CUSTOMER_DETAILS, SALE_DETAIL, PAYMENT_DETAILS } from '../actions/ActionTypes';

const timeOut = 500;

export const getBreederListSimple = (isShowloader = true) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config isShowloader-->', isShowloader);

    return new Promise((resolve) => {
        if (isShowloader)
            {dispatch(EnableLoader());}
        axios
            .get(`${baseUrl}/sale/breederListSimple`, config)
            .then(response => {

                console.log('response getBreederListSimple-->', response);

                if (isShowloader)
                    {dispatch(DisableLoader());}

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

                if (isShowloader)
                    {dispatch(DisableLoader());}

                    setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};

export const getBreederSalePresent = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/sale/breederList`, config)
            .then(response => {

                console.log('response-->', response);

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

export const getBreederForSale = (keyword) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/user/breeders/all?keyword=${keyword}`, config)
            .then(response => {

                console.log('response-->', response);

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

export const getBreederSalePresentList = (buyerId) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/sale/breederSalesList/${buyerId}`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve({ payload: response.data.data });
                    dispatch({ type: CUSTOMER_DETAILS, payload: response.data.data });
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

export const getTax = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        //dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/user/breeder/getTax`, config)
            .then(response => {

                console.log('response-->', response);

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
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
};

export const addSale = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/sale/saleAnimal`, dataToSubmit, config)
            .then(response => {

                console.log('response-->', response);

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

export const editSale = (id, dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .patch(`${baseUrl}/sale/${id}`, dataToSubmit, config)
            .then(response => {

                console.log('response-->', response);

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

export const getSales = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/sale`, config)
            .then(response => {

                console.log('response-->', response);

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

export const getSalesHistory = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/sale?type=history`, config)
            .then(response => {

                console.log('response-->', response);

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

export const getSalesInvoice = () => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/sale?type=invoice`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve({ payload: response.data.data });
                    dispatch({ type: PAYMENT_DETAILS, payload: response.data.data });
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

export const getSale = (id) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', id);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/sale/${id}`, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve({ payload: response.data.data });
                    dispatch({ type: SALE_DETAIL, payload: response.data.data });
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

export const changePaidStatus = (id, type, saleId) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/installment/pay/${id}?type=${type}&saleId=${saleId}`, {}, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    utils.topAlertError(response.data.message);
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

export const InvoiceReminderEmail = (data) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('reminder-->', data);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/invoice/invoiceReminderEmail`, data, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    utils.topAlertError(response.data.message);
                    resolve({ payload: response.data.message });
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



// export const addGroup = (dataToSubmit) => async (dispatch) => {


//     let config = { headers: { 'auth': await DataHandler.getAuth() } };

//     console.log('config-->', dataToSubmit);

//     return new Promise((resolve) => {
//         dispatch(EnableLoader());
//         axios
//             .post(`${baseUrl}/group`, dataToSubmit, config)
//             .then(response => {

//                 dispatch(DisableLoader());
//                 if (response.data.status === 200) {
//                     console.log('response-->', response.data.data);
//                     resolve({ data: response.data.data });
//                 }
//                 else {
//                     setTimeout(() => {
//                         utils.topAlertError(response.data.message);
//                     }, timeOut);
//                 }

//             })
//             .catch(error => {

//                 console.log('response error-->', error.message);
//                 dispatch(DisableLoader());
//                 setTimeout(() => {
//                     utils.topAlertError(error.message);
//                 }, timeOut);
//             });
//     });
// };


// export const editGroup = (id, dataToSubmit) => async (dispatch) => {


//     let config = { headers: { 'auth': await DataHandler.getAuth() } };

//     console.log('config-->', `${baseUrl}/group/${id}`);

//     return new Promise((resolve) => {
//         dispatch(EnableLoader());
//         axios
//             .patch(`${baseUrl}/group/${id}`, dataToSubmit, config)
//             .then(response => {

//                 console.log('response-edit-group-->', response);

//                 dispatch(DisableLoader());
//                 if (response.data.status === 200) {
//                     resolve(true);
//                 }
//                 else {
//                     setTimeout(() => {
//                         utils.topAlertError(response.data.message);
//                     }, timeOut);
//                 }

//             })
//             .catch(error => {

//                 console.log('response error-->', error.message);
//                 dispatch(DisableLoader());
//                 setTimeout(() => {
//                     utils.topAlertError(error.message);
//                 }, timeOut);
//             });
//     });
// };

// export const deleteGroup = (id) => async (dispatch) => {


//     let config = { headers: { 'auth': await DataHandler.getAuth() } };

//     console.log('config-->', id);

//     return new Promise((resolve) => {
//         dispatch(EnableLoader());
//         axios
//             .delete(`${baseUrl}/group/${id}`, config)
//             .then(response => {

//                 console.log('response-delete-group-->', response);

//                 dispatch(DisableLoader());
//                 if (response.data.status === 200) {
//                     resolve(true);
//                 }
//                 else {
//                     setTimeout(() => {
//                         utils.topAlertError(response.data.message);
//                     }, timeOut);
//                 }

//             })
//             .catch(error => {

//                 console.log('response error-->', error.message);
//                 dispatch(DisableLoader());
//                 setTimeout(() => {
//                     utils.topAlertError(error.message);
//                 }, timeOut);
//             });
//     });
// };


