/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-gesture-handler';
import Util from '../../../utils';
import moment from 'moment';
import AppLoader from '../../../components/AppLoader';


function ProductRegView(props) {


    const { isLoad, productCategories, subCategory, getSubProduct } = props;

    const [isBottonSheetVisible, setCloseBottonSheet] = useState(false)
    const [isSubProductSheet, setSubProductSheet] = useState(false)

    const [petIndex, setPetIndex] = useState(-1);

    const [validateName, setValidateName] = useState(true);
    const [valueName, setValueName] = useState('')

    const [validateBulkQuantity, setValidateBulkQuantity] = useState(true);
    const [valueBulk, setValueBulk] = useState('')

    const [validateUnitQuantity, setValidateUnitQuantity] = useState(true);
    const [valueUnit, setValueUnit] = useState('')

    const [validatePrice, setValidatePrice] = useState(true);
    const [valuePrice, setValuePrice] = useState('')

    const [valueDesc, setDesc] = useState('');
    const [validateDesc, setValidateDesc] = useState(true);
    const [serviceTypeIndex, setServiceTypeIndex] = useState(0);
    const [listSubProduct, setListSubProduct] = useState([]);

    const sheetRef = useRef(null);
    const sheetBreedRef = useRef(null);

    const isTablet = DeviceInfo.isTablet();


    console.log("productCategories1-->", productCategories.length);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{
                backgroundColor: '#C90F22',
                borderBottomLeftRadius: moderateScale(30),
                borderBottomRightRadius: moderateScale(30),
                height: verticalScale(160)
            }}>
                <View style={{ padding: moderateScale(25), flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { props.navigation.pop() }}>
                        <Image source={Icons.icon_whitebg_back} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                            <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                        </TouchableOpacity>
                        <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'flex-end',
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(25)
                }}>
                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(28)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: 'white',
                            flex: 0.8,
                            paddingStart: moderateScale(25),
                            fontFamily: Fonts.type.bold
                        }}>
                        Register Products

                    </AutoSizeText>
                    <Image source={Icons.icon_header_regproduct} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ flex: 1 }}>



                    <View style={{
                        flex: 1,
                        padding: moderateScale(25),
                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                setCloseBottonSheet(true);
                            }}
                            style={{
                                ...styles.boxcontainer,
                                flexDirection: 'row', padding: 0, alignItems: 'center',
                                paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                            }}>


                            <View style={{
                                flexDirection: 'row', padding: 0,
                                alignItems: 'center',
                                flex: 1
                            }}>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.base,
                                        width: '97%'
                                    }}>
                                    {petIndex > -1 ? productCategories[petIndex].categoryId.name : 'Select Product Category'}

                                </AutoSizeText>
                                <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                            </View>
                        </TouchableOpacity>

                        <RBSheet
                            ref={sheetRef}
                            height={Dimensions.get('screen').height - moderateScale(130)}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    borderRadius: moderateScale(30)
                                }
                            }}
                            onClose={() => setCloseBottonSheet(false)}
                        >
                            {showPetCategory()}

                        </RBSheet>
                        {isBottonSheetVisible ? sheetRef.current.open() : null}




                        {petIndex > -1 ?
                            <View>
                                <View style={{
                                    backgroundColor: '#F4F4F4', alignSelf: 'center',
                                    height: moderateScale(90),
                                    width: moderateScale(90),
                                    borderRadius: moderateScale(100),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: verticalScale(20),
                                    marginBottom: verticalScale(10)
                                }}>

                                    <Image source={Icons.icon_awesome_plus} resizeMode='contain'
                                        style={{
                                            height: verticalScale(10),
                                            width: verticalScale(10)
                                        }} />

                                </View>

                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(14)}
                                    fontSize={moderateScale(16)}
                                    mode={ResizeTextMode.overflow_replacement}
                                    style={{
                                        color: '#464646',
                                        fontFamily: Fonts.type.medium,
                                        width: '100%',
                                        textAlign: 'center',
                                        marginBottom: verticalScale(10)
                                    }}>
                                    Add Product Photo

                                </AutoSizeText>

                                <View style={{
                                    ...styles.boxcontainer,
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateName ? 'transparent' : 'darkred',
                                    shadowOpacity: validateName ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Enter Name" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        textAlign: 'left',
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        numberOfLines={1}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        onChangeText={(e) => {
                                            setValidateName(Util.isLengthGreater(e));
                                            setValueName(e)
                                        }
                                        }
                                        value={valueName} />
                                </View>

                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateBulkQuantity ? 'transparent' : 'darkred',
                                    shadowOpacity: validateBulkQuantity ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Enter Bulk Quantity" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        textAlign: 'left',
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        numberOfLines={1}
                                        autoCapitalize='none'
                                        keyboardType="number-pad"
                                        onChangeText={(e) => {
                                            setValidateBulkQuantity(Util.isGraterThanZero(e));
                                            setValueBulk(e)
                                        }
                                        }
                                        value={valueBulk} />
                                </View>

                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateUnitQuantity ? 'transparent' : 'darkred',
                                    shadowOpacity: validateUnitQuantity ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Enter Unit Quantity" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        textAlign: 'left',
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        numberOfLines={1}
                                        autoCapitalize='none'
                                        keyboardType="number-pad"
                                        onChangeText={(e) => {
                                            setValidateUnitQuantity(Util.isGraterThanZero(e));
                                            setValueUnit(e)
                                        }
                                        }
                                        value={valueUnit} />
                                </View>

                                <View style={{
                                    ...styles.boxcontainer,
                                    marginTop: verticalScale(10),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validatePrice ? 'transparent' : 'darkred',
                                    shadowOpacity: validatePrice ? 0.25 : 1,
                                    padding: moderateScale(15),
                                }}>


                                    <TextInput placeholder="Enter Price" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        textAlign: 'left',
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        numberOfLines={1}
                                        autoCapitalize='none'
                                        keyboardType="number-pad"
                                        onChangeText={(e) => {
                                            setValidatePrice(Util.isGraterThanZero(e));
                                            setValuePrice(e)
                                        }
                                        }
                                        value={valuePrice} />
                                </View>



                                <TouchableOpacity
                                    style={{
                                        ...styles.boxcontainer,
                                        marginTop:verticalScale(10),
                                        flexDirection: 'row', padding: 0, alignItems: 'center',
                                        paddingStart: moderateScale(15), paddingEnd: moderateScale(15),
                                    }} onPress={() => {
                                        getSubProduct(productCategories[petIndex].categoryId._id)
                                        setSubProductSheet(true)
                                    }}>
                                    <View style={{
                                        flexDirection: 'row', padding: 0,
                                        alignItems: 'center',
                                        flex: 1
                                    }}>

                                        <AutoSizeText
                                            numberOfLines={2}
                                            minFontSize={moderateScale(14)}
                                            fontSize={moderateScale(16)}
                                            mode={ResizeTextMode.overflow_replacement}
                                            style={{
                                                color: '#464646',
                                                fontFamily: Fonts.type.base,
                                                width: '97%'
                                            }}>
                                            {petIndex > -1 ? (listSubProduct.length > 0 ? listSubProduct[0].name :'Select SubCategory') : 'Select SubCategory'}

                                        </AutoSizeText>
                                        <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                                    </View>



                                </TouchableOpacity>
                                <RBSheet
                                    ref={sheetBreedRef}
                                    height={Dimensions.get('screen').height - moderateScale(130)}
                                    openDuration={250}
                                    customStyles={{
                                        container: {
                                            borderRadius: moderateScale(30)
                                        }
                                    }}
                                    onClose={() => setSubProductSheet(false)}
                                >
                                    {showBreed()}
                                </RBSheet>

                                {isSubProductSheet ? sheetBreedRef.current.open() : null}





                                <View style={{
                                    ...styles.boxcontainer,
                                    height: verticalScale(100),
                                    flexDirection: 'row', alignItems: 'center',
                                    shadowColor: validateDesc ? 'transparent' : 'darkred',
                                    shadowOpacity: validateDesc ? 0.25 : 1,
                                    marginTop: verticalScale(25),
                                }}>


                                    <TextInput placeholder="Enter Notes" style={{
                                        ...styles.styleTextInput,
                                        flex: 1,
                                        paddingTop: verticalScale(15),
                                        padding: moderateScale(15),
                                        textAlign: 'left',
                                        height: verticalScale(100),
                                    }}
                                        underlineColorAndroid='transparent'
                                        require={true}
                                        multiline={true}
                                        numberOfLines={50}
                                        maxLength={75}
                                        autoCapitalize='none'
                                        keyboardType="default"
                                        onChangeText={(e) => {
                                            setValidateDesc(Util.isLengthGreater(e))
                                            setDesc(e)
                                        }
                                        }
                                        value={valueDesc} />
                                </View>


                            </View> : null}
                    </View>

                    {petIndex > -1 ?
                        <View>
                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                margin: verticalScale(25),
                                backgroundColor: 'white',
                                borderWidth: moderateScale(1),
                                marginBottom: verticalScale(0)
                            }} onPress={() => { }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),
                                    color: Colors.appBgColor
                                }}>Add Photos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                ...styles.styleButtons, flex: 0,
                                margin: verticalScale(25),
                                marginTop: verticalScale(15)
                            }} onPress={() => { }}>
                                <Text style={{
                                    ...styles.generalTxt,
                                    fontSize: moderateScale(20), textAlign: 'center', padding: moderateScale(10),
                                    paddingTop: verticalScale(12), paddingBottom: verticalScale(12),

                                }}>REGISTER</Text>
                            </TouchableOpacity>
                        </View> : null}
                </View>
            </ScrollView>

            <AppLoader loader={{ isLoading: isLoad }} />
        </View>

    );


    function showPetCategory() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Pet Category</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={productCategories}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setPetIndex(index);
                                        setListSubProduct([]);
                                        sheetRef.current.close();
                                        setCloseBottonSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={index === petIndex ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>{item.categoryId.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function showBreed() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View>
                    <View style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: verticalScale(50)
                    }}>

                        <Text style={{ ...styles.generalTxt, color: '#464646', fontSize: moderateScale(18), fontFamily: Fonts.type.medium, marginTop: verticalScale(10) }}>Select Breed</Text>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#464646', marginTop: verticalScale(10) }} />
                    </View>
                    <FlatList
                        data={subCategory}
                        contentContainerStyle={{
                            padding: moderateScale(30)
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        selectBreed(item)
                                        sheetBreedRef.current.close();
                                        setSubProductSheet(false);
                                    }}
                                    style={{ flexDirection: 'row', marginTop: verticalScale(10) }}>
                                    <View
                                        style={{ width: moderateScale(25), height: verticalScale(25), alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Image
                                            source={isSubProductSelect(item) ? Icons.icon_awesome_blue_check_circle : Icons.icon_black_hollow}
                                            resizeMode='contain' style={{ height: verticalScale(15), width: moderateScale(15), marginTop: verticalScale(-10) }}
                                        />
                                    </View>
                                    <Text style={{ ...styles.generalTxt, color: '#464646', marginStart: moderateScale(10) }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item) => item.id}

                    />
                </View>
            </ScrollView>
        );
    }

    function selectBreed(e) {
        let tmp = listSubProduct;
        let itemService = tmp.find(item => item._id === e._id);
        if (itemService) {
            tmp.splice(tmp.indexOf(itemService), 1);
        } else {
            tmp = [];
            tmp.push(e);
        }
        setListSubProduct([...tmp]);
    }

    function isSubProductSelect(item) {
        let itemService = listSubProduct.find(e => e._id === item._id);
        if (itemService) {
            return true;
        } else {
            return false;
        }
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
        width: '100%',

    },
    styleButtons: {
        backgroundColor: Colors.appBgColor,
        borderRadius: moderateScale(30)
    }
});

export default ProductRegView;