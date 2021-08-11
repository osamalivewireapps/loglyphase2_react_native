/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import BusinessOwnerView from './bus_owner_view';

class BusinessOwnerController extends Component {

    constructor(props) {
        super(props);
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    openRegisterAccount() {
        this.props.navigation.navigate("VerificationCode", { isForgotPassword: false, accountType: this.props.route.params.accountType });
    }

    render() {
        return (
            <BusinessOwnerView
                accountType={this.props.route.params.accountType}
                openRegisterAccount={(e) => this.openRegisterAccount(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default BusinessOwnerController;