/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import InventoryView from './inventory_view';

class InventoryDashBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<InventoryView {...this.props}
            
        />);
    }
}

export default InventoryDashBoard;