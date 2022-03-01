/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { getNotifications, deleteNotifications } from '../../../actions/NotificationModule';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import NotificationListingView from './notificationlisting_view';

class NotificationListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifyList: [],
        };
    }

    componentDidMount() {
        this.getNotifications();

    }


    getNotifications(e) {
        this.props.getNotifications('')
            .then((response) => {
                this.setState({ notifyList: response.payload });
            });
    }

    confirmModal = (e) => {
        Alert.alert(`Are you sure you want to delete?`, '',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => { this.removeNotification(e) } },

            ],
            { cancelable: false }
        );

    }

    removeNotification(id) {
        this.props.deleteNotifications(id).then((proceed) => {

            if (proceed) {
                this.getNotifications();
            }
        });

    }



    render() {
        return (<NotificationListingView {...this.props}
            listNotify={this.state.notifyList}
            filterObj={this.state.filterData}
            removeNotification={(e) => { this.confirmModal(e) }}
            updateContacts={(e) => this.getNotifications(e)}
        />);
    }

}

const mapStateToProps = ({  }) => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => ({
    getNotifications: () => dispatch(getNotifications('')),
    deleteNotifications: (id) => dispatch(deleteNotifications(id)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationListing);
