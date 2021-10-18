/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { BUSINESS, BUS_LISTING, BUS_SER_PROVIDER, CHARITY_ACCOUNT } from "../../../constants";
import DataHandler from "../../../utils/DataHandler";
import BusProfileView from "./busprofileview";

class BusProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountType: '',
            isServiceEnabled: false
        }
    }

    componentDidMount() {
        DataHandler.getAccountType().then((value) => {
            this.setState({ accountType: value });
        });

        DataHandler.getBusListing().then((value) => {
            this.setState({ isServiceEnabled: value === "true" ? true : false });
        });
    }
    backScreen() {
        this.props.navigation.navigate('Login');
    }

    clickNextButton() {
        if (this.state.accountType === BUS_SER_PROVIDER) {
            this.props.navigation.navigate('TeamMemberSetup')
        }
        else if (this.state.accountType === BUSINESS || this.state.accountType === CHARITY_ACCOUNT)
            this.props.navigation.navigate('AnimalInfo')
        else if (this.state.accountType === BUS_LISTING && this.state.isServiceEnabled) {
            this.props.navigation.navigate('TeamMemberSetup')
        }
        else
            this.props.navigation.navigate('HomeScreen')

    }
    render() {
        if (this.state.accountType)
            return (<BusProfileView
                isServiceEnabled={this.state.isServiceEnabled}
                accountType={this.state.accountType}
                clickNextButton={(e) => { this.clickNextButton(e) }}
                backScreen={(e) => { this.backScreen(e) }} />);
        else
            return null
    }

}
export default BusProfile;