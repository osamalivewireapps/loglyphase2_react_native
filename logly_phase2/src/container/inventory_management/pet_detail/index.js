/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import PetDetailView from './pet_detailview';
import { getAnimal} from '../../../actions/AnimalModule'
import { connect } from 'react-redux';

class PetDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getAnimal(this.props.route.params.id)
    }

    render() {
        return (<PetDetailView {...this.props}

        />);
    }
}
const mapStateToProps = ({ animal }) => {
    return {
        animalData: animal.animalDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getAnimal: (data) => dispatch(getAnimal(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PetDetail);