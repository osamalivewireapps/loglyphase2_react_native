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
import { getSetupWizardForm } from '../../../actions/SetupWizardModule';
import { connect } from 'react-redux';

class ProductInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalCategory: [],
            listProducts:[]
        };
    }

    componentDidMount() {
        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        });

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });

        DataHandler.getProductList().then(value=>{
            this.productList = JSON.parse(value);
            console.log("product info--->", this.productList)
            this.props.getSetupWizardForm().then((response) => {
                if (response) {
                    let tmp = [];
                    if(this.productList){
                        this.productList.filter((value)=>{
                            response.payload.forEach(element => {
                                if (element._id === value._id)
                                    tmp.push(element)
                            });
                        })
                    }
                    else if (tmp.length === 0) {
                        response.payload.forEach(element => {
                            if (element.breedersId.includes(this.userObject._id))//element.categoryId.active
                                tmp.push(element)
                        });
                    }
                    console.log("animal categories--->", tmp)
                    this.setState({ listProducts: response.payload,animalCategory:tmp })
                }
            })
        })
        
    }

    addAnimalCategory(e) {

        console.log("product item--->",e)
        let tmp = this.state.animalCategory;
        if (tmp.length === 0) { tmp.push(e); }
        else {
            let itemService = tmp.find(item => item._id === e._id);
            if (itemService) {
                tmp.splice(tmp.indexOf(itemService), 1);
            } else {
                tmp.push(e);
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
        if (this.state.animalCategory)
            DataHandler.saveProductList(JSON.stringify(this.state.animalCategory));

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
            AnimalCategories={this.state.listProducts}
            addServices={(e) => this.addAnimalCategory(e)}
            selectedServices={this.state.animalCategory}
            skipBtn={(e) => { this.skipBtn(e) }}
            nextScreen={(e) => { this.nextScreen(e) }}
            backScreen={(e) => { this.goingBack(e) }}

        />);
    }


}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    getSetupWizardForm: () => dispatch(getSetupWizardForm()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductInfo);
