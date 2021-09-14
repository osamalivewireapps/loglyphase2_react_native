/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import ThanksRegistrationView from './thanks_reg_view';
import { CommonActions } from "@react-navigation/native";
import { StackActions } from '@react-navigation/native';



class ThanksRegistrationController extends Component {

    constructor(props) {
        super(props);
    }


    loginScreen() {

        const resetAction = CommonActions.reset({
            index: 1,
            routes: [{ name: "Splash" }, { name: "Login" }],
        });

        this.props.navigation.dispatch(resetAction);

    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render() {
        return (
            <ThanksRegistrationView
                title="hi"
                loginScreen={(e) => this.loginScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default ThanksRegistrationController;
