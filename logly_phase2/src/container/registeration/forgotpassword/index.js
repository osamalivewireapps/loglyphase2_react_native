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
                formattedEmail: '',
                formattedPhone: ''
            },
        }
    }

    componentDidMount(){
        this.getFormatedEmail('osama@liveirelabs.co')
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

                let tmpEmailFormatted = this.getFormatedEmail(e.email);
                let tmpPhoneFormatted = this.getFormatedPhone(e.phone);
                this.setState({
                    sendCodePhone: {
                        email: e.email,
                        phone: e.phone,
                        formattedEmail: 'Send code via email\n' + tmpEmailFormatted,
                        formattedPhone: 'Send code via phone\n' + tmpPhoneFormatted,
                    }
                });
            })
        } else {
            if (e === 0) {

                this.props.resendVerifyCode(this.state.email).then(() => {
                    this.props.navigation.navigate('VerificationCode', { email: this.state.email, isChangePassword: true });
                });

            } else {
                let tmpPhone = this.state.sendCodePhone.phone;
                this.props.userForgotSendSms(tmpPhone).then(() => {

                    this.props.navigation.navigate('VerificationCode', { phone: tmpPhone, isChangePassword: true });
                });
            }

        }
    }

    getFormatedEmail(email) {

        if (email.length === 0)
            return '';
        let sub1 = email.substring(1, email.lastIndexOf('@')-1);
        let middle = email.substring(email.lastIndexOf('@') - 1, email.lastIndexOf('@')+2)
        let sub2 = email.substring(email.lastIndexOf('@')+3, email.lastIndexOf('.')-1);
        let middle2 = email.substring(email.lastIndexOf('.') - 1, email.length)
        let sum = email[0] + this.getSpecificSteriks(sub1) + middle + this.getSpecificSteriks(sub2) + middle2
        return sum;
    }

    getSpecificSteriks(str) {

        let sterik = '';
        str.split('').map(() => {
            sterik = sterik + '*';
        })
        return sterik;
    }

    getFormatedPhone(phone) {
        if (phone && phone.length > 0)
            return phone.substring(0, 2) + "********" + phone.substring(phone.length - 2, phone.length);
        else
            return '';
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
