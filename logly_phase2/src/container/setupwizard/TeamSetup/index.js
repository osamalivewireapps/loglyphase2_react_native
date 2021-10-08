/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import TeamSetupView from "./teamsetup_view";

class TeamSetup extends React.Component {

    constructor(props) {
        super(props);
    }

    backScreen() {
        this.props.navigation.navigate('Login');
    }

    clickNextButton() {
        this.props.navigation.navigate('TeamMemberSetup')
    }
    render() {
        return (<TeamSetupView
            clickNextButton={(e) => { this.clickNextButton(e) }}
            backScreen={(e) => { this.backScreen(e) }} />);
    }

}
export default TeamSetup;