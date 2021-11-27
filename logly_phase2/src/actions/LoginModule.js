/* eslint-disable prettier/prettier */
import { USERLOGIN } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from './../utils'

const timeOut = 500;
export const userLoginRequest = (data1) => (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        dispatch(EnableLoader());
        axios.post(`${baseUrl}/user/login`,
            {
                email: data1.email,
                password: data1.password,
                role: "breeder"
            }
        )
            .then(response => {

                console.log("response-->", response);

                dispatch(DisableLoader());
                if (response.data.status === 200) {
                    dispatch({ type: USERLOGIN, payload: response.data.data });
                    resolve({ status: response.data.status, accountType: response.data.data.user.packageType ? response.data.data.user.packageType: response.data.data.subscriber.subscriptionId.packageType, loginResponse: response.data.data });
                }
                else {
                    setTimeout(() => {
                        utils.topAlertError(response.data.message);
                    }, timeOut);
                    if (response.data.message.startsWith("Email"))
                        resolve({ status: response.data.status, userData: response.data.message, message: response.data.message });
                    else
                        resolve({ status: response.data.status, userData: response.data.data, message: response.data.message });

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