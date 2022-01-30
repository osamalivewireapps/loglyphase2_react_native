/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';
import Util from '../../../utils';
import _ from 'lodash';
import { INDIVIDUAL, VENDOR_ID, VET_ID } from '../../../constants';
import Dialog, { DialogContent, ScaleAnimation, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import ModalDropdown from 'react-native-modal-dropdown';

function EditProfileView(props) {



    const { validateState, arrStates, arrCity, userState, userStateLocation, chooseState, userCityLocation,
        userCity, chooseCity, validateCity, addContact, capturePic, imgUri, name, email, phone,
        enterZipCode, validateZipCode, setZipCode, zipCodes, description,
        nameBus, validateBusName, setBusName,
        validateBusEmp, setEmpStrength, strengthEmp,
        urlBus, validateBusURL, setBusUrl, accountType } = props;

    console.log('props--->', props);


    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState(name);

    const [validateEmail, setValidateEmail] = useState(true);
    const [valueEmail, setValueEmail] = useState(email);

    const [validatePhone, setValidatePhone] = useState(true);
    const [valuePhone, setValuePhone] = useState(phone);


    const [valueDescription, setDescription] = useState(description);
    const [validateDesc, setValidateDesc] = useState(true);

    const [empIndex, setEmpIndex] = useState(0)


    //STATES...
    const inputEl = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [filterArray, setFilterArr] = useState([]);

    //CITY...
    const inputCity = useRef(null);
    const [isCityVisible, setIsCityVisible] = useState(false);
    const [filterCityArray, setFilterCityArr] = useState([]);

    //ZipCode...
    const inputZipCode = useRef(null);
    const [isZipVisible, setIsZipVisible] = useState(false);
    const [filterZipArray, setFilterZipArr] = useState([]);

    //SCROLLVIEW
    const scroll = useRef(null);

    const isTablet = DeviceInfo.isTablet();

    const arrEmpStength = [
        '1-10',
        '11-25',
        '26-50',
        '51-100',
        '100+',
    ]

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
        if (name) {

            setValueName(name);
            setValueEmail(email);
            setValuePhone(phone);
            setDescription(description);

            arrEmpStength.forEach((value, index) => {
                if (value === strengthEmp)
                    setEmpIndex(index)
            })
        }
    }, [name]);

    let GetZipcodeByCity = zipCodes;

    useEffect(() => {

        if (isZipVisible && GetZipcodeByCity) {
            if (!enterZipCode)
                setFilterZipArr(GetZipcodeByCity);
            else {
                setFilterZipArr(GetZipcodeByCity.filter((e) => {
                    return (e.zipcode.includes(enterZipCode))
                }))
            }
        }
    }, [setZipCode])


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
                        {'Edit Profile'}

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
                            setIsZipVisible(false);
                        }}
                        activeOpacity={1}
                        style={{ flex: 1 }}>

                        <View style={{
                            flex: 1,
                            padding: moderateScale(25),
                        }}>



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
                                    editable={false}
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
                                        let tmp = setPhoneNo(e, valuePhone);
                                        setValuePhone(tmp);
                                        setValidatePhone(Util.isValidPhone(tmp));
                                    }
                                    }
                                    value={valuePhone} />
                            </View>

                            {accountType!==INDIVIDUAL ? <View>
                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateBusName ? 'transparent' : 'darkred',
                                    shadowOpacity: validateBusName ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Business Name" style={{
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
                                            setBusName(e)
                                        }
                                        }
                                        value={nameBus} />
                                </View>

                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateBusURL ? 'transparent' : 'darkred',
                                    shadowOpacity: validateBusURL ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Website (Optional)" style={{
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
                                            setBusUrl(e);
                                        }
                                        }
                                        value={urlBus} />
                                </View>

                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateBusEmp ? 'transparent' : 'darkred',
                                    shadowOpacity: validateBusEmp ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>

                                    <ModalDropdown
                                        style={{
                                            backgroundColor: 'transparent',
                                            width: '96%',
                                            height: moderateScale(40),
                                            //borderTopLeftRadius: moderateScale(30),
                                            //borderTopRightRadius: moderateScale(30),
                                            justifyContent: 'center', alignItems: 'center',
                                            paddingTop: verticalScale(28),
                                            //paddingStart: moderateScale(15),
                                            //borderBottomLeftRadius: moderateScale(30),
                                            //borderBottomRightRadius: moderateScale(30),

                                        }}
                                        defaultValue={"Select No.of.Employees"}
                                        textStyle={{
                                            ...styles.styleTextInput,
                                            fontSize: moderateScale(16),
                                            width: '100%',
                                            height: moderateScale(50),
                                        }}

                                        dropdownStyle={{
                                            backgroundColor: 'white',
                                            width: '84%',
                                            marginStart: moderateScale(-15),
                                            marginTop: moderateScale(-10)
                                        }}
                                        dropdownTextStyle={{
                                            ...styles.innerText,
                                            fontSize: moderateScale(16),
                                            color: 'black',
                                            backgroundColor: 'white'
                                        }}
                                        onSelect={(item) => {
                                            setEmpStrength(arrEmpStength[item])
                                        }}
                                        defaultIndex={empIndex}
                                        options={arrEmpStength} />

                                    <Image source={Icons.icon_ios_arrow_down} style={{ height: verticalScale(5), width: moderateScale(8) }} />

                                </View></View>

                                : <View />}

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

                                    onPressIn={() => {

                                        inputEl.current.focus();
                                        if (inputCity.current.isFocused()) { return; }

                                        setIsVisible(true);
                                        setIsCityVisible(false);
                                        setIsZipVisible(false)
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
                                    onPressIn={() => {
                                        setIsVisible(false);
                                        if (userState && userState.length !== 0) {
                                            setIsCityVisible(true);
                                            setFilterCityArr(arrCity);
                                            scroll.current.scrollTo({ x: 0, y: 350, animated: true });
                                        } else {
                                            alert('Please select state first..');
                                            setIsCityVisible(false);
                                            setIsZipVisible(false)
                                        }
                                    }
                                    }
                                    onChangeText={(e) => {
                                        setIsVisible(false);
                                        userCityLocation({ name: e, cityId: -1 });
                                        setIsCityVisible(true);
                                        setIsZipVisible(false)
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
                                                setIsZipVisible(false)

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
                                shadowColor: validateZipCode ? 'white' : 'darkred',
                                shadowOpacity: validateZipCode ? 0.25 : 1,
                                marginTop: verticalScale(15), flexDirection: 'row',
                                padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                                alignItems: 'center'
                            }}>


                                <TextInput placeholder="Zip Code"
                                    ref={inputZipCode}
                                    autoCapitalize='none'
                                    onPressIn={() => {
                                        setIsVisible(false)
                                        setIsCityVisible(false)
                                        if (userCity.length !== 0) {
                                            setIsVisible(false)
                                            setIsCityVisible(false)
                                            setIsZipVisible(true)
                                            setFilterZipArr(GetZipcodeByCity)
                                            scroll.current.scrollTo({ x: 0, y: 300, animated: true })
                                        } else {
                                            alert("Please select city first..")
                                            setIsCityVisible(false)
                                            setIsZipVisible(false)
                                            setIsZipVisible(false)
                                        }
                                    }
                                    }
                                    onChangeText={(e) => {
                                        setIsVisible(false)
                                        setIsCityVisible(false)
                                        setZipCode(e)
                                        setIsZipVisible(true)
                                        scroll.current.scrollTo({ x: 0, y: 300, animated: true })

                                    }}
                                    style={{
                                        ...styles.styleTextInput,
                                        flex: 8,
                                        marginEnd: moderateScale(10),
                                    }}
                                    maxLength={5}
                                    keyboardType="number-pad"
                                    value={enterZipCode}

                                />

                                <TouchableOpacity
                                    onPress={() => {
                                        setIsCityVisible(!isCityVisible);

                                    }}
                                >
                                    <Image source={Icons.icon_ios_arrow_down} style={{ height: moderateScale(5), width: moderateScale(8) }} />
                                </TouchableOpacity>
                            </View>
                            {(isZipVisible) ? <View style={{
                                zIndex: 1,
                                width: '100%',
                                marginTop: verticalScale(10),
                                ...styles.boxcontainer,
                                backgroundColor: 'white',
                                height: moderateScale(150),
                                shadowRadius: 4,
                                borderRadius: moderateScale(10)

                            }}>
                                <FlatList
                                    keyboardShouldPersistTaps='handled'
                                    data={filterZipArray}
                                    renderItem={(item) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                Keyboard.dismiss();
                                                setZipCode(item.item.zipcode);
                                                setIsCityVisible(false)
                                                setIsZipVisible(false)

                                            }}>
                                                <View >
                                                    <Text style={{
                                                        ...styles.generalTxt, borderColor: 'black',
                                                        borderWidth: 0, width: '100%',
                                                        padding: moderateScale(10),
                                                        borderRadius: moderateScale(10), marginTop: 0,
                                                        backgroundColor: 'white',
                                                        color: 'black', fontSize: moderateScale(14),

                                                    }}>{item.item.zipcode}</Text>
                                                </View>
                                            </TouchableOpacity>)
                                    }}
                                    keyExtractor={item => item.City}
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


                                <TextInput placeholder="Description" style={{
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
                                        setDescription(e);
                                    }
                                    }
                                    value={valueDescription} />
                            </View>






                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                marginTop: verticalScale(25),
                            }} onPress={() => {

                                if (validateSpecificFields())
                                    addContact(
                                        {
                                            description: valueDescription,
                                            city: userCity,
                                            state: userState,
                                            name: valueName,
                                            phone: valuePhone,
                                            businessName: nameBus,
                                            noOfEmployees: strengthEmp,
                                            website: urlBus,
                                            zipcode: enterZipCode
                                        }
                                    )

                            }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center',
                                    padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                                }}> {'SAVE'}</Text>
                            </TouchableOpacity>

                        </View>


                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>);


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


    function validateSpecificFields() {
        if (!Util.isLengthGreater(valueName)) {

            Util.topAlertError("Name is required");

            setValidateName(false)
            return false;
        }
        else if (!Util.isValidPhone(valuePhone)) {

            Util.topAlertError("Phone is required");

            setValidatePhone(false)
            return false;
        }
        // else if (!Util.isLengthGreater(valueDescription)) {

        //     Util.topAlertError("Description is required");

        //     setValidateDesc(false)
        //     return false;
        // }
        return true
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

export default EditProfileView;
