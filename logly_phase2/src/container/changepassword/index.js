/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import ChangePasswordView from './changepasswordview';

class ChangePasswordController extends Component {

    constructor(props) {
        super(props);
    }

    passwordResetScreen(e) {
        this.props.navigation.navigate('PasswordReset')
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render() {
        return (
            <ChangePasswordView openpasswordResetScreen={(e) => this.passwordResetScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default ChangePasswordController;
