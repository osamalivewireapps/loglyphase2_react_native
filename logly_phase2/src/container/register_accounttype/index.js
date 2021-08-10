/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import RegistrationAccountTypeView from './register_accounttype_view';

class RegistrationAccountTypeController extends Component {

    constructor(props) {
        super(props);
    }

    accountType = [
        {
            color: '#ACFCF4',
            title: 'Pet Lover',
            price: '99.9 / month',
            desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'
        },
        {
            color: '#FFDC7D',
            title: 'Business Owner',
            price: '99.9 / month',
            desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'
        },
        {
            color: '#9EFF87',
            title: 'Charity / Non Profit',
            price: '99.9 / month',
            desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'
        },
        {
            color: '#FCC8AA',
            title: 'Business Service Provider',
            price: '99.9 / month',
            desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'
        },
        {
            color: '#E9BDFB',
            title: 'Business Listing',
            price: '99.9 / month',
            desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut'
        }
    ]

    goingBack(e) {
        this.props.navigation.pop();
    }

    openBusAccountPackages() {
        this.props.navigation.navigate('BusAccountPackages')
    }

    render() {
        return (
            <RegistrationAccountTypeView
                listAccountType={this.accountType}
                openBusPackages={() => this.openBusAccountPackages()}
                props backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default RegistrationAccountTypeController;