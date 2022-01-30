/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { Component, useRef, useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, TextInput, Platform } from 'react-native';
import InputPasswordToggle from '../../../components/InputPasswordToggle';
import { Colors, Fonts, Icons } from '../../../theme';
import CheckBox from 'react-native-check-box';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { POLICY, TERMS } from '../../../constants';
import KeyboardShift from '../../../components/KeyboardShift';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const keyboardVerticalOffset = Platform.OS === 'ios' ? 30 : 0;

function RegistrationView(props) {

    const { backScreen, openRegisterAccount,
        arrStates, userStateLocation, userState,
        arrCity, userCityLocation, userCity,
        validateName, enterName, setUserName,
        enterEmail, validateEmail, setEmail,
        enterPhone,
        validatePhone,
        setPhone, validateState, validateCity,
        enterZipCode, validateZipCode, setZipCode,
        enterPassword, validatePassword, setPassword,
        checkTerms, setCheckTerms, openPolicyScreen, zipCodes, chooseCity,
        chooseState


    } = props;

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


    useEffect(() => {


        if (isVisible && arrStates) {

            setFilterArr(arrStates.filter((e) => {
                return (e.name.toLowerCase().startsWith(userState.toLowerCase()) || e.name.toLowerCase().includes(userState.toLowerCase()))
            }))
        }
    }, [userStateLocation])

    useEffect(() => {
        if (isCityVisible && arrCity) {

            setFilterCityArr(arrCity.filter((e) => {
                return (e.name.toLowerCase().startsWith(userCity.toLowerCase()) || e.name.toLowerCase().includes(userCity.toLowerCase()))
            }))
        }
    }, [userCityLocation])

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
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                    padding: verticalScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(40),
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10) }}>Register Account</Text>
                <Text style={{ ...styles.generalTxt, marginTop: verticalScale(10) }}>Please fill the details below</Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
            <ScrollView
                ref={scroll}
                keyboardShouldPersistTaps='handled'
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setIsVisible(false);
                        setIsCityVisible(false);
                        setIsZipVisible(false)
                    }} 
                
                
                style={{
                    flex:1
                    //height:Dimensions.get("screen").height+100
                    }}
                    // behavior={Platform.OS === "ios" ? "position" : null}
                    // keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <View style={{
                        flex: 8, 
                        marginStart: moderateScale(30),
                        marginEnd: moderateScale(30),
                        marginTop: verticalScale(15),
                    }}>

                        <View style={{
                            ...styles.boxcontainer,

                            flexDirection: 'row', padding: moderateScale(20), 
                            paddingTop: 0, paddingBottom: 0, alignItems: 'center',
                            shadowColor: validateName ? 'black' : 'darkred',
                            shadowOpacity: validateName ? 0.25 : 1
                        }}>

                            <Image source={Icons.icon_user} style={{ height: moderateScale(15), width: moderateScale(15) }}/>
                            <TextInput placeholder="Name" style={{
                                ...styles.styleTextInput,
                                marginStart: moderateScale(10),
                                paddingEnd: moderateScale(20)
                            }}
                                maxLength={75}
                                autoCapitalize='none'
                                keyboardType="default"
                                onChangeText={(e) => setUserName(e)}
                                value={enterName} />
                        </View>


                        <View style={{
                            ...styles.boxcontainer,
                            marginTop: verticalScale(15), flexDirection: 'row', padding: moderateScale(20),
                            paddingTop: 0, paddingBottom: 0, alignItems: 'center',
                            shadowColor: validateEmail ? 'black' : 'darkred',
                            shadowOpacity: validateEmail ? 0.25 : 1
                        }}>

                            <Image source={Icons.icon_email} style={{ height: moderateScale(10), width: moderateScale(15) }}/>
                            <TextInput placeholder="Email" style={{
                                ...styles.styleTextInput,
                                marginStart: moderateScale(10),
                                flex: 1,
                                marginEnd: moderateScale(10),

                            }}
                                autoCapitalize='none'
                                keyboardType="email-address"
                                onChangeText={(e) => setEmail(e)}
                                value={enterEmail} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validatePhone ? 'black' : 'darkred',
                            shadowOpacity: validatePhone ? 0.25 : 1,
                            marginTop: verticalScale(15), flexDirection: 'row', padding: moderateScale(20), paddingTop: 0,
                            paddingBottom: 0, alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_phone} style={{ height: moderateScale(15), width: moderateScale(15) }}/>
                            <TextInput placeholder="Cell Phone" style={{
                                ...styles.styleTextInput,
                                marginStart: moderateScale(10),
                                flex: 1,
                                marginEnd: moderateScale(10),

                            }}
                                maxLength={12}
                                autoCapitalize='none'
                                keyboardType="number-pad"
                                onChangeText={(e) => setPhone(e)}
                                value={enterPhone} />
                        </View>

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateState ? 'black' : 'darkred',
                            shadowOpacity: validateState ? 0.25 : 1,
                            marginTop: verticalScale(15), flexDirection: 'row', 
                            padding: moderateScale(20), paddingTop: 0, paddingBottom: 0, 
                            alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_state} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15) }}/>
                            <TextInput placeholder="Select State"
                                ref={inputEl}
                                autoCapitalize='none'

                                onPressIn={() => {

                                    inputEl.current.focus();
                                    if (inputCity.current.isFocused())
                                        return

                                    setIsVisible(true);
                                    setIsCityVisible(false)
                                    setIsZipVisible(false)
                                    setFilterArr(arrStates)
                                    scroll.current.scrollTo({ x: 0, y: 150, animated: true })
                                }}
                                onChangeText={(e) => {
                                    userStateLocation({ name: e, stateId: -1 });
                                    setIsVisible(isVisible)
                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: moderateScale(10),
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
                                <Image source={Icons.icon_ios_arrow_down} style={{ height: moderateScale(5), width: moderateScale(8) }}/>
                            </TouchableOpacity>


                        </View>

                        {(isVisible) ? <View style={{
                            width: '100%',
                            marginTop: verticalScale(10),
                            ...styles.boxcontainer,
                            height: moderateScale(150),
                            shadowRadius: 4,
                            borderRadius: moderateScale(10),
                            zIndex: 1

                        }}>

                            <FlatList
                                keyboardShouldPersistTaps='handled'
                                data={filterArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss()
                                            chooseState({ name: item.item.name, stateId: item.item.id });
                                            setIsVisible(false)

                                        }}>
                                            <View >
                                                <Text style={{
                                                    ...styles.generalTxt, borderColor: 'black',
                                                    borderWidth: 0, width: '100%', padding: moderateScale(10),
                                                    borderRadius: moderateScale(10), marginTop: 0,
                                                    backgroundColor: 'white',
                                                    color: 'black', fontSize: moderateScale(14)

                                                }}>{item.item.name}</Text>
                                            </View>
                                        </TouchableOpacity>)
                                }}
                                keyExtractor={item => item.Country}
                            />

                        </View> : null}

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateCity ? 'black' : 'darkred',
                            shadowOpacity: validateCity ? 0.25 : 1,
                            marginTop: verticalScale(15), flexDirection: 'row',
                            padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                            alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_city} style={{ height: moderateScale(10), width: moderateScale(15) }}/>
                            <TextInput placeholder="Select City"
                                ref={inputCity}
                                autoCapitalize='none'
                                onPressIn={() => {
                                    setIsVisible(false)
                                    if (userState.length !== 0) {
                                        setIsCityVisible(true)
                                        setFilterCityArr(arrCity)
                                        setIsZipVisible(false)
                                        scroll.current.scrollTo({ x: 0, y: 200, animated: true })
                                    } else {
                                        alert("Please select state first..")
                                        setIsCityVisible(false)
                                        setIsZipVisible(false)
                                    }
                                }
                                }
                                onChangeText={(e) => {
                                    setIsVisible(false)
                                    userCityLocation({ name: e, cityId: -1 });
                                    setIsCityVisible(true)
                                    setIsZipVisible(false)
                                    scroll.current.scrollTo({ x: 0, y: 200, animated: true })

                                }}
                                style={{
                                    ...styles.styleTextInput,
                                    marginStart: moderateScale(10),
                                    flex: 8,
                                    marginEnd: moderateScale(10)

                                }}
                                keyboardType="default"
                                autoCapitalize='none'
                                value={userCity}

                            />

                            <TouchableOpacity
                                onPress={() => {
                                    //setIsCityVisible(!isCityVisible);

                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} style={{ height: moderateScale(5), width: moderateScale(8) }}/>
                            </TouchableOpacity>
                        </View>

                        {(isCityVisible) ? <View style={{
                            zIndex: 1,
                            width: '100%',
                            marginTop: verticalScale(10),
                            ...styles.boxcontainer,
                            height: moderateScale(150),
                            shadowRadius: 4,
                            borderRadius: moderateScale(10)

                        }}>
                            <FlatList
                                keyboardShouldPersistTaps='handled'
                                data={filterCityArray}
                                renderItem={(item) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Keyboard.dismiss();
                                            chooseCity({ name: item.item.name, cityId: item.item.id });
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
                                                    color: 'black', fontSize: moderateScale(14)

                                                }}>{item.item.name}</Text>
                                            </View>
                                        </TouchableOpacity>)
                                }}
                                keyExtractor={item => item.Country}
                            />
                        </View> : null}

                        <View style={{
                            ...styles.boxcontainer,
                            shadowColor: validateZipCode ? 'black' : 'darkred',
                            shadowOpacity: validateZipCode ? 0.25 : 1,
                            marginTop: verticalScale(15), flexDirection: 'row',
                            padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                            alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_zipcode} style={{ height: moderateScale(16), width: moderateScale(15) }}/>

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
                                    marginStart: moderateScale(10),
                                    flex: 8,
                                    marginEnd: moderateScale(10),
                                }}
                                maxLength={5}
                                autoCapitalize='none'
                                keyboardType="number-pad"
                                value={enterZipCode}

                            />

                            <TouchableOpacity
                                onPress={() => {
                                    setIsCityVisible(!isCityVisible);

                                }}
                            >
                                <Image source={Icons.icon_ios_arrow_down} style={{ height: moderateScale(5), width: moderateScale(8) }}/>
                            </TouchableOpacity>
                        </View>
                        {(isZipVisible) ? <View style={{
                            zIndex: 1,
                            width: '100%',
                            marginTop: verticalScale(10),
                            ...styles.boxcontainer,
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
                                                    color: 'black', fontSize: moderateScale(14)

                                                }}>{item.item.zipcode}</Text>
                                            </View>
                                        </TouchableOpacity>)
                                }}
                                keyExtractor={item => item.City}
                            />
                        </View> : null}

                        <View style={{
                            ...styles.boxcontainer, flexDirection: 'row',
                            shadowColor: validatePassword ? 'black' : 'darkred',
                            shadowOpacity: validatePassword ? 0.25 : 1,
                            marginTop: verticalScale(15),
                            padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                            alignItems: 'center'
                        }}>

                            <Image source={Icons.icon_lock} style={{ height: moderateScale(17), width: moderateScale(15) }}/>
                            <InputPasswordToggle
                                inputStyle={{
                                    ...styles.styleTextInput,
                                    marginStart: moderateScale(10)
                                }}
                                onPressIn={() => {
                                    setIsVisible(false);
                                    setIsCityVisible(false)
                                    setIsZipVisible(false)
                                }}
                                autoCapitalize='none'
                                placeholder="Password"
                                value={enterPassword}
                                onChangeText={(e) => {
                                    setPassword(e)
                                }}
                                maxLength={30}


                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: verticalScale(25), alignItems: 'center',
                            paddingStart: moderateScale(15),
                            paddingEnd: 0
                        }}>

                            <CheckBox
                                onClick={() => {
                                    setCheckTerms(!checkTerms)
                                }}
                                style={{ flex: 0 }}
                                isChecked={checkTerms}

                            />

                            <Text
                                numberOfLines={1}
                                style={{
                                    ...styles.generalTxt, fontSize: moderateScale(14), color: 'black',
                                    textAlign: 'center'
                                }}>
                                {/* <Text> */}
                                I accept the </Text>
                            <TouchableOpacity style={{ marginTop: verticalScale(-2) }} onPress={(e) => openPolicyScreen(TERMS)}>
                                <Text
                                    style={{
                                        ...styles.generalTxt, fontSize: moderateScale(14),
                                        textDecorationLine: 'underline',
                                        color: Colors.appBgColor,
                                    }}>Terms of Use</Text>
                            </TouchableOpacity>
                            <Text style={{
                                ...styles.generalTxt, fontSize: moderateScale(14), color: 'black',
                                textAlign: 'center'
                            }}> and </Text>
                            <TouchableOpacity style={{ marginTop:verticalScale(-2)}} onPress={(e) => openPolicyScreen(POLICY)}>
                                <Text
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: Colors.appBgColor,
                                        fontSize: moderateScale(14)
                                    }}>Privacy Policy</Text>
                            </TouchableOpacity>
                            {/* </Text> */}


                        </View>

                        <TouchableOpacity
                            onPress={() => openRegisterAccount()}
                            style={{
                                ...styles.styleButtons, flex: 0, marginTop: verticalScale(25)
                            }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: verticalScale(10),
                                paddingTop: verticalScale(10),
                                paddingBottom: verticalScale(10),
                                ...styles.generalTxt
                            }}>CONTINUE</Text>
                        </TouchableOpacity>

                        {/* <View style={{ height: 5, backgroundColor: 'red' }} /> */}

                    </View>

                </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
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
        width: '100%'

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    },
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
});

export default RegistrationView;
