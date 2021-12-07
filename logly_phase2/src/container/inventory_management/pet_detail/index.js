/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import PetDetailView from './pet_detailview';
import { getAnimal, deleteAnimal } from '../../../actions/AnimalModule'
import { connect } from 'react-redux';

class PetDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAnimal(this.props.route.params.id)
    }

    render() {
        return (<PetDetailView {...this.props}
            removeAnimal={() => this.confirmModal()}

        />);
    }


    confirmModal = (e) => {
        Alert.alert(`Are you sure you want to delete?`, '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => { this.removeItem() } },

            ],
            { cancelable: false }
        );

    }

    removeItem = () => {
        this.props.deleteAnimal(this.props.route.params.id).then(response => {
            this.props.navigation.goBack()
            this.props.route.params.updateAnimal();
        })
    }
}

const mapStateToProps = ({ animal }) => {
    return {
        animalData: animal.animalDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getAnimal: (data) => dispatch(getAnimal(data)),
    deleteAnimal: (data) => dispatch(deleteAnimal(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PetDetail);