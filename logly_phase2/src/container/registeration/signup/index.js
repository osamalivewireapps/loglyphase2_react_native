/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import RegistrationView from './registrationview';
import { emailCheckRequest, getStateRequest, getCityRequest } from '../../../actions/SignUpModule';
import { connect } from 'react-redux';
import utils from '../../../utils';
import { Keyboard } from 'react-native';
import DataHandler from '../../../utils/DataHandler';

class RegistrationController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',//'osama@livewirelabs.co',
            password:'',//Test12345',
            phoneNo:'',//'12345',
            state: '',
            city: "",
            Zipcode: '',
            userState: "",
            userCity: "",
            stateId: -1,
            cityId: -1,

            userName:'',// 'test',
            userMsg: true,
            userEmail: true,
            userPhone: true,
            selectState: true,
            selectCity: true,
            userZipCode: true,
            userPassword: true,
            isCheckOnTerms: true
        }
    }


    componentDidMount() {
        this.props.getStateRequest();
    }

    goingBack(e) {
        this.props.navigation.pop();
    }
    

    openPolicyScreen(txt){
        this.props.navigation.navigate('PolicyScreen',{header:txt});
    }

    openRegisterAccount() {

        if (this._validateForm()) {

            let userObject = JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                phoneNo: this.state.phoneNo,
                state: this.state.userState,
                city: this.state.userCity,
                stateId: this.state.stateId,
                cityId: this.state.cityId,
                name: this.state.userName,
                zipcode: this.state.Zipcode
            })

             this.props.emailCheckRequest(this.state).then(() => {

                 if (DataHandler.saveUserObject(userObject)) {
                this.props.navigation.navigate('RegisterAccountType');
            }
            });
           
        }
    }


    setStateLocation(txt) {
        this.setState({
            userState: txt.name,
            userCity: "",
            stateId: txt.stateId,
            selectState: utils.isValidUserName(txt.name),
        });
        if (txt.stateId !== -1) {
            if (this.state.userState !== txt.name) {
                this.props.getCityRequest(txt.stateId);
            }
        }
    }

    setCityLocation(txt) {
        this.setState({
            userCity: txt.name,
            cityId: txt.cityId,
            selectCity: utils.isValidUserName(txt.name)
        });
    }

    setUserName(txt) {
        this.setState({ userName: txt, userMsg: utils.isValidUserName(txt) });
    }

    setEmail(txt) {
        this.setState({ email: txt, userEmail: utils.isEmailValid(txt) });
    }

    setPhoneNo(txt) {
        this.setState({ phoneNo: txt, userPhone: utils.isValidUserName(txt) });
    }

    setZipCode(txt) {
        this.setState({ Zipcode: txt, userZipCode: utils.isValidZipCode(this.state.city,txt) });
    }

    setPassword(txt) {
        this.setState({
            password: txt,
            userPassword: utils.isPasswordValid(txt),
        });
    }

    setCheckTerms(isCheck) {
        this.setState({ isCheckOnTerms: isCheck })
    }

    render() {

        return (
            <RegistrationView props
                arrStates={this.props.dataState.payload?.data}
                userState={this.state.userState}
                userStateLocation={(e) => this.setStateLocation(e)}
                validateState={this.state.selectState}

                arrCity={this.props.dataCity.payload?.data}
                userCityLocation={(e) => this.setCityLocation(e)}
                userCity={this.state.userCity}
                validateCity={this.state.selectCity}

                openRegisterAccount={(e) => this.openRegisterAccount(e)}
                backScreen={(e) => { this.goingBack(e) }}

                enterName={this.state.userName}
                validateName={this.state.userMsg}
                setUserName={(e) => { this.setUserName(e) }}

                enterEmail={this.state.email}
                validateEmail={this.state.userEmail}
                setEmail={(e) => { this.setEmail(e) }}

                enterPhone={this.state.phoneNo}
                validatePhone={this.state.userPhone}
                setPhone={(e) => { this.setPhoneNo(e) }}


                enterZipCode={this.state.Zipcode}
                validateZipCode={this.state.userZipCode}
                setZipCode={(e) => { this.setZipCode(e) }}

                enterPassword={this.state.password}
                validatePassword={this.state.userPassword}
                setPassword={(e) => { this.setPassword(e) }}

                checkTerms={this.state.isCheckOnTerms}
                setCheckTerms={(e) => this.setCheckTerms(e)}

                openPolicyScreen = {(e)=> this.openPolicyScreen(e)}



            />
        );
    }


    _validateForm = () => {
        const { userName, email, phoneNo, userState, userCity,
            Zipcode, password, isCheckOnTerms } = this.state;

        Keyboard.dismiss();

        if (!utils.isValidUserName(userName)) {

            utils.topAlertError("name is required");

            this.setState({
                userMsg: false
            });
            return false;
        }
        else if (!utils.isEmailValid(email)) {

            utils.topAlertError("email is required");

            this.setState({
                userEmail: false
            });
            return false;
        }
        else if (!utils.isValidUserName(phoneNo)) {

            utils.topAlertError("phone is required");

            this.setState({
                userPhone: false
            });
            return false;
        }
        else if (!utils.isValidUserName(userState)) {

            utils.topAlertError("state is required");

            this.setState({
                selectState: false
            });
            return false;
        }
        else if (!utils.isValidUserName(userCity)) {

            utils.topAlertError("city is required");

            this.setState({
                selectCity: false
            });
            return false;
        }
        else if (!utils.isValidZipCode(this.state.city, Zipcode)) {

            utils.topAlertError("zipcode is required");

            this.setState({
                userZipCode: false
            });
            return false;
        }
        else if (!utils.isPasswordValid(password)) {

            utils.topAlertError("password is rexquired");

            this.setState({
                userPassword: false
            });
            return false;
        }
        else if (!isCheckOnTerms) {

            utils.topAlertError("Please accept terms before proceeding");
            return false;
        }


        return true;
    };
}

// Map the state of the redux store to the component props.
const mapStateToProps = ({ user }) => {

    return {
        signUpObject: user.signUpData,
        dataState: user.stateData,
        dataCity: user.cityData,
    };
};

const mapDispatchToProps = dispatch => ({
    getStateRequest: () => dispatch(getStateRequest()),
    emailCheckRequest: (data) => dispatch(emailCheckRequest(data)),
    getCityRequest: (data) => dispatch(getCityRequest(data))
    
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegistrationController);
