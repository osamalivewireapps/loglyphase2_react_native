/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AutoSizeText } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import { TextInput } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';


function AddCategory(props) {


    const { name} = props;
    const sheetRef = useRef(null);
    const sheetActivityType = useRef(null);

    const [addCategory, setAddCategory] = useState([]);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [isBottonSheetActivityVisible, setCloseBottonSheetActivity] = useState(false);

    const [searchTxt, setSearchTxt] = useState('');

    useEffect(() => {

        if (name.length === 0)
            return

            if (name && name.substring(0, name.lastIndexOf('_')) === 'Add Category')
            setCloseBottonSheet(true)
        else if (name && name.length > 0) {
            setCloseBottonSheetActivity(true)
        }
    }, [name])

    return (
        <View style={{ flex: 1 }}>



            <ScrollView
                style={{ height: '100%', backgroundColor: 'white' }}
                keyboardShouldPersistTaps='handled'>
                <View style={{ height: '100%', padding: moderateScale(25), paddingTop: 0 }}>


                    <View>


                        <TouchableOpacity style={{
                            backgroundColor: Colors.appBgColor,
                            borderRadius: moderateScale(10),
                            height: verticalScale(35),
                            paddingStart: moderateScale(20),
                            paddingEnd: moderateScale(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }} onPress={() => {
                            setCloseBottonSheet(true)
                        }
                        }>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: 'white',
                                    flex: 1

                                }}
                            >Add Category
                            </AutoSizeText>
                            <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(10), tintColor: 'white' }} />
                        </TouchableOpacity>



                        <FlatList
                            data={['']}
                            contentContainerStyle={{
                                minHeight: Dimensions.get('screen').height / 2

                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                    onPress={()=>setCloseBottonSheetActivity(true)}

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
                                                Category Name
                                            </AutoSizeText>
                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#232323',
                                                    marginTop: verticalScale(5),

                                                }}
                                            >
                                                Cat Cleaning
                                            </AutoSizeText>

                                            <View

                                                style={{
                                                    height:verticalScale(1),
                                                    width:'90%',
                                                    marginTop: verticalScale(5),
                                                    marginBottom:verticalScale(5),
                                                    backgroundColor:'#CDCDCD'
                                                }}
                                            />

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(14)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#777777',

                                                }}
                                            >
                                                Activity Type
                                            </AutoSizeText>

                                            <AutoSizeText
                                                numberOfLines={1}
                                                minFontSize={moderateScale(12)}
                                                fontSize={moderateScale(16)}
                                                style={{
                                                    fontFamily: Fonts.type.medium,
                                                    color: '#232323',
                                                    marginTop: verticalScale(5),

                                                }}
                                            >
                                                Paw Cleaning
                                            </AutoSizeText>

                                        </View>
                                        <Image
                                            resizeMode='contain'
                                            style={{
                                                flex: 0.1,

                                            }}
                                            source={Icons.icon_three_colons} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>


                    {isBottonSheetVisible ? sheetRef.current.open() : null}
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
                            setCloseBottonSheet(false)
                        }
                        }
                    >
                        {showBottomSheet(false)}
                    </RBSheet>

                    {isBottonSheetActivityVisible ? sheetActivityType.current.open() : null}
                    <RBSheet
                        ref={sheetActivityType}
                        height={Dimensions.get('screen').height - moderateScale(130)}
                        openDuration={250}
                        customStyles={{
                            container: {
                                borderRadius: moderateScale(30)
                            }
                        }}
                        onClose={() => {
                            setCloseBottonSheetActivity(false)
                        }
                        }
                    >
                        {showActivityBottomSheet(false)}
                    </RBSheet>

                </View>
            </ScrollView>



        </View>
    );



    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>

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
                        }}>Add Category</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                    </View>

                    <FlatList
                        data={addCategory}
                        contentContainerStyle={{

                        }}
                        renderItem={({ item, index }) => {
                            return (<View>

                                <View style={{
                                    marginStart: moderateScale(25),
                                    marginEnd: moderateScale(65),
                                    marginTop: verticalScale(10),
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    height: verticalScale(32),
                                    justifyContent: 'center',
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10)
                                }}>

                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            width: '100%',
                                            textAlignVertical: 'center',
                                            ...styles.generalTxt,
                                            color: '#777777',
                                            fontSize: moderateScale(14),
                                        }} >{item}
                                    </Text>

                                </View>
                            </View>);
                        }}
                    />
                    <View style={{
                        paddingTop: verticalScale(10),
                        padding: moderateScale(25), paddingBottom: 0, flexDirection: 'row', width: '100%'
                    }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                marginEnd: moderateScale(10),
                                flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setSearchTxt(e)
                                    }}
                                    value={searchTxt}
                                    placeholder='Category Name'
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

                            <TouchableOpacity
                                style={{ backgroundColor: '#F5F5F5', height: verticalScale(32), width: moderateScale(30), justifyContent: "center", alignItems: 'center', borderRadius: moderateScale(5) }}
                                onPress={() => {
                                    let tmp = addCategory;
                                    tmp.push(searchTxt);
                                    setAddCategory([...tmp])

                                }}>
                                <Image source={Icons.icon_white_plus} resizeMode='contain' style={{ tintColor: 'black', height: verticalScale(10), width: moderateScale(12) }} />
                            </TouchableOpacity>

                        </View>
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

                        }}>Add</Text>
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
        )
    }

    function showActivityBottomSheet() {

        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View
                    style={{
                        backgroundColor: 'white',
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-start'
                    }}>

                    <View style={{
                        alignItems: 'flex-end', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>



                        <TouchableOpacity onPress={() => { sheetActivityType.current.close() }}>
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
                        }}>Add Activity Type</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                    </View>

                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: Fonts.type.base,
                            fontSize: moderateScale(14),
                            color: '#404040',
                            flex: 1,
                            paddingStart: moderateScale(10),
                            margin: moderateScale(25),
                            marginBottom: verticalScale(10)

                        }}
                    >
                        Select Category
                    </Text>

                    <View style={{
                        ...styles.boxcontainer,
                        //shadowColor: validateState ? 'white' : 'darkred',
                        //shadowOpacity: validateState ? 0.25 : 1,
                        marginTop: 0,
                        marginStart: verticalScale(20),
                        marginEnd: verticalScale(20),
                        flexDirection: 'row',
                        padding: moderateScale(20),
                        paddingTop: 0, paddingBottom: 0,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                    }}>

                        <TextInput placeholder=""
                            autoCapitalize="none"

                            onChangeText={(e) => {

                            }}
                            style={{
                                ...styles.styleTextInput,
                                flex: 1,
                                color: '#404040',
                                marginEnd: moderateScale(10),

                            }}
                            value='Cat Cleaning'
                            keyboardType="default"
                        />
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


                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: Fonts.type.base,
                            fontSize: moderateScale(14),
                            color: '#404040',
                            flex: 1,
                            paddingStart: moderateScale(10),
                            margin: moderateScale(25),
                            marginBottom: verticalScale(0)

                        }}
                    >
                        Activity Type
                    </Text>
                    <FlatList
                        data={addCategory}
                        contentContainerStyle={{

                        }}
                        renderItem={({ item, index }) => {
                            return (<View>

                                <View style={{
                                    marginStart: moderateScale(25),
                                    marginEnd: moderateScale(65),
                                    marginTop: verticalScale(10),
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    height: verticalScale(32),
                                    justifyContent: 'center',
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10)
                                }}>

                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            width: '100%',
                                            textAlignVertical: 'center',
                                            ...styles.generalTxt,
                                            color: '#777777',
                                            fontSize: moderateScale(14),
                                        }} >{item}
                                    </Text>

                                </View>
                            </View>);
                        }}
                    />
                    <View style={{
                        paddingTop: verticalScale(10),
                        padding: moderateScale(25), paddingBottom: 0, flexDirection: 'row', width: '100%'
                    }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                marginEnd: moderateScale(10),
                                flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setSearchTxt(e)
                                    }}
                                    value={searchTxt}
                                    placeholder='Activity Type'
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

                            <TouchableOpacity
                                style={{ backgroundColor: '#F5F5F5', height: verticalScale(32), width: moderateScale(30), justifyContent: "center", alignItems: 'center', borderRadius: moderateScale(5) }}
                                onPress={() => {
                                    let tmp = addCategory;
                                    tmp.push(searchTxt);
                                    setAddCategory([...tmp])

                                }}>
                                <Image source={Icons.icon_white_plus} resizeMode='contain' style={{ tintColor: 'black', height: verticalScale(10), width: moderateScale(12) }} />
                            </TouchableOpacity>

                        </View>
                    </View>



                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '30%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            setTimeout(() => {

                                sheetActivityType.current.close();
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

                        }}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '60%', alignSelf: 'center',
                        marginTop: verticalScale(5), backgroundColor: 'transparent'
                    }}
                        onPress={() => {
                            setTimeout(() => {

                                sheetActivityType.current.close();
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
        )
    }


}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'white',
        backgroundColor: '#F5F5F5',

        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        height: moderateScale(40),
        elevation: verticalScale(5),
        borderRadius: moderateScale(10),
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: moderateScale(14),
        color: '#585858',
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    }
});

export default AddCategory;
