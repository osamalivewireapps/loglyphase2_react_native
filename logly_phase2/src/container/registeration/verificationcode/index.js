/* eslint-disable no-dupe-class-members */
/* eslint-disable space-infix-ops */
/* eslint-disable curly */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { CHARITY_ID, INDIVIDUAL, PET_LOVER_ID } from '../../../constants';
import { Colors, Fonts, Images } from '../../../theme';
import VerificationCodeView from './verificationcodeview';
import { userVerifyCode, resendVerifyCode, resendEmailSmsCodes } from './../../../actions/SignUpModule';
import { userVerifyForgotCode, userForgotSendSms } from './../../../actions/ForgotPassword';
import { VERIFY_CODE } from '../../../actions/ActionTypes';
import utils from '../../../utils';
import DataHandler from '../../../utils/DataHandler';

class VerificationCodeController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pinCode: '',
            pinSmsCode: '',
            pinCodeLength: 6,
        }
    }

    componentDidMount() {

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });
    }

    setPinCode(code) {
        this.setState({ pinCode: code })
    }

    setPinSMSCode(code) {
        this.setState({ pinSmsCode: code })
    }

    enterNewPasswordScreen(e) {

        //CALL VERIFICATION CODE API..
        if (!this.state.pinCode) {
            utils.topAlertError("Please enter code..")
        } else {
            if (!this.props.route.params.isChangePassword) {
                this.props.userVerifyCode({ email: this.state.pinCode, phone: this.state.pinSmsCode }).then((response) => {
                    if (this.props.route.params.accountType === INDIVIDUAL || this.props.route.params.accountType === CHARITY_ID)
                        this.props.navigation.navigate('ThanksRegistration');
                    else
                        this.props.navigation.navigate('BusAccountPackages', { showBack: false, packageId: this.userObject.packageType });
                });
            } else {
                this.props.userVerifyForgotCode(this.state.pinCode).then((response) => {
                    this.props.navigation.navigate('ChangePassword', { pinCode: this.state.pinCode })
                });
            }
        }

    }

    componentDidMount() {

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });
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

    resendVerificationCode() {
        if (this.props.route.params.isChangePassword) {
            if (this.props.route.params.email)
                this.props.resendVerifyCode(this.props.route.params.email).then(() => {
                });
            else {
                this.props.userForgotSendSms(this.props.route.params.phone).then(() => {
                });
            }
        } else {
            this.props.resendEmailSmsCodes(this.props.route.params.email).then(() => {
            });
        }
    }

    render() {
        return (
            <VerificationCodeView
                routeEmail={this.props.route.params.email}
                isRegisterCodeVerification={!this.props.route.params.isChangePassword ? true : false}
                pinLength={this.state.pinCodeLength}

                verificationCode={this.state.pinCode}
                setPinCode={(e) => this.setPinCode(e)}

                verificationSmsCode={this.state.pinSmsCode}
                setPinSMSCode={(e) => this.setPinSMSCode(e)}


                openEnterPasswordScreen={(e) => this.enterNewPasswordScreen(e)}
                backScreen={(e) => { this.goingBack(e) }}
                resendCode={(e) => this.resendVerificationCode(e)} />
        );
    }
}

const mapStateToProps = ({ user }) => ({
    verifyData: user.verifyData,

});

const mapDispatchToProps = dispatch => ({
    userVerifyCode: (data) => dispatch(userVerifyCode(data)),
    resendVerifyCode: (data) => dispatch(resendVerifyCode(data)),
    userVerifyForgotCode: (data) => dispatch(userVerifyForgotCode(data)),
    userForgotSendSms: (data) => dispatch(userForgotSendSms(data)),
    resendEmailSmsCodes: (data) => dispatch(resendEmailSmsCodes(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerificationCodeController);
