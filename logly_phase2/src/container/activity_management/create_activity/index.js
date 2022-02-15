/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addScheduleActivity, getAllCategories, getScheduleData } from '../../../actions/ActivityManagement';
import CreateActivityView from './createview';

class CreateActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            allCategories: []
        };
    }

    componentDidMount() {
        this.props.getAllCategories().then((response) => {
            this.setState({ allCategories: response.payload })
        })
    }


    addScheduleActivity(e) {
        console.log('activity data-->', e)
        this.props.addScheduleActivity(e).then((value) => {
            this.props.navigation.pop()
        })
    }

    render() {
        return (<CreateActivityView {...this.props}
            addScheduleActivity={(e) => { this.addScheduleActivity(e) }}
            getAllCategories={this.state.allCategories}
        />);
    }

}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    getScheduleData: () => dispatch(getScheduleData()),
    getAllCategories: () => dispatch(getAllCategories()),
    addScheduleActivity: (data) => dispatch(addScheduleActivity(data)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateActivity);
