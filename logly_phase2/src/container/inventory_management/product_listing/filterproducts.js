/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

import ModalDropdown from 'react-native-modal-dropdown';
import { getFormCategory } from '../../../actions/AnimalModule';
import AppLoader from '../../../components/AppLoader';
import DropDownPicker from 'react-native-dropdown-picker';

function FilterProducts(props) {

    const { filterList, customFilters } = props.route.params;


    const [initialPg, setInitialPg] = useState(customFilters.animalType === 'Active' ? 0 : 1);

    const [productList, setProductList] = useState([]);

    //SUB PRODUCT
    const [subProdId, setSubProdId] = useState(null);
    const [listSubProd, setListSubProd] = useState([]);

    //PRODUCT
    const [catId, setCatId] = useState(null);
    const [isLoad, setIsLoading] = useState(false);

    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);

    const [items, setItems] = useState([]);

    const isTablet = Platform.isTV;

    useEffect(() => {

        setIsLoading(true);
        getFormCategory('type=product').then((response) => {
            setIsLoading(false);

            setProductList(response.formCategory);

            setItems(response.formCategory.map((value) => {
                if (value.categoryId._id === customFilters.productId){
                    setValue(value.categoryId.name);
                    setCatId(value.categoryId._id)
                }
                return ({ label: value.categoryId.name, value: value.categoryId._id })
            }))

        }).catch(() => {
            setIsLoading(false);
        });

    }, []);

    useEffect(() => {
        if (!catId) {
            return;
        }

        
        let productIndex =productList.findIndex((value) => {
            return catId === value.categoryId._id
        });

        setValue2('')
        
        setListSubProd(productList[productIndex].categoryId.subCategories.map((value) => {
            if (value.name === customFilters.subProdId)
                setValue2(value.name);
            return ({ label: value.name, value: value.name })
        }))
    }, [catId]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: verticalScale(30) }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                flex: 1, padding: moderateScale(30),

            }}>


                <View style={{
                    flexDirection: 'row', alignItems: 'center',

                }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop(); }}>
                        <Image source={Icons.icon_metro_cancel} resizeMode="contain" style={{ height: moderateScale(20), width: moderateScale(20) }} />
                    </TouchableOpacity>
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(20)}
                        fontSize={moderateScale(22)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            color: '#464646',
                            textAlign: 'left',
                            marginStart: moderateScale(15),
                            fontFamily: Fonts.type.medium,
                        }}>Filter
                    </AutoSizeText>
                </View>

                <View style={{
                    ...styles.boxcontainer,
                    flexDirection: 'row',
                    marginTop: verticalScale(15),
                    height: isTablet ? verticalScale(40) : verticalScale(35),
                }}>

                    <TouchableOpacity
                        style={{
                            width: '50%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: moderateScale(10),
                            backgroundColor: initialPg === 0 ? '#FFC081' : 'transparent',
                        }}
                        onPress={() => {
                            setInitialPg(0);
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            color: Colors.appBgColor,
                        }}>
                            Active
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: moderateScale(10),
                            backgroundColor: initialPg === 1 ? '#FFC081' : 'transparent',
                        }}
                        onPress={() => {
                            setInitialPg(1);
                        }}>
                        <Text style={{
                            ...styles.generalTxt,
                            fontFamily: Fonts.type.medium,
                            color: Colors.appBgColor,
                        }}>
                            Archive
                        </Text>
                    </TouchableOpacity>
                </View>



                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        color: '#464646',
                        marginTop: verticalScale(25),
                    }}>Product Category
                </AutoSizeText>

               
                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    zIndex:2,
                    height: verticalScale(35),
                    marginTop: verticalScale(10),
                }}>

                    <DropDownPicker
                        showArrow={false}
                        labelStyle={{
                            fontSize: moderateScale(14),
                            color: 'black',
                            width: '100%',

                        }}
                        itemStyle={{
                            width: '100%', justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{
                            width: Dimensions.get('screen').width - moderateScale(60)
                        }}
                        style={{
                            width: Dimensions.get('screen').width - moderateScale(85),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            justifyContent: 'center', alignItems: 'center',
                            paddingStart: moderateScale(15),

                        }}
                        items={items}
                        onChangeItem={(item) => {
                            setListSubProd([]);
                            setCatId(item.value);
                        }}
                        placeholder={value ? value : "Select an item"}
                    />

                    <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                </View>

                
                <View style={{zIndex:1}}>
                <AutoSizeText
                    numberOfLines={1}
                    minFontSize={moderateScale(12)}
                    fontSize={moderateScale(14)}
                    mode={ResizeTextMode.max_lines}
                    style={{
                        color: '#464646',
                        marginTop: verticalScale(25),
                    }}>Select Sub Category
                </AutoSizeText>

                <View style={{
                    ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    height: verticalScale(35),
                    marginTop: verticalScale(10),
                }}>

                    <DropDownPicker
                        showArrow={false}
                        labelStyle={{
                            fontSize: moderateScale(14),
                            color: 'black',
                            width: '100%',

                        }}
                        itemStyle={{
                            width: '100%', justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{
                            width: Dimensions.get('screen').width - moderateScale(60)
                        }}
                        style={{
                            width: Dimensions.get('screen').width - moderateScale(85),
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                            justifyContent: 'center', alignItems: 'center',
                            paddingStart: moderateScale(15),

                        }}
                        items={listSubProd}
                        onChangeItem={(item) => {
                            setSubProdId(item.value);
                        }}
                        placeholder={value2 ? value2 : "Select an item"}
                    />

                    <Image source={Icons.icon_ios_arrow_down} resizeMode="contain" style={{ height: verticalScale(5), width: moderateScale(8) }} />

                </View>
                </View>

            </View>
            <View style={{
                padding: moderateScale(25),
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0.4,
                    backgroundColor: 'transparent',
                }} onPress={(e) => resetFilter(e)}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: verticalScale(10),
                            fontFamily: Fonts.type.base,
                            color: '#464646',
                        }}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    ...styles.styleButtons, flex: 0.6, justifyContent: 'center',
                }} onPress={(e) => applyFilter(e)}>
                    <Text style={{
                        fontSize: moderateScale(22), textAlign: 'center',
                        ...styles.generalTxt,
                    }}>APPLY FILTER</Text>
                </TouchableOpacity>
            </View>
            <AppLoader loader={{ isLoading: isLoad }} />
        </View>);

    function resetFilter() {
        setInitialPg(0);
        filterList({
            animalType: 'Active',
            productId: '',
            subProdId: ''
        })
        props.navigation.pop()
    }

    function applyFilter() {
        filterList({
            animalType: initialPg === 0 ? 'Active' : 'Archieve',
            productId: catId,
            subProdId: subProdId
        })
        props.navigation.pop()
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

export default FilterProducts;
