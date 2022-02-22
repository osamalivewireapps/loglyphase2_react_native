/* eslint-disable quotes */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import Util from '../../../utils';
import utils from '../../../utils';
import { updateUser } from '../../../actions/LoginModule'
import { getStateRequest, getCityRequest, getZipCodeByCityRequest } from '../../../actions/SignUpModule';
import DataHandler from '../../../utils/DataHandler';
import EditProfileView from './edtprofileview';
import { INDIVIDUAL } from '../../../constants';

class EditProfile extends Component {

    constructor(props) {
        super(props);

        console.log("add contact props-->", props);

        this.state = {
            state: '',
            city: '',
            userState: '',
            userCity: '',
            selectCity: true,
            selectState: true,
            userZipCode: true,
            name: '',
            email: '',
            phone: '',
            description: '',
            empQuantity: '',
            isBusEmployees: true,
            busName: '',
            isBusName: true,
            busUrl: '',
            isBusUrl: true,
            userMsg: true
        };
    }

    componentDidMount() {

        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        });

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);


            this.setState({
                state: this.userObject.state,
                city: this.userObject.city,
                userState: this.userObject.state,
                userCity: this.userObject.city,
                name: this.userObject.name,
                email: this.userObject.email,
                phone: this.userObject.phone,
                Zipcode: this.userObject.zipcode ? this.userObject.zipcode + "" : '',
                description: this.userObject.description ? this.userObject.description : '',
                empQuantity: this.userObject.noOfEmployees ? this.userObject.noOfEmployees : '',
                busName: this.userObject.businessName ? this.userObject.businessName + "" : '',
                busUrl: this.userObject.website ? this.userObject.website + '' : ''
            })
        });
        this.props.getStateRequest();
    }

    setStateLocation(txt) {
        this.setState({
            userState: txt.name,
            userCity: "",
            stateId: -1,
            selectState: Util.isLengthGreaterZero(txt.name),
        });
    }

    setCityLocation(txt) {
        this.setState({
            userCity: txt.name,
            cityId: -1,
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
        this.setState({ Zipcode: txt, userZipCode: utils.isValidZipCode(this.state.city, txt, this.props.zipCodesData?.payload.data) });
    }


    setEmpQuantity(txt) {
        this.setState({ empQuantity: txt, isBusEmployees: utils.isLengthGraterThanZero(txt) });
    }

    setBusName(txt) {
        this.setState({ busName: txt, isBusName: utils.isLengthGreater(txt) });
    }

    setBusUrl(txt) {
        this.setState({ busUrl: txt, isBusUrl: utils.isValidLink(txt) });
    }
    render() {
        return (<EditProfileView {...this.props}
            userObject={this.userObject}
            name={this.state.name}
            email={this.state.email}
            phone={this.state.phone}
            enterZipCode={this.state.Zipcode}
            description={this.state.description}

            validName={this.state.userMsg}

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

            addContact={(e) => this.addContact(e)}

            zipCodes={this.props.zipCodesData && this.props.zipCodesData.payload?.data ? this.props.zipCodesData.payload.data : []}
            setZipCode={(e) => { this.setZipCode(e) }}
            validateZipCode={this.state.userZipCode}

            strengthEmp={this.state.empQuantity}
            validateBusEmp={this.state.isBusEmployees}
            setEmpStrength={(e) => this.setEmpQuantity(e)}

            nameBus={this.state.busName}
            validateBusName={this.state.isBusName}
            setBusName={(e) => this.setBusName(e)}

            urlBus={this.state.busUrl}
            validateBusURL={this.state.isBusUrl}
            setBusUrl={(e) => this.setBusUrl(e)}

            accountType={this.accountType}

        />);
    }

    addContact(e) {

        const { city, name, noOfEmployees, zipcode,
            phone, state, businessName, description, website } = e;

        if (this.validateFields(e)) {
            this.props.updateUser(e).then((proceed) => {

                if (proceed) {
                    this.props.route.params.updateUser();
                    this.props.navigation.pop();
                }
            });

        }
    }

    validateFields(e) {

        const { city, name, noOfEmployees, zipcode,
            phone, state, businessName, description } = e;

        Keyboard.dismiss();


        console.log('account type---->', this.accountType.toLowerCase())
        if (!this.accountType.toLowerCase().includes(INDIVIDUAL.toLowerCase()) && !utils.isLengthGreater(businessName)) {

            utils.topAlertError("Business Name is required");

            this.setState({
                isBusName: false
            });
            return false;
        }
        else if (!this.accountType.toLowerCase().includes(INDIVIDUAL.toLowerCase()) && !utils.isLengthGraterThanZero(noOfEmployees)) {

            utils.topAlertError("No.of.Employees is required");

            this.setState({
                isBusEmployees: false
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
        else if (!utils.isLengthGreater(zipcode)) {

            utils.topAlertError("Zipcode is required");

            this.setState({
                userZipCode: false
            });
            return false;
        }


        return true;
    };




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
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    getZipCodeByCityRequest: (data) => dispatch(getZipCodeByCityRequest(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditProfile);
