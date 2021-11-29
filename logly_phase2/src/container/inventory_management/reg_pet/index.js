/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import RegisterPetView from './regpet_view';
import { getAnimalCategories, getFormCategory } from '../../../actions/AnimalModule';

class RegisterPet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            animalCategories: [],
            animalBreed:[],
        }
    }

    componentDidMount() {
        this.setState({ isLoad: true });
        getAnimalCategories().then((response) => {
            console.log("animalCategories-->", response.animalCategory);
            this.setState({ animalCategories: response.animalCategory, isLoad: false })
        }).catch(() => this.setState({ isLoad: false }));
    }

    getBreed(catId){
        console.log("catId-->",catId)
        this.setState({isLoad:true});
        getFormCategory(catId).then((response) => {
            console.log("animalBreed-->", response.animalBreed)
            this.setState({ animalBreed: response.formCategory.categoryId.breeds, isLoad: false })
        }).catch(() => {
            this.setState({ isLoad: false })
        });
    }



    render() {
        return (<RegisterPetView {...this.props}
            isLoad={this.state.isLoad}
            animalCategories={this.state.animalCategories}
            animalBreed={this.state.animalBreed}
            getAnimalBreed={(e)=>this.getBreed(e)}

        />);
    }
}

const mapStateToProps = ({ animal }) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterPet);