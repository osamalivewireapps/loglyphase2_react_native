/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DataHandler from '../../../utils/DataHandler';
import { connect } from 'react-redux';
import CRMNewOrderView from './crm_sales_view';
import CRMSalesView from './crm_sales_view';

class CRMSalesDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userObject: {}
        }
    }

    componentDidMount() {

        DataHandler.getUserObject().then((value) => {
            this.setState({ userObject: JSON.parse(value) });
        });
    }

    render() {
        return (<CRMSalesView
            {...this.props}
            userObject={this.state.userObject}
            toggleDrawer={this.props.navigation}
        />);
    }
}

const mapDispatchToProps = dispatch => ({
   
});


export default connect(
    null,
    mapDispatchToProps,
)(CRMSalesDetails);
