/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import ContactDetailView from './contact_detail_view';
import { getContactDetails,removeContact } from '../../../actions/ContactModule'
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class ContactDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getContactDetails(this.props.route.params.id)
    }

    removeMember() {
        this.props.removeMember(this.props.route.params.id).then((proceed) => {

            if (proceed) {
                this.props.route.params.updateContacts();
                this.props.navigation.pop();
            }
        });

    }

    confirmModal = (e) => {
        Alert.alert(`Are you sure you want to delete?`, '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => { this.removeMember() } },

            ],
            { cancelable: false }
        );

    }

    render() {
        return (<ContactDetailView {...this.props}
            removeMember={() => { this.confirmModal() }}
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
    removeMember: (id) => dispatch(removeContact(id)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactDetails);