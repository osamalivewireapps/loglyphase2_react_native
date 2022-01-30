/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getGroups, deleteGroup } from '../../../actions/GroupsModule';
import { connect } from 'react-redux';
import GroupListingView from './group_listing_view';

class GroupListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
        };
    }

    componentDidMount() {
          this.updateGroups()
    }

    updateGroups(){
        this.props.getGroups().then((response) => {
            if (response.payload) {
                this.setState({ groupList: response.payload })
            }
        })
    }

    removeMember(id){
        this.props.deleteGroup(id).then((response) => {
            if (response) {
                this.updateGroups()
            }
        })
    }
    


    render() {
        return (<GroupListingView {...this.props}
            listGroups={this.state.groupList}
            updateContacts={()=>this.updateGroups()}
            removeMember={(e) => this.removeMember(e)}
        />);
    }

}

const mapStateToProps = ({ group }) => {
    return {
        groupListing: group.groupListing,
    };
};

const mapDispatchToProps = dispatch => ({
    getGroups: () => dispatch(getGroups()),
    deleteGroup: (id) => dispatch(deleteGroup(id))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GroupListing);

