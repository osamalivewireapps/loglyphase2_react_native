/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getContacts } from '../../../actions/ContactModule';
import { connect } from 'react-redux';
import CreateGroupView from './create_group_view';

class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
        };
    }

    componentDidMount() {

    }

    


    render() {
        return (<CreateGroupView {...this.props}
            listGroups={this.state.groupList}
        />);
    }

}

const mapStateToProps = ({  }) => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => ({
 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateGroup);
