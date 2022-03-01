import _ from 'lodash';
import {
  Platform,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
//import {updateDeviceTokenRequest} from '../actions/GeneralActions';
//import DataHandler from '../services/DataHandler';
import util from '../utils';
import {NOTIFICATION_PERMISSION_DENIED_ERROR} from '../constants';
// import {
//   NOTIFICATION_PERMISSION_DENIED_ERROR,
//   LEGENDS_NOTIFICATION_CHANNEL,
// } from '../constants';
import axios from 'axios';
import {baseUrl} from '../webconfig/globalConfig';
import DataHandler from '../utils/DataHandler';

const updateDeviceToken = async token => {
  debugger;
  let fcmToken = '';
  if (_.isUndefined(token)) {
    console.log('token undefined---->', token);
    return new Promise(resolved=>{
      messaging()
        .getToken()
        .then(value => {
          console.log('token service-->', value);
          fcmToken = value;
          resolved(fcmToken || token);
          //sendDeviceToken(fcmToken);
        });
    })
    
  }
  // if (fcmToken || token) {
  //   // {DataHandler.getStore().dispatch(
  //   //   updateDeviceTokenRequest({
  //   //     deviceId: fcmToken || token,
  //   //     devicePlatform: Platform.OS
  //   //   })
  //   // );}
  //   return fcmToken || token;
  // }
};

// const sendDeviceToken = async(fcmToken) => {
//   console.log('fcmToken-->', fcmToken);
//   const AuthStr = {headers: {auth: await DataHandler.getAuth()}};
//   console.log('authentication key =-----------------------234 >' + AuthStr);
//   URL = baseUrl + '/user/device';
//   axios
//     .put(
//       URL,
//       {
//         device_token: fcmToken,
//       },
//       {headers: {Authorization: AuthStr}},
//     )
//     .then(response => {
//       console.log('response-->', response);
//     })
//     .catch(function (error) {
//       console.log('response-->', error);
//     });
// };

const setChannelForAndroid = () => {
  // Driver Channel
  // const legendsDriverChannel = new firebase.notifications.Android.Channel(
  //   LEGENDS_NOTIFICATION_CHANNEL.id,
  //   LEGENDS_NOTIFICATION_CHANNEL.name,
  //   firebase.notifications.Android.Importance.Max,
  // );
  // firebase.notifications().android.createChannel(legendsDriverChannel);
};

const getPermissions = async () => {
  const authorizationStatus = await messaging().requestPermission();
  console.log('admin------>', authorizationStatus);
  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
    return true;
  } else {
    util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR, 'warning');
  }
};

const showLocalNotification = data => {
  debugger;
  console.log('data--------->', data);
  //const { title, deliveryId, body, type } = data;

  //const notificationOpen = firebase.notifications().getInitialNotification();

  // const notification = new firebase.notifications.Notification()
  //   .setNotificationId(1) //Util.generateGuid()
  //   .setTitle(title)
  //   .setBody(body)
  //   .setData({
  //     deliveryId,
  //     type,
  //   });

  // notification.ios.setBadge(1);
  // notification.android.setChannelId(LEGENDS_NOTIFICATION_CHANNEL.id);
  // notification.android.setSmallIcon('ic_launcher_push');
  // notification.android.setLargeIcon('ic_launcher_push');
  // notification.android.setPriority(
  //   firebase.notifications.Android.Priority.High,
  // );
  // firebase
  //   .notifications()
  //   .displayNotification(notification)
  //   .catch(err => console.error(err));
};

const clearBadgeNumber = () => {
  // if (!Util.isPlatformAndroid()) {
  //   firebase.notifications().setBadge(0);
  // }
};

export {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  clearBadgeNumber,
  //sendDeviceToken,
};
