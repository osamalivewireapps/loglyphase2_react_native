/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import utils from '../../../utils';
import DataHandler from '../../../utils/DataHandler';
import { Colors, Fonts, Images } from '../../theme';
import BusinessOwnerView from './bus_owner_view';
import { userSignUpRequest } from './../../../actions/SignUpModule';
import { connect } from 'react-redux';

class BusinessOwnerController extends Component {

    constructor(props) {
        super(props);

        this.state = {

            busName: '',
            empQuantity: 0,
            busUrl: "",
            isBusName: true,
            isBusEmployees: true,
            isBusUrl: true,
        }
    }

    componentDidMount() {

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });
    }
    goingBack(e) {
        this.props.navigation.pop();
    }

    openRegisterAccount() {
        if (this._validateForm()) {

            this.userObject = {
                ...this.userObject,
                "businessName": this.state.busName,
                "noOfEmployees": this.state.empQuantity,
                "website": this.state.busUrl,
            }
            //CALL REGISTRATION API..
            this.props.userSignUpRequest(this.userObject).then(() => {
                this.props.navigation.navigate("VerificationCode", { isForgotPassword: false, accountType: this.props.route.params.accountType });
            });

        }
    }

    setBusName(txt) {
        this.setState({ busName: txt, isBusName: utils.isValidUserName(txt) });
    }

    setEmpQuantity(txt) {
        this.setState({ empQuantity: txt, isBusEmployees: utils.isValidUserName(txt) });
    }

    setBusUrl(txt) {
        this.setState({ busUrl: txt, isBusUrl: utils.isValidUserName(txt) });
    }

    render() {
        return (
            <BusinessOwnerView

                nameBus={this.state.busName}
                validateBusName={this.state.isBusName}
                setBusName={(e) => this.setBusName(e)}

                strengthEmp={this.state.empQuantity}
                validateBusEmp={this.state.isBusEmployees}
                setEmpStrength={(e) => this.setEmpQuantity(e)}

                urlBus={this.state.busUrl}
                validateBusURL={this.state.isBusUrl}
                setBusUrl={(e) => this.setBusUrl(e)}

                accountType={this.props.route.params.accountType}
                openRegisterAccount={(e) => this.openRegisterAccount(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }

    _validateForm = () => {
        const { busName, empQuantity, busUrl, isBusName, isBusEmployees, isBusUrl } = this.state;

        Keyboard.dismiss();

        if (!utils.isValidUserName(busName)) {

            utils.topAlertError("Business Name is required");

            this.setState({
                isBusName: false
            });
            return false;
        }
        else if (!utils.isValidUserName(empQuantity)) {

            utils.topAlertError("No.of.Employees is required");

            this.setState({
                isBusEmployees: false
            });
            return false;
        }
        else if (!utils.isValidUserName(busUrl)) {

            utils.topAlertError("url is required");

            this.setState({
                isBusUrl: false
            });
            return false;
        }


        return true;
    };
}

const mapStateToProps = ({ user }) => ({
    signUpObject: user.signUpData,

});

const mapDispatchToProps = dispatch => ({
    userSignUpRequest: (data) => dispatch(userSignUpRequest(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessOwnerController);

