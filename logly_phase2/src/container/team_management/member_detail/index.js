/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { getMemberDetails, removeMember } from '../../../actions/TeamMembersModule'
import { connect } from 'react-redux';
import MemberDetailView from './member_detail';
import { Alert } from 'react-native';

class MemberDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getContactDetails(this.props.route.params.id)
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

    removeMember() {
        this.props.removeMember(this.props.route.params.id).then((proceed) => {

            if (proceed) {
                this.props.route.params.updateContacts();
                this.props.navigation.pop();
            }
        });

    }

    render() {
        return (<MemberDetailView {...this.props}
            removeMember={() => { this.confirmModal() }}
        />);
    }
}
const mapStateToProps = ({ team_members }) => {
    return {
        contactData: team_members.memberDetail,
    };
};

const mapDispatchToProps = dispatch => ({
    getContactDetails: (data) => dispatch(getMemberDetails(data)),
    removeMember: (id) => dispatch(removeMember(id)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemberDetails);