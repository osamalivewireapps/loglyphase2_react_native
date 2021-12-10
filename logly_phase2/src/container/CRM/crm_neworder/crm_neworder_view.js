/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from './../crm_styles'
import CRMHeaderView from '../crm_header';


function CRMNewOrderView(props) {


    const isTablet = DeviceInfo.isTablet();

    const { toggleDrawer, userObject } = props;

    const [tabs, setTab] = useState(0);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <CRMHeaderView 
                iconStyles={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(50) }}
            name="New Order" icon={Icons.icon_crm_order} bgColor='#161D6E'
                {...props}
            />
        </View>
    )
}

export default CRMNewOrderView;
