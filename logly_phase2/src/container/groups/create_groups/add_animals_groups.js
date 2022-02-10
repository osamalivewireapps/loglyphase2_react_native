/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo, { useFirstInstallTime } from 'react-native-device-info';
import styles from '../styles'
import { TextInput } from 'react-native';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Util from '../../../utils';
import ImagePlaceholder from '../../../components/ImagePlaceholder';


function AddAnimalsGroups(props) {

    const { nextScreen, isSummary, animals, getAnimalList, getFinalAnimalList } = props;

    console.log("animals-->", animals)

    const sheetRef = useRef(null);

    const [searchTxt, setSearchTxt] = useState('');
    const [addItems, setAddItems] = useState(animals);
    const [listAnimals, setListAnimals] = useState([]);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [orgAnimalList, setOrgAnimalList] = useState([]);
   
    useEffect(() => {
        if (orgAnimalList.length > 0) {
            setListAnimals(orgAnimalList.filter((e) => {
                return (e.data.name.toLowerCase().startsWith(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);

   
    return (
        <View style={{ flex: 1 }}>



            <ScrollView
                style={{ height: '100%', backgroundColor: 'white' }}
                keyboardShouldPersistTaps='handled'>
                <View style={{ height: '100%' }}>


                    <View>

                        {isSummary ?

                            <View style={{
                                height: verticalScale(35),
                                paddingStart: moderateScale(20),
                                paddingEnd: moderateScale(20),
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',

                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: Colors.appBgColor,
                                        flex: 1

                                    }}
                                >Animals
                                </AutoSizeText>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: Colors.appBgColor,
                                        borderRadius: moderateScale(20),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: verticalScale(18),
                                        width: moderateScale(20)
                                    }}
                                    onPress={() => {
                                        manipulateAnimaList()
                                    }}
                                >
                                    <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ tintColor: 'white', height: verticalScale(10), width: verticalScale(8) }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity style={{
                                backgroundColor: '#F5F5F5',
                                borderRadius: moderateScale(10),
                                height: verticalScale(35),
                                paddingStart: moderateScale(20),
                                paddingEnd: moderateScale(20),
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }} onPress={() => {

                                manipulateAnimaList()
                            }
                            }>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(14)}
                                    style={{
                                        fontFamily: Fonts.type.medium,
                                        color: Colors.appBgColor,
                                        flex: 1

                                    }}
                                >Add Animals
                                </AutoSizeText>
                                <Image source={Icons.icon_awesome_plus} resizeMode='contain' style={{ height: verticalScale(15), width: verticalScale(10) }} />
                            </TouchableOpacity>
                        }


                        {console.log("addItems---->", addItems.length)}
                            <FlatList
                                data={addItems}
                                contentContainerStyle={{
                                    minHeight: Dimensions.get('screen').height / 2

                                }}
                                renderItem={({ item, index }) => {
                                    return renderBreedItem(item, index, true,false);
                                }}
                            /> 
                    </View>


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
                        {showBottomSheet(true)}
                    </RBSheet>


                    {isSummary ? null :
                        <TouchableOpacity style={{
                            ...styles.styleButtons,
                            width: '100%',


                        }} onPress={() => { nextScreen(addItems) }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: moderateScale(12),
                                paddingBottom: moderateScale(12),
                                ...styles.generalTxt
                            }}>NEXT</Text>
                        </TouchableOpacity>}

                </View>
            </ScrollView>



        </View>
    );


    function renderBreedItem(item, index, isDeleteIcon, isAddBreeder) {

        return (
            <View style={{
                ...styles.boxcontainer,
                backgroundColor: 'white',
                shadowColor: 'white',
                shadowOpacity: 1,
                marginTop: verticalScale(10),
                height: moderateVerticalScale(60),
                borderRadius: moderateScale(15),
                flexDirection: 'row',
                alignItems: 'center',
            }}>

                <ImagePlaceholder
                    showActivityIndicator={false}
                    activityIndicatorProps={{
                        size: 'small',
                        color: '#777777',
                    }}
                    resizeMode='cover'
                    placeholderStyle={{
                        width: moderateScale(50),
                        height: moderateScale(50),
                        borderRadius: moderateScale(50),

                    }}
                    imgStyle={{
                        borderRadius: moderateScale(50),
                        borderColor: 'transparent',
                        borderWidth: moderateScale(2),
                        width: moderateScale(50),
                        height: moderateScale(50),
                    }}

                    style={{
                        marginEnd: moderateScale(15),
                        flex: 0
                    }}

                    src={item.image ? item.image:''}
                    placeholder={Icons.icon_paw}
                />

                <TouchableOpacity
                    onPress={() => isAddBreeder ? addBreeder(index) : false}
                    activeOpacity={isAddBreeder ? 0.25 : 1}
                    style={{
                        flex: 0.95,
                    }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}>
                        <View style={{
                            width: '100%',
                            paddingEnd: moderateScale(15),
                            alignItems: 'flex-start'
                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#404040',

                                }}
                            >
                                {item?.data?.name}
                            </AutoSizeText>


                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                        }}>

                            <Text
                                numberOfLines={1}

                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    fontSize: moderateScale(12)

                                }}
                            >
                                Category:
                            </Text>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                {item.categoryName}
                            </AutoSizeText>
                            <Text
                                numberOfLines={1}

                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    fontSize: moderateScale(12),
                                    marginStart: moderateScale(10)

                                }}
                            >
                                Status:
                            </Text>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#404040',
                                    marginStart: moderateScale(5)

                                }}
                            >
                                {item.status}
                            </AutoSizeText>
                        </View>


                    </View>



                </TouchableOpacity>

                {isDeleteIcon ?
                    <TouchableOpacity onPress={() => {
                        let tmp = addItems;
                        tmp.splice(index, 1)
                        // listAnimals[index].isSelect = !listAnimals[index].isSelect;
                        // setListAnimals(listAnimals)
                        setAddItems([...tmp])
                        getFinalAnimalList ? getFinalAnimalList(tmp) : null;
                    }

                    }>
                        <Image
                            source={Icons.icon_material_delete}
                            resizeMode='contain'
                            style={{
                                width: moderateScale(15),
                                height: moderateScale(15),
                            }}
                        />
                    </TouchableOpacity> :
                    <Image
                        source={addItems.length > 0 && addItems.findIndex((value) => value._id === item._id) > -1 ? Icons.icon_check_circle_green : Icons.icon_uncheck_paackage}
                        resizeMode='contain'
                        style={{
                            width: moderateScale(15),
                            height: moderateScale(15),
                        }}
                    />}
            </View>
        )
    }

    function addBreeder(index) {
        let addItem = addItems;

        let finIndex = addItem.findIndex(value => value._id === listAnimals[index]._id);
        if (finIndex > -1) {
            addItem.splice(finIndex, 1)
        } else
            addItem.push(listAnimals[index])
        setAddItems([...addItem])

        getFinalAnimalList ? getFinalAnimalList(addItem) : null;
    }

    function manipulateAnimaList() {
        if (!listAnimals || listAnimals.length === 0) {
            getAnimalList().then((response) => {
                setOrgAnimalList(response)
                setListAnimals(response);
                setCloseBottonSheet(true)
            })
        } else if (listAnimals && listAnimals.length > 0)
            setCloseBottonSheet(true)
    }

    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet(isAddBreeder) {

        return (
            // <View keyboardShouldPersistTaps='handled'>
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
                    }}>Add Animals</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    margin: moderateScale(25),
                    marginTop: verticalScale(15),
                    marginBottom: verticalScale(15),

                    justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                }}>

                    <TextInput
                        onChangeText={(e) => {
                            setSearchTxt(e)
                        }}
                        value={searchTxt}
                        placeholder='Search'
                        numberOfLines={1}
                        keyboardType='default'
                        autoCapitalize='none'
                        style={{
                            keyboardShouldPersistTaps: true,
                            flex: 0.9,
                            height: verticalScale(40),
                            ...styles.generalTxt,
                            color: '#777777',
                            fontSize: moderateScale(14),
                        }} />
                    <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                </View>

                <FlatList
                    data={listAnimals}
                    contentContainerStyle={{
                        margin: moderateScale(25),
                        marginTop: verticalScale(0),
                        marginBottom: verticalScale(25),
                    }}
                    renderItem={({ item, index }) => {
                        return renderBreedItem(item, index, false, isAddBreeder);
                    }}
                />

                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0,
                    width: '60%', alignSelf: 'center',
                    marginTop: 0,//verticalScale(75), 
                    backgroundColor: '#FFC081',
                    marginBottom: verticalScale(25)
                }}
                    onPress={() => {
                        setTimeout(() => {
                            //setHolidays({ id: indexHoliday, holiday: valueHolidays, date: selected, markedDate: markedDates });
                            //let tmp = listAnimals.filter((value) => value.isSelect === true);
                            //setAddItems(tmp)

                            sheetRef.current.close();
                        }, 200)
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.base,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(18), textAlign: 'center',
                        padding: moderateScale(10),
                        paddingTop: verticalScale(5),
                        paddingBottom: verticalScale(5),

                    }}>{!isEdit ? 'Add to group' : 'Edit'}</Text>
                </TouchableOpacity>



            </View>
            //</View>
        )
    }


}

export default AddAnimalsGroups;
