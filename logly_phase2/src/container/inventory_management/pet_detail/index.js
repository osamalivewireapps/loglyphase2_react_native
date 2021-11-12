/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import PetDetailView from './pet_detailview';

class PetDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<PetDetailView {...this.props}

        />);
    }
}

export default PetDetail;