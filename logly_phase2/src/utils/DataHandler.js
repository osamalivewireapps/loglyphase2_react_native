/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { userObject, userPreferences, accountType, BUS_SERVICES, BUS_DETAILS, ANIMAL_LIST, PRODUCT_LIST, IS_SETUP_WIZARD } from './../constants'

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
            if (type !== null)
                await AsyncStorage.setItem(accountType, type);
            else
                await AsyncStorage.removeItem(accountType, type);
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
                console.log("get accountType---->", value);
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
                console.log("token---->", value);
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

    static async saveBusDetails(userData) {
        console.log("DataHandler--->", userData);
        try {
            if (userData!==null)
                await AsyncStorage.setItem(BUS_DETAILS, userData);
            else
                await AsyncStorage.removeItem(BUS_DETAILS, userData);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getBusDetails() {
        try {
            let value = await AsyncStorage.getItem(BUS_DETAILS);
            if (value !== null) {
                console.log("DataHandler=>getBusDetails---->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async saveAnimalList(userData) {
        console.log("DataHandler--->", userData);
        try {
            if (userData !== null)
                await AsyncStorage.setItem(ANIMAL_LIST, userData);
            else
                await AsyncStorage.removeItem(ANIMAL_LIST, userData);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getAnimalList() {
        try {
            let value = await AsyncStorage.getItem(ANIMAL_LIST);
            if (value !== null) {
                console.log("DataHandler=>getAnimals List---->", value);
                return value;
            } else
                return null

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async saveProductList(userData) {
        console.log("DataHandler--->", userData === null ? true : false);
        try {
            if (userData !== null)
                await AsyncStorage.setItem(PRODUCT_LIST, userData);
            else
                await AsyncStorage.removeItem(PRODUCT_LIST, userData);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getProductList() {
        try {
            let value = await AsyncStorage.getItem(PRODUCT_LIST);
            if (value !== null) {
                console.log("DataHandler=>getProduct List---->", value);
                return value;
            } else
                return null

        } catch (error) {
            console.log("saving error is", error);
        }
    }

    static async saveSetupWizard(type) {
        console.log("saveSetupWizard--->", type);
        try {
            if (type !== null)
                await AsyncStorage.setItem(IS_SETUP_WIZARD, type);
            else
                await AsyncStorage.removeItem(IS_SETUP_WIZARD, type);
            return true;
        } catch (error) {
            console.log("saving error is", error);
            return false;
        }
    }

    static async getSetupWizard() {
        try {
            let value = await AsyncStorage.getItem(IS_SETUP_WIZARD);
            if (value !== null) {
                console.log("saveSetupWizard---->", value);
                return value;
            }

        } catch (error) {
            console.log("saving error is", error);
        }
    }
}
