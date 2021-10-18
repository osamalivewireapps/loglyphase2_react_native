/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import DataHandler from "../../../utils/DataHandler";
import BusListingView from "./bus_listing_view";

class BusListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //true for product
            isAnimalOrProduct: true
        };
    }

    selectAnimalProduct(e) {
        this.setState({ isAnimalOrProduct: e });
    }

    goingBack(e) {
        this.props.navigation.navigate('Login');
    }

    skipBtn() {
        if (this.state.isAnimalOrProduct)
            this.props.navigation.navigate('AnimalInfo')
        else
            this.props.navigation.navigate('AccountSetup')
    }

    nextScreen(e) {
        if (this.state.isAnimalOrProduct){
            DataHandler.saveBusListing("true")
            this.props.navigation.navigate('AnimalInfo')
        }
        else{
            DataHandler.saveBusListing("false")
            this.props.navigation.navigate('AccountSetup')
        }
    }

    render() {
        return (<BusListingView
            addServices={(e) => this.selectAnimalProduct(e)}
            dealAnimalProduct={this.state.isAnimalOrProduct}
            skipBtn={(e) => { this.skipBtn(e) }}
            nextScreen={(e) => { this.nextScreen(e) }}
            backScreen={(e) => { this.goingBack(e) }}

        />);
    }


}

export default BusListing;
