/* eslint-disable quotes */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Colors, Fonts, Images } from '../../../theme';
import Util from '../../../utils';
import RegistrationAccountTypeView from './register_accounttype_view';
import { getSubscriptionRequest, userSignUpRequest } from '../../../actions/SignUpModule'
import { GET_SUBS, USERSIGNUP } from '../../../actions/ActionTypes';
import { connect } from 'react-redux';
import DataHandler from '../../../utils/DataHandler';
import { INDIVIDUAL, PET_LOVER_ID } from '../../../constants';

class RegistrationAccountTypeController extends Component {

    constructor(props) {
        super(props);
    }

    currentActions = "";

    state = {
        accountTypeSelection: {
            isSelectedIndex: -1,
            registerAccountType: '',
        },
        accountType: [],
    }

    componentDidMount() {
        this.currentActions = GET_SUBS;
        this.props.getSubscriptionRequest();

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });

    }

    componentDidUpdate() {
        switch (this.currentActions) {
            case GET_SUBS:
                this.setCurrentAction("");
                this.setState({ accountType: this.props.subsData.payload.data })
                break;

        }
    }

    emptyCurrentAction() {
        this.currentActions = "";
    }

    setCurrentAction(e) {
        this.currentActions = e;
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    selectAccountType(accType) {
        this.setState({ accountTypeSelection: accType })
    }

    openBusAccountPackages(e) {
        //if (this.state.accountType[e].packageType !== INDIVIDUAL)
            this.props.navigation.navigate('BusAccountPackages', { showBack: true, packageId: this.state.accountType[e].packageType });
    }

    openBusOwnerScreen() {
        if (this.state.accountTypeSelection.isSelectedIndex !== -1) {

            this.userObject = {
                ...this.userObject,
                "packageId": this.state.accountType[this.state.accountTypeSelection.isSelectedIndex]._id,
                "packageType": this.state.accountType[this.state.accountTypeSelection.isSelectedIndex].packageType
            }

            console.log("userobject-->", this.userObject);

            if (this.state.accountType[this.state.accountTypeSelection.isSelectedIndex].packageType === INDIVIDUAL) {

                //CALL REGISTRATION API..
                this.setCurrentAction(USERSIGNUP);
                this.props.userSignUpRequest(this.userObject).then(() => {
                    this.props.navigation.navigate("VerificationCode", { isForgotPassword: false, accountType: this.state.accountType[this.state.accountTypeSelection.isSelectedIndex].packageType, email: this.userObject.email });
                });
            }


            else {

                //SET USER DATA..
                if (DataHandler.saveUserObject(JSON.stringify(this.userObject)))
                    this.props.navigation.navigate('BusinessOwner', { accountType: this.state.accountType[this.state.accountTypeSelection.isSelectedIndex].packageType });
            }
        }

        else {
            Util.topAlert("Please select account type before proceed..")
        }
    }

    render() {

        return (
            <RegistrationAccountTypeView
                listAccountType={this.state.accountType}
                accountTypeSelection={this.state.accountTypeSelection}
                accTypeSelection={(e) => this.selectAccountType(e)}
                openBusPackages={(e) => this.openBusAccountPackages(e)}
                openBusOwner={() => this.openBusOwnerScreen()}
                props backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

const mapStateToProps = ({ user }) => ({
    subsData: user.subsData,
    signUpObject: user.signUpData,

});

const mapDispatchToProps = dispatch => ({
    getSubscriptionRequest: () => dispatch(getSubscriptionRequest()),
    userSignUpRequest: (data) => dispatch(userSignUpRequest(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationAccountTypeController);
