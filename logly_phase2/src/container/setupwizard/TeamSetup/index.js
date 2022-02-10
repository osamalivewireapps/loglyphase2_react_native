/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import DataHandler from "../../../utils/DataHandler";
import TeamSetupView from "./teamsetup_view";
import { CommonActions } from "@react-navigation/native";
import { removeMember, addMemberDetails, editMemberDetails, getTeamMembers, getMemberDetails } from '../../../actions/TeamMembersModule'
import { postSetupWizard } from '../../../actions/SetupWizardModule';
import { getStateRequest, getCityRequest } from '../../../actions/SignUpModule';
import { connect } from 'react-redux';
import { Alert } from "react-native";
import Util from "../../../utils";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import moment from "moment";

class TeamSetup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrServices: [],
            accountType: '',
            state: '',
            city: '',
            userState: '',
            userCity: '',
            selectCity: true,
            selectState: true,
            fileUri: '',
        };

        DataHandler.getAccountType().then((value) => {
            this.setState({ accountType: value });
        });


    }

    componentDidMount() {
        this.setState({ arrServices: [] })
        this.getContacts();
        this.props.getStateRequest();

        DataHandler.getBusDetails().then((value) => {
            this.busDetails = JSON.parse(value);
        })

        DataHandler.getAnimalList().then((value) => {
            this.animal = JSON.parse(value);
        })

        DataHandler.getProductList().then((value) => {
            this.product = JSON.parse(value);
        })
    }

    setStateLocation(txt) {
        this.setState({
            userState: txt.name ===null?'':txt.name,
            userCity: "",
            stateId: -1,
            selectState: txt.name === null ?true:Util.isLengthGreaterZero(txt.name),
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

    getContacts(e) {
        this.props.getTeamMembers('')
            .then((response) => {
                this.setState({ arrServices: response.payload });
            });
    }

    confirmModal = (e) => {
        Alert.alert(`Are you sure you want to delete?`, '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => { this.removeMember(e) } },

            ],
            { cancelable: false }
        );

    }

    removeMember(id) {
        this.props.removeMember(id).then((proceed) => {

            if (proceed) {
                this.getContacts();
            }
        });

    }

    backScreen() {
        this.props.navigation.pop(2);
    }

    clickNextButton(e) {

        // if (e) {
        //     DataHandler.saveBusDetails(null)
        //     this.forwardScreen();
        //     return
        // }

        let tmpEmp = {}
        tmpEmp.employeeArray = this.state.arrServices;
        let animalList = this.animal ? this.animal.map((value) => value._id) : []
        let productList = this.product ? this.product.map((value) => value._id) : [];
        tmpEmp.selectedAnimalForms = animalList;
        tmpEmp.selectedProductForm = productList;

        if (this.busDetails) {
            tmpEmp.businessDetails = this.busDetails
        }
        console.log('teams--->', tmpEmp)

        this.props.postSetupWizard(tmpEmp).then((response) => {
            if (response) {
                this.forwardScreen();
                DataHandler.saveAnimalList(null);
                DataHandler.saveProductList(null);
                DataHandler.saveBusDetails(null)
            }
        })
    }

    forwardScreen() {
        const resetAction = CommonActions.reset({
            index: 1,
            routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
        });

        this.props.navigation.dispatch(resetAction);
    }

    addMember(e) {

        let tmp = this.state.arrServices;
        if (!tmp || tmp.length === 0) {
            this.addContact(e)
        }
        else {
            let itemService = tmp.find(item => item.id === e.id);
            if (itemService) {
                this.addContact(e)
            } else {
                this.addContact(e)
            }

        }
    }

    delMember(e) {
        if (this.state.arrServices[e].notificationSettings)
            this.removeMember(this.state.arrServices[e]._id)
        else {
            let tmp = this.state.arrServices;
            tmp.splice(e, 1);
            this.setState({ arrServices: tmp })
        }
    }

    render() {
        return (<TeamSetupView

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

            capturePic={(e) => { this.getPic(e) }}
            imgUri={this.state.fileUri}

            accountType={this.state.accountType}
            delMember={(e) => this.delMember(e)}
            addMember={(e) => { this.addMember(e) }}
            wholeServices={this.state.arrServices}
            clickNextButton={(e) => { this.clickNextButton(e) }}
            backScreen={(e) => { this.backScreen(e) }} />);
    }

    addContact(e) {

        const { address, city, email, name,id,
            phone, state, emergencyContact, isExist } = e;

        let formdata = new FormData();
        formdata.append('address', address);
        formdata.append('city', city);
        formdata.append('email', email);
        formdata.append('name', name);
        formdata.append('phone', phone);
        formdata.append('state', state);
        formdata.append('emergencyContact', '{}');
        formdata.append('canAccessMobileApp', true);
        formdata.append('canAccessInventoryManagement', true);
        formdata.append('active', true);

        if (this.state.fileUri && this.state.fileUri.length > 0 && !this.state.fileUri.includes('https'))
            formdata.append('file', {
                uri: this.state.fileUri,
                name: 'team_member' + moment().unix() + '.jpg', type: 'image/jpg',
            });

        console.log("dataToSubmit fields", formdata);

        if (isExist) {
            this.props.editContactDetails(id, formdata).then((proceed) => {

                if (proceed) {
                    this.getContacts()
                }
            });
        }
        else {
            this.props.addContactDetails(formdata).then((proceed) => {

                if (proceed) {
                   this.getContacts()
                }
            });
        }

    }


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

const mapStateToProps = ({ team_members, user }) => {
    return {
        teamListing: team_members.teamListing,
        dataState: user.stateData,
        dataCity: user.cityData,
    };
};

const mapDispatchToProps = dispatch => ({
    getStateRequest: () => dispatch(getStateRequest()),
    getCityRequest: (data) => dispatch(getCityRequest(data)),
    getTeamMembers: () => dispatch(getTeamMembers('')),
    removeMember: (id) => dispatch(removeMember(id)),
    postSetupWizard: (data) => dispatch(postSetupWizard(data)),
    addContactDetails: (data) => dispatch(addMemberDetails(data)),
    editContactDetails: (id, data) => dispatch(editMemberDetails(id, data)),
    getContacts: (data) => dispatch(getTeamMembers(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamSetup);
