/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import HomeView from './home_view';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<HomeView
            {...this.props}
            toggleDrawer={this.props.navigation}
        />);
    }
}

export default HomeScreen;