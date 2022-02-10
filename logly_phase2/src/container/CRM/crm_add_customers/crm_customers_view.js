/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, TextInput, Keyboard } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import Util from '../../../utils';


function CRMAddCustomersView(props) {


    const isTablet = DeviceInfo.isTablet();

    const { toggleDrawer, userObject, addBreeder } = props;

    const [tabs, setTab] = useState(0);

    const { zipCodes, validateState, arrStates, arrCity, userState, userStateLocation, chooseState, userCityLocation,
        userCity, chooseCity, validateCity, enterZipCode, validateZipCode, setZipCode, } = props;


    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState();

    const [validateEmail, setValidateEmail] = useState(true);
    const [valueEmail, setValueEmail] = useState();

    const [validatePhone, setValidatePhone] = useState(true);
    const [valuePhone, setValuePhone] = useState();


    const [valueDesc, setDesc] = useState();
    const [validateDesc, setValidateDesc] = useState(true);

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
            <CRMHeaderView
                iconStyles={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(35) }}
                name="Add Customer" icon={Icons.icon_crm_customer} bgColor='#1CB875'
                {...props}
            />

            <ScrollView keyboardShouldPersistTaps='handled'
                ref={scroll}
            >
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(false);
                        setIsCityVisible(false);
                        setIsZipVisible(false);
                    }}
                    style={{ flex: 1, padding: moderateScale(25) }}
                    activeOpacity={1}>




                    <View style={{
                        ...CRMStyles.boxcontainer,
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateName ? 'transparent' : 'darkred',
                        shadowOpacity: validateName ? 0.25 : 1,
                        padding: moderateScale(15),
                        paddingTop: moderateScale(10),
                        paddingBottom: moderateScale(10)
                    }}>


                        <TextInput placeholder="Name" style={{
                            ...CRMStyles.styleTextInput,
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
                        ...CRMStyles.boxcontainer,
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(10),
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validateEmail ? 'transparent' : 'darkred',
                        shadowOpacity: validateEmail ? 0.25 : 1,
                        padding: moderateScale(15),
                        paddingTop: moderateScale(10),
                        paddingBottom: moderateScale(10)
                    }}>


                        <TextInput placeholder="Email" style={{
                            ...CRMStyles.styleTextInput,
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
                        ...CRMStyles.boxcontainer,
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        marginTop: verticalScale(10),
                        flexDirection: 'row', alignItems: 'center',
                        shadowColor: validatePhone ? 'transparent' : 'darkred',
                        shadowOpacity: validatePhone ? 0.25 : 1,
                        padding: moderateScale(15),
                        paddingTop: moderateScale(10),
                        paddingBottom: moderateScale(10)
                    }}>


                        <TextInput placeholder="Phone No" style={{
                            ...CRMStyles.styleTextInput,
                            flex: 1,
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10),
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
                        ...CRMStyles.boxcontainer,
                        shadowColor: validateState ? 'white' : 'darkred',
                        shadowOpacity: validateState ? 0.25 : 1,
                        marginTop: verticalScale(15), flexDirection: 'row',
                        padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                    }}>

                        <TextInput placeholder="Select State"
                            ref={inputEl}
                            autoCapitalize="none"

                            onPressIn={() => {

                                inputEl.current.focus();
                                if (inputCity.current.isFocused()) { return; }

                                setIsVisible(true);
                                setIsCityVisible(false);
                                setIsZipVisible(false);
                                setFilterArr(arrStates);
                                scroll.current.scrollTo({ x: 0, y: 150, animated: true });
                            }}
                            onChangeText={(e) => {
                                userStateLocation({ name: e, stateId: -1 });
                                setIsVisible(isVisible);
                            }}
                            style={{
                                ...CRMStyles.styleTextInput,
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
                        ...CRMStyles.boxcontainer,
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
                                        setIsZipVisible(false);

                                    }}>
                                        <View >
                                            <Text style={{
                                                ...CRMStyles.generalTxt, borderColor: 'black',
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
                        ...CRMStyles.boxcontainer,
                        shadowColor: validateCity ? 'white' : 'darkred',
                        shadowOpacity: validateCity ? 0.25 : 1,
                        marginTop: verticalScale(15), flexDirection: 'row',
                        padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                    }}>

                        <TextInput placeholder="Select City"
                            ref={inputCity}
                            onPressIn={() => {
                                setIsVisible(false);
                                setIsZipVisible(false)
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
                                setIsZipVisible(false)
                                scroll.current.scrollTo({ x: 0, y: 200, animated: true });

                            }}
                            style={{
                                ...CRMStyles.styleTextInput,
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
                        ...CRMStyles.boxcontainer,
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
                                                ...CRMStyles.generalTxt, borderColor: 'black',
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

                    {/* <View style={{
                        ...CRMStyles.boxcontainer,
                        shadowColor: validateZipCode ? 'white' : 'darkred',
                        shadowOpacity: validateZipCode ? 0.25 : 1,
                        marginTop: verticalScale(15), flexDirection: 'row',
                        padding: moderateScale(20), paddingTop: 0, paddingBottom: 0,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                    }}>


                        <TextInput placeholder="Zip Code"
                            ref={inputZipCode}
                            autoCapitalize='none'
                            onPressIn={() => {
                                setIsVisible(false)
                                setIsZipVisible(false)
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
                                setIsZipVisible(false)
                                scroll.current.scrollTo({ x: 0, y: 300, animated: true })

                            }}
                            style={{
                                ...CRMStyles.styleTextInput,
                                flex: 1,
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
                        ...CRMStyles.boxcontainer,
                        height: moderateScale(150),
                        shadowRadius: 4,
                        borderRadius: moderateScale(5)

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
                                                ...CRMStyles.generalTxt, borderColor: 'black',
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
                    </View> : null} */}





                    <TouchableOpacity style={{
                        ...CRMStyles.styleButtons,
                        backgroundColor: Colors.appBgColor,
                        marginTop: verticalScale(25),
                    }} onPress={() => {
                        addBreeder({
                            address: valueDesc,
                            city: userCity,
                            state: userState,
                            name: valueName,
                            email: valueEmail,
                            phone: valuePhone,
                        })

                    }}>
                        <Text style={{
                            ...CRMStyles.generalTxt,
                            color: 'white',
                            fontSize: moderateScale(20), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                        }}>DONE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...CRMStyles.styleButtons,
                        backgroundColor: 'white',
                        marginTop: verticalScale(5),
                    }} onPress={() => {
                        props.navigation.pop()

                    }}>
                        <Text style={{
                            ...CRMStyles.generalTxt,
                            color: '#404040',
                            fontSize: moderateScale(20), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                        }}>Cancel</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );

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

export default CRMAddCustomersView;
