/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import SearchView from './search_view';

class SearchItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<SearchView
            {...this.props}
            toggleDrawer={this.props.navigation}
        />);
    }
}

export default SearchItem;