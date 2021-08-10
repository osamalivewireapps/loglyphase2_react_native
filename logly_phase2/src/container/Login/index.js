/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import LoginView from './loginview';

class LoginController extends Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <LoginView openRegisterScreen={(e) => this.registerScreen(e)}
                openForgotScreen={(e) => this.forgotPasswordScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default LoginController;
