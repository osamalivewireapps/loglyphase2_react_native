/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getContacts } from '../../../actions/ContactModule';
import { connect } from 'react-redux';
import { VENDOR_ID, VET_ID } from '../../../constants';
import TeamListingView from './team_listing_view';

class TeamListing extends Component {

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

    getContacts(e) {
        this.props.getContacts('')
            .then((response) => {
                if (this.state.filterData.contactType.length === 0)
                    this.setState({ contactList: response.payload });
                else {
                    this.filterContacts(this.state.filterData)
                }

            });
    }

    filterContacts(e) {

        console.log("filter--->", e);

        let tmp = !e.contactType ? this.props.contactListing : this.props.contactListing
            .filter((value, index) => {
                if (e.contactType === 'Vendors') {
                    return ((value.category === VENDOR_ID))
                } else
                    return ((value.category === VET_ID))
            });

        this.setState({ contactList: tmp, filterData: e })
    }



    render() {
        return (<TeamListingView {...this.props}
            listContacts={this.state.contactList}
            applyFilter={(e) => this.applyFilter(e)}
            filterObj={this.state.filterData}
            updateContacts={(e) => this.getContacts(e)}
        />);
    }

}

const mapStateToProps = ({ contacts }) => {
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
)(TeamListing);
