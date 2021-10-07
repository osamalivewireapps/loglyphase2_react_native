/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import Util from "../../../utils";
import ServicesView from "./serviceview";

class ChooseServices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            service: [],
        };
        console.log(props)
    }

    addServices(e) {


        let tmp = this.state.service;
        if (tmp.length === 0) { tmp.push({ type: e.type, isSelect: e.isSelect, index: tmp.length }); }
        else {
            let itemService = tmp.find(item => item.type === e.type);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                if (this.state.service.length === 3) {
                    Util.topAlert("Already picked 3 services")
                    return;
                }
                tmp.push({ type: e.type, isSelect: e.isSelect, index: tmp.length });
            }

        }

        this.setState({ service: tmp });
    }

    clickNextBtn(e) {
        this.props.choseServices(this.state.service);
    }
    render() {
        return (<ServicesView addServices={(e) => this.addServices(e)}
            selectedServices={this.state.service}
            btnNext={(e) => { this.clickNextBtn(e) }}
        />);
    }




}
export default ChooseServices;
