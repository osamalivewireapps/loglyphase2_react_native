/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DashBoardView from './dashbaord_view';

class DashBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<DashBoardView
            {...this.props}

        />);
    }
}

export default DashBoard;