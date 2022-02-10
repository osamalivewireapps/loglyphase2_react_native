/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import DataHandler from '../../../utils/DataHandler';
import { connect } from 'react-redux';
import CRMAddCustomersView from './crm_customers_view'
import utils from '../../../utils';
import { getStateRequest, getCityRequest, getZipCodeByCityRequest } from '../../../actions/SignUpModule';
import { addBreeder } from '../../../actions/TeamMembersModule'
class CRMAddCustomers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userObject: {},
            state: props.route.params?.contactData?.state,
            city: props.route.params?.contactData?.city,
            Zipcode: '',
            userState: props.route.params?.contactData?.state,
            userCity: props.route.params?.contactData?.city,
            userZipCode: true,
            selectCity: true,
            selectState: true,
        };
    }

    componentDidMount() {

        this.props.getStateRequest();
        DataHandler.getUserObject().then((value) => {
            this.setState({ userObject: JSON.parse(value) });
        });
    }

    setStateLocation(txt) {
        this.setState({
            userState: txt.name,
            userCity: "",
            stateId: -1,//txt.stateId,
            selectState: utils.isLengthGreaterZero(txt.name),
        });
    }

    setCityLocation(txt) {
        this.setState({
            userCity: txt.name,
            cityId: -1,//txt.cityId,
            selectCity: utils.isLengthGreaterZero(txt.name)
        });
    }

    chooseCity(txt) {
        this.setState({
            userCity: txt.name,
            cityId: txt.cityId,
            selectCity: utils.isLengthGreaterZero(txt.name),
            Zipcode: "",
        });
        this.props.getZipCodeByCityRequest(txt.name);
    }

    chooseState(txt) {
        this.setState({
            userState: txt.name,
            userCity: "",
            stateId: txt.stateId,
            cityId: -1,
            selectState: utils.isLengthGreaterZero(txt.name),
            Zipcode: ''
        });
        this.props.getCityRequest(txt.stateId);
    }

    setZipCode(txt) {
        this.setState({ Zipcode: txt, userZipCode: utils.isValidZipCode(this.state.city, txt, this.props.zipCodesData?.payload.data) });
    }

    render() {
        return (<CRMAddCustomersView
            {...this.props}
            userObject={this.state.userObject}
            toggleDrawer={this.props.navigation}
            arrStates={this.props.dataState.payload?.data}
            userState={this.state.userState}
            userStateLocation={(e) => this.setStateLocation(e)}
            chooseState={(e) => { this.chooseState(e) }}
            validateState={this.state.selectState}

            arrCity={this.props.dataCity.payload?.data}
            userCityLocation={(e) => this.setCityLocation(e)}
            userCity={this.state.userCity}
            chooseCity={(e) => { this.chooseCity(e) }}
            validateCity={this.state.selectCity}

            zipCodes={this ? this.props.zipCodesData.payload?.data : []}
            enterZipCode={this.state.Zipcode}
            validateZipCode={this.state.userZipCode}
            setZipCode={(e) => { this.setZipCode(e) }}

            addBreeder={(e) => { this.addBreeders(e) }}
        />);
    }

    validateFields(e) {

        const { address, category, city, email, name,
            phone, state } = e;

        Keyboard.dismiss();

        if (!utils.isLengthGreater(name)) {

            utils.topAlertError("Name is required");

            this.setState({
                userMsg: false
            });
            return false;
        }
        else if (!utils.isEmailValid(email)) {

            utils.topAlertError("Email is required");

            this.setState({
                userEmail: false
            });
            return false;
        }
        else if (!phone || !utils.isValidPhone(phone)) {

            utils.topAlertError("Phone is required");

            this.setState({
                userPhone: false
            });
            return false;
        }
        else if (!utils.isLengthGreater(state)) {

            utils.topAlertError("State is required");

            this.setState({
                selectState: false
            });
            return false;
        }
        else if (!utils.isLengthGreater(city)) {

            utils.topAlertError("City is required");

            this.setState({
                selectCity: false
            });
            return false;
        }
        // else if (!utils.isLengthGreater(address)) {

        //     utils.topAlertError("Address is required");

        //     this.setState({
        //         selectCity: false
        //     });
        //     return false;
        // }


        return true;
    }

    addBreeders(e) {

        const { address,city, email, name,
            phone, state} = e;

        let formdata = new FormData();
        //formdata.append('address', address);
        formdata.append('city', city);
        formdata.append('email', email);
        formdata.append('name', name);
        formdata.append('phone', phone);
        formdata.append('state', state);

        if (this.validateFields(e)) {
            formdata.append('password', this.generatePassword());
            this.props.addBreeder(formdata).then((proceed) => {


                if (proceed) {
                    this.props.route.params.updateContacts(proceed);
                    setTimeout(()=>{
                        this.props.navigation.pop()
                    },200)
                }
            });
        }
    }

    generatePassword = () => {
        var length = 10,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
}

const mapStateToProps = ({ user }) => {

    return {
        dataState: user.stateData,
        dataCity: user.cityData,
        zipCodesData: user.zipCodeData,
    };
};

const mapDispatchToProps = dispatch => ({
    getStateRequest: () => dispatch(getStateRequest()),
    getCityRequest: (data) => dispatch(getCityRequest(data)),
    getZipCodeByCityRequest: (data) => dispatch(getZipCodeByCityRequest(data)),
    addBreeder: (data) => dispatch(addBreeder(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CRMAddCustomers);
