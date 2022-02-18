/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, ImageBackground, Platform, Share, Alert } from 'react-native';
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
import CustomButton from '../../../components/CustomButton';

function PetDetailView(props) {

    const pagerRef = useRef(null);
    const [initialPg, setInitialPg] = useState(0);
    const [isEditShow, setIsEditShow] = useState(false);
    const { updateAnimal } = props.route.params;
    const { removeAnimal, userObject, animalData } = props;

    const isTablet = DeviceInfo.isTablet();
    const TABS = ["About", "Gallery", "Health", "Family\nTree"]
    const [tabsSelect, setTabsSelect] = useState(0);

    const isSameUser = userObject?._id !==animalData.breederId ? false : true;

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


                        src={props.animalData.image ? props.animalData.image : ''}
                        placeholder={Icons.icon_paw}
                    />
                </View>
                <View style={{
                    padding: moderateScale(25), flexDirection: 'row', flex: 1
                }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>

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
                            flex: 1,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        {props.animalData.data?.name}

                    </AutoSizeText>

                    <TouchableOpacity
                        style={{ flex: 0.1 }}
                        onPress={() => {
                            if (isSameUser || !props.animalData.isPrivate)
                                ShareProfile()
                        }}>
                        <Image source={Icons.icon_detail_share} resizeMode='contain'
                            style={{ height: moderateScale(20) }} />

                    </TouchableOpacity>
                    {isEditShow ?
                        <View style={{
                            height: verticalScale(70),
                            flex: moderateScale(0.15),
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
                                    props.navigation.navigate('RegisterPet', { animalData: props.animalData, updateAnimal: updateAnimal })
                                    setIsEditShow(false)

                                }}>
                                <Image source={Icons.icon_services_edit}
                                    resizeMode='contain' style={{
                                        marginEnd: moderateScale(2),
                                        height: verticalScale(15),
                                        width: moderateScale(15)
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
                                    removeAnimal();
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


                    <CustomButton
                        isSameUser={isSameUser}
                        styles={{ flex: 0.1, height: moderateScale(25) }}
                        onPress={() => isEditShow ? setIsEditShow(false) : setIsEditShow(true)}>
                        <Image source={Icons.icon_kebab} resizeMode='contain'
                            style={{ height: moderateScale(25) }} />

                    </CustomButton>
                </View>

            </View>
            {/* <ScrollView keyboardShouldPersistTaps='handled'> */}
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


                {(isSameUser||!props.animalData.isPrivate) ? getSelectedView() : <View style={{
                    height:'80%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <AutoSizeText
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(16)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            color: '#464646',
                            textAlign: 'center',
                            fontFamily: Fonts.type.medium,
                        }}>{userObject && animalData.isPrivate?'This is a Private Profile':''}
                    </AutoSizeText>
                </View>}


            </View>
            {/* </ScrollView> */}
        </View>

    );

    function getSelectedView() {
        switch (tabsSelect) {
            case 0:
                return <AboutPetView {...props} isSameUser={isSameUser} />;

            case 1:
                return <GalleryPetView {...props} isSameUser={isSameUser} />

            case 2:
                return <HealthPetView {...props} isSameUser={isSameUser} />

            case 3:
                return <FamilyTreePetView {...props} isSameUser={isSameUser} />
        }
    }

    function messagefunc() {
        if (Platform.OS === "ios") {
            return `Logly (See Animal Profile)`;
        }
        else {
            return `Logly (See Animal Profile) \n \n https://logly.us/animalProfile/${props.animalData._id}`;
        }
    };

    async function ShareProfile() {
        try {
            const result = await Share.share({
                subject: 'Logly',
                title: 'Logly - ' + props.animalData.data?.name,
                message: messagefunc(),
                url: `https://logly.us/animalProfile/${props.animalData._id}`,
            },
            );
        } catch (error) {
            Alert.alert(error.message);
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