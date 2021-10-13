/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import AccountSetupView from "./account_setup_view";

class AccountSetup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stackComp: [
                {
                    type: 'chooseservices',
                    name: 'pick service only'
                }
            ],
            pageNumber: 0
        };
    }

    addStack(e) {
        console.log("objects-->", e)
        let tmp = [];

        tmp.push({
            type: 'chooseservices',
            name: 'pick service only'
        })
        //ANIMALS ONLY..
        e.forEach(element => {
            tmp.push({
                type: 'Animal',
                name: element.type
            })
        });

        //SERVICES ONLY..
        e.forEach(element => {
            tmp.push({
                type: 'Services',
                name: element.type
            })
        });
        this.setState({ stackComp: tmp, pageNumber: 1 })
    }
    goingBack(e) {
        if (this.state.pageNumber === 0)
            this.props.navigation.navigate('Login');
        else {
            this.setState({ pageNumber: this.state.pageNumber - 1 })
        }
    }

    skipBtn() {
        this.props.navigation.navigate('BusProfileSetup')
    }

    nextScreen(e) {
        if (this.state.pageNumber === this.state.stackComp.length-1) {
            this.props.navigation.navigate('BusProfileSetup');
            return;
        }
        this.setState({ pageNumber: this.state.pageNumber + 1 })
    }

    render() {
        return (<AccountSetupView
            skipBtn = {(e)=>{this.skipBtn(e)}}
            pageNumber={this.state.pageNumber}
            nextScreen={(e) => { this.nextScreen(e) }}
            addStack={(e) => { this.addStack(e) }}
            stackComp={this.state.stackComp}
            backScreen={(e) => { this.goingBack(e) }}

        />);
    }


}

export default AccountSetup;
