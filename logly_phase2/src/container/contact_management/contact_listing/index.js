/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getContacts } from '../../../actions/ContactModule';
import { connect } from 'react-redux';
import ContactListingView from './contact_listingview';
import { VENDOR_ID, VET_ID } from '../../../constants';

class ContactListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactList: [],
            filterData: {
                contactType: '',
            }
        };
    }

    componentDidMount() {
        this.getContacts();

    }

    applyFilter(e) {
        this.filterContacts(e)
    }

    getContacts() {
        this.props.getContacts('').then((response) => {
            this.setState({ contactList: response.payload });

        });
    }

    filterContacts(e) {

        console.log("filter--->", e);

        let tmp = !e.contactType ? this.props.contactListing:this.props.contactListing
            .filter((value, index) => {
                if (e.contactType === 'Vendors') {
                    return ((value.category === VENDOR_ID))
                } else
                    return ((value.category === VET_ID))
            });

        this.setState({ contactList: tmp, filterData: e })
    }



    render() {
        return (<ContactListingView {...this.props}
            listContacts={this.state.contactList}
            applyFilter={(e) => this.applyFilter(e)}
            filterObj={this.state.filterData}
        />);
    }

}

const mapStateToProps = ({ contacts }) => {
    console.log("mapStateToProps-->",contacts)
    return {
        contactListing: contacts.contactsListing,
    };
};

const mapDispatchToProps = dispatch => ({
    getContacts: () => dispatch(getContacts('')),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactListing);
