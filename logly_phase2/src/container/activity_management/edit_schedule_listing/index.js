/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditScheduleView from './edit_schedule_view';

class EditScheduleActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
        };
    }

    componentDidMount() {

    }




    render() {
        return (<EditScheduleView {...this.props}
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
)(EditScheduleActivity);
