/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import ForgotPasswordView from './forgotpasswordview';
import { userForgotPassword, userForgotSendSms } from './../../../actions/ForgotPassword';
import { resendVerifyCode } from './../../../actions/SignUpModule';
import { connect } from 'react-redux';
import utils from '../../../utils';

class ForgotPasswordController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            sendCodePhone: {
                email: '',
                phone: '',
            },
        }
    }


    codeScreen(e) {

        //e
        //O FOR EMAIL
        //1 FOR SMS

        if (!utils.isEmailValid(this.state.email)) {
            utils.topAlertError("Email is required");
            return;
        }

        if (this.state.sendCodePhone.email.length === 0) {
            this.props.userForgotPassword(this.state.email).then((e) => {
                this.setState({
                    sendCodePhone: {
                        email: 'Send code via email\n' + e.email,
                        phone: 'Send code via phone\n' + e.phone
                    }
                });
            })
        } else {
            if (e === 0) {

                this.props.resendVerifyCode(this.state.email).then(() => {
                    this.props.navigation.navigate('VerificationCode', { email: this.state.email, isChangePassword: true });
                });

            } else {
                let tmpPhone = this.state.sendCodePhone.phone.substring(this.state.sendCodePhone.phone.lastIndexOf('\n')+1, this.state.sendCodePhone.phone.length);
                this.props.userForgotSendSms(tmpPhone).then(() => {

                    this.props.navigation.navigate('VerificationCode', { phone: tmpPhone, isChangePassword: true });
                });
            }

        }
    }

    setEmail(e) {
        this.setState({ email: e })
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    render() {
        return (
            <ForgotPasswordView
                sendCodePhone={this.state.sendCodePhone}
                userEmail={this.state.email}
                setEmail={(e) => this.setEmail(e)}
                openVerificationCodeScreen={(e) => this.codeScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}


const mapDispatchToProps = dispatch => ({
    userForgotPassword: (data) => dispatch(userForgotPassword(data)),
    userForgotSendSms: (data) => dispatch(userForgotSendSms(data)),
    resendVerifyCode: (data) => dispatch(resendVerifyCode(data)),

});

export default connect(
    null,
    mapDispatchToProps
)(ForgotPasswordController);
