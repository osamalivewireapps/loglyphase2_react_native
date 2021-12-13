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
import CRMAddAnimalView from './crm_select_animal';
import ViewPager from '@react-native-community/viewpager';
import CRMAddBreedView from './crm_select_breed';
import CRMMyOrder from './crm_my_order';
import CRMOrderSummary from './crm_order_summary';


function CRMNewOrderView(props) {


    const isTablet = DeviceInfo.isTablet();

    const pagerRef = useRef(null);
    const [pageNumber, setPageNumber] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <CRMHeaderView
                iconStyles={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(50) }}
                name="New Order" icon={Icons.icon_crm_order} bgColor='#161D6E'
                {...props}
                backScreen={() => backScreen()}
            />

            <ViewPager style={{ flex: 1 }} scrollEnabled={false} ref={pagerRef}>
                <View key={0}>
                    <CRMAddAnimalView {...props} nextScreen={() => nextScreen()} />
                </View>
                <View key={1}>
                    <CRMAddBreedView {...props} nextScreen={() => nextScreen()} />
                    
                </View>
                <View key={2}>
                    <CRMMyOrder {...props} nextScreen={() => nextScreen()} />

                </View>
                <View key={3}>
                    <CRMOrderSummary {...props} nextScreen={() => nextScreen()} />

                </View>

            </ViewPager>

        </View>
    );

    function nextScreen() {
        if (pageNumber + 1 < 4){
            pagerRef.current.setPage(pageNumber + 1);
            setPageNumber(pageNumber + 1)
        }else{
            setTimeout(()=>{
                setPageNumber(0)
                pagerRef.current.setPage(0);

            },1000)
            props.navigation.navigate('CrmOrderCompleted');
        }

        
    }

    function backScreen(e) {
        if (pageNumber > 0){
            pagerRef.current.setPage(pageNumber-1);
            setPageNumber(pageNumber - 1)
        }
        else {
            props.navigation.pop()
        }
    }
}

export default CRMNewOrderView;
