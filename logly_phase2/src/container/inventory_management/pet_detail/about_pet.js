/* eslint-disable no-unreachable */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Modal, FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Share, Alert, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { updateFeatured, getAnimal, updatePrivacy } from '../../../actions/AnimalModule';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import Util from '../../../utils';
import CustomButton from '../../../components/CustomButton';

function AboutPetView(props) {

    const { animalData, route, isSameUser } = props;

    console.log('aboutpet----->', animalData);

    const ANIMAL_BIO = [{
        category: 'Animal Id', value: '', bg: '#FEDDDA', txtColor: '#D04621',
    },
    { category: 'Breed', value: '', bg: '#DED9FB', txtColor: '#5A40E2' },
    { category: 'sex', value: '', bg: '#C9F7F3', txtColor: '#03CDB8' },
    { category: 'DOB', value: '', bg: '#ECD48E', txtColor: '#EFB714' }];

    const TABS = ["Add New Activity", 'Transfer', "QR Code"];

    const isTablet = DeviceInfo.isTablet();

    const [isFeatured, setIsFeatured] = useState(0);
    const [tabsSelect, setTabsSelect] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    return (

        <View style={{
            paddingStart: moderateScale(20),
            height: '80%'
        }}>

            {console.log("animalData--->", props)}
            {console.log("ANIMAL--->", ANIMAL_BIO[1].value)}
            <FlatList
                horizontal
                data={ANIMAL_BIO}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{

                    padding: moderateScale(20), paddingStart: 0,
                }
                }
                renderItem={({ item, index }) => {

                    return (
                        <View style={{
                            backgroundColor: item.bg,
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(5),
                            height: isTablet ? verticalScale(105) : verticalScale(85),
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: isTablet ? moderateScale(115) : moderateScale(95),
                            marginEnd: moderateScale(15),
                        }} onPress={() => {

                        }}>

                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    ...styles.generalTxt,
                                    color: item.txtColor,
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.medium,
                                    marginBottom: verticalScale(10),
                                }}>{item.category}
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(12)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: item.txtColor,
                                    textAlign: 'center',
                                    width: '100%',
                                    paddingStart: moderateScale(4),
                                    paddingEnd: moderateScale(4),

                                }}>{getAnimalValues(item.category)}

                            </AutoSizeText>
                        </View>

                    );
                }}

            />



            <View style={{
                flexDirection: 'row',
                marginTop: moderateScale(5),
                alignItems: 'center',
                marginBottom: moderateScale(15),
                marginEnd: moderateScale(10)

            }}>
                <View

                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '25%',
                        borderRadius: moderateScale(10),
                        padding: verticalScale(2),
                        backgroundColor: animalData.featured ? 'green' : '#777777'
                    }}>
                    <Text
                        style={{
                            ...styles.generalTxt,
                            color: 'white',
                            fontSize: moderateScale(14),
                            fontFamily: Fonts.type.medium,
                        }}>Featured
                    </Text>
                </View>
                {isSameUser ?
                    <CustomButton
                        styles={{ height: '100%', width: '75%', alignItems: 'flex-end' }}
                        isSameUser={isSameUser}
                        onPress={() => updateStatusFeatured()}>
                        <Image
                            source={animalData.featured ? Icons.icon_toggle_on : Icons.icon_toggle_off}
                            resizeMode='contain'
                            style={{ height: verticalScale(15), width: moderateScale(30) }}

                        />
                    </CustomButton> : <View />}
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginEnd: moderateScale(10),


            }}>
                <View
                    style={{
                        flexDirection: 'row', width: '25%',
                        borderRadius: moderateScale(10),
                        padding: verticalScale(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: animalData.isPrivate ? 'green' : '#777777'
                    }}

                >
                    <Text
                        style={{
                            ...styles.generalTxt,
                            color: 'white',
                            fontSize: moderateScale(14),
                            fontFamily: Fonts.type.medium,
                        }}>
                        {animalData.isPrivate ? 'Private' : 'Public'}
                    </Text>

                </View>
                {isSameUser ?
                    <CustomButton
                        isSameUser={isSameUser}
                        styles={{ width: '75%', alignItems: 'flex-end' }}
                        onPress={() => updatePrivacyStatus()}>
                        <Image
                            source={animalData.isPrivate ? Icons.icon_toggle_on : Icons.icon_toggle_off}
                            resizeMode='contain'
                            style={{ height: verticalScale(15), width: moderateScale(30) }}

                        />
                    </CustomButton> : <View />}
            </View>

            <Text
                style={{
                    ...styles.generalTxt,
                    color: '#464646',
                    fontSize: moderateScale(14),
                    padding: moderateScale(20),
                    paddingTop: moderateScale(15),
                    paddingBottom: moderateScale(10),
                    paddingStart: moderateScale(10),
                    fontFamily: Fonts.type.medium,
                }}>Summary Notes
            </Text>

            <Text
                style={{
                    padding: moderateScale(20),
                    paddingTop: 0,
                    paddingStart: moderateScale(10),
                    ...styles.generalTxt,
                    fontSize: moderateScale(12),
                    color: '#777777',
                }}>{animalData.data?.Notes}
            </Text>

            {isSameUser?
            <FlatList
                data={TABS}
                numColumns={4}
                contentContainerStyle={{
                    paddingStart: moderateScale(10),
                    paddingEnd: moderateScale(10),
                    padding: moderateScale(20), paddingTop: moderateScale(10),
                }}
                renderItem={({ item, index }) => {

                    return (
                        
                        <CustomButton
                            isSameUser={isSameUser}
                            styles={{
                                backgroundColor: '#F5F5F5',
                                borderRadius: moderateScale(10),
                                height: verticalScale(30),
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                marginEnd: moderateScale(5),
                            }} onPress={() => {
                                setTabsSelect(index);

                                if (index === 0)
                                    props.navigation.navigate('CreateActivity', { id: animalData._id })
                                else if (index === 1) {

                                    if (animalData.data.quantity > 0)
                                        props.navigation.navigate('TransferListing', {
                                            animalData: animalData, updateAnimalList: (e) => {
                                                console.log('transfer quantity-->', e)
                                                props.route.params.updateAnimal();
                                                dispatch(getAnimal(props.route.params.id));
                                            }
                                        })
                                    else
                                        Util.topAlert('No Animal left')
                                } else {
                                    setModalVisible(true)
                                }
                            }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(12)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: Colors.appBgColor,
                                    paddingStart: moderateScale(2),
                                    paddingEnd: moderateScale(2),
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.base,
                                }}>{item}
                            </AutoSizeText>
                        </CustomButton>

                    );
                }}

                /> : <View style={{
                    paddingStart: moderateScale(10),
                    paddingEnd: moderateScale(10),
                    padding: moderateScale(50), paddingTop: moderateScale(10),}}/>}

            {modalVisible ? showQrCode() : null}
        </View>
    );

    function getAnimalValues(category) {
        switch (category) {
            case 'Animal Id':
                return route.params.id.substring(0, 7);

            case 'Breed':
                return animalData.data?.breed ? animalData.data?.breed[0] : '';

            case 'sex':
                return animalData.data?.Sex;
            default:
                return moment(animalData.data?.DOB).format('DD MMM YYYY');

        }

    }

    ///////////////////////   FEATURED STATUS ////////////////
    function updateStatusFeatured(e) {
        let values = {};
        values.featured = !animalData.featured
        dispatch(updateFeatured(animalData._id, values)).then((response) => {
            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
        })
    }

    ///////////////////////   SET PRIVACY ////////////////
    function updatePrivacyStatus(e) {
        let values = {};
        values.isPrivate = !animalData.isPrivate
        dispatch(updatePrivacy(animalData._id, values)).then((response) => {
            dispatch(getAnimal(props.route.params.id));
            props.route.params.updateAnimal();
        })
    }

    function showQrCode(e) {



        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ ...styles.centeredView }}>
                    <View style={{ ...styles.modalView }}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end', position: 'absolute',
                                top: 15, right: 15
                            }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Image source={Icons.icon_close} style={{ height: verticalScale(10), width: moderateScale(10) }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: '#585858',
                            marginBottom: verticalScale(10),
                            fontFamily: Fonts.type.base, textAlign: 'center'
                        }}>QR Code</Text>
                        <ImagePlaceholder
                            showActivityIndicator={false}
                            activityIndicatorProps={{
                                size: 'small',
                                color: '#777777',
                            }}
                            resizeMode='contain'
                            placeholderStyle={{
                                width: '100%',
                                height: '100%',
                                borderRadius: moderateScale(10),


                            }}
                            imgStyle={{
                                borderRadius: moderateScale(10),
                                borderWidth: 1,
                                borderColor: 'transparent',
                            }}

                            style={{
                                width: '100%',
                                borderRadius: moderateScale(10),
                            }}


                            src={animalData.qrcodepath}
                            placeholder={Icons.icon_paw}
                        />
                    </View>
                </View>
            </Modal>
        )

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
        width: '100%',
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base,
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(16),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(10),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(22),
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    modalView: {
        width: Dimensions.get("screen").width - moderateScale(50),
        height: verticalScale(250),
        margin: moderateScale(10),
        borderRadius: moderateScale(20),
        backgroundColor: 'white',
        padding: moderateScale(30),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: verticalScale(2)
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateScale(4),
        elevation: moderateScale(5)
    },
});

export default AboutPetView;
