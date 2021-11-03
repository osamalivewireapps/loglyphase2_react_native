/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Fonts, Colors, Icons, Images } from '../../../theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const vehicleData = ['Truck', 'PickUp', 'Car', 'MotorBike']

function ServicesListing(props) {

    const { wholeServices, updateServiceValues, type, delTrainingProgram } = props;
    const [selectServices, setSelectServices] = useState([]);
    const [isEditShow, setEditShow] = useState(-1);

    return (
        <FlatList
            data={wholeServices}
            renderItem={({ item, index }) => {
                console.log("item-->", item);
                return (
                    type === 'Pet Training' ? getPetTrainingItem(item, index) : getViewExceptPetTraining(item, index)
                )
            }}
            keyExtractor={(item) => item.id}

        />
    )

    function getViewExceptPetTraining(item, index) {
        return (
            <View style={{
                backgroundColor: '#F5F5F5',//isSelectService(index) ? '#FFC081' : '#F5F5F5',
                borderRadius: moderateScale(10),
                marginTop: verticalScale(10),
                flex: 1,
                height: verticalScale(50),
                flexDirection: 'row',
                alignItems: 'center',
                paddingStart: moderateScale(15),
                paddingEnd: moderateScale(15)

            }}>

                {/* <TouchableOpacity
                    style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        addServices(index)
                    }}>
                    <Image
                        source={isSelectService(index) ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                        resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15) }}
                    />
                </TouchableOpacity> */}
                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(14)}
                    fontSize={moderateScale(16)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        ...styles.generalTxt,
                        width: '76%',
                        paddingEnd: moderateScale(10),
                        color: Colors.appBgColor
                    }}>{getServiceName(item)}
                </AutoSizeText>

                {isEditShow === index ?
                    <View style={{
                        height: verticalScale(55),
                        flex: moderateScale(1),
                        marginTop: 0, marginBottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ImageBackground source={Images.img_popup_services}
                            style={{
                                position: 'absolute', height: '100%',
                                width: '100%'
                            }} />
                        <TouchableOpacity
                            flex={moderateScale(0.1)}
                            onPress={() => {
                                setEditShow(-1)
                                updateServiceValues(item)
                            }}>
                            <Image source={Icons.icon_services_edit}
                                resizeMode='contain' style={{ marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15) }}

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
                            <Image source={Icons.icon_services_delete} resizeMode='contain' style={{ marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15) }} />
                        </TouchableOpacity>
                    </View> : <View flex={1} />}

                <TouchableOpacity
                    style={{ width: moderateScale(20), height: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}

                    onPress={() => {
                        setEditShow(index)
                    }}>
                    <Image source={Icons.icon_three_colons}
                        resizeMode='contain' style={{ height: verticalScale(12), width: moderateScale(12) }}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => {
                    updateServiceValues(item)
                }}>
                    <Image source={Icons.icon_three_colons} />
                </TouchableOpacity> */}
            </View>
        )
    }

    function getPetTrainingItem(item, index) {
        return (
            <TouchableOpacity style={{
                backgroundColor: '#F5F5F5',//backgroundColor: isSelectService(index) ? '#FFC081' : '#F5F5F5',
                borderRadius: moderateScale(10),
                marginTop: verticalScale(10),
                flex: 1,
                height: verticalScale(60),
                flexDirection: 'row',
                alignItems: 'center',
                paddingEnd: moderateScale(15)

            }} onPress={() => {
                addServices(index)
            }}>

                <View
                    style={{
                        height: '100%', backgroundColor: Colors.appBgColor,
                        borderRadius: moderateScale(10),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: moderateScale(0.2)
                    }} >

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(16)}
                        fontSize={moderateScale(30)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.bold,
                            color: 'white'
                        }}>8
                    </AutoSizeText>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(10)}
                        fontSize={moderateScale(12)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            includeFontPadding: false,
                            fontFamily: Fonts.type.base,
                            marginTop: verticalScale(-5),
                            color: 'white'
                        }}>Oct
                    </AutoSizeText>


                </View>


                <View style={{
                    flex: moderateScale(0.7),
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
                        }}>{getServiceName(item)}
                    </AutoSizeText>
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
                        }}>12:00 pm
                    </AutoSizeText>
                </View>

                {isEditShow === index ?
                    <View style={{ 
                        height: verticalScale(55), 
                        flex: moderateScale(0.1), 
                        marginTop: 0, 
                        marginBottom: 0, 
                        justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground source={Images.img_popup_services} style={{ position: 'absolute', height: '100%', width: '100%' }} />
                        <TouchableOpacity
                            flex={moderateScale(0.1)}
                            onPress={() => {
                                setEditShow(-1)
                                updateServiceValues(item)
                            }}>
                            <Image source={Icons.icon_services_edit}
                                resizeMode='contain'
                                style={{ marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15) }} />
                        </TouchableOpacity>
                        <View style={{
                            width: '50%', height: verticalScale(0.5),
                            backgroundColor: '#585858',
                            marginEnd: moderateScale(5),
                            marginTop: verticalScale(8), marginBottom: verticalScale(8)
                        }} />
                        <TouchableOpacity
                            flex={0.1}
                            onPress={() => {
                                setEditShow(-1)
                                delTrainingProgram(index)
                            }}>
                            <Image source={Icons.icon_services_delete}
                                resizeMode='contain'
                                style={{ marginEnd: moderateScale(5), height: verticalScale(15), width: moderateScale(15) }} />
                        </TouchableOpacity>
                    </View> : <View flex={moderateScale(0.18)} />}

                <TouchableOpacity
                    flex={moderateScale(0.16)}
                    onPress={() => {
                        setEditShow(index)
                    }}>
                    <Image
                        source={Icons.icon_three_colons} resizeMode='contain'
                        style={{ height: verticalScale(12), width: moderateScale(12) }}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    function getServiceName(item) {
        switch (type) {
            case 'Pet Walking / Sitting':
            case 'Veterinary':
            case 'Pet Grooming':
                return item.serviceName;

            case 'Pet Training':
                return item.programName;

            case 'Transportation':
                return vehicleData[item.vehicleType];

            case 'Pet Boarding':
                return item.packageName;

            case 'Breeding':
                return item.areaConsultancy;

        }
    }

    function isSelectService(item) {

        let tmp = selectServices;
        let itemService = tmp.includes(item);
        if (itemService) {
            return true;
        } else {
            return false;
        }
    }

    function addServices(e) {
        let tmp = selectServices;
        let itemService = tmp.includes(e);
        if (itemService) {
            tmp = tmp.splice(tmp.indexOf(e), 1);
        } else {
            tmp.push(e);
        }
        setSelectServices(result => [...result, tmp]);
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

export default ServicesListing;