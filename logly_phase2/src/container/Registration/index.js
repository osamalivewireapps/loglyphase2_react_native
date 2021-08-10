/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import RegistrationView from './registrationview';

class RegistrationController extends Component {

    constructor(props) {
        super(props);
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    openRegisterAccount() {
        this.props.navigation.navigate('RegisterAccountType')
    }

    render() {
        return (
            <RegistrationView props
                openRegisterAccount={(e) => this.openRegisterAccount(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default RegistrationController;