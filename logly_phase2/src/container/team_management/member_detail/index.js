/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { getContactDetails } from '../../../actions/ContactModule'
import { connect } from 'react-redux';
import MemberDetailView from './member_detail';

class MemberDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getContactDetails(this.props.route.params.id)
    }

    render() {
        return (<MemberDetailView {...this.props}

        />);
    }
}
const mapStateToProps = ({ contacts }) => {
    return {
        contactData: contacts.contactDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getContactDetails: (data) => dispatch(getContactDetails(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemberDetails);