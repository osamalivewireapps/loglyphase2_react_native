/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo, { useFirstInstallTime } from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import { TextInput } from 'react-native';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Calendar } from 'react-native-calendars';
import Util from '../../../utils';


function CRMMyOrder(props) {

    const { nextScreen } = props;

    const isTablet = DeviceInfo.isTablet();

    const sheetRef = useRef(null);

    const [isToggleClick, setIsToggleClick] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');
    const [addItems, setAddItems] = useState([]);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [installAmount, setInstallAmount] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    //TEMPORARY
    const [isEditObj, setIsEditObj] = useState({});

    //////////////////////////  CALENDAR ////////////////////////
    const initialDate = moment().format('YYYY-MM-DD');
    const [selected, setSelected] = useState(initialDate);
    let markedDates = {
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: Colors.appBgColor,
            selectedTextColor: 'white',
        }
    };

    const onDayPress = day => {
        setSelected(day.dateString);
    };

    return (
        <View style={{ flex: 1 }}>

            <ImageBackground style={{ flex: 0.9, backgroundColor: '#161D6E' }}>

                <ScrollView
                    style={{ height: '100%', backgroundColor: 'white', borderBottomRightRadius: moderateScale(30) }}
                    keyboardShouldPersistTaps='handled'>
                    <View style={{ height: '100%' }}>


                        <Text
                            style={{
                                fontSize: moderateScale(16),
                                marginTop: verticalScale(20),
                                marginStart: moderateScale(25),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',

                            }}
                        >
                            My Order
                        </Text>

                        <View style={{
                            ...CRMStyles.boxcontainer,
                            shadowOpacity: 0.09,
                            marginTop: verticalScale(20),
                            height: moderateVerticalScale(60),
                            borderRadius: moderateScale(15),
                            flexDirection: 'row', alignItems: 'center',
                            marginStart: moderateScale(25),
                            marginEnd: moderateScale(25),

                        }}>
                            <Image
                                source={Icons.icon_paw}
                                resizeMode='cover'
                                style={{
                                    width: moderateScale(65),
                                    height: '100%',
                                    borderRadius: moderateScale(15)
                                    , marginEnd: moderateScale(15)
                                }}
                            />

                            <View style={{
                                flex: 1, alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingEnd: moderateScale(15)
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(16)}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',

                                        }}
                                    >
                                        Nagtile
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.medium,
                                            color: Colors.appBgColor,
                                            flex: 1,
                                            textAlign: 'right',
                                            marginStart: moderateScale(10)

                                        }}
                                    >
                                        $100
                                    </AutoSizeText>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingEnd: moderateScale(15),
                                    width: '100%',
                                    alignItems: 'flex-end',
                                    height: verticalScale(16),
                                }}>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(12)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#A1A1A1',
                                            flex: 1

                                        }}
                                    >
                                        Parrot
                                    </AutoSizeText>
                                    <View style={{
                                        backgroundColor: '#E27F0E',
                                        justifyContent: 'center',
                                        paddingStart: moderateScale(5),
                                        paddingEnd: moderateScale(5),
                                        borderRadius: moderateScale(10)
                                    }}>
                                        <AutoSizeText
                                            numberOfLines={1}
                                            minFontSize={moderateScale(12)}
                                            fontSize={moderateScale(14)}
                                            style={{
                                                fontFamily: Fonts.type.medium,
                                                color: 'white',

                                            }}
                                        >
                                            1
                                        </AutoSizeText>
                                    </View>
                                </View>

                            </View>

                        </View>


                        <View style={{
                            padding: moderateScale(25),
                            paddingTop: verticalScale(10),
                            paddingBottom: 0, flexDirection: 'row', width: '100%'
                        }}>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                paddingTop: verticalScale(0)
                            }}>
                                <View style={{
                                    marginEnd: moderateScale(10),
                                    flex: 0.75,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10)
                                }}>

                                    <TextInput
                                        onChangeText={(e) => {
                                            setSearchTxt(e)
                                        }}
                                        value={searchTxt}
                                        placeholder='Discount Amount'
                                        numberOfLines={1}
                                        keyboardType='default'
                                        autoCapitalize='none'
                                        style={{
                                            keyboardShouldPersistTaps: true,
                                            flex: 0.9,
                                            height: verticalScale(35),
                                            ...CRMStyles.generalTxt,
                                            color: '#777777',
                                            fontSize: moderateScale(14),
                                        }} />

                                </View>

                                <TouchableOpacity style={{
                                    backgroundColor: 'white',
                                    flex: 0.25,
                                    borderRadius: moderateScale(8),
                                    height: verticalScale(30),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: '#503A9F',
                                    borderWidth: 1,
                                }} onPress={() => {

                                }}>

                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            color: Colors.appBgColor,
                                            textAlign: 'center',
                                            fontSize: moderateScale(14),
                                            fontFamily: Fonts.type.base,
                                            paddingStart: moderateScale(10),
                                            paddingEnd: moderateScale(10),
                                        }}>Apply
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: verticalScale(20),
                            paddingStart: moderateScale(25),
                            paddingEnd: moderateScale(25),
                            paddingBottom: moderateScale(10)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',

                                }}
                            >
                                Discount
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                $0
                            </AutoSizeText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingStart: moderateScale(25),
                            paddingEnd: moderateScale(25),
                            paddingBottom: moderateScale(10)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',

                                }}
                            >
                                Sub Total
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                $100
                            </AutoSizeText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingStart: moderateScale(25),
                            paddingEnd: moderateScale(25),
                            paddingBottom: moderateScale(5)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',

                                }}
                            >
                                Salex Tax @10 %
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                $10
                            </AutoSizeText>
                        </View>

                        <View style={{
                            backgroundColor: '#EBEBEB',
                            height: 1,
                            marginStart: moderateScale(25),
                            marginRight: moderateScale(25),
                            marginBottom: verticalScale(10)
                        }} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: moderateScale(25),
                            paddingBottom: moderateScale(5)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',

                                }}
                            >
                                Total Amount
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                $10
                            </AutoSizeText>
                        </View>

                        <View style={{
                            backgroundColor: Colors.appBgColor,
                            height: 1,
                            marginStart: moderateScale(25),
                            marginEnd: moderateScale(25),
                            marginBottom: verticalScale(10)
                        }} />

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: verticalScale(15),
                            padding: moderateScale(25),
                            paddingBottom: moderateScale(20)
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    flex: 1

                                }}
                            >
                                Pay in installments
                            </AutoSizeText>

                            <TouchableOpacity onPress={() => setIsToggleClick(!isToggleClick)}>
                                <Image
                                    source={isToggleClick ? Icons.icon_toggle_on : Icons.icon_toggle_off}
                                    resizeMode='contain'
                                    style={{ height: verticalScale(15), width: moderateScale(25) }}

                                />
                            </TouchableOpacity>
                        </View>

                        {isToggleClick ?
                            <View>
                                <TouchableOpacity style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    height: verticalScale(35),
                                    paddingStart: moderateScale(20),
                                    paddingEnd: moderateScale(20),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginStart: moderateScale(25),
                                    marginEnd: moderateScale(25)
                                }} onPress={() => {
                                    if (addItems.length < 5) {
                                        setSelected(initialDate)
                                        setCloseBottonSheet(true)
                                    }else{
                                        Util.topAlert('Only five installments are allowed')
                                    }
                                }
                                }>

                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#404040',
                                            flex: 1

                                        }}
                                    >Add Installments
                                    </AutoSizeText>
                                    <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(10) }} />
                                </TouchableOpacity>

                                {console.log("addItems---->", addItems.length)}
                                <FlatList
                                    data={addItems}
                                    contentContainerStyle={{
                                        marginTop: verticalScale(0)
                                    }}
                                    renderItem={({ item, index }) => {
                                        return renderBreedItem(item, index);
                                    }}
                                />
                            </View>
                            : <View />}

                        {isEdit || isBottonSheetVisible ? sheetRef.current.open() : null}
                        <RBSheet
                            ref={sheetRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => {
                                setIsEdit(false)
                                setCloseBottonSheet(false)
                            }
                            }
                        >
                            {showBottomSheet(false)}
                        </RBSheet>




                    </View>
                </ScrollView>

            </ImageBackground>


            <View style={{
                flex: 0.15,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#161D6E',
                paddingStart: moderateScale(25),
                paddingEnd: moderateScale(25)
            }}>

                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(16)}
                    style={{
                        fontFamily: Fonts.type.medium,
                        color: 'white',
                        flex: 0.2,

                    }}
                >

                </AutoSizeText>

                <View style={{
                    flexDirection: 'row',
                    paddingEnd: moderateScale(15),
                    flex: 0.8,
                    justifyContent: 'center',
                }}>


                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(16)}
                        style={{
                            fontFamily: Fonts.type.bold,
                            color: 'white',
                            marginStart: moderateScale(5)

                        }}
                    >
                        Continue
                    </AutoSizeText>



                </View>

                <TouchableOpacity
                    style={{
                        flex: 0.2,
                    }}
                    onPress={(e) => nextScreen(e)}>
                    <Image resizeMode='contain'
                        source={Icons.icon_blue_forwardbtn}
                        style={{
                            width: moderateScale(50),
                            height: verticalScale(50)
                        }}
                    />

                </TouchableOpacity>
            </View>
        </View>
    );


    function renderBreedItem(item, index) {

        return (
            <View style={{
                backgroundColor: '#F5F5F5',
                marginTop: verticalScale(10),
                borderRadius: moderateScale(15),
                padding: moderateScale(10),
                paddingStart: moderateScale(15),
                paddingEnd: moderateScale(15),
                alignItems: 'center', marginStart: moderateScale(25),
                marginEnd: moderateScale(25),
                marginBottom: index === addItems.length - 1 ? verticalScale(10) : 0
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: verticalScale(10)
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(12)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#404040',
                            flex: 1

                        }}
                    >
                        Installment {index + 1}
                    </AutoSizeText>
                    <TouchableOpacity
                        onPress={() => {
                            setIsEditObj({ downPayment: index === 0 ? true : false, installNo: index + 1 })
                            setIsEdit(true)
           
                        }}>
                        <Image source={Icons.icon_services_edit}
                            resizeMode='contain' style={{
                                tintColor: '#A1A1A1',
                                marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15)
                            }}

                        />
                    </TouchableOpacity>
                </View>

                {index === 0 ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#A1A1A1',
                        padding: moderateScale(10),
                        borderRadius: moderateScale(5),
                        marginBottom: verticalScale(10)
                    }}>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: 'white',

                            }}
                        >
                            Down Payment
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: 'white',
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            {downPayment}
                        </AutoSizeText>
                    </View> : <View />}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(12)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#777777',

                        }}
                    >
                        Date
                    </AutoSizeText>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(12)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#777777',
                            flex: 1,
                            textAlign: 'right',
                            marginStart: moderateScale(10)

                        }}
                    >
                        5 Jan,2021
                    </AutoSizeText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: verticalScale(5)
                }}>

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(12)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#777777',

                        }}
                    >
                        Installment Amount
                    </AutoSizeText>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(12)}
                        fontSize={moderateScale(12)}
                        style={{
                            fontFamily: Fonts.type.medium,
                            color: '#777777',
                            flex: 1,
                            textAlign: 'right',
                            marginStart: moderateScale(10)

                        }}
                    >
                        $50
                    </AutoSizeText>
                </View>

            </View>
        )
    }

    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: moderateScale(30),
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>

                    {(isEdit && isEditObj.downPayment) || addItems.length === 0 ?
                        <View>
                            <Text
                                style={{
                                    fontSize: moderateScale(14),
                                    fontFamily: Fonts.type.medium,
                                    color: '#464646',

                                }}
                            >
                                Down Payment
                            </Text>

                            <View style={{
                                flex: 1,
                                marginTop: verticalScale(10),
                                backgroundColor: '#F5F5F5',
                                marginBottom: verticalScale(10),
                                borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setDownPayment(e)
                                    }}
                                    value={downPayment}
                                    placeholder='Down Payment'
                                    numberOfLines={1}
                                    keyboardType='default'
                                    autoCapitalize='none'
                                    style={{
                                        keyboardShouldPersistTaps: true,
                                        flex: 1,
                                        paddingStart: moderateScale(15),
                                        paddingEnd: moderateScale(15),
                                        height: verticalScale(35),
                                        ...CRMStyles.generalTxt,
                                        color: '#777777',
                                        fontSize: moderateScale(14),
                                    }} />

                            </View>
                        </View> : <View />}

                    <View style={{
                        flex: 1,
                        paddingTop: verticalScale(10),
                        paddingBottom: verticalScale(10),
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10)
                    }}>

                        <Text
                            style={{
                                fontSize: moderateScale(14),
                                fontFamily: Fonts.type.medium,
                                color: '#464646',
                                paddingStart: moderateScale(15),
                                paddingBottom: verticalScale(10)



                            }}
                        >
                            Installment {isEdit ? isEditObj.installNo : addItems.length + 1}
                        </Text>
                        <Calendar
                            enableSwipeMonths={true}
                            onDayPress={onDayPress}
                            markedDates={markedDates}
                            hideExtraDays
                            theme={{
                                monthTextColor: Colors.appBgColor,
                                textMonthFontFamily: Fonts.type.bold,
                                textMonthFontSize: moderateScale(20),
                                textDayFontSize: moderateScale(12),
                                textDayHeaderFontSize: moderateScale(12),
                                calendarBackground: '#F5F5F5',
                                borderRadius: moderateScale(100),
                                textSectionTitleColor: '#595959',
                                dayTextColor: '#595959',

                            }}
                        />

                        <View style={{
                            ...CRMStyles.boxcontainer,
                            backgroundColor: 'transparent',
                            borderBottomColor: '#707070',
                            borderBottomWidth: 1,
                            marginTop: verticalScale(15),
                            flexDirection: 'row', alignItems: 'center',
                            shadowOpacity: 0,
                            padding: moderateScale(20),
                        }}>


                            <TextInput placeholder="Amount" style={{
                                ...CRMStyles.styleTextInput,
                                textAlign: 'left',
                                flex: 1,
                                color: '#404040',
                                fontSize: moderateScale(14),
                                height: verticalScale(35),
                            }}
                                underlineColorAndroid='transparent'
                                require={true}
                                numberOfLines={1}
                                autoCapitalize='none'
                                keyboardType="default"
                                onChangeText={(e) => {
                                    setInstallAmount(e)
                                }
                                }
                                value={installAmount} />
                        </View>

                    </View>




                    <TouchableOpacity style={{
                        ...CRMStyles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {
                                //setHolidays({ id: indexHoliday, holiday: valueHolidays, date: selected, markedDate: markedDates });
                                let tmp = addItems;
                                tmp.push({})
                                if (!isEdit)
                                    setAddItems(tmp)

                                sheetRef.current.close();
                            }, 200)
                        }}>
                        <Text style={{
                            ...CRMStyles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>{!isEdit ? 'Add' : 'Edit'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...CRMStyles.styleButtons, flex: 0,
                        width: '40%', alignSelf: 'center',
                        marginTop: verticalScale(15), backgroundColor: 'white'
                    }} onPress={() => { sheetRef.current.close() }}>
                        <Text style={{
                            ...CRMStyles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: 'black',
                            fontSize: moderateScale(18),
                            textAlign: 'center', padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>Cancel</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }


}

export default CRMMyOrder;
