/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { GET_ANIMALS, GET_ANIMALS_DETAILS, USERLOGIN } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils'
import DataHandler from '../utils/DataHandler';
import Loader from '../components/Loader';
import { reject } from 'lodash';

const timeOut = 500;

export const getAnimals = (activationType = 'Active') => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log("getAnimals config---------------->", activationType)

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .get(`${baseUrl}/animal?activationType=${activationType}`, config)
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: GET_ANIMALS, payload: response.data.data });
                    resolve({ type: GET_ANIMALS, payload: response.data.data });
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

export async function getAnimalCategories(type = 'animal') {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/form/byBreeder?type=${type}`, config)
            .then(response => {

                console.log("response-->", response);

                if (response.data.status === 200) {
                    resolve({ animalCategory: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                    reject();
                }

            })
            .catch(error => {

                console.log("response error-->", error.message);
                reject();
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });
}

export const getAnimal = (id) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    dispatch(EnableLoader());
    axios
        .get(`${baseUrl}/animal/${id}`, config)
        .then(response => {

            console.log("response-->", response);

            dispatch(DisableLoader());
            if (response.data.status === 200) {
                dispatch({ type: GET_ANIMALS_DETAILS, payload: response.data.data });
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


}

export const deleteAnimal = (id) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    dispatch(EnableLoader());
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseUrl}/animal/${id}`, config)
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
            })
    });


}


export async function getFormCategory(catId) {
    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log("token-------->", config);

    let url = catId.startsWith('type') ? `${baseUrl}/form/byBreeder?${catId}` : `${baseUrl}/form/category/${catId}`;

    return new Promise((resolve, reject) => {
        axios.get(url, config)
            .then(response => {

                console.log("response_animal_breed-->", response);

                if (response.data.status === 200) {
                    setTimeout(() => {
                        resolve({ formCategory: response.data.data });
                    }, timeOut);

                }
                else {
                    setTimeout(() => {
                        reject();
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }

            })
            .catch(error => {

                console.log("response error-->", error.message);
                reject();
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            });
    });

}

export const addAnimal = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/animal`, dataToSubmit, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    utils.topAlertError(response.data.message);
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


export const editAnimal = (id, dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', `${baseUrl}/animal/updateAnimal/${id}`);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/animal/updateAnimal/${id}`, dataToSubmit, config)
            .then(response => {

                console.log('response-edit-product-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
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

export const UploadAnimalImages = (dataToSubmit) => async (dispatch) => {

    console.log("upload images--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/animal/gallery/upload`, dataToSubmit, config)
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

export const DeleteImage = (dataToSubmit) => async (dispatch) => {

    console.log("delete images--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/animal/gallery/delete`, dataToSubmit, config)
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

export const uploadHealth = (dataToSubmit) => async (dispatch) => {

    console.log("upload pdf--->", dataToSubmit)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/animal/healthrecord/upload`, dataToSubmit, config)
            .then(response => {



                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    utils.topAlertError(response.data.message);
                    resolve({ responseData: response });
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

export const delHealthRecord = (id, healthId) => async (dispatch) => {

    console.log("upload pdf--->", id + '' + healthId)

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', id);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .delete(`${baseUrl}/animal/${id}/healthrecord/${healthId}`, config)
            .then(response => {



                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    utils.topAlertError(response.data.message);
                    resolve({ responseData: response });
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

export const addParent = (data) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('data------->', data)

    dispatch(EnableLoader());
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseUrl}/animal/addasparentchild`, data, config)
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

                console.log("response error-->", error);
                dispatch(DisableLoader());
                setTimeout(() => {
                    utils.topAlertError(error.message);
                }, timeOut);
            })
    });


}

export const deleteParent = (id, parentName) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('data------->', `${baseUrl}/animal/${id}/parent/${parentName}`)

    dispatch(EnableLoader());
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseUrl}/animal/${id}/parent/${parentName}`, config)
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
            })
    });


}

export const deleteChild = (id, child) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('data------->', `${baseUrl}/animal/${id}/child/${child}`)

    dispatch(EnableLoader());
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseUrl}/animal/${id}/child/${child}`, config)
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
            })
    });


}

export const updateFeatured = (id, dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/animal/update/${id}`, dataToSubmit, config)
            .then(response => {

                console.log('response-updateFeatured-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
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

export const updatePrivacy = (id, dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', dataToSubmit);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .put(`${baseUrl}/animal/update/${id}`, dataToSubmit, config)
            .then(response => {

                console.log('response-update Privacy-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
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

export const transferAnimal = (dataToSubmit) => async (dispatch) => {


    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    console.log('config-->', config);

    return new Promise((resolve) => {
        dispatch(EnableLoader());
        axios
            .post(`${baseUrl}/animal/transferanimal`, dataToSubmit, config)
            .then(response => {

                console.log('response-->', response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
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