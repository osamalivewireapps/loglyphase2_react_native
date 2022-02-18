/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo, { getApiLevelSync } from 'react-native-device-info';
import CRMStyles from '../crm_styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    BarChart,
} from "react-native-chart-kit";
import { getSalesInvoice } from '../../../actions/Sales';
import { useDispatch } from 'react-redux';
import moment from 'moment';

function PaymentsView(props) {

    const ACTIVITY_TYPE = ['All Time', 'Today', 'This Week', 'Yesterday', 'Last Week']

    const [tabUpcoming, setTabUpcoming] = useState(0);//0 for upcoming or vice versa

    const chartConfig = {
        //backgroundColor: '#553E90',
        backgroundGradientFrom: "#7050DE",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "#341897",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `white`,
        // strokeWidth: 2, // optional, default 3
        barPercentage: moderateScale(0.5),
        useShadowColorFromDataset: false, // optional
        style: {
            padding: 100,
        },
        fillShadowGradient: 'white', // THIS
        fillShadowGradientOpacity: 1, // THIS

    };
    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [70, 55, 55, 80, 99, 55, 0]
            }
        ]
    };

    const [payHistory, setPayHistory] = useState([]);
    const [completePayHistory, setCompletePayHistory] = useState([]);

    let dispatch = useDispatch();

    useEffect(() => {
        getPaymentList()
    }, []);

    useEffect(() => {
        if (tabUpcoming === 0) {
            setPayHistory(completePayHistory.filter(e => e.installmentId ? e.installmentId.isPaid === false : e.saleId.isPaid === false))
        }
        else {
            setPayHistory(completePayHistory.filter(e => e.installmentId ? e.installmentId.isPaid === true : e.saleId.isPaid === true))
        }
    }, [tabUpcoming])

    function getPaymentList() {
        dispatch(getSalesInvoice()).then((response) => {
            setCompletePayHistory(response.payload)
            if (tabUpcoming === 0) {
                setPayHistory(response.payload.filter(e => e.installmentId ? e.installmentId.isPaid === false : e.saleId.isPaid === false))
            }
            else {
                setPayHistory(response.payload.filter(e => e.installmentId ? e.installmentId.isPaid === true : e.saleId.isPaid === true))
            }
        })
    }

    return (
        <View style={{ height: '100%' }}>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

            }}>

                <TouchableOpacity
                    onPress={() =>
                        setTabUpcoming(0)}
                    style={{
                        flex: 0.5,
                        borderColor: Colors.appBgColor,
                        borderWidth: 1,
                        padding: moderateScale(5),
                        borderRadius: moderateScale(20),
                        paddingTop: verticalScale(6),
                        paddingBottom: verticalScale(6),
                        backgroundColor: tabUpcoming === 0 ? Colors.appBgColor : 'white',

                    }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        style={{
                            textAlign: 'center',
                            fontFamily: Fonts.type.base,
                            color: tabUpcoming === 0 ? 'white' : Colors.appBgColor,

                        }}
                    >
                        Upcoming
                    </AutoSizeText>

                </TouchableOpacity>
                <TouchableOpacity

                    onPress={() => setTabUpcoming(1)} style={{
                        flex: 0.5,
                        marginStart: moderateScale(10),
                        padding: moderateScale(5),
                        borderRadius: moderateScale(20),
                        paddingTop: verticalScale(6),
                        paddingBottom: verticalScale(6),
                        borderColor: Colors.appBgColor,
                        borderWidth: 1,
                        backgroundColor: tabUpcoming === 1 ? Colors.appBgColor : 'white',

                    }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(14)}
                        style={{
                            textAlign: 'center',
                            fontFamily: Fonts.type.base,
                            color: tabUpcoming === 1 ? 'white' : Colors.appBgColor,

                        }}
                    >
                        Received
                    </AutoSizeText>

                </TouchableOpacity>
            </View>

            {/* <ImageBackground style={{
                        width: '100%',
                        marginTop: verticalScale(20),
                        height: moderateVerticalScale(190),
                        backgroundColor: '#341897',
                        borderRadius: moderateScale(10),
                        justifyContent: 'center'
                    }}>

                        <BarChart
                            data={data}
                            width={screenWidth * 0.85}
                            height={moderateVerticalScale(190)}
                            withInnerLines={false}
                            style={{ borderRadius: moderateScale(10) }}
                            withHorizontalLabels={true}
                            chartConfig={{
                                ...chartConfig,
                                borderRadius: moderateScale(10),
                                barRadius: moderateScale(10)
                            }}
                            showBarTops={false}
                            yAxisLabel="$ "
                            yLabelsOffset={moderateScale(10)}
                        />
                    </ImageBackground> */}
            <FlatList
                data={payHistory}
                contentContainerStyle={{
                    marginTop: verticalScale(10),
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('CRMPaymentDetails', { paymentDetails: item, updateList: () => getPaymentList() })
                            }}
                            style={{
                                backgroundColor: '#F5F5F5',
                                padding: moderateScale(5),
                                borderRadius: moderateScale(10),
                                marginTop: verticalScale(10),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: verticalScale(12),
                                paddingBottom: verticalScale(12)
                            }}>

                            <View style={{
                                flex: 0.9,
                                marginStart: moderateScale(12)
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_paymentinvoice} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#777777',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        Invoice Number:
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: Colors.appBgColor,
                                            marginStart: moderateScale(2)

                                        }}
                                    >
                                        {item.invoiceNumber}
                                    </AutoSizeText>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5)
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_daterange} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#777777',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        Date:
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: '#777777',
                                            marginStart: moderateScale(2)

                                        }}
                                    >
                                        {moment(item.updatedAt).format('DD MMM,YYYY')}
                                    </AutoSizeText>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5)
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_dollar} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#777777',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        Amount:
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: '#777777',
                                            marginStart: moderateScale(2)

                                        }}
                                    >
                                        ${item.saleId.totalPrice}
                                    </AutoSizeText>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5)
                                }}>

                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            width: moderateScale(15),
                                            height: verticalScale(15)

                                        }}
                                        source={Icons.icon_crm_user} />
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#777777',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        Client:
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: '#777777',
                                            marginStart: moderateScale(2)

                                        }}
                                    >
                                        {item.buyerId?.name}
                                    </AutoSizeText>
                                </View>

                            </View>
                            <Image
                                resizeMode='contain'
                                style={{
                                    flex: 0.1,

                                }}
                                source={Icons.icon_arrow_blue} />
                        </TouchableOpacity>
                    )
                }}

            />
        </View>
    );


}


export { PaymentsView };