/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { BUSINESS, BUS_LISTING, BUS_SER_PROVIDER, CHARITY_ACCOUNT, CHARITY_ID, INDIVIDUAL } from "../../../constants";
import DataHandler from "../../../utils/DataHandler";
import BusProfileView from "./busprofileview";
import { CommonActions } from "@react-navigation/native";
import { getBusDetails, uploadSetupWizardImages } from '../../../actions/SetupWizardModule';
import { connect } from "react-redux";
import Util from "../../../utils";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker/src/index';
import moment from "moment";


class BusProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountType: '',
            isServiceEnabled: false,
            busDetails: {},
            fileUri: ''
        }
    }

    componentDidMount() {
        DataHandler.getAccountType().then((value) => {
            this.setState({ accountType: value });
        });

        DataHandler.getBusListing().then((value) => {
            this.setState({ isServiceEnabled: value === "true" ? true : false });
        });

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
            console.log('userObject--->', this.userObject._id)
            if (this.userObject.businessDetails)
                this.props.getBusDetails(this.userObject.businessDetails._id).then((response) => {
                    if (response) {
                        this.setState({ busDetails: response.payload })
                    }
                })
        });

    }
    backScreen() {
        if (this.state.accountType !== INDIVIDUAL && this.state.accountType !== CHARITY_ID && this.state.accountType !== BUSINESS)
            this.props.navigation.pop(2);
        else {
            const resetAction = CommonActions.reset({
                index: 1,
                routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
            });

            this.props.navigation.dispatch(resetAction);
        }
    }

    clickNextButton(e) {

        console.log('bus-details--->', e)

        if (e) {
            if (this.state.fileUri && !this.state.fileUri.includes('http')) {

                let formdata = new FormData();

                formdata.append('file', {
                    uri: this.state.fileUri,
                    name: 'team_member' + moment().unix() + '.jpg', type: 'image/jpg',
                });
                this.props.uploadSetupWizardImages(formdata).then((response) => {
                    if (response) {
                        console.log("imageurl-->", "https://logly.us/api/uploads/images" + response.substring(response.lastIndexOf('/')))
                        e.imageUrl = "https://logly.us/api/uploads/images" + response.substring(response.lastIndexOf('/'));
                        DataHandler.saveBusDetails(JSON.stringify(e));
                        this.navigateScreens()
                    }
                })
            }
            else {
                DataHandler.saveBusDetails(JSON.stringify(e));
                this.navigateScreens()
            }


        }
        else
            this.navigateScreens()

    }
    render() {
        if (this.state.accountType)
            return (<BusProfileView
                capturePic={(e) => { this.getPic(e) }}
                imgUri={this.state.fileUri}
                busDetails={this.state.busDetails}
                isServiceEnabled={this.state.isServiceEnabled}
                accountType={this.state.accountType}
                clickNextButton={(e) => { this.clickNextButton(e) }}
                backScreen={(e) => { this.backScreen(e) }} />);
        else
            return null
    }

    navigateScreens() {
        if (this.state.accountType === BUS_SER_PROVIDER) {
            this.props.navigation.navigate('TeamMemberSetup')
        }
        else if (this.state.accountType === BUSINESS || this.state.accountType === CHARITY_ACCOUNT || this.state.accountType === INDIVIDUAL)
            this.props.navigation.navigate('AnimalInfo')
        else if (this.state.accountType === BUS_LISTING && this.state.isServiceEnabled) {
            this.props.navigation.navigate('TeamMemberSetup')
        }
        else
            this.props.navigation.navigate('HomeDrawer')
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



const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    getBusDetails: (id) => dispatch(getBusDetails(id)),
    uploadSetupWizardImages: (data) => dispatch(uploadSetupWizardImages(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BusProfile);
