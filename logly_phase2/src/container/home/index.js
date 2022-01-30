/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DataHandler from '../../utils/DataHandler';
import { hideLoaderOnly } from '../../actions/SignUpModule';
import { getUser } from '../../actions/LoginModule';


import HomeView from './home_view';
import { connect } from 'react-redux';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.props.hideLoaderOnly();
        this.state = {
            userObject: {}
        }
    }

    componentDidMount() {

        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        })

        this.props.getUser().then((response) => {
            if (response.payload) {
                DataHandler.saveUserObject(JSON.stringify(response.payload));
            }
        });

        DataHandler.getUserObject().then((value) => {
            this.setState({ userObject: JSON.parse(value) });
        });
    }

    render() {
        return (<HomeView
            {...this.props}
            accountType={this.accountType}
            userObject={this.state.userObject}
            toggleDrawer={this.props.navigation}
        />);
    }
}

const mapDispatchToProps = dispatch => ({
    hideLoaderOnly: () => dispatch(hideLoaderOnly()),
    getUser: () => dispatch(getUser())
});


export default connect(
    null,
    mapDispatchToProps,
)(HomeScreen);
