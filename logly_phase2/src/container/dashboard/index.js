/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DashBoardView from './dashbaord_view';
import { getDashBoardType } from '../../actions/DashBoardModule';
import { connect } from 'react-redux';
import DataHandler from '../../utils/DataHandler';

class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalData: [],
            productData: [],
            animalCategories: [],
            productCategories: [],
            totalAnimals: {},
            totalProducts: {}
        }
    }

    componentDidMount() {

        DataHandler.getUserObject().then((value) => {
            this.userObject = JSON.parse(value);
            this.getAllData('animal')
        });
    }

    getInventory(e) {

        console.log('drop down--->',e)
        if (e.toLowerCase().includes('animal')) {
            if (!this.state.animalData)
                this.getAllData('animal')
            else
                this.setState()
        } else {
            if (this.state.productData.length===0)
                this.getAllData('product')
            else
                this.setState()
        }
    }

    getAllData(e) {
        this.props.getDashBoardType(this.userObject._id, e).then((response) => {
            if (e === 'animal') {
                this.setAnimalValues(response)
            } else {
                this.setProductValues(response)
            }
        })
    }

    render() {
        return (<DashBoardView
            {...this.props}
            animalData={this.state.animalData}
            productData={this.state.productData}
            animalCategories={this.state.animalCategories}
            productCategories={this.state.productCategories}
            totalAnimals={this.state.totalAnimals}
            totalProducts={this.state.totalProducts}
            getInventory={(e) => this.getInventory(e)}

        />);
    }


    setAnimalValues(response) {
        let totalAnimals = 0, alive = 0, sick = 0, dead = 0, pregnant = 0;
        let tmp = [];
        response.payload.forEach(element => {
            totalAnimals += element.total;
            sick += element.sick
            alive += element.alive;
            dead += element.died;
            pregnant += element.pregnant
            tmp.push(element.name)
            console.log('total-->', alive)
        });

        this.setState({
            animalData: response.payload,
            totalAnimals: {
                alive: alive, sick: sick, dead: dead,
                pregnant: pregnant, totalAnimals: totalAnimals
            }
        })
    }

    setProductValues(response) {
        let totalProducts = 0, instock = 0, expired = 0, damaged = 0, sold = 0;
        let tmp = [];
        response.payload.forEach(element => {
            totalProducts += element.total;
            expired += element.expired
            instock += element.instock;
            damaged += element.damaged;
            sold += element.sold
            tmp.push(element.name)
            console.log('total-->', element.total)
        });

        this.setState({
            productData: response.payload,
            totalProducts: {
                instock: instock, expired: expired, damaged: damaged,
                sold: sold, totalProducts: totalProducts
            }
        })
    }
}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    getDashBoardType: (id, data) => dispatch(getDashBoardType(id, data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashBoard);
