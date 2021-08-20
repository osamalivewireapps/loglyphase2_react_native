/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { userObject, userPreferences } from './../constants'

export default class DataHandler {

    static async saveUserObject(userData) {
        console.log("DataHandler->insert-data--->", userData);
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
