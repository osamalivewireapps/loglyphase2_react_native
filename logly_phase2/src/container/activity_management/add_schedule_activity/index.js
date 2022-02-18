/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddScheduleActivityView from './add_schedule_view';
import { getAnimals } from '../../../actions/AnimalModule';
import { getGroups } from '../../../actions/GroupsModule';
import { getTeamMembers } from '../../../actions/TeamMembersModule';
import { getAllCategories, addScheduleActivity, getScheduleData } from '../../../actions/ActivityManagement';
import DataHandler from '../../../utils/DataHandler';

class AddScheduleActivity extends Component {

    constructor(props) {
        super(props);
        console.log('props add schedule--->', props);
        this.state = {
            groupList: [],
            allAnimals: [],
            teamList: [],
            allCategories: []

        };
    }

    componentDidMount() {
        DataHandler.getUserObject().then(value=>{
            this.userObject = JSON.parse(value);
        });

        this.props.getAllCategories().then((response) => {
            this.setState({ allCategories: response.payload })
        })
    }



    getAnimal() {
        this.props.getAnimals().then((response) => {
            this.setState({ allAnimals: response.payload })
        })
    }

    getGroups() {
        this.props.getGroups().then((response) => {
            this.setState({ groupList: response.payload })
        })
    }

    getTeams() {
        this.props.getTeamMembers().then((response) => {
            this.setState({ teamList: response.payload })
        })
    }


    addScheduleActivity(e) {
        console.log('activity data-->', e)
        this.props.addScheduleActivity(e).then((value) => {
            console.log('activity data-->', e)
            this.props.getScheduleData();
            this.props.navigation.pop()
        })
    }
    render() {
        return (<AddScheduleActivityView {...this.props}
            userObject={this.userObject} 
            allGroups={this.state.groupList}
            allAnimals={this.state.allAnimals}
            getAnimalList={(e) => {
                this.getAnimal();
            }}
            getGroupList={(e) => {
                this.getGroups();
            }}
            allTeams={this.state.teamList}
            getTeams={(e) => {
                this.getTeams();
            }}
            getAllCategories={this.state.allCategories}
            addScheduleActivity={(e) => { this.addScheduleActivity(e) }}
        />);
    }

}

const mapStateToProps = ({ }) => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    getAnimals: () => dispatch(getAnimals()),
    getGroups: () => dispatch(getGroups()),
    getTeamMembers: () => dispatch(getTeamMembers()),
    getAllCategories: () => dispatch(getAllCategories()),
    addScheduleActivity: (data) => dispatch(addScheduleActivity(data)),
    getScheduleData: () => dispatch(getScheduleData()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddScheduleActivity);
