/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import DataHandler from '../../../utils/DataHandler';
import { connect } from 'react-redux';
import CRMPurchaseHistoryDetailsView from './crm_purchasehistory_view';

class CRMPurchaseHistoryDetail extends Component {

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
        return (<CRMPurchaseHistoryDetailsView
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
)(CRMPurchaseHistoryDetail);
