/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { BUS_LISTING } from "../../../constants";
import DataHandler from "../../../utils/DataHandler";
import ProductInfoView from "./productinfo_view";

class ProductInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalCategory: [],
        };
    }

    componentDidMount() {
        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        });
    }

    addAnimalCategory(e) {

        let tmp = this.state.animalCategory;
        if (tmp.length === 0) { tmp.push({ type: e.type, isSelect: e.isSelect }); }
        else {
            let itemService = tmp.find(item => item.type === e.type);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push({ type: e.type, isSelect: e.isSelect });
            }

        }
        this.setState({ animalCategory: tmp });
    }

    goingBack(e) {
        this.props.navigation.pop();
    }

    skipBtn() {
        this.switchScreen();
    }

    nextScreen(e) {
        this.switchScreen();
    }

    switchScreen() {
        if (this.accountType === BUS_LISTING)
            this.props.navigation.navigate('BusProfileSetup')
        else
            this.props.navigation.navigate('TeamMemberSetup')
    }

    render() {
        return (<ProductInfoView
            addServices={(e) => this.addAnimalCategory(e)}
            selectedServices={this.state.animalCategory}
            skipBtn={(e) => { this.skipBtn(e) }}
            nextScreen={(e) => { this.nextScreen(e) }}
            backScreen={(e) => { this.goingBack(e) }}

        />);
    }


}

export default ProductInfo;
