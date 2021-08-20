/* eslint-disable curly */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { SafeAreaView, Text, Image, Dimensions, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { CHARITY_ID, PET_LOVER_ID } from '../../../constants';
import { Colors, Fonts, Images } from '../../theme';
import VerificationCodeView from './verificationcodeview';
import { userVerifyCode } from './../../../actions/SignUpModule';
import { VERIFY_CODE } from '../../../actions/ActionTypes';
import utils from '../../../utils';

class VerificationCodeController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pinCode: '',
        }
    }

    setPinCode(code) {
        this.setState({ pinCode: code })
    }

    enterNewPasswordScreen(e) {

        //CALL VERIFICATION CODE API..
        if (!this.state.pinCode) {
            utils.topAlertError("Please enter code..")
        } else
            this.props.userVerifyCode(this.state.pinCode)

    }

    componentDidUpdate() {
        switch (this.currentActions) {
            case VERIFY_CODE:
                console.log("subs_data-->", this.props.subsData.payload.data);
                this.setCurrentAction("");
                if (this.props.route.params === undefined) {
                    this.props.navigation.navigate('ChangePassword')
                }
                else {
                    if (this.props.route.params.accountType === PET_LOVER_ID || this.props.route.params.accountType === CHARITY_ID)
                        this.props.navigation.navigate('ThanksRegistration');
                    else
                        this.props.navigation.navigate('BusAccountPackages', { showBack: false });
                }
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

    render() {
        return (
            <VerificationCodeView
                verificationCode={this.state.pinCode}
                setPinCode={(e) => this.setPinCode(e)}
                openEnterPasswordScreen={(e) => this.enterNewPasswordScreen(e)}
                backScreen={(e) => { this.goingBack(e) }} />
        );
    }
}

const mapStateToProps = ({ user }) => ({
    verifyData: user.verifyData,

});

const mapDispatchToProps = dispatch => ({
    userVerifyCode: (data) => dispatch(userVerifyCode(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerificationCodeController);
