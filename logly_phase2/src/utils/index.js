/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import _ from "lodash";
import { Platform, Linking, Alert } from "react-native";
import moment from "moment";
import Snackbar from 'react-native-snackbar';
import { MESSAGE_TYPES, ERROR_MESSAGES, TIME_FORMAT2 } from "../constants";
import axios from 'axios';

class Util {
  keyExtractor = (item: Object, index: number) => index.toString();
  static zipCode = {};
  static isPlatformAndroid() {
    return Platform.OS === "android";
  }
  static isValidURL(url: "string") {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  static isEmailValid(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  static isPasswordValid(password) {
    return /^\S{8,30}$/.test(password);//(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])
  }
  static isValidName(name) {
    if (name.length >= 3)
      return /^[a-zA-Z0-9 ]*$/.test(name);
    else
      return false
  }

  static isValidUserName(name) {
    return /^[a-zA-Z0-9]+$/.test(name);
  }

  static isLengthGreater(name) {
    return name.length >= 3;
  }

  static isLengthGreaterZero(name) {
    return name.length > 0;
  }

  static isValidPhone(name) {
    name = name.replaceAll("-", "");
    return name.length === 10;
  }

  static isValidZipCode(cityName, zipCode, zipCodes) {
    if (zipCodes.length > 0) {
      let tmp = zipCodes.filter(e => e.zipcode === zipCode);
      return tmp.length > 0 ? true : false
    } else
      return true
  }

  static isValidLink(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);

  }

  static isLengthGraterThanZero(name) {
    return name.length > 0;
  }

  static isGraterThanZero(name) {
    return (name.length > 0 && name>0);
  }

  static combineEmailValidate(email) {
    if (_.isEmpty(email))
      return this.capitalizeFirstLetter("email is required")
    else if (!this.isEmailValid(email)) {
      return ERROR_MESSAGES.invalid_email_error
    }
  }

  static combinePasswordValidate(password) {
    if (_.isEmpty(password))
      return this.capitalizeFirstLetter("password is required")
    else if (!this.isPasswordValid(password)) {
      return ERROR_MESSAGES.invalid_password_error
    }
  }

  static combineNameValidate(name) {
    if (_.isEmpty(name))
      return this.capitalizeFirstLetter("name is required")
    else if (!this.isValidName(name)) {
      return ERROR_MESSAGES.invalid_name_error
    }
  }

  static combineUserNameValidate(name) {
    if (_.isEmpty(name))
      return this.capitalizeFirstLetter("UserName is required")
    else if (!this.isValidUserName(name)) {
      return ERROR_MESSAGES.invalid_name_error
    }
  }

  static combineGeneralValidate(name) {
    if (_.isEmpty(name))
      return this.capitalizeFirstLetter("field is required")
    else if (!this.isValidName(name)) {
      return "field is required"
    }
  }

  static topAlert(message, alertType = "success") {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  static getErrorMsg(error) {
    let msg = error.response?.data?.errors ? Array.isArray(error.response?.data?.errors) ?
      error.response?.data?.errors[0] : error.response?.data?.errors
      :
      error.response?.data ? error.response.data.message : error.response ?
        error.response.message : error.message

    setTimeout(() => {
      this.topAlert(msg)
    }, 1000);
  }

  static topAlertError(message, alertType = MESSAGE_TYPES.ERROR) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getFormattedDateTime = (date, format) => {
    if (date) return moment(date).format(format);
    return "";
  };

  static getDateObjectFromString = (date, format) => {
    if (date) return moment(date, format).toDate();
    return "";
  };

  //   showLoader = (instance, loadingFor = "") => {
  //     if (!instance.state.loading) {
  //       instance.setState({
  //         loading: true,
  //         loadingFor
  //       });
  //     }
  //   };

  //   hideLoader = (instance, callback) => {
  //     if (instance.state.loading) {
  //       instance.setState(
  //         {
  //           loading: false,
  //           loadingFor: ""
  //         },
  //         callback
  //       );
  //     }
  //   };

  // getCurrentUserAccessToken() {
  //   return DataHandler.getStore().getState().user.userData.token;
  // }

  //   isNumber(val) {
  //     return /^\d+$/.test(val);
  //   }

  //   openLinkInBrowser(url) {
  //     Linking.canOpenURL(url).then(supported => {
  //       if (supported) {
  //         Linking.openURL(url);
  //       } else {
  //         console.log("Don't know how to open URI: ");
  //       }
  //     });
  //   }

  //   generateGetParameter(obj) {
  //     let final = "?";
  //     for (const key in obj) {
  //       final = `${final}${key}=${obj[key]}&`;
  //     }
  //     final = final.slice(0, -1);
  //     return final;
  //   }

  static isRequiredMessage(field) {
    this.topAlertError(`${this.capitalizeFirstLetter(field)} is required`);
  }

  static getTrimmedDataFromArray(data, length) {
    return data.slice(0, length);
  }

  //   setSelectedTabIndex = (instance, index) => {
  //     instance.setState({
  //       activeTabIndex: index
  //     });
  //   };

  static getErrorText = err => ERROR_MESSAGES[err];

  static isSuccessResponse = response => {
    console.log("the response is:" + response.error);
    return (_.isNull(response.error))
  };


  //   getDateObjectFromString = (date, format) => {
  //     if (date) return moment(date, format).toDate();
  //     return "";
  //   };

  static removeSpaces(str) {
    return str.replace(/\s/g, "");
  }

  //   titleCase(str) {
  //     str = str.toLowerCase().split(" ");
  //     for (var i = 0; i < str.length; i++) {
  //       str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  //     }
  //     return str.join(" ");
  //   }



}


export default Util;
