/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import PasswordResetView from './passwordresetview';

class PasswordResetController extends Component {

    constructor(props) {
        super(props);
    }


    loginScreen(e) {
        this.props.navigation.navigate('Login')
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render() {
        return (
            <PasswordResetView
                openLoginScreen={(e) => this.loginScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default PasswordResetController;
