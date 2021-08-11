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
        if (this.props.route.params === undefined) {
            this.props.navigation.navigate('ChangePassword')
        }
        else {
            if (this.props.route.params.accountType === 'Pet Lover' || this.props.route.params.accountType === 'Charity / Non Profit')
                this.props.navigation.navigate('ThanksRegistration');
            else
                this.props.navigation.navigate('BusAccountPackages', { showBack: false });
        }
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
