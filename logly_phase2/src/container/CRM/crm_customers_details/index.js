/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DataHandler from '../../../utils/DataHandler';
import { connect } from 'react-redux';
import CRMCustomerDetailView from './crm_customerdetail_view';
import { getBreederSalePresentList} from '../../../actions/Sales';


class CRMCustomerDetail extends Component {

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

        this.props.getBreederSalePresentList(this.props.route.params.id)
    }

    render() {
        return (<CRMCustomerDetailView
            {...this.props}
            userObject={this.state.userObject}
            toggleDrawer={this.props.navigation}
        />);
    }
}

const mapStateToProps = ({ sale }) => {
    return {
        customerDetail: sale.customerDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getBreederSalePresentList: (buyerId) => dispatch(getBreederSalePresentList(buyerId))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CRMCustomerDetail);
