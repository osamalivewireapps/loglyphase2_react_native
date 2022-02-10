/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DataHandler from '../../../utils/DataHandler';
import { connect } from 'react-redux';
import CRMNewOrderView from './crm_sales_view';
import CRMSalesView from './crm_sales_view';
import {getSale} from '../../../actions/Sales'

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

        this.props.getSale(this.props.route.params.id);
    }

    render() {
        return (<CRMSalesView
            {...this.props}
            userObject={this.state.userObject}
            toggleDrawer={this.props.navigation}
        />);
    }
}

const mapStateToProps = ({ sale }) => {
    return {
        saleDetail: sale.saleDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getSale: (id) => dispatch(getSale(id))
});



export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CRMSalesDetails);
