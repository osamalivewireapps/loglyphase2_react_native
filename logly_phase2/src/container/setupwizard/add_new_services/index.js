/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import Util from "../../../utils";
import AddNewServiceView from "./add_newservice_view";

class AddNewServices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrServices: []
        };
    }

    componentDidMount() {
        this.setState({ arrServices: [] })
    }

    addServices(e) {

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

    clickNextBtn(e) {
        this.props.forwardScreen();
    }

    delTrainingProgram(e) {
        let tmp = this.state.arrServices;
        tmp.splice(e, 1);
        this.setState({ arrServices: tmp })
    }

    render() {
        return (<AddNewServiceView
            animalType={this.props.type}
            delTrainingProgram={(e) => this.delTrainingProgram(e)}
            clickNextBtn={(e) => { this.clickNextBtn(e) }}
            wholeServices={this.state.arrServices}
            addServices={(e) => { this.addServices(e) }}
        />);
    }




}
export default AddNewServices;
