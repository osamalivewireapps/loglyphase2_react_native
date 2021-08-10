/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import VerificationCodeView from './verificationcodeview';

class VerificationCodeController extends Component {

    constructor(props) {
        super(props);
    }


    enterNewPasswordScreen(e) {
        this.props.navigation.navigate('ChangePassword')
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render() {
        return (
            <VerificationCodeView
                openEnterPasswordScreen={(e) => this.enterNewPasswordScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default VerificationCodeController;
