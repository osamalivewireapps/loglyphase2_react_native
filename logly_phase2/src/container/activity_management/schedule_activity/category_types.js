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
import { getAllCategories, addCategory, updateCategory, removeCategory, updateTypeCategory } from '../../../actions/ActivityManagement'
import { useDispatch } from 'react-redux';
import { ImageBackground } from 'react-native';
import Util from '../../../utils';
import DropDownPicker from 'react-native-dropdown-picker';

function AddCategory(props) {


    const { name, getCategoryData, filterCategories } = props;
    const sheetRef = useRef(null);
    const sheetActivityType = useRef(null);

    const [allCategory, setAllCategory] = useState([]);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [isBottonSheetActivityVisible, setCloseBottonSheetActivity] = useState(false);

    const [currentActivityIndex, setCurrentActivityIndex] = useState(-1);
    const [categoryName, setCategoryName] = useState('');
    const [activityName, setActivityName] = useState('');
    const [updateActivityName, setUpdateActivityName] = useState('');
    const [isEditShow, setEditShow] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [addCategoryActivityType, setAddCategoryActivityType] = useState([]);
    const [arrCategoryList, setArrCategoryList] = useState([]);

    let dispatch = useDispatch();

    useEffect(() => {
        getAllCategoriesList();
    }, []);

    useEffect(() => {
        setAllCategory(filterCategories)
    }, [filterCategories]);


    function getAllCategoriesList() {
        dispatch(getAllCategories()).then((response) => {
            if (response.payload) {
                setAllCategory(response.payload)
                getCategoryData(response.payload)
                setCategoryListing(response.payload)
            }
        })
    }

    function setCategoryListing(response) {
        console.log('filter category2---->', response);
        let tmp = [];
        response.forEach((element, index) => {
            tmp.push({ label: element.name, value: element._id })
        });
        setArrCategoryList(tmp)
    }

    useEffect(() => {

        if (name.length === 0)
            return

        if (name && name.length > 0 && name.toLowerCase().includes('category')) {
            emptyValues(true)
        }
        else if (name && name.length > 0 && name.toLowerCase().includes('type')) {
            console.log('name----->', name)
            emptyValues(false)
        }
    }, [name])

    function emptyValues(isShowCategory) {
        setCategoryName('')
        setSelectedCategory({})
        setEditShow(-1);
        setActivityName('')
        setCloseBottonSheet(isShowCategory)
        setCloseBottonSheetActivity(!isShowCategory);
        setCurrentActivityIndex(-1)
        setAddCategoryActivityType([])
    }
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
                            setCategoryName('')
                            setSelectedCategory({})
                            setEditShow(-1);
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
                            data={allCategory}
                            contentContainerStyle={{
                                minHeight: Dimensions.get('screen').height / 2

                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        //onPress={() => setCloseBottonSheetActivity(true)}

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
                                                {item.name}
                                            </AutoSizeText>

                                            {item.subType.length > 0 ? <View>
                                                <View

                                                    style={{
                                                        height: verticalScale(1),
                                                        width: '90%',
                                                        marginTop: verticalScale(5),
                                                        marginBottom: verticalScale(5),
                                                        backgroundColor: '#CDCDCD'
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
                                                    minFontSize={moderateScale(12)}
                                                    fontSize={moderateScale(16)}
                                                    style={{
                                                        fontFamily: Fonts.type.medium,
                                                        color: '#232323',
                                                        marginTop: verticalScale(5),

                                                    }}
                                                >
                                                    {item.subType.join("\n")}
                                                </AutoSizeText>
                                            </View> : <View />}

                                        </View>

                                        {isEditShow === index ?
                                            <View style={{
                                                height: verticalScale(50),
                                                flex: moderateScale(0.1),
                                                marginTop: 0,
                                                marginBottom: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <ImageBackground
                                                    source={Images.img_popup_services}
                                                    style={{
                                                        position: 'absolute', height: '100%',
                                                        width: '100%'
                                                    }} />
                                                <TouchableOpacity
                                                    flex={moderateScale(0.1)}
                                                    style={{
                                                        justifyContent: 'center', width: '90%',
                                                        height: verticalScale(5),
                                                        alignItems: 'center'
                                                    }}
                                                    onPress={() => {
                                                        if (item.subType.length > 0) {
                                                            setSelectedCategory(item)
                                                            setCategoryName(item.name)
                                                            setAddCategoryActivityType(item.subType)
                                                            setCloseBottonSheetActivity(true)
                                                        } else {
                                                            setSelectedCategory(item)
                                                            setCategoryName(item.name)
                                                            setCloseBottonSheet(true)
                                                        }
                                                    }}>
                                                    <Image source={Icons.icon_services_edit}
                                                        resizeMode='contain' style={{
                                                            marginEnd: moderateScale(2), height: verticalScale(10), width: moderateScale(15)
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
                                                    style={{
                                                        justifyContent: 'center', width: '90%',
                                                        height: verticalScale(5),
                                                        alignItems: 'center',
                                                    }}
                                                    onPress={() => {
                                                        removeCategoryApi(item._id);
                                                    }}>
                                                    <Image source={Icons.icon_services_delete}
                                                        resizeMode='contain'
                                                        style={{
                                                            marginEnd: moderateScale(3),
                                                            height: verticalScale(12),
                                                            width: moderateScale(15)
                                                        }} />
                                                </TouchableOpacity>
                                            </View> : <View flex={moderateScale(0.1)} />}

                                        <TouchableOpacity
                                            style={{ width: moderateScale(20), height: verticalScale(20), alignItems: 'center', justifyContent: 'center' }}

                                            onPress={() => {
                                                isEditShow === index ? setEditShow(-1) : setEditShow(index)
                                            }}>
                                            <Image source={Icons.icon_three_colons}
                                                resizeMode='contain' style={{ height: verticalScale(12), width: moderateScale(12) }}
                                            />
                                        </TouchableOpacity>
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
                                marginEnd: moderateScale(0),
                                flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', backgroundColor: '#F5F5F5', borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setCategoryName(e)
                                    }}
                                    maxLength={80}
                                    value={categoryName}
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

                            {/* <TouchableOpacity
                                style={{ backgroundColor: '#F5F5F5', height: verticalScale(32), width: moderateScale(30), justifyContent: "center", alignItems: 'center', borderRadius: moderateScale(5) }}
                                onPress={() => {
                                    if (isEditShow === -1)
                                        addCategoryApi()
                                    else {
                                        console.log('selected category--->', selectedCategory)
                                        updateCategoryApi(selectedCategory._id)
                                    }

                                }}>
                                <Image source={Icons.icon_white_plus} resizeMode='contain' style={{ tintColor: 'black', height: verticalScale(10), width: moderateScale(12) }} />
                            </TouchableOpacity> */}

                        </View>
                    </View>



                    <TouchableOpacity style={{
                        ...styles.styleButtons, flex: 0,
                        width: '30%', alignSelf: 'center',
                        marginTop: verticalScale(75), backgroundColor: '#FFC081'
                    }}
                        onPress={() => {
                            if (isEditShow === -1)
                                addCategoryApi()
                            else {
                                console.log('selected category--->', selectedCategory)
                                updateCategoryApi(selectedCategory._id)
                            }
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.base,
                            color: Colors.appBgColor,
                            fontSize: moderateScale(16), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: verticalScale(5),
                            paddingBottom: verticalScale(5),

                        }}>{isEditShow > -1 ? 'Save' : 'Add'}</Text>
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
                        marginEnd: verticalScale(25),
                        paddingEnd: verticalScale(100),
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        borderRadius: moderateScale(10),
                        zIndex: 2
                    }}>

                        <DropDownPicker
                            showArrow={false}
                            disabled={isEditShow > -1 ? true : false}
                            labelStyle={{
                                fontSize: moderateScale(14),
                                color: 'black',
                                width: '100%',


                            }}
                            itemStyle={{
                                width: '100%', justifyContent: 'flex-start',
                            }}
                            dropDownStyle={{
                                width: Dimensions.get('screen').width - moderateScale(55)
                            }}
                            style={{
                                ...styles.styleTextInput,
                                width: Dimensions.get('screen').width - moderateScale(90),
                                height: verticalScale(40),
                                color: '#404040',
                                marginEnd: moderateScale(10),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                justifyContent: 'center', alignItems: 'center',

                            }}
                            placeholder={categoryName ? categoryName : arrCategoryList[0]?.label}
                            items={arrCategoryList}
                            onChangeItem={(item) => {
                                setSelectedCategory({ name: item.label, _id: item.value });
                            }}
                        />

                        <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

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
                        data={addCategoryActivityType}
                        contentContainerStyle={{

                        }}
                        renderItem={({ item, index }) => {
                            return (<View style={{
                                flexDirection: 'row', width: '100%'
                            }}>

                                <View style={{
                                    marginStart: moderateScale(25),
                                    marginEnd: moderateScale(10),
                                    marginTop: verticalScale(10),
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: moderateScale(10),
                                    height: verticalScale(32),
                                    justifyContent: 'center',
                                    paddingStart: moderateScale(10),
                                    paddingEnd: moderateScale(10),
                                    flex: 0.8
                                }}>

                                    <TextInput
                                        onChangeText={(e) => {
                                            console.log('current--->', index === currentActivityIndex)
                                            if (index === currentActivityIndex)
                                                setUpdateActivityName(e)
                                        }}


                                        onFocus={() => {
                                            setCurrentActivityIndex(index)
                                            setUpdateActivityName(item)
                                        }}
                                        onEndEditing={(e) => {
                                            let tmp = [];
                                            tmp = tmp.concat(addCategoryActivityType);
                                            tmp[index] = updateActivityName;
                                            setAddCategoryActivityType([...tmp])
                                            setCurrentActivityIndex(-1)
                                        }}

                                        value={index === currentActivityIndex ? updateActivityName : item}
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
                                    style={{
                                        backgroundColor: '#F5F5F5', height: verticalScale(32),
                                        flex: 0.1,
                                        justifyContent: "center", alignItems: 'center',
                                        borderRadius: moderateScale(5),
                                        marginTop: verticalScale(10),

                                    }}
                                    onPress={() => {
                                        let tmp = addCategoryActivityType;
                                        tmp.splice(index, 1)
                                        setUpdateActivityName('')
                                        setAddCategoryActivityType([...tmp])

                                    }}>
                                    <Text
                                        style={{
                                            tintColor: 'black', height: verticalScale(10)
                                        }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                            </View>);
                        }}
                    />
                    <View style={{
                        paddingTop: verticalScale(10),
                        padding: moderateScale(25), paddingBottom: 0,
                        flexDirection: 'row', width: '100%'
                    }}>
                        <View style={{
                            width: '98%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                marginEnd: moderateScale(10),
                                flex: 1, flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'flex-end', backgroundColor: '#F5F5F5',
                                borderRadius: moderateScale(10)
                            }}>

                                <TextInput
                                    onChangeText={(e) => {
                                        setActivityName(e)
                                    }}
                                    value={activityName}
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
                                style={{
                                    backgroundColor: '#F5F5F5',
                                    height: verticalScale(32),
                                    width: moderateScale(30),
                                    justifyContent: "center", alignItems: 'center', borderRadius: moderateScale(5)
                                }}
                                onPress={() => {
                                    let tmp = addCategoryActivityType;
                                    tmp.push(activityName);
                                    setActivityName('')
                                    setUpdateActivityName('')
                                    setAddCategoryActivityType([...tmp])

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
                                updateTypeWithCategoryApi(selectedCategory._id)
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

                        }}>{isEditShow > -1 ? 'Save' : 'Add'}</Text>
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

    function addCategoryApi() {

        if (!Util.isLengthGraterThanZero(categoryName)) {
            Util.topAlert('Please enter category Name')
            return
        }
        let tmp = {
            name: categoryName,
            active: true,
            type: 'activity'
        }
        sheetRef.current.close()

        setTimeout(() => {
            dispatch(addCategory(tmp)).then((response) => {
                if (response) {
                    setCategoryName('')
                    getAllCategoriesList()
                }
            })
        }, 200)

    }

    function updateCategoryApi(id) {

        if (!Util.isLengthGraterThanZero(categoryName)) {
            Util.topAlert('Please enter category Name')
            return
        }
        sheetRef.current.close()

        setTimeout(() => {
            dispatch(updateCategory(id, { name: categoryName })).then((response) => {
                if (response) {
                    setCategoryName('')
                    setEditShow(-1)
                    getAllCategoriesList()
                }
            })
        }, 200)
    }

    function removeCategoryApi(id) {

        setTimeout(() => {
            dispatch(removeCategory(id)).then((response) => {
                if (response) {
                    setCategoryName('')
                    setEditShow(-1)
                    getAllCategoriesList()
                }
            })
        }, 200)
    }

    function updateTypeWithCategoryApi(id) {

        sheetActivityType.current.close()

        setTimeout(() => {
            dispatch(updateTypeCategory(id, { subType: addCategoryActivityType })).then((response) => {
                if (response) {
                    setCategoryName('')
                    setEditShow(-1)
                    getAllCategoriesList()
                }
            })
        }, 200)
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
