/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getTeamMembers, removeMember } from '../../../actions/TeamMembersModule';
import { connect } from 'react-redux';
import { VENDOR_ID, VET_ID } from '../../../constants';
import TeamListingView from './team_listing_view';
import { Alert } from 'react-native';

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


    getContacts(e) {
        this.props.getTeamMembers('')
            .then((response) => {
                this.setState({ contactList: response.payload });
            });
    }

    confirmModal = (e) => {
        Alert.alert(`Are you sure you want to delete?`, '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => { this.removeMember(e) } },

            ],
            { cancelable: false }
        );

    }

    removeMember(id) {
        this.props.removeMember(id).then((proceed) => {

            if (proceed) {
                this.getContacts();
            }
        });

    }



    render() {
        return (<TeamListingView {...this.props}
            listContacts={this.state.contactList}
            filterObj={this.state.filterData}
            removeMember={(e) => { this.confirmModal(e) }}
            updateContacts={(e) => this.getContacts(e)}
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

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamListing);
