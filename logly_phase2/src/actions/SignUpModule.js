/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { USERSIGNUP, GET_STATES, GET_CITIES } from './ActionTypes';
import axios from "axios";
import { baseUrl } from "../webconfig/globalConfig";
import { EnableLoader, DisableLoader } from "./LoaderProgress";
import utils from '../utils';

export const userSignUpRequest = (data1) => async (dispatch) => {

    console.log("fields-->", data1);

    try {
        dispatch(EnableLoader());
        const { data } = await axios.post(`${baseUrl}/user/breeder/register`,
            {
                city: data1.city,
                email: data1.email,
                name: data1.userName,
                packageId: "5fac021fbd5c030e375233ad",
                packageType: "Individual",
                password: data1.password,
                phone: data1.password,
                state: data1.state
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Accept-Encoding': "gzip, deflate",
                }
            }
        );
        dispatch(DisableLoader());
        console.log(data);
        dispatch({ type: USERSIGNUP, payload: data });
    }
    catch (error) {

        console.log("error-------->", error.response);

        dispatch(DisableLoader());
        utils.getErrorMsg(error);
    }

}


export const getStateRequest = () => dispatch => {

    dispatch(EnableLoader());
    return new Promise(() => {
        axios.
            get(`${baseUrl}/state/all`,
                {
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Encoding': "gzip, deflate",
                    },
                }
            )
            .then(response => {
                dispatch(DisableLoader());
                dispatch({ type: GET_STATES, payload: response.data });
            })
            .catch(error => {
                dispatch(DisableLoader());
                utils.getErrorMsg(error);
            })
    });
};

export const getCityRequest = (stateId) => dispatch => {

    console.log('url-->', `${baseUrl}/city/all?stateId=` + stateId);
    dispatch(EnableLoader());
    return new Promise(() => {
        axios.
            get(`${baseUrl}/city/all?stateId=` + stateId,
                {
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Accept-Encoding': "gzip, deflate",
                    },
                }
            )
            .then(response => {
                dispatch(DisableLoader());
                dispatch({ type: GET_CITIES, payload: response.data });
            })
            .catch(error => {
                dispatch(DisableLoader());
                utils.getErrorMsg(error);
            })
    });
};



