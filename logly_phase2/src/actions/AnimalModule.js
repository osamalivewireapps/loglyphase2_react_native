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

export const getAnimals = (activationType = 'Active') => async(dispatch) => {

     
    let config = { headers: { 'auth': await DataHandler.getAuth()} };

    console.log("config-->", config)

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

export async function getAnimalCategories(type='animal'){

    let config = { headers: { 'auth': await DataHandler.getAuth() } };
    return new Promise((resolve,reject) => {
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


export async function getFormCategory(catId){
    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    let url = catId.startsWith('type') ? `http://147.182.194.105/api/form/byBreeder?${catId}` : `${baseUrl}/form/category/${catId}`;
    
    return new Promise((resolve,reject) => {
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
                        utils.topAlertError("breed issues:"+response.data.message);
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