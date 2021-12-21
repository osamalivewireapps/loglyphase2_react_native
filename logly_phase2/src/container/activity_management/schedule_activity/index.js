/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScheduleListingActivityView from './schedule_activity_view';

class ScheduleListingActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
        };
    }

    componentDidMount() {

    }




    render() {
        return (<ScheduleListingActivityView {...this.props}
            listGroups={this.state.groupList}
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
)(ScheduleListingActivity);
