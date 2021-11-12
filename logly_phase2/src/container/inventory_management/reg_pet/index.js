/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import RegisterPetView from './regpet_view';

class RegisterPet extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<RegisterPetView {...this.props}
            
        />);
    }
}

export default RegisterPet;