/* eslint-disable quotes */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import Util from '../../../utils';
import AddContactsView from './contactview';
import utils from '../../../utils';
import { addContactDetails, editContactDetails, getContacts, getContactDetails } from '../../../actions/ContactModule'
import { getStateRequest, getCityRequest } from '../../../actions/SignUpModule';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';

class AddContacts extends Component {

    constructor(props) {
        super(props);

        console.log("add contact props-->", props);

        this.state = {
            state: props.route.params.contactData?.state,
            city: props.route.params.contactData?.city,
            userState: props.route.params.contactData?.state,
            userCity: props.route.params.contactData?.city,
            selectCity: true,
            selectState: true,
            fileUri: "",
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

            addContact={(e) => this.addContact(e)}
            capturePic={(e)=>{this.getPic(e)}}

            imgUri={this.state.fileUri}

        />);
    }

    addContact(e) {

        console.log("dataToSubmit fields", e)
        if (this.validateFields(e)) {
            if (this.props.route.params.contactData) {
                this.props.editContactDetails(this.props.route.params.contactData._id, e).then((proceed) => {

                    if (proceed){
                        this.props.getContactDetails(this.props.route.params.contactData._id);
                        this.props.route.params.updateContacts();
                        this.props.navigation.pop();
                    }
                });

            } else {
                this.props.addContactDetails(e).then((proceed) => {

                    if (proceed){
                        this.props.route.params.updateContacts();
                        this.props.navigation.pop();
                    }
                });
            }
           
        }
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
        else if (!utils.isEmailValid(email[0])) {

            utils.topAlertError("Email is required");

            this.setState({
                userEmail: false
            });
            return false;
        }
        else if (!utils.isValidPhone(phone[0])) {

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
    };



    //////////////////////////  CAMERA && GALLERY //////////////////
    options = {
        title: 'Select Image',
        maxWidth: 500,
        maxHeight: 500,
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    getPic(txt) {

        if (txt === "camera") {
            launchCamera(this.options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.errorCode) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.assets[0].uri, type: response.assets[0].type, fileName: response.assets[0].fileName };
                    //this.props.uploadPicRequest(source)
                    this.setState({ fileUri: response.assets[0].uri })
                }
            });
        }
        else {
            launchImageLibrary(this.options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.assets[0].uri, type: response.assets[0].type, fileName: response.assets[0].fileName };
                    //this.props.uploadPicRequest(source)
                    this.setState({ fileUri: response.assets[0].uri })
                }
            });
        }
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
    addContactDetails: (data) => dispatch(addContactDetails(data)),
    editContactDetails: (id, data) => dispatch(editContactDetails(id, data)),
    getContacts: (data) => dispatch(getContacts(data)),
    getContactDetails: (data) => dispatch(getContactDetails(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddContacts);
