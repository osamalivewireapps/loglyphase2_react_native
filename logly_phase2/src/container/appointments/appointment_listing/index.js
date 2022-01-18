/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppointmentListingView from './appointment_view';

class AppointmentListing extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }




    render() {
        return (<AppointmentListingView {...this.props}
        />);
    }

}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppointmentListing);
