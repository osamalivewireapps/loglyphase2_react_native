/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { CommonActions } from "@react-navigation/native";

function ProductDetailView(props) {


    const isTablet = DeviceInfo.isTablet();
    const [isEditShow, setIsEditShow] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#C90F22',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: !isTablet ? verticalScale(260) : verticalScale(320)
            }}>

                <View style={{
                    height: isTablet ? verticalScale(250) : verticalScale(200),
                    width: '100%',
                    position: 'absolute'
                }}>
                    <ImagePlaceholder
                        showActivityIndicator={false}
                        activityIndicatorProps={{
                            size: 'small',
                            color: '#777777',
                        }}
                        resizeMode='cover'
                        placeholderStyle={{
                            height: isTablet ? verticalScale(250) : verticalScale(200),
                            width: '100%',
                            borderBottomLeftRadius: moderateScale(30),
                            borderBottomRightRadius: moderateScale(30),

                        }}
                        imgStyle={{
                            height: isTablet ? verticalScale(250) : verticalScale(200),
                            width: '100%',
                            borderBottomLeftRadius: moderateScale(30),
                            borderBottomRightRadius: moderateScale(30),
                        }}

                        style={{

                        }}

                        src={props.productData?.image}
                        placeholder={Icons.icon_paw}
                    />
                </View>
                <View style={{
                    padding: moderateScale(25), flexDirection: 'row', flex: 1
                }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('SearchItem')
                        }}
                            style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const resetAction = CommonActions.reset({
                                index: 1,
                                routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                            });

                            props.navigation.dispatch(resetAction);

                        }}>


                            <Image source={Icons.icon_header_home} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View> */}

                </View>

                <View style={{
                    flexDirection: 'row',
                    height: isTablet ? verticalScale(70) : verticalScale(60),
                    alignItems: 'center',
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(28)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: 'white',
                            flex:1,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        {props.productData?.data?.name}

                    </AutoSizeText>

                    {isEditShow ?
                        <View style={{
                            height: verticalScale(70),
                            flex: moderateScale(0.145),
                            marginTop: 0,
                            marginBottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={Images.img_popup_services}
                                style={{
                                    position: 'absolute', height: '100%',
                                    width: '100%'
                                }} />
                            <TouchableOpacity
                                flex={moderateScale(0.1)}
                                onPress={() => {
                                    props.navigation.navigate('RegisterProduct', { productData: props.productData, updateProduct: props.route.params.updateProduct })
                                    setIsEditShow(false)

                                }}>
                                <Image source={Icons.icon_services_edit}
                                    resizeMode='contain' style={{
                                        marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15)
                                    }}

                                />
                            </TouchableOpacity>
                            <View style={{
                                width: '50%',
                                height: verticalScale(0.5),
                                backgroundColor: '#585858',
                                marginEnd: moderateScale(5),
                                marginTop: verticalScale(8),
                                marginBottom: verticalScale(8)
                            }} />
                            <TouchableOpacity
                                flex={moderateScale(0.1)}
                                onPress={() => {
                                    setIsEditShow(false)
                                }}>
                                <Image source={Icons.icon_services_delete}
                                    resizeMode='contain'
                                    style={{
                                        marginEnd: moderateScale(3),
                                        height: verticalScale(15),
                                        width: moderateScale(15)
                                    }} />
                            </TouchableOpacity>
                        </View> : <View style={{ flex: 0.1 }} />}
                    <TouchableOpacity
                        style={{ flex: 0.1, height: moderateScale(25) }}
                        onPress={() => isEditShow?setIsEditShow(false):setIsEditShow(true)}>
                        <Image source={Icons.icon_kebab} resizeMode='contain'
                            style={{ height: moderateScale(25) }} />

                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ flex: 1, padding: moderateScale(25) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 0.8 }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(18)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#464646',
                                    fontFamily: Fonts.type.bold,
                                }}>{props.productData?.categoryName}
                            </AutoSizeText>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(14)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#464646',
                                    fontFamily: Fonts.type.base,
                                }}>{props.productData?.data?.subCategory}
                            </AutoSizeText>
                        </View>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(32)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                flex: 0.2,
                                color: '#503A9F',
                                fontFamily: Fonts.type.bold,
                            }}>${props.productData?.data?.price}
                        </AutoSizeText>
                    </View>

                    <View flexDirection='row'>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                color: '#B7B7B7',
                                marginTop: verticalScale(20),
                                fontFamily: Fonts.type.base,
                            }}>Product ID 
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                color: '#464646',
                                marginStart:moderateScale(10),
                                marginTop: verticalScale(20),
                                fontFamily: Fonts.type.base,
                            }}>{props.productData?._id}
                        </AutoSizeText>
                    </View>
                    <View style={{
                        marginTop: verticalScale(15),
                        flexDirection: 'row',
                        backgroundColor: '#FEDDDA',
                        padding: moderateScale(5),
                        paddingStart: moderateScale(20),
                        paddingEnd: moderateScale(5),
                        alignItems: 'center',
                        borderRadius: moderateScale(10)
                    }}>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(12)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                color: '#D04621',
                                fontFamily: Fonts.type.medium,
                            }}>Quantity
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                color: '#D04621',
                                flex: 0.9,
                                textAlign: 'right',
                                fontFamily: Fonts.type.bold,
                            }}>{props.productData?.data?.quantity}kg
                        </AutoSizeText>
                    </View>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(10)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            marginTop: verticalScale(15),
                            color: '#464646',
                            fontFamily: Fonts.type.medium,
                        }}>Details
                    </AutoSizeText>

                    <AutoSizeText
                        minFontSize={moderateScale(10)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            color: '#777777',
                            marginTop: verticalScale(10),
                            textAlign: 'left',
                            fontFamily: Fonts.type.base,
                        }}>{props.productData?.data?.notes}
                    </AutoSizeText>

                    <View style={{
                        marginTop: verticalScale(15),
                        flexDirection: 'row',

                    }}>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(10)}
                            fontSize={moderateScale(14)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                color: '#464646',
                                fontFamily: Fonts.type.medium,
                            }}>Remaining Units?
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            mode={ResizeTextMode.max_lines}
                            style={{
                                color: '#464646',
                                flex: 0.9,
                                textAlign: 'right',
                                fontFamily: Fonts.type.medium,
                            }}>{(props.productData?.quantity - props.productData?.soldQuantity)} Pcs
                        </AutoSizeText>
                    </View>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(12)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            color: '#464646',
                            fontFamily: Fonts.type.medium,
                        }}>{props.productData?.status}
                    </AutoSizeText>
                </View>
            </ScrollView>
        </View>);
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'transparent',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(46),
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
        width: '100%'
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

export default ProductDetailView;

