/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils'
import DataHandler from '../utils/DataHandler';

const timeOut = 500;


export const getDashBoardType = (id,type) => async (dispatch) => {

    let config = { headers: { 'auth': await DataHandler.getAuth() } };
    return new Promise((resolve) => {
    dispatch(EnableLoader());
    axios
        .get(`${baseUrl}/category/inventory/${id}?type=${type}`, config)
        .then(response => {

            console.log("response-->", response);

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

            console.log("response error-->", error.message);
            dispatch(DisableLoader());
            setTimeout(() => {
                utils.topAlertError(error.message);
            }, timeOut);
        });
    });


}