/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import AboutPetView from './about_pet';
import GalleryPetView from './gallery_pet';
import HealthPetView from './health_pet';
import FamilyTreePetView from './familytree_pet';
import { CommonActions } from "@react-navigation/native";
import ImagePlaceholder from '../../../components/ImagePlaceholder';

function PetDetailView(props) {

    const pagerRef = useRef(null);
    const [initialPg, setInitialPg] = useState(0);

    const isTablet = DeviceInfo.isTablet();
    const TABS = ["About", "Gallery", "Health", "Family\nTree"]
    const [tabsSelect, setTabsSelect] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#161D6E',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: !isTablet ? verticalScale(260) : verticalScale(320)
            }}>
           
                <View style={{
                    height: isTablet ? verticalScale(250) : verticalScale(200),
                    width: '100%',
                    position:'absolute'}}>
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

                    src={props.animalData.image}
                    placeholder={Icons.icon_paw}
                />
                </View>
                <View style={{
                    padding: moderateScale(25), flexDirection: 'row', flex: 1
                }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

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
                    </View>

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
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        {props.animalData.data.name}

                    </AutoSizeText>
                    <Image source={Icons.icon_edit_petprofile} resizeMode='contain'
                        style={{ flex: 0.2, height: moderateScale(25) }} />
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ flex: 1 }}>

                    <FlatList
                        data={TABS}
                        numColumns={4}
                        contentContainerStyle={{ padding: moderateScale(20) }}
                        renderItem={({ item, index }) => {

                            return (
                                <TouchableOpacity style={{
                                    backgroundColor: tabsSelect === index ? '#FE8B19' : '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    marginTop: verticalScale(5),
                                    height: verticalScale(40),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    marginEnd: moderateScale(10),
                                }} onPress={() => {
                                    setTabsSelect(index);
                                }}>

                                    <AutoSizeText
                                        numberOfLines={2}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            ...styles.generalTxt,
                                            color: tabsSelect === index ? 'white' : '#464646',
                                            textAlign: 'center',
                                            fontFamily: Fonts.type.medium,
                                        }}>{item}
                                    </AutoSizeText>
                                </TouchableOpacity>

                            );
                        }}

                    />


                    {getSelectedView()}


                </View>
            </ScrollView>
        </View>

    );

    function getSelectedView() {
        switch (tabsSelect) {
            case 0:
                return <AboutPetView {...props} />;

            case 1:
                return <GalleryPetView {...props} />

            case 2:
                return <HealthPetView {...props} />

            case 3:
                return <FamilyTreePetView {...props} />
        }
    }

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

export default PetDetailView;