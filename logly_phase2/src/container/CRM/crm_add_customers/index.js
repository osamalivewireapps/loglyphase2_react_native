/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DataHandler from '../../../utils/DataHandler';
import { connect } from 'react-redux';
import CRMAddCustomersView from './crm_customers_view'
import Util from '../../../utils';
import { getStateRequest, getCityRequest, getZipCodeByCityRequest } from '../../../actions/SignUpModule';

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
            selectState: Util.isLengthGreaterZero(txt.name),
        });
    }

    setCityLocation(txt) {
        this.setState({
            userCity: txt.name,
            cityId: -1,//txt.cityId,
            selectCity: Util.isLengthGreaterZero(txt.name)
        });
    }

    chooseCity(txt) {
        this.setState({
            userCity: txt.name,
            cityId: txt.cityId,
            selectCity: Util.isLengthGreaterZero(txt.name),
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
            selectState: Util.isLengthGreaterZero(txt.name),
            Zipcode: ''
        });
        this.props.getCityRequest(txt.stateId);
    }

    setZipCode(txt) {
        this.setState({ Zipcode: txt, userZipCode: Util.isValidZipCode(this.state.city, txt, this.props.zipCodesData?.payload.data) });
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
        />);
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
    getZipCodeByCityRequest: (data) => dispatch(getZipCodeByCityRequest(data))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CRMAddCustomers);
