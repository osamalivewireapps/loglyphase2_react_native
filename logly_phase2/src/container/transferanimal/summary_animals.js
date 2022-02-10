/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { RefreshControl, TextInput, FlatList, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, Text } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import DeviceInfo from 'react-native-device-info';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { useDispatch } from 'react-redux';
import { Colors, Fonts, Icons } from '../../theme';
import ViewPager from '@react-native-community/viewpager';
import { transferAnimal } from '../../actions/AnimalModule';
import DataHandler from '../../utils/DataHandler';
import Util from '../../utils';




function SummaryAnimalsView(props) {


    const isTablet = DeviceInfo.isTablet();

    const { staffData, animalData, popScreen, updateList } = props.route.params;



    const [headerTxt, setHeaderTxt] = useState('Enter Quantity');
    const [quantity, setQuantity] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [userObject, setUserObject] = useState({});

    let disptach = useDispatch();
    const pagerRef = useRef(null);

    useEffect(() => {
        setHeaderTxt(pageNumber === 0 ? 'Enter Quantity' : 'Summary')
    }, [pageNumber])

    useEffect(() => {
        DataHandler.getUserObject().then((value) => {
            setUserObject(JSON.parse(value))
            console.log('staff data-->', staffData);
            console.log('animal data-->', animalData);
            console.log('userObject data-->', value);
        });
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                borderTopStartRadius: 0,
                borderTopEndRadius: 0,
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(140)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { backScreen() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(15)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(18)}
                        fontSize={moderateScale(22)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: Colors.appBgColor,
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        {headerTxt}

                    </AutoSizeText>
                    <Image source={Icons.icon_header_teammember} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }} />
                </View>

            </View>
            <ViewPager

                style={{ flex: 1, }} scrollEnabled={false} ref={pagerRef}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        ...styles.boxcontainer,
                        shadowOpacity: 0.09,
                        marginTop: verticalScale(20),
                        borderRadius: moderateScale(15),
                        flexDirection: 'row', alignItems: 'center',
                        marginStart: moderateScale(25),
                        marginEnd: moderateScale(25),
                        height: moderateScale(65),

                    }}>
                        {/* <Image
                            source={animalData.image && animalData.image !== null ? animalData.image : Icons.icon_paw}
                            resizeMode='cover'
                            style={{
                                width: moderateScale(65),
                                height: moderateScale(65),
                                borderRadius: moderateScale(15)
                                , marginEnd: moderateScale(15)
                            }}
                        /> */}

                        <ImagePlaceholder
                            showActivityIndicator={false}
                            activityIndicatorProps={{
                                size: 'small',
                                color: '#777777',
                            }}
                            resizeMode='cover'
                            placeholderStyle={{
                                width: moderateScale(65),
                                height: moderateScale(65),
                                borderRadius: moderateScale(10),


                            }}
                            imgStyle={{
                                width: moderateScale(65),
                                height: moderateScale(65),
                                borderRadius: moderateScale(10),
                                borderWidth: 1,
                                borderColor: 'transparent',
                            }}

                            style={{
                                flex: 0,
                                marginEnd: moderateScale(10),
                                borderRadius: moderateScale(10),
                            }}


                            src={animalData.image ? animalData.image : ''}
                            placeholder={Icons.icon_paw}
                        />

                        <View style={{
                            flex: 1, alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingEnd: moderateScale(15)
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(16)}
                                    style={{
                                        fontFamily: Fonts.type.bold,
                                        color: '#464646',

                                    }}
                                >
                                    {animalData.data.name}
                                </AutoSizeText>
                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: Colors.appBgColor,
                                        flex: 1,
                                        textAlign: 'right',
                                        marginStart: moderateScale(10)

                                    }}
                                >

                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                paddingEnd: moderateScale(15),
                                width: '100%',
                                alignItems: 'flex-end',
                                height: verticalScale(16),
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',
                                        flex: 1

                                    }}
                                >
                                    {animalData.categoryName}
                                </AutoSizeText>

                            </View>

                        </View>

                    </View>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        margin: moderateScale(25)
                    }}>
                        <View style={{
                            marginEnd: moderateScale(10),
                            flex: 0.6,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10)
                        }}>

                            <TextInput
                                onChangeText={(e) => {
                                    setQuantity(e)
                                }}
                                value={quantity}
                                placeholder='Quantity'
                                numberOfLines={1}
                                keyboardType='number-pad'
                                autoCapitalize='none'
                                style={{
                                    keyboardShouldPersistTaps: true,
                                    flex: 0.9,
                                    height: verticalScale(35),
                                    ...styles.generalTxt,
                                    color: '#777777',
                                    fontSize: moderateScale(14),
                                }} />

                        </View>

                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            flex: 0.25,
                            borderRadius: moderateScale(8),
                            height: verticalScale(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#503A9F',
                            borderWidth: 1,
                        }} onPress={() => {
                            if (quantity.length > 0 && quantity > 0) {
                                if (quantity <= animalData.data.quantity)
                                    nextScreen()
                                else
                                    Util.topAlert('exceed the limit')
                            }
                            else {
                                Util.topAlert('Please enter quantity')
                            }
                        }}>

                            <Text
                                numberOfLines={1}
                                style={{
                                    color: Colors.appBgColor,
                                    textAlign: 'center',
                                    fontSize: moderateScale(14),
                                    fontFamily: Fonts.type.base,
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10),
                                }}>Next
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flex: 1 }}>

                    <View style={{ height: '100%' }}>

                        <Text
                            style={{
                                fontSize: moderateScale(16),
                                marginTop: verticalScale(20),
                                marginStart: moderateScale(25),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',

                            }}
                        >
                            Animal Information
                        </Text>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#404040',
                                marginTop: verticalScale(10),
                                marginStart: moderateScale(25)

                            }}
                        >
                            Animal Id: {animalData._id}
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',
                                marginStart: moderateScale(25)

                            }}
                        >
                            {animalData.data.name}
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#404040',
                                marginStart: moderateScale(25)

                            }}
                        >
                            Quantity:{quantity}
                        </AutoSizeText>

                        <View style={{
                            backgroundColor: '#EBEBEB',
                            marginTop: verticalScale(10),
                            height: 1,
                            //marginBottom: verticalScale(15)
                        }} />

                        <Text
                            style={{
                                fontSize: moderateScale(16),
                                marginTop: verticalScale(20),
                                marginStart: moderateScale(25),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',

                            }}
                        >
                            Customer Information
                        </Text>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#404040',
                                marginTop: verticalScale(10),
                                marginStart: moderateScale(25)

                            }}
                        >
                            {staffData.name}
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',
                                marginStart: moderateScale(25)

                            }}
                        >
                            {staffData.email}
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#404040',
                                marginStart: moderateScale(25)

                            }}
                        >
                            {staffData.phone}
                        </AutoSizeText>

                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            borderRadius: moderateScale(10),
                            margin: verticalScale(25),
                            marginStart: moderateScale(25),
                            marginTop: verticalScale(25)
                        }} onPress={() => { transfersAnimal() }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                            }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ViewPager >
        </View >
    );

    function transfersAnimal() {
        console.log('userobject--->', userObject)
        let data = { buyerId: staffData._id, quantity: quantity, sellerId: userObject._id, animalId: animalData._id };
        disptach(transferAnimal(data)).then(response => {
            updateList(quantity);
            props.navigation.pop(popScreen);
            //props.navigation.pop();
        })
    }

    function nextScreen(e) {
        if (pageNumber < 2) {
            pagerRef.current.setPage(pageNumber + 1);
            setPageNumber(pageNumber + 1)
        } else {
            setTimeout(() => {
                setPageNumber(0)

            }, 1000)
            props.navigation.pop()
        }


    }

    function backScreen(e) {
        if (pageNumber > 0) {
            pagerRef.current.setPage(pageNumber - 1);
            setPageNumber(pageNumber - 1)
        }
        else {
            props.navigation.pop()
        }
    }
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(40),
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(40),
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    }
});

export default SummaryAnimalsView;
