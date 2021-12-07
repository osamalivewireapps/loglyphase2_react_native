/* eslint-disable no-alert */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Fonts, Images } from '../../theme';
import utils from '../../utils';
import LoginView from './loginview';
import { userLoginRequest } from '../../actions/LoginModule';
import DataHandler from '../../utils/DataHandler';
import { BUS_LISTING, BUSINESS, INDIVIDUAL, PET_LOVER, BUS_SER_PROVIDER } from '../../constants';

class LoginController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'faizan@livewireapps.com',//'osama@livewirelabs.co',
            password: 'Lwa12345',
            userEmail: true,
            userPassword: true,
            isCheckOnTerms: true
        }
    }

    setEmail(txt) {
        this.setState({ email: txt, userEmail: utils.isEmailValid(txt) });
    }
    setPassword(txt) {
        this.setState({
            password: txt,
            userPassword: utils.isPasswordValid(txt),
        });
    }
    setCheckTerms(isCheck) {
        this.setState({ isCheckOnTerms: isCheck })
    }

    registerScreen(e) {
        this.props.navigation.navigate('Registration')
    }

    forgotPasswordScreen(e) {
        this.props.navigation.navigate('ForgotPassword')
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    openPolicyScreen(txt) {
        this.props.navigation.navigate('PolicyScreen', { header: txt });
    }

    loginAccount() {

        //TEMPORARY..
        // if(true){
        //     DataHandler.saveAccountType(BUS_LISTING);
        //     this.props.navigation.navigate("WelcomeRegistration");
        //     return
        // }

        if (this._validateForm()) {

            this.props.userLoginRequest(this.state).then((response) => {

                console.log("login-->", response);

                if (response.status === 200) {
                    DataHandler.saveAuth(response.loginResponse.token);
                    DataHandler.saveUserObject(JSON.stringify(response.loginResponse.user));
                    DataHandler.saveAccountType(response.accountType);
                    this.props.navigation.navigate("WelcomeRegistration", { name: response.loginResponse.user.name});
                }
                else if (response.status === 400) {
                    if (!response.message.startsWith("Email") && !response.message.startsWith("Incorrect")) {
                        if (DataHandler.saveUserObject(JSON.stringify(response.userData))) {
                            this.props.navigation.navigate("VerificationCode", { isForgotPassword: false, accountType: response.userData.packageType, email: response.userData.email });
                        }
                    }
                }
            });

        }
    }

    render() {
        return (
            <LoginView
                enterEmail={this.state.email}
                validateEmail={this.state.userEmail}
                setEmail={(e) => { this.setEmail(e) }}

                enterPassword={this.state.password}
                validatePassword={this.state.userPassword}
                setPassword={(e) => { this.setPassword(e) }}

                checkTerms={this.state.isCheckOnTerms}
                setCheckTerms={(e) => this.setCheckTerms(e)}

                openRegisterScreen={(e) => this.registerScreen(e)}
                openForgotScreen={(e) => this.forgotPasswordScreen(e)}
                backScreen={(e) => { this.goingBack(e) }}
                openPolicyScreen={(e) => this.openPolicyScreen(e)}

                loginScreen={(e) => this.loginAccount(e)}
            />
        );
    }

    _validateForm = () => {
        const { email, password, isCheckOnTerms } = this.state;

        Keyboard.dismiss();

        if (!utils.isEmailValid(email)) {

            utils.topAlertError("Email is required");

            this.setState({
                userEmail: false
            });
            return false;
        }
        else if (!utils.isPasswordValid(password)) {

            utils.topAlertError("Password is required");

            this.setState({
                userPassword: false
            });
            return false;
        }


        return true;
    };

}

const mapStateToProps = ({ user }) => {
    return {
        userData: user.userData,
    };
};

const mapDispatchToProps = dispatch => ({
    userLoginRequest: (data) => dispatch(userLoginRequest(data)),

});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginController);
