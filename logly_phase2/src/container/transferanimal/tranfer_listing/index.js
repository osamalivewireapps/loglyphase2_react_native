/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getTeamMembers, removeMember } from '../../../actions/TeamMembersModule';
import { getBreederListSimple, getBreederForSale } from '../../../actions/Sales';
import { connect } from 'react-redux';
import { VENDOR_ID, VET_ID } from '../../../constants';
import TransferListingView from './team_listing_view';
import { Alert } from 'react-native';

class TransferListing extends Component {

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
        console.log('props---->', this.props);
        this.getContacts();
    }


    getContacts(e) {
        this.props.getBreederListSimple()
            .then((response) => {
                this.setState({ contactList: response.payload });
            });
    }

    refreshList(){
        this.getContacts()
    }

    render() {
        return (<TransferListingView {...this.props}
            listContacts={this.state.contactList}
            filterObj={this.state.filterData}
            removeMember={(e) => { this.confirmModal(e) }}
            refreshList={(e)=>this.refreshList(e)}
            updateContacts={(e) => {
                if (e) {
                    console.log("reg breeder-->", e);
                    this.props.navigation.navigate('SummaryAnimalsView', { id: e._id, updateList: this.props.route.params.updateAnimalList, staffData: e, animalData: this.props.route.params.animalData,popScreen:3 })
                }
                   
            }}

        />);
    }

}

const mapStateToProps = ({ team_members }) => {
    return {
        teamListing: team_members.teamListing,
    };
};

const mapDispatchToProps = dispatch => ({
    getTeamMembers: () => dispatch(getTeamMembers('')),
    removeMember: (id) => dispatch(removeMember(id)),
    getBreederForSale: (keyword) => dispatch(getBreederForSale(keyword)),
    getBreederListSimple: () => dispatch(getBreederListSimple())


});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TransferListing);
