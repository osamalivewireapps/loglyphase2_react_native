/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import DataHandler from '../../utils/DataHandler';
import { hideLoaderOnly } from '../../actions/SignUpModule';
import { getUser, sendDeviceToken } from '../../actions/LoginModule';
import HomeView from './home_view';
import { connect } from 'react-redux';
import Util from '../../utils';

import { getPermissions, setChannelForAndroid, showLocalNotification, updateDeviceToken } from '../../helpers/firebaseHelper';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.props.hideLoaderOnly();
        this.state = {
            userObject: {}
        }
    }

    componentDidMount() {

        this._fcmInit();

        DataHandler.getAccountType().then((value) => {
            this.accountType = value;
        })

        this.props.getUser().then((response) => {
            if (response.payload) {
                DataHandler.saveUserObject(JSON.stringify(response.payload));
            }
        });

        DataHandler.getUserObject().then((value) => {
            this.setState({ userObject: JSON.parse(value) });
        });
    }

    _fcmInit = async () => {
        // ------------- CHANNEL INIT --------------
        if (Util.isPlatformAndroid()) setChannelForAndroid();


        // ------------- iOS Permission --------------
        if (!Util.isPlatformAndroid()) getPermissions();

        // ------------- TOKEN INIT --------------

        updateDeviceToken().then(value=>{
            if(value){
                this.props.sendDeviceToken(value)
            }
        });

        this.onTokenRefreshListener = 
            messaging()
            .onTokenRefresh(fcmToken => {
                updateDeviceToken(fcmToken);
            });

        // ------------- NOTIFICATION SUBSCRIBTIONS --------------
        messaging().subscribeToTopic("logly");
     
        // ------------- NOTIFICATION LISTNER --------------

        // messaging().onNotificationOpenedApp(remoteMessage => {
        //     console.log(
        //         'Notification caused app to open from background state:',
        //         remoteMessage.notification,
        //     );
        //     //navigation.navigate(remoteMessage.data.type);
        // });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    Alert.alert('meri jan---->A new FCM message arrived!', JSON.stringify(remoteMessage));
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                //setLoading(false);
            });

        messaging().onMessage(async remoteMessage => {
            Alert.alert('----> 123 message arrived!', JSON.stringify(remoteMessage));
        });

        // this.notificationOpenedListener = messaging()
        //     .onNotificationOpenedApp(notificationOpen => {

        //         console.log("notification--->1");
        //         // when app is in background
        //         console.log({ background: notificationOpen });
        //         showLocalNotification(notificationOpen._data);

        //         if (notificationOpen && notificationOpen.notification) {
        //             console.log("background-->", notificationOpen.notification)
        //             this.navigateOnNotificationTap(notificationOpen.notification._data);
        //         }
        //     });

        // this.notificationListener = messaging()
        //     .getInitialNotification(notification => {

        //         console.log("notification--->2");
        //         // when app is in foreground
        //         console.log({ foreground: notification });
        //         debugger
        //         const { title, deliveryId, body, type } = notification._data
        //         console.log("foreground-->", notification._data)
        //         Alert.alert(title, body, [
        //             {
        //                 text: "OK",
        //                 onPress: () => { this.navigateOnNotificationTap(notification._data) }
        //             }]);

        //     });

        // const notificationOpen = await messaging()
        //     .getInitialNotification();
        
        // console.log("notification--->3");
        // if (notificationOpen) {
        //     debugger
        //     // when app is in closed, and opened by clicking notification
        //     console.log("getInitialNotification", notificationOpen);
        //     console.log("getInitialNotification-->", notificationOpen.notification)
        //     if (notificationOpen && notificationOpen.notification) {
        //         this.navigateOnNotificationTap(notificationOpen.notification._data, true);
        //     }
        // }
    };

    navigateOnNotificationTap = (data, isFreshLaunch = false) => {

        console.log("data----------->", data);

        //firebase.notifications().removeAllDeliveredNotifications();
        // switch (data.type) {

        //     case "Tournament_Registration":
        //         Actions.poty();
        //         break;
        //     case "Last_Day_to_Register":
        //         Actions.poty();
        //         break

        //     case "Tournament_Live_Scoring":
        //         Actions.poty();
        //         break

        //     case "Event_Scheduled":
        //         this.props.setSelectedTab(2)
        //         Actions.jump("live_tab_main");
        //         break

        //     case "Evening_Before_Match":
        //         this.props.setSelectedTab(2)
        //         Actions.jump("live_tab_main");
        //         break

        //     case "Winner_LMP":
        //     case "Winner_LCL":
        //     case "Winner_DMP":
        //     case "Winner_POTY":
        //         Actions.news();
        //         break

        //     case "Match_Started":
        //         this.props.setSelectedTab(2)
        //         Actions.jump("live_tab_main");
        //         break
        // }

    };

    render() {
        return (<HomeView
            {...this.props}
            accountType={this.accountType}
            userObject={this.state.userObject}
            toggleDrawer={this.props.navigation}
        />);
    }
}

const mapDispatchToProps = dispatch => ({
    hideLoaderOnly: () => dispatch(hideLoaderOnly()),
    getUser: () => dispatch(getUser()),
    sendDeviceToken: (data) => dispatch(sendDeviceToken(data))
});


export default connect(
    null,
    mapDispatchToProps,
)(HomeScreen);
