/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { SafeAreaView, Text, Image, Dimensions, View } from 'react-native';
import utils from '../../../utils';
import DataHandler from '../../../utils/DataHandler';
import { Colors, Fonts, Images } from '../../../theme';
import BusinessOwnerView from './bus_owner_view';
import { userSignUpRequest } from './../../../actions/SignUpModule';
import { connect } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';

class BusinessOwnerController extends Component {

    constructor(props) {
        super(props);

        this.state = {

            busName: '',
            empQuantity: 0,
            busUrl: "",
            isBusName: true,
            isBusEmployees: true,
            isBusUrl: true,
            image: "",
            fileName: "",
            phoneNo: "",
            userPhone: true
        }
    }

    componentDidMount() {

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });
    }
    goingBack(e) {
        this.props.navigation.pop();
    }

    openRegisterAccount() {
        if (this._validateForm()) {

            this.userObject = {
                ...this.userObject,
                "businessName": this.state.busName,
                "noOfEmployees": this.state.empQuantity,
                "website": this.state.busUrl,
                "packageId": "",
                "image": this.state.image
            }

            //TEMPORARY NOT NEED
            // if (this.props.route.params.accountType.toLowerCase().startsWith("charity") && !this.state.fileName){
            //     utils.topAlert("Please attach form before proceeding")
            //     return;
            // }

            //CALL REGISTRATION API..
            this.props.userSignUpRequest(this.userObject).then((response) => {
                if (DataHandler.saveUserObject(JSON.stringify(response.payload))) {
                    this.props.navigation.navigate("VerificationCode", { isForgotPassword: false, accountType: response.payload.packageType, email: response.payload.email });
                    this.setState({ fileName: '', image: '' })
                }
            });

        }
    }

    setBusName(txt) {
        this.setState({ busName: txt, isBusName: utils.isLengthGreater(txt) });
    }

    setEmpQuantity(txt) {
        this.setState({ empQuantity: txt, isBusEmployees: utils.isLengthGraterThanZero(txt) });
    }

    setBusUrl(txt) {
        this.setState({ busUrl: txt, isBusUrl: utils.isValidLink(txt) });
    }

    setPhoneNo(text) {
        let tmp = "";

        if (text.length > this.state.phoneNo.length) {
            if (text.length > 3 && text.length <= 4 && !text.includes("-")) {
                tmp = text.substr(0, 3) + "-" + text.substr(3, text.length);
            }
            else if (text.length > 7 && text.length <= 8) {
                tmp = text.substr(0, 7) + "-" + text.substr(7, text.length);
            }
            else {
                tmp = text
            }
        } else {
            tmp = text;
        }
        this.setState({ phoneNo: tmp, userPhone: utils.isValidPhone(tmp) });
    }

    render() {
        return (
            <BusinessOwnerView

                nameBus={this.state.busName}
                validateBusName={this.state.isBusName}
                setBusName={(e) => this.setBusName(e)}

                strengthEmp={this.state.empQuantity}
                validateBusEmp={this.state.isBusEmployees}
                setEmpStrength={(e) => this.setEmpQuantity(e)}

                urlBus={this.state.busUrl}
                validateBusURL={this.state.isBusUrl}
                setBusUrl={(e) => this.setBusUrl(e)}

                accountType=''//{this.props.route.params.accountType}
                openRegisterAccount={(e) => this.openRegisterAccount(e)}
                backScreen={(e) => { this.goingBack(e) }}
                openDocumetFolder={(e) => { this.openDocumetFolder(e) }}

                fileName={this.state.fileName}
                deleteFile={(e) => { this.deleteFile(e) }}

                enterPhone={this.state.phoneNo}
                validatePhone={this.state.userPhone}
                setPhone={(e) => { this.setPhoneNo(e) }}
            />
        );
    }

    openDocumetFolder() {
        this.docPicker()
    }

    deleteFile() {
        this.setState({ image: "", fileName: "" });
    }

    _validateForm = () => {
        const { phoneNo, busName, empQuantity, busUrl, isBusName, isBusEmployees, isBusUrl } = this.state;

        Keyboard.dismiss();

        if (!utils.isLengthGreater(busName)) {

            utils.topAlertError("Business Name is required");

            this.setState({
                isBusName: false
            });
            return false;
        }
        else if (!utils.isLengthGreater(phoneNo)) {

            utils.topAlertError("Phone is required");

            this.setState({
                userPhone: false
            });
            return false;
        }
        else if (!utils.isLengthGraterThanZero(empQuantity)) {

            utils.topAlertError("No.of.Employees is required");

            this.setState({
                isBusEmployees: false
            });
            return false;
        }
        // else if (!utils.isValidLink(busUrl)) {

        //     utils.topAlertError("url is required");

        //     this.setState({
        //         isBusUrl: false
        //     });
        //     return false;
        // }


        return true;
    };

    async docPicker() {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
            });
            console.log("uri--->", res[0].uri);
            this.setState({ image: res[0].uri, fileName: res[0].name });
            //this.uploadAPICall(res);//here you can call your API and send the data to that API
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }
}

const mapStateToProps = ({ user }) => ({
    signUpObject: user.signUpData,

});

const mapDispatchToProps = dispatch => ({
    userSignUpRequest: (data) => dispatch(userSignUpRequest(data)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BusinessOwnerController);

