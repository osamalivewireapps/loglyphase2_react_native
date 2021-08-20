/* eslint-disable prettier/prettier */
import { USERLOGIN } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from './../utils'

export const userLoginRequest = (data1) => async (dispatch) => {
    try {
        dispatch(EnableLoader())
        const { data } = await axios.post(`${baseUrl}/users/login`,
            { email: data1.userName, password: data1.password },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Encoding': "gzip, deflate",
                }
            }
        );
        dispatch(DisableLoader())
        console.log(data);
        if (data.status === 200) {
            dispatch({ type: USERLOGIN, payload: data })
        }
        else {
            utils.topAlertError(data.message);
        }
    }
    catch (error) {
        console.log("error-------->", error.response)
        dispatch(DisableLoader());
        utils.topAlertError(error)
    }

}