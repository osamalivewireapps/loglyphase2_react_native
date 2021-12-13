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
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import { TextInput } from 'react-native';


function CRMAddAnimalView(props) {

    console.log("props-add-animal------->", props)
    const { nextScreen } = props;

    const isTablet = DeviceInfo.isTablet();

    const [searchTxt, setSearchTxt] = useState('');
    const [filterObj, setFilterObj] = useState({ animalType: 'Active', status: 'Alive', animalId: '' })
    const [tabUpcoming, setTabUpcoming] = useState(0);//0 for upcoming or vice versa

    const initialCart = [{ cart: 0 }, { cart: 0 }, { cart: 0 }]
    const [addItems, setAddItems] = useState(initialCart);

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

                                tabUpcoming === 0 ? props.navigation.navigate('FilterAnimal', { ...props, filterList: ((e) => applyFilter(e)), customFilters: filterObj }) :
                                    props.navigation.navigate('FilterProducts', { ...props, filterList: ((e) => applyFilter(e)), customFilters: filterObj })
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

                    <FlatList
                        data={addItems}
                        renderItem={({ item, index }) => {
                            console.log("item--->", item.cart)
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
                    $100
                </AutoSizeText>

                <View style={{
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


    function renderCartItem(item, index) {

        return (
            <View style={{
                ...CRMStyles.boxcontainer,
                shadowOpacity: 0.1,
                marginTop: verticalScale(10),
                height: verticalScale(70),
                borderRadius: moderateScale(15),
                flexDirection: 'row', alignItems: 'center', marginStart: moderateScale(25),
                marginEnd: moderateScale(25),
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
                                Nagtile
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
                                Parrot
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
                                Alive
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
                                $100
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
                                let cart = item.cart + 1;
                                addItems[index].cart = cart
                                setAddItems([...addItems])
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
                            {item.cart}
                        </AutoSizeText>
                        <TouchableOpacity
                            onPress={() => {
                                let cart = item.cart - 1 >= 0 ? item.cart - 1 : 0
                                addItems[index].cart = cart
                                setAddItems([...addItems])
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
                    </View>
                </View>
            </View>
        )
    }

    function getTotalCarts() {
        let tmp = 0;
        addItems.forEach((value) => {
            tmp += value.cart
        })
        return tmp
    }
    function applyFilter(e) {

        // if (e.animalType === this.state.filterData.animalType) {
        //     this.filterAnimals(e)
        // } else {
        //     this.getAnimalList(e, true)
        // }
    }

}

export default CRMAddAnimalView;
