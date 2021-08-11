/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import ForgotPasswordView from './forgotpasswordview';

class ForgotPasswordController extends Component {

    constructor(props) {
        super(props);
    }

    codeScreen(e) {
        this.props.navigation.navigate('VerificationCode')
    }

    goingBack(e) {
        console.log("forgot_password_prosp-->", this.props)
        this.props.navigation.pop();
    }

    render() {
        return (
            <ForgotPasswordView openVerificationCodeScreen={(e) => this.codeScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default ForgotPasswordController;
