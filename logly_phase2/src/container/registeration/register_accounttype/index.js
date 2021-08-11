/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Colors, Fonts, Images } from '../../../theme';
import Util from '../../../utils';
import RegistrationAccountTypeView from './register_accounttype_view';

class RegistrationAccountTypeController extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        accountTypeSelection: {
            isSelectedIndex: -1,
            registerAccountType: '',
        },
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

    selectAccountType(accType) {
        this.setState({ accountTypeSelection: accType })
    }

    openBusAccountPackages() {
        this.props.navigation.navigate('BusAccountPackages', { showBack: true });
    }

    openBusOwnerScreen() {
        if (this.state.accountTypeSelection.isSelectedIndex !== -1) {
            if (this.state.accountTypeSelection.isSelectedIndex === 0) {
                this.props.navigation.navigate("VerificationCode", { isForgotPassword: false, accountType: this.state.accountTypeSelection.registerAccountType });
            } else {
                this.props.navigation.navigate('BusinessOwner', { accountType: this.state.accountTypeSelection.registerAccountType });
            }
        }

        else {
            Util.topAlert("Please select account type before proceed..")
        }
    }

    render() {
        return (
            <RegistrationAccountTypeView
                listAccountType={this.accountType}
                accountTypeSelection={this.state.accountTypeSelection}
                accTypeSelection={(e) => this.selectAccountType(e)}
                openBusPackages={() => this.openBusAccountPackages()}
                openBusOwner={() => this.openBusOwnerScreen()}
                props backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

export default RegistrationAccountTypeController;