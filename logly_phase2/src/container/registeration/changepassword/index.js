/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { Colors, Fonts, Images } from '../../../theme';
import ChangePasswordView from './changepasswordview';
import { userPasswordResetCode } from '../../../actions/ForgotPassword'
import { connect } from 'react-redux';
import utils from '../../../utils';

class ChangePasswordController extends Component {

    constructor(props) {
        super(props);
        console.log("params--->", this.props.route.params)
        this.state = {
            password: "",
            confirmPassword: ""
        }
    }

    passwordResetScreen(e) {
        if (this.validateFields()) {
            this.props.userPasswordResetCode({ pinCode: this.props.route.params.pinCode, password: this.state.password })
                .then(() => {
                    this.props.navigation.navigate('PasswordReset')
                })

        }
    }

    validateFields() {
        if (!utils.isPasswordValid(this.state.password)) {
            utils.topAlertError("password is required");
            return false;
        } else {
            if (!utils.isPasswordValid(this.state.confirmPassword)) {
                utils.topAlertError("confirm password is required");
                return false;
            } else if (this.state.password !== this.state.confirmPassword) {
                utils.topAlertError("password not matched");
                return false;
            } else
                return true;
        }
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    setPassword(txt) {
        this.setState({
            password: txt,
        });
    }

    setConfirmPassword(txt) {
        this.setState({
            confirmPassword: txt,
        });
    }

    render() {
        return (
            <ChangePasswordView
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                setPassword={(e) => this.setPassword(e)}
                setConfirmPassword={(e) => this.setConfirmPassword(e)}
                openpasswordResetScreen={(e) => this.passwordResetScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    userPasswordResetCode: (data) => dispatch(userPasswordResetCode(data)),

});

export default connect(
    null,
    mapDispatchToProps
)(ChangePasswordController);


