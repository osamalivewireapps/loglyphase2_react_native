/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import PetProfileView from './petprofile_view';
import { getAnimals } from '../../../actions/AnimalModule';
import { connect } from 'react-redux';
import { values } from 'lodash';

class PetProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animalList: [],
            filterData: { animalType: 'Active', status: 'Alive', animalId: '' }
        };
    }

    componentDidMount() {
        this.getAnimalList(this.state.filterData, true);
    }

    applyFilter(e) {

        if (e.animalType === this.state.filterData.animalType) {
            this.filterAnimals(e)
        } else {
            this.getAnimalList(e, true)
        }
    }



    render() {
        return (<PetProfileView {...this.props}
            listAnimal={this.state.animalList}
            applyFilter={(e) => this.applyFilter(e)}
            filterObj={this.state.filterData}
            updateAnimal={() => this.updateAnimal()}
        />);
    }

    updateAnimal() {
        this.getAnimalList(this.state.filterData,true);
    }

    getAnimalList(filterObject, isFilter) {
        this.props.getAnimals(filterObject.animalType).then((response) => {
            if (isFilter) {
                this.filterAnimals(filterObject)
            }
            else {
                this.setState({ animalList: response.payload });
            }
        });
    }

    filterAnimals(e) {

        let tmp = this.props.animalData
            .filter((value, index) => {
                return ((value.status.toLowerCase() === e.status.toLowerCase()) && (e.animalId ? value.categoryId._id === e.animalId : true))
            });

        this.setState({ animalList: tmp, filterData: e })
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
