/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';

function InventoryView(props) {

    const INV_DASHBOARD = [{ name: 'Pet Profile', bg: '#161D6E', icon: Icons.icon_pet_profile },


        { name: 'Register Pet', bg: '#FFB531', icon: Icons.icon_reg_pet },
    { name: 'Products', bg: '#097D3B', icon: Icons.icon_pet_profile },
    { name: 'Register Products', bg: '#C90F22', icon: Icons.icon_pet_profile }];

    const isTablet = DeviceInfo.isTablet();
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ flex: 1 }}>

                    <View style={{
                        backgroundColor: '#FC5D3F',
                        borderBottomLeftRadius: moderateScale(30),
                        borderBottomRightRadius: moderateScale(30),
                    }}>
                        <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                                <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                                <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                                    <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                                </TouchableOpacity>
                                <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                                <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'row', flex: 1,
                            alignItems: 'flex-end',
                            marginTop: verticalScale(-20)
                        }}>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(22)}
                                fontSize={moderateScale(23)}
                                mode={ResizeTextMode.overflow_replacement}
                                style={{
                                    color: 'white',
                                    flex: 0.4,
                                    paddingStart: moderateScale(25),
                                    paddingBottom: moderateScale(25),
                                    fontFamily: Fonts.type.bold
                                }}>
                                Inventory{'\n'}Management

                            </AutoSizeText>
                            <Image source={Images.img_inventory_home} resizeMode='contain'
                                style={{ flex: 0.6, width: '100%', height: moderateScale(200) }} />
                        </View>

                    </View>

                    <FlatList
                        numColumns={2}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: verticalScale(40),
                            marginStart: moderateScale(25),
                            marginEnd: moderateScale(25),
                        }}
                        scr
                        data={INV_DASHBOARD}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (index === 1) {
                                            props.navigation.navigate('RegisterPet');
                                        }
                                        else if (index === 0) {
                                            props.navigation.navigate('PetProfile');
                                        }
                                    }}
                                    style={{
                                        backgroundColor: item.bg,
                                        borderRadius: moderateScale(15),
                                        width: isTablet ? Dimensions.get('screen').width / moderateScale(2) : Dimensions.get('screen').width / moderateScale(2.6),
                                        height: isTablet ? verticalScale(130) : verticalScale(110),
                                        marginEnd: moderateScale(10),
                                        marginTop: moderateScale(10),
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <Image
                                        source={item.icon}
                                        resizeMode='contain'
                                        style={{
                                            width: '35%',
                                            height: '35%',
                                            flex: 0.7,
                                        }} />

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: 'white',
                                            flex: 0.3,
                                            height: '100%',
                                            width: '90%',
                                            textAlign: 'center',

                                        }}>{item.name}
                                    </AutoSizeText>
                                </TouchableOpacity>
                            )
                        }}


                    />

                </View>
            </ScrollView>
        </View>

    )
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

export default InventoryView;