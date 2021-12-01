/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Util from '../../../utils';
import AddContactsView from './contactview';
import { getStateRequest, getCityRequest } from '../../../actions/SignUpModule';

class AddContacts extends Component {

    constructor(props) {
        super(props);

        console.log("add contact props-->",props);

        this.state = {
            state: props.route.params?.contactData ? props.route.params?.contactData.state:'',
            city: props.route.params?.contactData ? props.route.params?.contactData.city : '',
            userState: props.route.params?.contactData ? props.route.params?.contactData.state : '',
            userCity: props.route.params?.contactData ? props.route.params?.contactData.city : '',
            selectCity:true,
            selectState:true
        };
    }

    componentDidMount() {
      this.props.getStateRequest();
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



    render() {
        return (<AddContactsView {...this.props}

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


        />);
    }
}

const mapStateToProps = ({ user }) => {

    return {
        dataState: user.stateData,
        dataCity: user.cityData,
    };
};

const mapDispatchToProps = dispatch => ({
    getStateRequest: () => dispatch(getStateRequest()),
    getCityRequest: (data) => dispatch(getCityRequest(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddContacts);
