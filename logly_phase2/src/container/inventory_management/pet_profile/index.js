/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import PetProfileView from './petprofile_view';
import { getAnimals } from '../../../actions/AnimalModule';
import { connect } from 'react-redux';

class PetProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalType: 'Active',
            animalList: []
        };
    }

    componentDidMount() {

        this.props.getAnimals(this.state.animalType).then((response) => {
            this.setState({ animalList: response.payload });

        });
    }

    render() {
        return (<PetProfileView {...this.props} listAnimal={this.state.animalList} />);
    }

}


const mapStateToProps = ({ animal }) => {
    return {
        animalData: animal.animalListing,
    };
};

const mapDispatchToProps = dispatch => ({
    getAnimals: (data) => dispatch(getAnimals(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PetProfile);
