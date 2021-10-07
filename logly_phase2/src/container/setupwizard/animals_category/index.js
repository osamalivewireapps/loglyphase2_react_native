/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import Util from "../../../utils";
import AnimalCategoryView from "./animal_category_view";

class AnimalCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalCategory: [],
        };
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

    clickNextBtn(e){
        this.props.forwardScreen();
    }
    render() {
        return (<AnimalCategoryView addServices={(e) => this.addAnimalCategory(e)}
            selectedServices={this.state.animalCategory}
            animalType={this.props.type}
            clickNextBtn = {(e)=>{this.clickNextBtn(e)}} />);
    }




}
export default AnimalCategories;
