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
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import { TextInput } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Util from '../../../utils';

function CRMAddAnimalView(props) {

    const { nextScreen, getAnimalList, getTeamList, getFinalTeamList, getFinalAnimalList, cartAnimals, cartProducts } = props;

    const isTablet = DeviceInfo.isTablet();

    const [searchTxt, setSearchTxt] = useState('');
    const [filterObj, setFilterObj] = useState({ animalType: 'Active', status: 'Alive', animalId: '' })
    const [filterProductObj, setFilterProductObj] = useState({
        animalType: 'Active',
        productId: '',
        subProdId: ""
    });
    const [tabUpcoming, setTabUpcoming] = useState(0);

    const [addItems, setAddItems] = useState([]);
    const [addProductItems, setAddProductItems] = useState([]);
    const [listAnimals, setListAnimals] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false);
    const [orgAnimalList, setOrgAnimalList] = useState([]);
    const [orgProductList, setOrgProductList] = useState([]);

    const sheetRef = useRef(null);

    useEffect(() => {
        if (tabUpcoming === 0) {
            manipulateAnimaList()
        }

        else if (tabUpcoming === 1) {
            manipulateProductList()
        }
        setSearchTxt('')
    }, [tabUpcoming])

    useEffect(() => {
        if (tabUpcoming === 0) {
            setListAnimals(searchItems(orgAnimalList))
        } else {
            setListProducts(searchItems(orgProductList))
        }

    }, [searchTxt]);

    function searchItems(list) {
        if (list.length > 0) {
            return (list.filter((e) => {
                return (e.data.name.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    e.categoryName.toLowerCase().includes(searchTxt.toLowerCase())) ||
                    e._id.includes(searchTxt)
            }))
        }
    }
    return (
        <View style={{ flex: 1 }}>

            <ImageBackground style={{ flex: 0.9, backgroundColor: '#161D6E' }}>

                <View style={{ height: '100%', backgroundColor: 'white', borderBottomRightRadius: moderateScale(30) }}>
                    <View style={{ padding: moderateScale(25), paddingBottom: 0, flexDirection: 'row', width: '100%' }}>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                marginEnd: moderateScale(20),
                                flex: 1, flexDirection: 'row', alignItems: 'center',
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
                                        height: verticalScale(35),
                                        ...CRMStyles.generalTxt,
                                        color: '#777777',
                                        fontSize: moderateScale(14),
                                    }} />
                                <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                            </View>

                            <TouchableOpacity onPress={() => {
                                console.log('touch-->', filterObj);
                                tabUpcoming === 0 ? props.navigation.navigate('FilterAnimal', { ...props, filterList: ((e) => applyFilter(e)), customFilters: filterObj }) :
                                    props.navigation.navigate('FilterProducts', { ...props, filterList: ((e) => applyFilter(e)), customFilters: filterProductObj })
                            }}>
                                <Image source={Icons.icon_filter_list} resizeMode='contain' style={{ height: moderateScale(20), width: moderateScale(20) }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: moderateScale(25)

                    }}>

                        <TouchableOpacity
                            onPress={() =>
                                setTabUpcoming(0)}
                            style={{
                                flex: 0.5,
                                borderColor: Colors.appBgColor,
                                borderWidth: 1,
                                padding: moderateScale(5),
                                borderRadius: moderateScale(20),
                                paddingTop: verticalScale(6),
                                paddingBottom: verticalScale(6),
                                backgroundColor: tabUpcoming === 0 ? Colors.appBgColor : 'white',

                            }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.base,
                                    color: tabUpcoming === 0 ? 'white' : Colors.appBgColor,

                                }}
                            >
                                Animals
                            </AutoSizeText>

                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => setTabUpcoming(1)} style={{
                                flex: 0.5,
                                marginStart: moderateScale(10),
                                padding: moderateScale(5),
                                borderRadius: moderateScale(20),
                                paddingTop: verticalScale(6),
                                paddingBottom: verticalScale(6),
                                borderColor: Colors.appBgColor,
                                borderWidth: 1,
                                backgroundColor: tabUpcoming === 1 ? Colors.appBgColor : 'white',

                            }}>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    textAlign: 'center',
                                    fontFamily: Fonts.type.base,
                                    color: tabUpcoming === 1 ? 'white' : Colors.appBgColor,

                                }}
                            >
                                Products
                            </AutoSizeText>

                        </TouchableOpacity>
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
                        {showBottomSheet(true)}
                    </RBSheet>

                    <FlatList
                        data={tabUpcoming === 0 ? listAnimals : tabUpcoming === 1 ? listProducts : []}
                        contentContainerStyle={{
                            paddingStart: moderateScale(25),
                            paddingEnd: moderateScale(25),
                        }}
                        renderItem={({ item, index }) => {
                            return renderCartItem(item, index);
                        }}
                    />


                </View>
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
                    ${getTotalCarts(true)}
                </AutoSizeText>

                <TouchableOpacity
                    onPress={() => setCloseBottonSheet(true)}
                    style={{
                        flexDirection: 'row',
                        paddingEnd: moderateScale(15),
                        flex: 0.8,
                        justifyContent: 'center',
                    }}>

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
                                color: Colors.appBgColor,

                            }}
                        >
                            {getTotalCarts()}
                        </AutoSizeText>
                    </View>
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
                        Items Added
                    </AutoSizeText>



                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flex: 0.2,
                    }}
                    onPress={(e) => {
                        if (addItems.filter((value => value.cart)).length === 0 && addProductItems.filter((value => value.cart)).length === 0) {
                            Util.topAlert('Select atleast any item for proceeding')
                            return
                        }
                        cartAnimals(addItems);
                        cartProducts(addProductItems)
                        nextScreen(e)
                    }}>
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




    function renderCartItem(item, index) {

        return (
            <View style={{
                ...CRMStyles.boxcontainer,
                shadowOpacity: 0.1,
                marginTop: verticalScale(10),
                height: verticalScale(70),
                borderRadius: moderateScale(15),
                flexDirection: 'row', alignItems: 'center',

            }}>
                <Image
                    source={Icons.icon_paw}
                    resizeMode='cover'
                    style={{
                        width: moderateScale(75),
                        height: '100%',
                        borderRadius: moderateScale(15)
                        , marginEnd: moderateScale(15)
                    }}
                />

                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingEnd: moderateScale(15),
                            alignItems: 'center'
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
                                {item.data.name}
                            </AutoSizeText>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(12)}
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: '#A1A1A1',
                                    flex: 1,
                                    marginStart: moderateScale(5)

                                }}
                            >
                                {item.categoryName}
                            </AutoSizeText>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingEnd: moderateScale(15),
                            width: '100%',
                            alignItems: 'center',
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
                                {item._id.substring(0, 8)}
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.bold,
                                    color: Colors.appBgColor,
                                    marginStart: moderateScale(10)

                                }}
                            >
                                ${item.data.price}
                            </AutoSizeText>
                        </View>

                    </View>


                    <View style={{
                        flexDirection: 'row',
                        paddingEnd: moderateScale(15),
                        width: '100%',
                        marginTop: verticalScale(5),
                        alignItems: 'center',
                        height: verticalScale(20),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                let cart = 0;
                                if (item.cart)
                                    cart = item.cart - 1 >= 0 ? item.cart - 1 : 0
                                else {
                                    cart = 0 - 1 >= 0 ? 0 - 1 : 0
                                }
                                { addToCart(index, cart, item) }
                            }}
                            style={{
                                ...CRMStyles.boxcontainer,
                                shadowOpacity: 0.2,
                                borderRadius: moderateScale(50), height: verticalScale(17), width: moderateScale(20), justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: Colors.appBgColor,
                                    fontSize: moderateScale(18)

                                }}
                            >
                                -
                            </Text>
                        </TouchableOpacity>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(14)}
                            fontSize={moderateScale(16)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: Colors.appBgColor,
                                marginStart: moderateScale(15),
                                marginEnd: moderateScale(15)


                            }}
                        >
                            {item.cart ? item.cart : 0}
                        </AutoSizeText>

                        <TouchableOpacity

                            onPress={() => {
                                let cart = 0;
                                if (item.cart)
                                    cart = item.cart + 1
                                else {
                                    cart = 1
                                }
                                { addToCart(index, cart, item) }
                            }}
                            style={{
                                ...CRMStyles.boxcontainer,
                                shadowOpacity: 0.2,
                                borderRadius: moderateScale(50), height: verticalScale(17), width: moderateScale(20), justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Text
                                style={{
                                    fontFamily: Fonts.type.base,
                                    color: Colors.appBgColor,
                                    fontSize: moderateScale(18)

                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }

    function addToCart(index, cart, item) {
        if (tabUpcoming === 0) {
            item.cart = cart
            let tmpIndex = addItems.findIndex((value) => value._id === item._id);
            addItems[tmpIndex] = item;
            setAddItems([...addItems])
        } else {
            item.cart = cart;
            let tmpIndex = addProductItems.findIndex((value) => value._id === item._id);
            addProductItems[tmpIndex] = item;
            setAddProductItems([...addProductItems])
        }
    }

    function getTotalCarts(isPrice = false) {
        let tmp = 0;
        let price = 0;
        let tmpList = addItems.concat(addProductItems);
        tmpList.forEach((value) => {
            tmp = tmp + (value.cart ? value.cart : 0)
            price = price + (value.cart ? value.cart * value.data.price : 0)
        })


        if (!isPrice)
            return tmp
        else {
            return price;
        }
    }
    function applyFilter(e) {

        console.log('filter object--->', e)
        if (tabUpcoming === 0) {
            if (e.animalType === filterObj.animalType) {
                filterAnimals(e, orgAnimalList)
            } else {
                getAnimalsListByType(e)
            }
            setFilterObj(e)

        } else {
            filterProducts(e)
            setFilterProductObj(e)
        }
    }

    function filterAnimals(e, list) {

        let tmp = list
            .filter((value, index) => {
                return ((value.status.toLowerCase() === e.status.toLowerCase()) && (e.animalId ? value.categoryId._id === e.animalId : true))
            });

        setListAnimals(tmp);
    }

    function filterProducts(e) {

        console.log("props--->", e);

        let tmp = orgProductList
            .filter((value, index) => {
                if (e.animalType === 'Active' ? !value.isArchived : value.isArchived) {
                    return ((e.productId ? value.categoryId === e.productId : true) && (e.subProdId ? value.data.subCategory.includes(e.subProdId) : true))
                }
            });

        console.log("archieved--->", tmp)
        setListProducts(tmp);
    }


    //////////////////// BOTTOM SHEET /////////////
    function showBottomSheet(isAddBreeder) {

        let tmp = [];
        tmp = addItems.concat(addProductItems).filter(value => value.cart)
        return (
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
                        ...CRMStyles.generalTxt, color: '#464646',
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: moderateScale(18),
                        fontFamily: Fonts.type.medium,
                        marginTop: verticalScale(10)
                    }}>Cart Items</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />


                </View>

                {/* <View style={{
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
                            ...CRMStyles.generalTxt,
                            color: '#777777',
                            fontSize: moderateScale(14),
                        }} />
                    <Image source={Icons.icon_feather_search} resizeMode='contain' style={{ height: moderateScale(15), width: moderateScale(15), margin: moderateScale(10), marginEnd: moderateScale(15) }} />

                </View> */}

                <FlatList
                    data={tmp}
                    contentContainerStyle={{
                        paddingStart: moderateScale(20),
                        paddingEnd: moderateScale(20),
                        marginBottom: verticalScale(25),
                    }}
                    renderItem={({ item, index }) => {
                        return renderCartItem(item, index);
                    }}
                />

                <TouchableOpacity style={{
                    ...CRMStyles.styleButtons, flex: 0,
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
                        ...CRMStyles.generalTxt,
                        fontFamily: Fonts.type.base,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(18), textAlign: 'center',
                        padding: moderateScale(10),
                        paddingTop: verticalScale(5),
                        paddingBottom: verticalScale(5),

                    }}>Add</Text>
                </TouchableOpacity>



            </View>
        )
    }



    function manipulateAnimaList() {
        if (!listAnimals || listAnimals.length === 0) {
            getAnimalsListByType(filterObj)
        } else if (listAnimals && listAnimals.length > 0) {
            //setCloseBottonSheet(true)
            //setAddItems(listAnimals);

        }
    }

    function manipulateProductList() {
        if (!listProducts || listProducts.length === 0) {
            getTeamList().then((response) => {
                console.log('product list--->', response)
                setOrgProductList(response)
                setListProducts(response);
                setAddProductItems(response);
            })
        } else if (listProducts && listProducts.length > 0) {
            //setAddProductItems(listProducts);
        }
    }

    function getAnimalsListByType(e) {
        console.log('filter type--->', e)
        getAnimalList(e.animalType).then((response) => {
            console.log('animals list--->', response)
            setOrgAnimalList(response)
            setAddItems(response);
            filterAnimals(e, response)
        })
    }

}

export default CRMAddAnimalView;
