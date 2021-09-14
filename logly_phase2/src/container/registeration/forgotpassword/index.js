/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import ForgotPasswordView from './forgotpasswordview';
import { userForgotPassword } from './../../../actions/ForgotPassword';
import { connect } from 'react-redux';
import utils from '../../../utils';

class ForgotPasswordController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:""
        }
    }

    codeScreen(e) {
        
        if (!utils.isEmailValid(this.state.email)) {
            utils.topAlertError("email is required");
            return;
        }

        this.props.userForgotPassword(this.state.email).then(() => {
            this.props.navigation.navigate('VerificationCode', { email: this.state.email,isChangePassword:true});
        })
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
                userEmail={this.state.email}
                setEmail={(e) => this.setEmail(e)}
                openVerificationCodeScreen={(e) => this.codeScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}


const mapDispatchToProps = dispatch => ({
    userForgotPassword: (data) => dispatch(userForgotPassword(data)),

});

export default connect(
    null,
    mapDispatchToProps
)(ForgotPasswordController);
