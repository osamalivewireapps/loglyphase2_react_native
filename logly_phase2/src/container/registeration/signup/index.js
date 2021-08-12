/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import RegistrationView from './registrationview';
import { userSignUpRequest, getStateRequest, getCityRequest } from '../../../actions/SignUpModule';
import { connect } from 'react-redux';
import utils from '../../../utils';

class RegistrationController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'test1@test1.com',
            password: 'Test12345',
            phoneNo: 'test',
            state: '"Arizona"',
            city: "Brenda",
            Zipcode: '12345',
            dataState: [],
            dataCity: [],
            userState: "",
            userCity: "",

            userName: '',
            userMsg: true,
        }
    }

    currentActions = "";

    componentDidMount() {
        this.setCurrentAction("GET_STATES");
        this.props.getStateRequest();
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    openRegisterAccount() {
        this.props.navigation.navigate('RegisterAccountType')
        // this.setCurrentAction("USER_SIGNUP");
        // this.props.userSignUpRequest(this.state);
    }

    componentDidUpdate() {

        console.log("props---->", this.props);

        switch (this.currentActions) {
            case "GET_STATES":
                this.setState({
                    dataState: this.props.dataState.payload.data,
                    //userCity: this.props.dataState.payload.data[0].name
                })
                this.emptyCurrentAction();
                break;

            case "GET_CITIES":
                console.log("data-->", this.props.dataCity.payload.data);
                this.setState({
                    dataCity: this.props.dataCity.payload.data,
                    //userState: this.props.dataCity.payload.data[0].name
                })
                this.emptyCurrentAction();
                break;

            case "USER_SIGNUP":
                console.log("data-->", this.props.signUpObject.payload.data);
                this.emptyCurrentAction();
                break;
        }
    }

    emptyCurrentAction() {
        this.currentActions = "";
    }

    setCurrentAction(e) {
        this.currentActions = e;
    }

    setStateLocation(txt) {
        //txt.name && txt.stateId
        this.setState({
            userState: txt.name,
            userCity: "",
        });
        if (txt.stateId !== -1) {
            this.setCurrentAction("GET_CITIES");
            this.props.getCityRequest(txt.stateId);
        }
    }

    setCityLocation(txt) {
        //txt.name && txt.cityId
        this.setState({ userCity: txt.name, locNameMgs: utils.combineGeneralValidate(txt) });
    }

    setUserName(txt) {
        this.setState({ userName: txt, userMsg: utils.isValidUserName(txt) });
    }

    setPassword(txt) {
        this.setState({
            password: txt,
            passwordMsg: utils.combinePasswordValidate(txt),
        });
    }

    render() {
        return (
            <RegistrationView props
                arrStates={this.state.dataState}
                userState={this.state.userState}
                userStateLocation={(e) => this.setStateLocation(e)}
                arrCity={this.state.dataCity}
                userCityLocation={(e) => this.setCityLocation(e)}
                userCity={this.state.userCity}
                openRegisterAccount={(e) => this.openRegisterAccount(e)}
                backScreen={(e) => { this.goingBack(e) }}

                enterName={this.state.userName}
                validateName={this.state.userMsg}
                setUserName={(e) => { this.setUserName(e) }}


            />
        );
    }
}

const mapStateToProps = ({ user }) => ({
    signUpObject: user.signUpData,
    dataState: user.stateData,
    dataCity: user.cityData
});

const mapDispatchToProps = dispatch => ({
    getStateRequest: () => dispatch(getStateRequest()),
    userSignUpRequest: (data) => dispatch(userSignUpRequest(data)),
    getCityRequest: (data) => dispatch(getCityRequest(data))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegistrationController);
