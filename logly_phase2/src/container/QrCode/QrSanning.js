/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import styles from "./styleMain";
import Icon from "react-native-vector-icons/FontAwesome5";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Image } from 'react-native';
import { Icons } from '../../theme';
import { moderateScale } from 'react-native-size-matters';
import Util from '../../utils';


function QrScanning(props) {
    const [hasCameraPermission, setCameraPermission] = useState(true)
    const [scanned, setScanned] = useState(false)
    let scanner = useRef(null);

    useEffect(() => {
        //getPermissionsAsync()
    }, [])

    const getPermissionsAsync = async () => {
        const { status } = null;//await Permissions.askAsync(Permissions.CAMERA)
        const isPermissionGranted = status === 'granted'
        //console.log(isPermissionGranted)
        setCameraPermission(isPermissionGranted)
    }
    const handleBarCodeScanned = (data) => {
        if (data.length === 24) {
            props.navigation.navigate('PetDetail', { id: data, updateContacts: {}});
        }
        else {
            Util.topAlert("Invalid Qr Code");
        }

        setScanned(true)
    }
    if (hasCameraPermission === null) {
        return (
            <View style={{ ...styles.contentCenter }}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }
    if (hasCameraPermission === false) {
        return (
            <View style={{ ...styles.contentCenter }}>
                <Text>No access to camera</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.barcontainer}>
         
                <QRCodeScanner
                    ref={(node) => { scanner = node }}
                    onRead={(e) => handleBarCodeScanned(e.data)}
                    fadeIn={false}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    containerStyle={{
                        backgroundColor: 'rgba(255,255,255,0.7)'
                    }}
                />


                <View style={{ ...styles.baroverlay, backgroundColor: 'rgba(255,255,255,0.7)' }}>
                    <View style={styles.unfocusedContainer}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack();
                        }}>
                            <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ margin: moderateScale(25), height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.middleContainer}>
                        <View style={styles.unfocusedContainer}></View>
                        <View
                            style={styles.focusedContainer}>

                            {scanned && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setScanned(false)
                                        scanner.reactivate()
                                    }}
                                    style={styles.rescanIconContainer}>
                                    <Icon name="redo" size={80} style={{ color: 'rgba(0,0,0,0.7)' }}></Icon>
                                    <Text>Scan again</Text>

                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.unfocusedContainer}></View>
                    </View>
                    <View style={styles.unfocusedContainer}></View>
                </View>

           


            </View>
        </View>
    )
}
export default QrScanning