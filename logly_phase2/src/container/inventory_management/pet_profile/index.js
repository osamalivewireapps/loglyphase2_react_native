/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import PetProfileView from './petprofile_view';

class PetProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<PetProfileView {...this.props}
            
        />);
    }
}

export default PetProfile;