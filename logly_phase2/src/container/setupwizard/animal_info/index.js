/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { BUSINESS, BUS_LISTING, CHARITY_ACCOUNT } from "../../../constants";
import DataHandler from "../../../utils/DataHandler";
import AnimalInfoView from "./animalinfo_view";
import { connect } from 'react-redux';
import { getSetupWizardForm } from '../../../actions/SetupWizardModule';




class AnimalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalCategory: [],
            listAnimals: []
        };
    }

    componentDidMount() {
        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        });

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
        });

        DataHandler.getAnimalList().then(value => {
            this.animalList = JSON.parse(value);
            console.log("product info--->", this.animalList)
            this.props.getSetupWizardForm().then((response) => {
                if (response) {
                    let tmp = [];
                    if (this.animalList) {
                        this.animalList.filter((value) => {
                            response.payload.forEach(element => {
                                if (element._id === value._id)
                                    tmp.push(element)
                            });
                        })
                    }else if(tmp.length===0){
                        response.payload.forEach(element => {
                            if (element.breedersId.includes(this.userObject._id))//element.categoryId.active
                                tmp.push(element)
                        });
                    }

                    console.log("animal categories--->", tmp)
                    this.setState({ listAnimals: response.payload, animalCategory: tmp})
                }
            })
        })
    }

    addAnimalCategory(e) {

        console.log("animal item--->", e)
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
            DataHandler.saveAnimalList(JSON.stringify(this.state.animalCategory));

        this.switchScreen();
    }

    switchScreen() {
        if (this.props.route.params?.deals) {
            this.props.navigation.navigate('BusProfileSetup')
        } else {
            if (this.accountType === BUS_LISTING || this.accountType === BUSINESS || this.accountType === CHARITY_ACCOUNT) {
                this.props.navigation.navigate('ProductInfo')
            } else
                this.props.navigation.navigate('TeamMemberSetup')
        }
    }

    render() {
        return (<AnimalInfoView
            AnimalCategories={this.state.listAnimals}
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
)(AnimalInfo);

