/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { userObject, userPreferences, accountType, BUS_SERVICES } from './../constants'

export default class DataHandler {

    static async saveUserObject(userData) {
        console.log("DataHandler--->", userData);
        try {
            await AsyncStorage.setItem(userObject, userData);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getUserObject() {
        try {
            let value = await AsyncStorage.getItem(userObject);
            if (value !== null) {
                console.log("DataHandler=>getUserObject---->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async saveAccountType(type) {
        console.log("accountType--->", type);
        try {
            await AsyncStorage.setItem(accountType, type);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getAccountType() {
        try {
            let value = await AsyncStorage.getItem(accountType);
            if (value !== null) {
                console.log("accountType---->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async saveAuth(token) {
        console.log("auth--->", token);
        try {
            await AsyncStorage.setItem("auth", token);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getAuth() {
        try {
            let value = await AsyncStorage.getItem("auth");
            if (value !== null) {
                console.log("accountType---->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async saveBusListing(type) {
        console.log("accountType--->", accountType);
        try {
            await AsyncStorage.setItem(BUS_SERVICES, type);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getBusListing() {
        try {
            let value = await AsyncStorage.getItem(BUS_SERVICES);
            if (value !== null) {
                console.log("accountType---->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async getPreferences() {
        // debugger
        try {
            let value = await AsyncStorage.getItem(userPreferences);
            if (value !== null) {
                console.log("value--->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async savePreferences(userData) {
        console.log("user data--->", userData);
        try {
            await AsyncStorage.setItem(userPreferences, userData);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }
}
