/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import DataHandler from "../../../utils/DataHandler";
import TeamSetupView from "./teamsetup_view";
import { CommonActions } from "@react-navigation/native";

class TeamSetup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrServices: [],
            accountType: ''
        };

        DataHandler.getAccountType().then((value) => {
            this.setState({ accountType: value });
        });
    }

    componentDidMount() {
        this.setState({ arrServices: [] })
    }

    backScreen() {
        //this.props.navigation.navigate('Login');
        this.props.navigation.pop(2);
    }

    clickNextButton() {
        const resetAction = CommonActions.reset({
            index: 1,
            routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
        });

        this.props.navigation.dispatch(resetAction);
    }

    addMember(e) {

        let tmp = this.state.arrServices;
        if (!tmp || tmp.length === 0) {
            tmp.push(e);
        }
        else {
            let itemService = tmp.find(item => item.id === e.id);
            if (itemService) {
                tmp = tmp.map(x => (x.id === e.id ? { ...e } : x));
            } else {
                tmp.push(e);
            }

        }
        this.setState({ arrServices: tmp })
    }

    delMember(e) {
        let tmp = this.state.arrServices;
        tmp.splice(e, 1);
        this.setState({ arrServices: tmp })
    }

    render() {
        return (<TeamSetupView
            accountType={this.state.accountType}
            delMember={(e) => this.delMember(e)}
            addMember={(e)=>{this.addMember(e)}}
            wholeServices={this.state.arrServices}
            clickNextButton={(e) => { this.clickNextButton(e) }}
            backScreen={(e) => { this.backScreen(e) }} />);
    }

}
export default TeamSetup;