/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import Util from '../../../utils';
import _ from 'lodash';
import { VENDOR_ID, VET_ID } from '../../../constants';
import { getTeamMembersByEmail } from '../../../actions/TeamMembersModule';
import { useDispatch } from 'react-redux';



import Dialog, { DialogContent, ScaleAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';

function AddTeamMemberView(props) {


    const CONTACTS_TYPES = ['Vendor', 'Veterinary'];

    const { validateState, arrStates, arrCity, userState, userStateLocation, chooseState, userCityLocation,
        userCity, chooseCity, validateCity, addContact, capturePic, imgUri, setImgUri } = props;

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);

    const [contactType, setContactType] = useState(props.route.params.contactData ? props.route.params.contactData?.category === VENDOR_ID ? 0 : 1 : -1);

    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState(props.route.params.contactData ? props.route.params.contactData?.name : '');

    const [validateEmail, setValidateEmail] = useState(true);
    const [valueEmail, setValueEmail] = useState(props.route.params.contactData ? props.route.params.contactData?.email : '');

    const [validatePhone, setValidatePhone] = useState(true);
    const [valuePhone, setValuePhone] = useState(props.route.params.contactData ? props.route.params.contactData.phone : '');


    const [valueDesc, setDesc] = useState(props.route.params.contactData ? props.route.params.contactData.address : '');
    const [validateDesc, setValidateDesc] = useState(true);

    const [dialogVisibleStatus, setDialogVisibleStatus] = useState(false);

    const [emergencyName, setEmergencyName] = useState((props.route.params.contactData && props.route.params.contactData.emergencyContact) ? (typeof (props.route.params.contactData.emergencyContact) !== 'string' ? props.route.params.contactData.emergencyContact.emergencyName : JSON.parse(props.route.params.contactData?.emergencyContact).emergencyName) : '');
    const [emergencyPhone, setEmergencyPhone] = useState(props.route.params.contactData && props.route.params.contactData.emergencyContact ? (typeof (props.route.params.contactData.emergencyContact) !== 'string' ? props.route.params.contactData.emergencyContact.contactNumber + "" : JSON.parse(props.route.params.contactData?.emergencyContact).contactNumber) + "" : '');

    const [isEmailEnable, setIsEmailEnable] = useState(props.route.params.contactData ? false : true);
    const [removeFocus, setRemoveFocus] = useState(false);
    const [allFieldEditable, setAllFieldEditable] = useState(true);

    const sheetRef = useRef(null);

    const { isTransfer } = props.route.params;

    let dispatch = useDispatch();

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
    const txtInpEmail = useRef(null);

    const isTablet = DeviceInfo.isTablet();


    useEffect(() => {


        if (isVisible && arrStates) {

            setFilterArr(arrStates.filter((e) => {
                return (e && e.name.toLowerCase().startsWith(userState.toLowerCase()) || e.name.toLowerCase().includes(userState.toLowerCase()));
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

    useEffect(() => {

        if (!isTransfer && validateEmail && valueEmail.length > 0 && removeFocus) {
            dispatch(getTeamMembersByEmail(valueEmail)).then((respose) => {
                if (respose.payload) {
                    let tmp = respose.payload;
                    setValueName(tmp.name)
                    setValuePhone(tmp.phone)
                    userStateLocation({ name: tmp.state, stateId: 99 })
                    userCityLocation({ name: tmp.city, cityId: 99 })
                    setImgUri(tmp.image)
                    setIsEmailEnable(false)
                    setAllFieldEditable(false)
                } else {
                    setValueName('')
                    setValuePhone('')
                    userStateLocation({ name: '', isByPass: true })
                    setImgUri('')
                    setAllFieldEditable(true)
                    setIsEmailEnable(true)
                }
                setRemoveFocus(false)
            }).catch(() => {
                setRemoveFocus(false)
            })
        }
    }, [removeFocus])

    useEffect(() => {
        console.log('unmount--->')
        setRemoveFocus(false)
        return;
    })



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
                        {isTransfer ? 'Add Customer' : (props.route.params.contactData ? 'Edit Team Member' : 'Add Team Member')}

                    </AutoSizeText>
                    <Image source={Icons.icon_header_teammember} resizeMode="contain"
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }} />
                </View>

            </View>

            <KeyboardAvoidingView
                flex={1}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <ScrollView
                    ref={scroll}
                    keyboardShouldPersistTaps='handled'>

                    <TouchableOpacity
                        onPress={() => {
                            setIsVisible(false);
                            setIsCityVisible(false);
                        }}
                        style={{ flex: 1 }}
                        activeOpacity={1}>


                        <View style={{
                            flex: 1,
                            padding: moderateScale(25),
                        }}>


                            {isTransfer ? <View /> : <View>
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
                                        source={{ uri: imgUri }}
                                        style={{
                                            height: moderateScale(90),
                                            width: moderateScale(90),
                                            borderRadius: moderateScale(100),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'absolute'
                                        }} />
                                    {!imgUri || imgUri.length === 0 ?
                                        <Image
                                            source={Icons.icon_awesome_plus}

                                            resizeMode="contain"
                                            style={{
                                                height: verticalScale(10),
                                                width: verticalScale(10),
                                            }} />
                                        : <View />
                                    }

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
                            </View>}

                            <View style={{
                                ...styles.boxcontainer,

                                flexDirection: 'row', alignItems: 'center',
                                shadowColor: validateEmail ? 'transparent' : 'darkred',
                                shadowOpacity: validateEmail ? 0.25 : 1,
                                padding: moderateScale(15),
                            }}>


                                <TextInput
                                    ref={txtInpEmail}
                                    placeholder="Email" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        textAlign: 'left',
                                    }}
                                    onEndEditing={(e) => {
                                        console.log("remove focus--->", removeFocus)
                                        setTimeout(() => {
                                            setRemoveFocus(true)
                                        }, 500)
                                    }}
                                    editable={isEmailEnable}
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

                                {!allFieldEditable ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            setValueEmail('')
                                            setValueName('')
                                            setValuePhone('')
                                            userStateLocation({ name: '', isByPass: true })
                                            setImgUri('')
                                            setAllFieldEditable(true)
                                            setIsEmailEnable(true)
                                        }
                                        }
                                        style={{
                                            margin: moderateScale(10),
                                            width: moderateScale(15),
                                            height: moderateScale(20),
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                        }}>
                                        <Image source={Icons.icon_close} resizeMode='contain' style={{
                                            tintColor: '#707070',
                                            height: verticalScale(8), width: moderateScale(8)
                                        }} />
                                    </TouchableOpacity>
                                    : <View />}
                            </View>

                            <View style={{
                                ...styles.boxcontainer,
                                marginTop: verticalScale(10),
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
                                    editable={allFieldEditable}
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
                                shadowColor: validatePhone ? 'transparent' : 'darkred',
                                shadowOpacity: validatePhone ? 0.25 : 1,
                                padding: moderateScale(15),
                            }}>


                                <TextInput placeholder="Phone No" style={{
                                    ...styles.styleTextInput,
                                    flex: 1,
                                    textAlign: 'left',
                                }}
                                    editable={allFieldEditable}
                                    underlineColorAndroid="transparent"
                                    require={true}
                                    numberOfLines={1}
                                    autoCapitalize="none"
                                    maxLength={12}
                                    keyboardType="phone-pad"
                                    onChangeText={(e) => {
                                        let tmp = setPhoneNo(e, valuePhone);
                                        setValuePhone(tmp);
                                        setValidatePhone(Util.isValidPhone(tmp));
                                    }
                                    }
                                    value={valuePhone} />
                            </View>



                            <View style={{
                                ...styles.boxcontainer,
                                shadowColor: validateState ? 'white' : 'darkred',
                                shadowOpacity: validateState ? 0.25 : 1,
                                marginTop: verticalScale(10), flexDirection: 'row',
                                padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                                alignItems: 'center',
                            }}>

                                <TextInput placeholder="Select State"
                                    ref={inputEl}
                                    autoCapitalize="none"
                                    editable={allFieldEditable}
                                    onPressIn={() => {
                                        if (!allFieldEditable)
                                            return
                                        inputEl.current.focus();
                                        if (inputCity.current.isFocused()) { return; }

                                        setIsVisible(true);
                                        setIsCityVisible(false);
                                        setFilterArr(arrStates);
                                        scroll.current.scrollTo({ x: 0, y: 250, animated: true });
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
                                marginTop: verticalScale(10), flexDirection: 'row',
                                padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                                alignItems: 'center',
                            }}>

                                <TextInput placeholder="Select City"
                                    ref={inputCity}
                                    editable={allFieldEditable}
                                    onPressIn={() => {
                                        if (!allFieldEditable)
                                            return
                                        setIsVisible(false);
                                        if (userState && userState.length !== 0) {
                                            setIsCityVisible(true);
                                            setFilterCityArr(arrCity);
                                            scroll.current.scrollTo({ x: 0, y: 350, animated: true });
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
                                        scroll.current.scrollTo({ x: 0, y: 350, animated: true });

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
                                marginTop: verticalScale(10),
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


                            {isTransfer ? <View /> :
                                <TouchableOpacity
                                    onPress={() => {
                                        if (emergencyName) {
                                            if (emergencyName.length === 0 && emergencyPhone.length === 0)
                                                setCloseBottonSheet(true);
                                        } else
                                            setCloseBottonSheet(true);
                                    }}
                                    style={{
                                        ...styles.boxcontainer,
                                        marginTop: verticalScale(30),
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
                                            fontSize={moderateScale(14)}
                                            mode={ResizeTextMode.overflow_replacement}
                                            style={{
                                                color: Colors.appBgColor,
                                                fontFamily: Fonts.type.base,
                                                width: '97%',
                                            }}>
                                            Add Emergency Contact

                                        </AutoSizeText>
                                        <Image source={Icons.icon_awesome_plus} resizeMode="contain" style={{ height: verticalScale(10), width: moderateScale(10) }} />

                                    </View>
                                </TouchableOpacity>
                            }

                            {emergencyName && emergencyName.length > 0 ?
                                <TouchableOpacity
                                    onPress={() => setCloseBottonSheet(true)}

                                    style={{
                                        backgroundColor: '#F5F5F5',
                                        padding: moderateScale(5),
                                        borderRadius: moderateScale(10),
                                        marginTop: verticalScale(10),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingTop: verticalScale(12),
                                        paddingBottom: verticalScale(12),
                                    }}>

                                    <View style={{
                                        flex: 0.9,
                                        marginStart: moderateScale(12)
                                    }}>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(14)}
                                            style={{
                                                fontFamily: Fonts.type.medium,
                                                color: '#777777',

                                            }}
                                        >
                                            {emergencyName}
                                        </AutoSizeText>

                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(14)}
                                            style={{
                                                fontFamily: Fonts.type.medium,
                                                color: '#777777',

                                            }}
                                        >
                                            {emergencyPhone}
                                        </AutoSizeText>

                                    </View>
                                    <Image
                                        resizeMode='contain'
                                        style={{
                                            flex: 0.1,

                                        }}
                                        source={Icons.icon_three_colons} />
                                </TouchableOpacity> : <View />
                            }

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

                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                marginTop: verticalScale(25),
                            }} onPress={() => {
                                // if (contactType === -1) {
                                //     Util.topAlertError("Please select category")
                                // } else {
                                addContact(
                                    {
                                        address: valueDesc,
                                        category: contactType === 0 ? VENDOR_ID : VET_ID,
                                        city: userCity,
                                        state: userState,
                                        name: valueName,
                                        email: valueEmail,
                                        phone: valuePhone,
                                        emergencyContact: {
                                            emergencyName: emergencyName,
                                            contactNumber: emergencyPhone
                                        },
                                        canAccessMobileApp: true,
                                        canAccessInventoryManagement: true,
                                        active: true

                                    }
                                )
                                // }


                            }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center',
                                    padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                                }}> {isTransfer ? 'Add Customer' : (props.route.params.contactData ? 'SAVE' : 'ADD MEMBER')}</Text>
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

                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>);

    function showContactTypes() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled">
                <View>
                    <View style={{
                        alignItems: 'flex-end', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>



                        <TouchableOpacity onPress={() => { sheetRef.current.close() }}>
                            <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{
                                tintColor: '#404040',
                                position: 'absolute',
                                top: verticalScale(8),
                                right: moderateScale(20),
                                alignSelf: 'flex-end',
                                height: moderateScale(15),
                                width: moderateScale(15)
                            }} />
                        </TouchableOpacity>
                        <Text style={{
                            ...styles.generalTxt, color: '#464646',
                            textAlign: 'center',
                            alignSelf: 'center',
                            fontSize: moderateScale(18),
                            fontFamily: Fonts.type.medium,
                            marginTop: verticalScale(10)
                        }}>Add Emergency Contact</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                    </View>


                    <View style={{
                        marginTop: moderateScale(25),
                        marginEnd: moderateScale(25),
                        marginStart: moderateScale(25),
                        flex: 1, flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                    }}>

                        <TextInput
                            onChangeText={(e) => {
                                setEmergencyName(e)
                            }}
                            value={emergencyName}
                            placeholder='Name'
                            numberOfLines={1}
                            keyboardType='default'
                            autoCapitalize='none'
                            style={{
                                keyboardShouldPersistTaps: true,
                                flex: 1,
                                paddingStart: moderateScale(10),
                                paddingEnd: moderateScale(10),
                                height: verticalScale(32),
                                ...styles.generalTxt,
                                color: '#777777',
                                fontSize: moderateScale(14),
                            }} />

                    </View>


                    <View style={{
                        marginTop: moderateScale(20),
                        marginEnd: moderateScale(25),
                        marginStart: moderateScale(25),
                        flex: 1, flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                    }}>

                        <TextInput
                            onChangeText={(e) => {
                                let tmp = setPhoneNo(e, emergencyPhone);
                                setEmergencyPhone(tmp);


                            }}
                            value={emergencyPhone}
                            placeholder='Phone'
                            numberOfLines={1}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            maxLength={12}
                            style={{
                                keyboardShouldPersistTaps: true,
                                flex: 1,
                                paddingStart: moderateScale(10),
                                paddingEnd: moderateScale(10),
                                height: verticalScale(32),
                                ...styles.generalTxt,
                                color: '#777777',
                                fontSize: moderateScale(14),
                            }} />

                    </View>






                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '30%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {

                                sheetRef.current.close();
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(16), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>{props.route.params.contactData ? 'Save' : 'Add'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '60%', alignSelf: 'center',
                        marginTop: verticalScale(5), backgroundColor: 'transparent'
                    }}
                        onPress={() => {
                            setTimeout(() => {

                                sheetRef.current.close();
                            }, 200)
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(16), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }

    function setPhoneNo(text, valuePhone) {
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

        return tmp;
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

export default AddTeamMemberView;
