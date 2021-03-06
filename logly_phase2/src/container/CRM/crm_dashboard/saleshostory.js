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

import CRMStyles from './../crm_styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    BarChart,
} from "react-native-chart-kit";
import { getSalesHistory } from '../../../actions/Sales';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Util from '../../../utils';
import { fontSize } from 'styled-system';

function SalesHistoryView(props) {

    const ACTIVITY_TYPE = ['All Time', 'Today', 'This Week', 'Yesterday', 'Last Week']
    const [searchTxt, setSearchTxt] = useState('');
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [historyIndex, setHistoryIndex] = useState(2);

    const [salesHistory, setSalesHistory] = useState([]);
    const [orgHistoryList, setOrgHistoryList] = useState([]);

    const sheetRef = useRef(null);

    //for chart
    const [chartData, setchartData] = useState([])
    const [chartLabel, setchartLabel] = useState([])
    const [filterSalesHistory, setfilterSalesHistory] = useState([])

    //for axis
    const [xaxis, setxaxis] = useState("Week days")
    //

    const chartConfig = {
        //backgroundColor: '#553E90',
        backgroundGradientFrom: "#7050DE",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "#341897",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `white`,
        decimalPlaces: 1,
        // strokeWidth: 2, // optional, default 3
        barPercentage: moderateScale(0.5),
        useShadowColorFromDataset: false, // optional
        style: {
            padding: moderateScale(100),
        },
        fillShadowGradient: 'white', // THIS
        fillShadowGradientOpacity: 1, // THIS
    };
    const screenWidth = Dimensions.get("window").width;

    let dispatch = useDispatch();

    //////////////////////////  CALENDAR ////////////////////
    let from_date, to_date, result;

    useEffect(() => {
        dispatch(getSalesHistory()).then((response) => {
            setSalesHistory(response.payload);
            setOrgHistoryList(response.payload);

            from_date = moment().startOf('isoweek').format("YYYY-MM-DD");
            to_date = moment().endOf('isoweek').format("YYYY-MM-DD");
            let data = response.payload.filter(e => moment(e.createdAt).format("YYYY-MM-DD") >= from_date && moment(e.createdAt).format("YYYY-MM-DD") <= to_date)
            setfilterSalesHistory(data)
            result = WeekHandler(data)
            HandleChartWeek(result)
            setfilterSalesHistory(data)
        })
    }, []);

    const HandleChartData = (data) => {
        setchartData(data.map(e => e.price))
        setchartLabel(data.map((e, index) => index + 1))
    }

    const HandleChartDataDay = (data) => {
        setchartData(data.map(e => e.price))
        setchartLabel(data.map(e => moment(e.createdAt).format("hh:ss")))
    }


    const HandleChartWeek = (data) => {
        let dataWeek = [{ createdAt: 1, price: 0 },
        { createdAt: 2, price: 0 }, { createdAt: 3, price: 0 }, { createdAt: 4, price: 0 }, { createdAt: 5, price: 0 },
        { createdAt: 6, price: 0 }, { createdAt: 0, price: 0 },]

        dataWeek = dataWeek.map(el => {
            var found = data.find(s => moment(s.createdAt).day() === el["createdAt"]);
            if (found) {
                el = Object.assign(el, found);
            }
            return el;
        });
        //console.log(dataWeek);
        setchartData(dataWeek.map(e => e.price))
        setchartLabel(dataWeek.map(e => [1, 2, 3, 4, 5, 6, 0].includes(e.createdAt) ? weekName(e.createdAt) : weekName(moment(e.createdAt).day())))
    }

    const weekName = (num) => {
        switch (num) {
            case 1:
                return "Mon"
            case 2:
                return "Tue"
            case 3:
                return "Wed"
            case 4:
                return "Thu"
            case 5:
                return "Fri"
            case 6:
                return "Sat"
            case 0:
                return "Sun"

            default:
                return null;
        }
    }

    const WeekHandler = (data) => {
        let result = []
        data.forEach(function (e) {
            if (!this[moment(e.createdAt).format("YYYY-MM-DD")]) {
                this[moment(e.createdAt).format("YYYY-MM-DD")] = { createdAt: moment(e.createdAt).format("YYYY-MM-DD"), price: 0 };
                result.push(this[moment(e.createdAt).format("YYYY-MM-DD")]);
            }
            this[moment(e.createdAt).format("YYYY-MM-DD")].price += Util.calculateTax(e.price, e.tax);
        }, {});
        return result
    }

    useEffect(() => {
        const today = moment().subtract(0, 'days').format("YYYY-MM-DD");
        let data = {};

        switch (ACTIVITY_TYPE[historyIndex].toLowerCase()) {
            case "all time":
                setfilterSalesHistory(salesHistory)
                HandleChartData(salesHistory)
                setxaxis("Count")
                return

            case "yesterday":
                let pre = moment().subtract(1, 'days').format("YYYY-MM-DD")
                data = salesHistory.filter(e => moment(e.createdAt).format("YYYY-MM-DD") <= pre && moment(e.createdAt).format("YYYY-MM-DD") >= pre)
                setfilterSalesHistory(data)
                HandleChartDataDay(data)
                setxaxis("Time")
                return

            case "today":
                data = salesHistory.filter(e => (moment(e.createdAt).format("YYYY-MM-DD") === today))
                setfilterSalesHistory(data)
                HandleChartDataDay(data)
                setxaxis("Time")
                return


            case "this week":
                from_date = moment().startOf('isoweek').format("YYYY-MM-DD");
                to_date = moment().endOf('isoweek').format("YYYY-MM-DD");
                data = salesHistory.filter(e => moment(e.createdAt).format("YYYY-MM-DD") >= from_date && moment(e.createdAt).format("YYYY-MM-DD") <= to_date)
                setfilterSalesHistory(data)
                result = WeekHandler(data)
                HandleChartWeek(result)
                setxaxis("Week Days")
                return

            case "last week":
                from_date = moment().startOf('isoweek').subtract(7, 'days').format("YYYY-MM-DD");
                to_date = moment().endOf('isoweek').subtract(7, 'days').format("YYYY-MM-DD");
                data = salesHistory.filter(e => moment(e.createdAt).format("YYYY-MM-DD") >= from_date && moment(e.createdAt).format("YYYY-MM-DD") <= to_date)
                setfilterSalesHistory(data)

                result = WeekHandler(data)
                HandleChartWeek(result)
                setxaxis("Week Days")
                return

            default:
                setfilterSalesHistory(salesHistory)
                break;
        }
    }, [historyIndex])

    useEffect(() => {
        if (orgHistoryList.length > 0) {
            setSalesHistory(orgHistoryList.filter((e) => {
                return (
                    e.saleUniqueId.includes(searchTxt)) ||
                    e.buyerId?.name.toLowerCase().includes(searchTxt.toLowerCase())
            }))
        }
    }, [searchTxt]);

    return (
        <View style={{}}>

            <View style={{ height: '100%' }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                }}>

                    <TextInput
                        onChangeText={(e) => {
                            setSearchTxt(e)
                        }}
                        value={searchTxt}
                        placeholder='Search'
                        numberOfLines={1}
                        keyboardType='default'
                        autoCapitalize='none'
                        style={{
                            keyboardShouldPersistTaps: true,
                            flex: 0.9,
                            height: verticalScale(40),
                            ...CRMStyles.generalTxt,
                            color: '#777777',
                            fontSize: moderateScale(14),
                        }} />
                    <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                </View>

                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...CRMStyles.boxcontainer,
                                shadowColor: 'white',
                                borderColor: 'red',
                                borderBottomWidth: 1,
                                borderBottomColor: '#707070',
                                borderRadius: 0,
                                marginTop: verticalScale(20),
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%'
                                    }}>
                                    {historyIndex > -1 ? ACTIVITY_TYPE[historyIndex] : 'Select Activity Type'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

                        <RBSheet
                            ref={sheetRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showActivityType()}

                        </RBSheet>
                        {isBottonSheetVisible ? sheetRef.current.open() : null}


                        <ImageBackground style={{
                            width: '100%',
                            marginTop: verticalScale(20),
                            height: moderateVerticalScale(190),
                            backgroundColor: '#341897',
                            borderRadius: moderateScale(10),
                            justifyContent: 'center'
                        }}>

                            <BarChart
                                fromZero={true}
                                data={{
                                    labels: chartLabel,
                                    datasets: [
                                        {
                                            data: chartData,
                                            color: ["#dfe4ea", "#ced6e0", "#a4b0be", "#ced6e0", "#a4b0be"],
                                        },
                                    ],
                                }}
                                width={screenWidth * 0.86}
                                height={moderateVerticalScale(190)}
                                withInnerLines={false}
                                style={{ borderRadius: moderateScale(10) }}
                                withHorizontalLabels={true}
                                chartConfig={{
                                    ...chartConfig,
                                    borderRadius: moderateScale(10),
                                    barRadius: moderateScale(10),

                                }}
                                showBarTops={false}
                                yAxisLabel="$"
                            //yLabelsOffset=moderateScale(10)
                            />
                        </ImageBackground>

                        <FlatList
                            keyboardShouldPersistTaps='handled'
                            data={salesHistory}
                            contentContainerStyle={{
                                marginTop: verticalScale(10),
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => props.navigation.navigate('CRMSalesDetails', { id: item._id })}
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
                                                        height: verticalScale(15),

                                                    }}
                                                    source={Icons.icon_crm_paymentinvoice} />
                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(12)}
                                                    fontSize={moderateScale(16)}
                                                    style={{
                                                        fontFamily: Fonts.type.bold,
                                                        color: Colors.appBgColor,
                                                        marginStart: moderateScale(10)

                                                    }}
                                                >
                                                    {item.saleUniqueId}
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
                                                    Sold on:
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
                                                    Sold Amount:
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
                                                    ${item.totalPrice}
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
                                                    Sold to:
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
                </ScrollView>
            </View>



        </View>

    );

    function showActivityType() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...CRMStyles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Activity Type</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={ACTIVITY_TYPE}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setHistoryIndex(index);
                                        sheetRef.current.close();
                                        setCloseBottonSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={index === historyIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...CRMStyles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }
}


export { SalesHistoryView };