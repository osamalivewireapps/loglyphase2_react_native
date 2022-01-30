/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, ImageBackground, Dimensions } from 'react-native';
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Fonts, Colors, Icons, Images } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ImagePlaceholder from '../../../components/ImagePlaceholder';


const vehicleData = ['Truck', 'PickUp', 'Car', 'MotorBike']

function TeamListing(props) {

    const { wholeServices, updateServiceValues, type, delTrainingProgram } = props;
    const [selectServices, setSelectServices] = useState([]);
    const [isEditShow, setEditShow] = useState(-1);

    return (
        <FlatList
            style={{ width:'102%' }}
            data={wholeServices}
            renderItem={({ item, index }) => {
                return (
                    getFriendItem(item, index)
                )
            }}
            keyExtractor={(item) => item.id}

        />
    )


    function getFriendItem(item, index) {
        return (
            <View style={{
                backgroundColor: '#F5F5F5',
                borderRadius: moderateScale(10),
                marginTop: verticalScale(10),
                flex: 1,
                height: verticalScale(46),
                flexDirection: 'row',
                alignItems: 'center',
                paddingEnd: moderateScale(15)
  
            }} onPress={() => {

            }}>

                {/* <Image source={item.image} 
                    resizeMode='contain' style={{ height: verticalScale(50), width: moderateScale(50) }}
                /> */}

                <ImagePlaceholder
                    showActivityIndicator={false}
                    activityIndicatorProps={{
                        size: 'small',
                        color: '#777777',
                    }}
                    resizeMode='cover'
                    placeholderStyle={{
                        height: '100%',
                        width: moderateScale(55),
                        borderRadius:moderateScale(10),
                        borderWidth:1,
                        borderColor: '#777777',

                    }}
                    imgStyle={{
                        borderRadius: moderateScale(10),
                        borderColor: 'transparent',
                        width: moderateScale(55),
                        height: '100%',
                    }}

                    style={{
                        borderRadius: moderateScale(10),
                        height: '100%',
                        width: moderateScale(55),
                        flex:0,
                    }}

                    src={item.image}
                    placeholder={Images.img_user_placeholder}
                />


                <View style={{
                    flex: 1,
                }}>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            paddingStart: moderateScale(10),
                            paddingEnd: moderateScale(10),
                            color: '#585858'
                        }}>{item.name}
                    </AutoSizeText>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily:Fonts.type.base,
                            paddingStart: moderateScale(10),
                            paddingEnd: moderateScale(10),
                            color: '#585858'
                        }}>{item.email}
                    </AutoSizeText>
                </View>

                {isEditShow === index ?
                    <View style={{ 
                        height: verticalScale(70), 
                        flex: moderateScale(0.145), 
                        marginTop: 0, 
                        marginBottom: 0, 
                        justifyContent: 'center', 
                        alignItems: 'center' }}>
                        <ImageBackground 
                        source={Images.img_popup_services} 
                        style={{ position: 'absolute', height: '100%', 
                        width: '100%' }} />
                        <TouchableOpacity
                            flex={moderateScale(0.1)}
                            onPress={() => {
                                setEditShow(-1)
                                updateServiceValues(item)
                            }}>
                            <Image source={Icons.icon_services_edit}
                                resizeMode='contain' style={{ 
                                    marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15) }}

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
                                setEditShow(-1)
                                delTrainingProgram(index)
                            }}>
                            <Image source={Icons.icon_services_delete} 
                            resizeMode='contain' 
                            style={{ marginEnd: moderateScale(3), 
                            height: verticalScale(15), 
                            width: moderateScale(15) }} />
                        </TouchableOpacity>
                    </View> : <View flex={moderateScale(0.1)} />}

                <TouchableOpacity
                    style={{ width: moderateScale(20), height: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}

                    onPress={() => {
                        setEditShow(index)
                    }}>
                    <Image source={Icons.icon_three_colons}
                        resizeMode='contain' style={{ height: verticalScale(12), width: moderateScale(12) }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    generalTxt: {
        color: 'white',
        fontSize: moderateScale(22),
        fontFamily: Fonts.type.medium
    },
    bottomSheetHeader: {
        color: '#464646',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.medium
    },
    styleButtons: {
        backgroundColor: Colors.appBgColor, borderRadius: moderateScale(30)
    }

});

export default TeamListing;