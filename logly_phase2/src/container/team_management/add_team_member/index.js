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
import { addMemberDetails, editMemberDetails, getTeamMembers, getMemberDetails } from '../../../actions/TeamMembersModule'
import { getStateRequest, getCityRequest } from '../../../actions/SignUpModule';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import AddTeamMemberView from './add_team_member_view';
import moment from 'moment';

class AddTeamMember extends Component {

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
            fileUri: props.route.params.contactData ? props.route.params.contactData?.image : '',
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
        return (<AddTeamMemberView {...this.props}

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
            capturePic={(e) => { this.getPic(e) }}

            imgUri={this.state.fileUri}

        />);
    }

    addContact(e) {

        const { address, category, city, email, name,
            phone, state, emergencyContact } = e;

        let formdata = new FormData();
        formdata.append('address', address);
        formdata.append('city', city);
        formdata.append('email', email);
        formdata.append('name', name);
        formdata.append('phone', phone);
        formdata.append('state', state);
        formdata.append('emergencyContact', JSON.stringify(emergencyContact));
        formdata.append('canAccessMobileApp', true);
        formdata.append('canAccessInventoryManagement', true);
        formdata.append('active', true);
        
        if (this.state.fileUri && this.state.fileUri.length > 0 && !this.state.fileUri.includes('https'))
            formdata.append('file', {
                uri: this.state.fileUri,
                name: 'team_member' + moment().unix() + '.jpg', type: 'image/jpg',
            });

        console.log("dataToSubmit fields", formdata);

        if (this.validateFields(e)) {
            if (this.props.route.params.contactData) {
                this.props.editContactDetails(this.props.route.params.contactData._id, formdata).then((proceed) => {

                    if (proceed) {
                        this.props.getContactDetails(this.props.route.params.contactData._id);
                        this.props.route.params.updateContacts();
                        this.props.navigation.pop();
                    }
                });

            } else {
                this.props.addContactDetails(formdata).then((proceed) => {

                    if (proceed) {
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
                    console.log('camera----->', response);
                    const source = { uri: response.uri, type: response.type, fileName: response.fileName };
                    this.setState({ fileUri: response.uri })
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
                    const source = { uri: response.uri, type: response.type, fileName: response.fileName };
                    //this.props.uploadPicRequest(source)
                    this.setState({ fileUri: response.uri })
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
    addContactDetails: (data) => dispatch(addMemberDetails(data)),
    editContactDetails: (id, data) => dispatch(editMemberDetails(id, data)),
    getContacts: (data) => dispatch(getTeamMembers(data)),
    getContactDetails: (data) => dispatch(getMemberDetails(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddTeamMember);
