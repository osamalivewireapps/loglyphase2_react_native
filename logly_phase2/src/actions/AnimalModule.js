/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { GET_ANIMALS, USERLOGIN } from './ActionTypes';
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



export async function getAnimalBreed(catId){
    let config = { headers: { 'auth': await DataHandler.getAuth() } };

    return new Promise((resolve,reject) => {
        axios.get(`${baseUrl}/form/category/${catId}`, config)
            .then(response => {

                console.log("response_animal_breed-->", response.data);

                if (response.data.status === 200) {
                    resolve({ animalBreed: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                }
                reject();
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