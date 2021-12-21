/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Keyboard } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';
import Util from '../../../utils';
import _ from 'lodash';
import { VENDOR_ID, VET_ID } from '../../../constants';
import Dialog, { DialogContent, ScaleAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';

function AddContactsView(props) {


    const CONTACTS_TYPES = ['Vendor', 'Veterinary'];

    const { validateState, arrStates, arrCity, userState, userStateLocation, chooseState, userCityLocation,
        userCity, chooseCity, validateCity, addContact, capturePic, imgUri } = props;

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);

    const [contactType, setContactType] = useState(props.route.params.contactData ? props.route.params.contactData?.category === VENDOR_ID ? 0 : 1 : -1);

    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState(props.route.params.contactData?.name);

    const [validateEmail, setValidateEmail] = useState(true);
    const [valueEmail, setValueEmail] = useState(props.route.params.contactData?.email[0]);

    const [validatePhone, setValidatePhone] = useState(true);
    const [valuePhone, setValuePhone] = useState(props.route.params.contactData?.phone[0]);


    const [valueDesc, setDesc] = useState(props.route.params.contactData?.address);
    const [validateDesc, setValidateDesc] = useState(true);

    const [dialogVisibleStatus, setDialogVisibleStatus] = useState(false);

    const sheetRef = useRef(null);

    //STATES...
    const inputEl = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [filterArray, setFilterArr] = useState([]);

    //CITY...
    const inputCity = useRef(null);
    const [isCityVisible, setIsCityVisible] = useState(false);
    const [filterCityArray, setFilterCityArr] = useState([]);

    //SCROLLVIEW
    const scroll = useRef(null);

    const isTablet = DeviceInfo.isTablet();

    console.log("imageuri---->", imgUri)

    useEffect(() => {


        if (isVisible && arrStates) {

            setFilterArr(arrStates.filter((e) => {
                return (e.name.toLowerCase().startsWith(userState.toLowerCase()) || e.name.toLowerCase().includes(userState.toLowerCase()));
            }));
        }
    }, [userStateLocation]);

    useEffect(() => {
        if (isCityVisible && arrCity) {

            setFilterCityArr(arrCity.filter((e) => {
                return (e.name.toLowerCase().startsWith(userCity.toLowerCase()) || e.name.toLowerCase().includes(userCity.toLowerCase()));
            }));
        }
    }, [userCityLocation]);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'black',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(140),
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop(); }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_notification} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        <Image source={Icons.icon_qrcode} resizeMode="contain" style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View> */}

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(15),
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
                            fontFamily: Fonts.type.bold,
                        }}>
                        Add Contacts

                    </AutoSizeText>
                    <Image source={Icons.icon_header_add_contacts} resizeMode="contain"
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }} />
                </View>

            </View>
            <ScrollView
                ref={scroll}
                keyboardShouldPersistTaps='handled'>
                <View style={{ flex: 1 }}>

                    <View style={{
                        flex: 1,
                        padding: moderateScale(25),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1,
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%',
                                    }}>
                                    {contactType > -1 ? CONTACTS_TYPES[contactType] : 'Select Category'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

                        <RBSheet
                            ref={sheetRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30),
                                },
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showContactTypes()}

                        </RBSheet>
                        {isBottonSheetVisible ? sheetRef.current.open() : null}

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F4F4F4', alignSelf: 'center',
                                height: moderateScale(90),
                                width: moderateScale(90),
                                borderRadius: moderateScale(100),
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: verticalScale(20),
                                marginBottom: verticalScale(10),
                            }}
                            onPress={() => {
                                setDialogVisibleStatus(true)
                            }}
                        >
                            <Image
                            source={{uri:imgUri}}
                                style={{
                                    height: moderateScale(90),
                                    width: moderateScale(90),
                                    borderRadius: moderateScale(100),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position:'absolute'
                                }}/>

                                <Image
                                    source={Icons.icon_awesome_plus}

                                    resizeMode="contain"
                                    style={{
                                        height: verticalScale(10),
                                        width: verticalScale(10),
                                    }} />

                        </TouchableOpacity>
                        <AutoSizeText
                            numberOfLines={2}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            mode={ResizeTextMode.overflow_replacement}
                            style={{
                                color: '#464646',
                                fontFamily: Fonts.type.medium,
                                width: '100%',
                                textAlign: 'center',
                                marginBottom: verticalScale(10),
                            }}>
                            Add Photo

                        </AutoSizeText>

                        <View style={{
                            ...styles.boxcontainer,
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validateName ? 'transparent' : 'darkred',
                            shadowOpacity: validateName ? 0.25 : 1,
                            padding: moderateScale(15),
                        }}>


                            <TextInput placeholder="Name" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                textAlign: 'left',
                            }}
                                underlineColorAndroid="transparent"
                                require={true}
                                numberOfLines={1}
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={(e) => {
                                    setValidateName(Util.isLengthGreater(e));
                                    setValueName(e);
                                }
                                }
                                value={valueName} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer,
                            marginTop: verticalScale(10),
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validateEmail ? 'transparent' : 'darkred',
                            shadowOpacity: validateEmail ? 0.25 : 1,
                            padding: moderateScale(15),
                        }}>


                            <TextInput placeholder="Email" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                textAlign: 'left',
                            }}
                                underlineColorAndroid="transparent"
                                require={true}
                                numberOfLines={1}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={(e) => {
                                    setValidateEmail(Util.isEmailValid(e));
                                    setValueEmail(e);
                                }
                                }
                                value={valueEmail} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer,
                            marginTop: verticalScale(10),
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validatePhone ? 'transparent' : 'darkred',
                            shadowOpacity: validatePhone ? 0.25 : 1,
                            padding: moderateScale(15),
                        }}>


                            <TextInput placeholder="Phone No" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                textAlign: 'left',
                            }}
                                underlineColorAndroid="transparent"
                                require={true}
                                numberOfLines={1}
                                autoCapitalize="none"
                                maxLength={12}
                                keyboardType="phone-pad"
                                onChangeText={(e) => {
                                    setPhoneNo(e);
                                }
                                }
                                value={valuePhone} />
                        </View>



                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateState ? 'white' : 'darkred',
                            shadowOpacity: validateState ? 0.25 : 1,
                            marginTop: verticalScale(15), flexDirection: 'row',
                            padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                            alignItems: 'center',
                        }}>

                            <TextInput placeholder="Select State"
                                ref={inputEl}
                                autoCapitalize="none"

                                onPressIn={() => {

                                    inputEl.current.focus();
                                    if (inputCity.current.isFocused()) { return; }

                                    setIsVisible(true);
                                    setIsCityVisible(false);
                                    setFilterArr(arrStates);
                                    scroll.current.scrollTo({ x: 0, y: 150, animated: true });
                                }}
                                onChangeText={(e) => {
                                    userStateLocation({ name: e, stateId: -1 });
                                    setIsVisible(isVisible);
                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    flex: 8,
                                    marginEnd: moderateScale(10),

                                }}
                                keyboardType="default"
                                value={userState} />
                            <TouchableOpacity
                                onPress={() => {
                                    //setIsVisible(!isVisible);
                                    //setIsCityVisible(false)
                                    //setIsZipVisible(false)


                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} style={{ height: moderateScale(5), width: moderateScale(8) }} />
                            </TouchableOpacity>


                        </View>

                        {(isVisible) ? <View style={{
                            width: '100%',
                            marginTop: verticalScale(10),
                            ...styles.boxcontainer,
                            height: moderateScale(150),
                            shadowRadius: 4,
                            borderRadius: moderateScale(10),
                            zIndex: 1,

                        }}>

                            <FlatList
                                keyboardShouldPersistTaps="handled"
                                data={filterArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss();
                                            chooseState({ name: item.item.name, stateId: item.item.id });
                                            setIsVisible(false);

                                        }}>
                                            <View >
                                                <Text style={{
                                                    ...styles.generalTxt, borderColor: 'black',
                                                    borderWidth: 0, width: '100%', padding: moderateScale(10),
                                                    borderRadius: moderateScale(10), marginTop: 0,
                                                    backgroundColor: 'white',
                                                    color: 'black', fontSize: moderateScale(14),

                                                }}>{item.item.name}</Text>
                                            </View>
                                        </TouchableOpacity>);
                                }}
                                keyExtractor={item => item.Country}
                            />

                        </View> : null}

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateCity ? 'white' : 'darkred',
                            shadowOpacity: validateCity ? 0.25 : 1,
                            marginTop: verticalScale(15), flexDirection: 'row',
                            padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                            alignItems: 'center',
                        }}>

                            <TextInput placeholder="Select City"
                                ref={inputCity}
                                onPressIn={() => {
                                    setIsVisible(false);
                                    if (userState.length !== 0) {
                                        setIsCityVisible(true);
                                        setFilterCityArr(arrCity);
                                        scroll.current.scrollTo({ x: 0, y: 200, animated: true });
                                    } else {
                                        alert('Please select state first..');
                                        setIsCityVisible(false);
                                    }
                                }
                                }
                                onChangeText={(e) => {
                                    setIsVisible(false);
                                    userCityLocation({ name: e, cityId: -1 });
                                    setIsCityVisible(true);
                                    scroll.current.scrollTo({ x: 0, y: 200, animated: true });

                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    flex: 8,
                                    marginEnd: moderateScale(10),

                                }}
                                keyboardType="default"
                                autoCapitalize="none"
                                value={userCity}

                            />

                            <TouchableOpacity
                                onPress={() => {

                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} style={{ height: moderateScale(5), width: moderateScale(8) }} />
                            </TouchableOpacity>
                        </View>

                        {(isCityVisible) ? <View style={{
                            zIndex: 1,
                            width: '100%',
                            marginTop: verticalScale(10),
                            ...styles.boxcontainer,
                            height: moderateScale(150),
                            shadowRadius: 4,
                            borderRadius: moderateScale(10),

                        }}>
                            <FlatList
                                keyboardShouldPersistTaps="handled"
                                data={filterCityArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss();
                                            chooseCity({ name: item.item.name, cityId: item.item.id });
                                            setIsCityVisible(false);

                                        }}>
                                            <View >
                                                <Text style={{
                                                    ...styles.generalTxt, borderColor: 'black',
                                                    borderWidth: 0, width: '100%',
                                                    padding: moderateScale(10),
                                                    borderRadius: moderateScale(10), marginTop: 0,
                                                    backgroundColor: 'white',
                                                    color: 'black', fontSize: moderateScale(14),

                                                }}>{item.item.name}</Text>
                                            </View>
                                        </TouchableOpacity>);
                                }}
                                keyExtractor={item => item.Country}
                            />
                        </View> : null}



                        <View style={{
                            ...styles.boxcontainer,
                            height: verticalScale(100),
                            flexDirection: 'row', alignItems: 'center',
                            shadowColor: validateDesc ? 'transparent' : 'darkred',
                            shadowOpacity: validateDesc ? 0.25 : 1,
                            marginTop: verticalScale(15),
                        }}>


                            <TextInput placeholder="Address" style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                paddingTop: verticalScale(15),
                                padding: moderateScale(15),
                                textAlign: 'left',
                                height: verticalScale(100),
                            }}
                                underlineColorAndroid="transparent"
                                require={true}
                                multiline={true}
                                numberOfLines={50}
                                maxLength={75}
                                autoCapitalize="none"
                                keyboardType="default"
                                onChangeText={(e) => {
                                    setValidateDesc(Util.isLengthGreater(e));
                                    setDesc(e);
                                }
                                }
                                value={valueDesc} />
                        </View>



                        <TouchableOpacity style={{
                            ...styles.styleButtons, flex: 0,
                            marginTop: verticalScale(25),
                        }} onPress={() => {
                            if (contactType === -1) {
                                Util.topAlertError("Please select category")
                            } else {
                                addContact(
                                    {
                                        address: valueDesc,
                                        category: contactType === 0 ? VENDOR_ID : VET_ID,
                                        city: userCity,
                                        state: userState,
                                        name: valueName,
                                        email: [valueEmail],
                                        phone: [valuePhone]

                                    }
                                )
                            }

                        }}>
                            <Text style={{
                                ...styles.generalTxt,
                                fontSize: moderateScale(20), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                            }}>ADD CONTACT</Text>
                        </TouchableOpacity>

                    </View>


                    <Dialog
                        visible={dialogVisibleStatus}
                        width={Dimensions.get("screen").width - 100}
                        height={Dimensions.get("screen").height / 6}
                        onTouchOutside={() => {
                            setDialogVisibleStatus(false);
                        }}
                        dialogTitle={<DialogTitle title="Profile Picture" />}
                        dialogAnimation={new ScaleAnimation({
                            toValue: 0,
                            useNativeDriver: true,
                        })}
                    >
                        <DialogContent
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                            }}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    flex: 5,
                                    height: 50,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    onPress={() => {
                                        capturePic('gallery');
                                        setDialogVisibleStatus(false);
                                    }}>
                                    Gallery
                                </Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    flex: 5,
                                    height: 50,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    onPress={() => {
                                        capturePic('camera');
                                        setDialogVisibleStatus(false);
                                    }}>
                                    Camera
                                </Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>
            </ScrollView >
        </View >);

    function showContactTypes() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled">
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50),
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Pet Category</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={CONTACTS_TYPES}
                        contentContainerStyle={{
                            padding: moderateScale(30),
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setContactType(index);
                                        sheetRef.current.close();
                                        setCloseBottonSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={index === contactType ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode="contain" style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function setPhoneNo(text) {
        let tmp = '';

        console.log("text--->", text.length);

        if (valuePhone && text.length > valuePhone.length) {
            if (text.length > 3 && text.length <= 4 && !text.includes('-')) {
                tmp = text.substr(0, 3) + '-' + text.substr(3, text.length);
            }
            else if (text.length > 7 && text.length <= 8) {
                tmp = text.substr(0, 7) + '-' + text.substr(7, text.length);
            }
            else {
                tmp = text;
            }
        } else {
            tmp = text;
        }

        setValuePhone(tmp);
        setValidatePhone(Util.isValidPhone(tmp));
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
        borderRadius: moderateScale(30),
    },
});

export default AddContactsView;
