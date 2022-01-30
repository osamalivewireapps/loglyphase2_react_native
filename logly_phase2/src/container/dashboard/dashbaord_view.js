/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import DeviceInfo from 'react-native-device-info';
import ModalDropdown from 'react-native-modal-dropdown';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { TYPES_OF_SERVICES } from '../../constants';
import { Colors, Fonts, Icons, Images } from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker';


function DashBoardView(props) {

    const isTablet = DeviceInfo.isTablet();

    const { animalData, productData, totalAnimals, totalProducts, getInventory } = props;

    const arrInvType = [
        'Animal Inventory',
        'Product Inventory',
    ]


    const ANIMAL_STATES = [{
        icon: Icons.icon_alive, category: 'Alive', value: '0', bg: '#FFE8D1', txtColor: '#E17B14'
    },
    { icon: Icons.icon_sick, category: 'Sick', value: '3', bg: '#DBE8FC', txtColor: '#0947AF' },
    { icon: Icons.icon_dead, category: 'Dead', value: '2', bg: '#FED8DC', txtColor: '#BF323F' },
    { icon: Icons.icon_preg, category: 'Pregnant', value: '4', bg: '#FFDCF8', txtColor: '#BC149A' }]


    const PRODUCT_STATES = [{
        icon: Icons.icon_good_condition, category: 'Good Condition', value: '29', bg: '#FFE8D1', txtColor: '#E17B14'
    },
    { icon: Icons.icon_expired, category: 'Expired', value: '3', bg: '#DBE8FC', txtColor: '#0947AF' },
    { icon: Icons.icon_damaged, category: 'Damaged', value: '2', bg: '#FED8DC', txtColor: '#BF323F' },
    { icon: Icons.icon_sold, category: 'Sold', value: '4', bg: '#FFDCF8', txtColor: '#BC149A' }]

    const [invType, setInvType] = useState(arrInvType[0])
    const [catType, setCatType] = useState('')

    const fListRef = useRef(null);
    const fListMain = useRef(null);

    const [items, setItems] = useState([]);

    const [items1, setItems1] = useState([
        { label: arrInvType[0], value: arrInvType[0] },
        { label: arrInvType[1], value: arrInvType[1] },
    ]);

    const [countProduct, setCountProduct] = useState(0);

    useEffect(() => {
        setAnimalCategories()
    }, [animalData]);

    useEffect(() => {
        setProductCategories()
    }, [productData]);

    function setAnimalCategories() {
        if (animalData && animalData.length > 0) {
            let tmp = getCatsData(animalData);
            setItems([...tmp]);
            setCatType(tmp[0].label)

        }
    }

    function setProductCategories() {
        if (productData && productData.length > 0) {
            let tmp = getCatsData(productData);
            setItems([...tmp]);
            setCatType(tmp[0].label)
        }
    }

    function getCatsData(arrCat) {
        let tmp = [];
        tmp.push({ label: 'All Categories', value: 'All Categories' })
        arrCat.forEach((element, index) => {
            tmp.push({ label: element.name, value: element._id })
        });

        return tmp;
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <View style={{ padding: moderateScale(25), flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { props.navigation.toggleDrawer() }}>
                    <Image source={Icons.icon_burger_menu} resizeMode='contain' style={{ height: moderateScale(25), width: moderateScale(25) }} />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <TouchableOpacity onPress={() => props.navigation.navigate('SearchItem')} style={{ height: moderateScale(45), width: moderateScale(45) }}>
                        <Image source={Icons.icon_search_home} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                    </TouchableOpacity>
                    <Image source={Icons.icon_notification} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                    <Image source={Icons.icon_qrcode} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ padding: moderateScale(25), paddingTop: 0 }}>

                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        fontSize: moderateScale(30),
                    }}>DashBoard</Text>

                    <View style={{
                        ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        marginTop: verticalScale(30),
                        zIndex: 2
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
                            dropDownStyle={{ width: Dimensions.get('screen').width - moderateScale(50) }}
                            style={{
                                width: Dimensions.get('screen').width - moderateScale(70),
                                height: verticalScale(40),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                justifyContent: 'center', alignItems: 'center',
                                paddingStart: moderateScale(15),

                            }}
                            placeholder={arrInvType[0]}
                            items={items1}
                            onChangeItem={(item) => {
                                setCatType('All Categories')

                                if (animalData.length === 0 || productData.length === 0)
                                    getInventory(item.value)
                                else {
                                    if (item.value.toLowerCase().includes('animal'))
                                        setAnimalCategories()
                                    else
                                        setProductCategories()
                                }

                                setInvType(item.value)

                            }}
                        />

                        <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                    </View>

                    <View style={{
                        ...styles.boxcontainer, flexDirection: 'row', padding: 0,
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5',
                        marginTop: verticalScale(20),
                        zIndex: 1
                    }}>

                        <DropDownPicker
                            showArrow={false}
                            itemStyle={{ width: '100%', justifyContent: 'flex-start' }}
                            dropDownStyle={{ width: Dimensions.get('screen').width - moderateScale(50) }}
                            zIndex={1000}
                            style={{
                                width: Dimensions.get('screen').width - moderateScale(70),
                                height: verticalScale(40),
                                backgroundColor: 'transparent',
                                borderColor: 'transparent',
                                justifyContent: 'center', alignItems: 'center',
                                paddingStart: moderateScale(15),

                            }}
                            defaultNull={false}
                            placeholder={'All Categories'}
                            items={items}
                            onChangeItem={(item) => {
                                let countProduct = 0;
                                if (invType === arrInvType[0]) {
                                    animalData.filter((value, index) => {
                                        if (value.name === item.label) {
                                            value.items.forEach(innerValue => {
                                                countProduct = countProduct + innerValue.total;
                                            })
                                        }
                                    })
                                } else
                                    productData.filter((value, index) => {
                                        if (value.name === item.label) {
                                            value.items.forEach(innerValue=>{
                                                countProduct = countProduct + innerValue.total;
                                            })
                                        }
                                    })

                                setCountProduct(countProduct)
                                setCatType(item.label)
                            }}
                        />

                        <Image source={Icons.icon_ios_arrow_down} resizeMode='contain' style={{ height: verticalScale(5), width: moderateScale(8) }} />

                    </View>

                    {getTotalInventory()}
                    {items && items.length > 0 ? catType === 'All Categories' ? getAnimalStatus() : renderDataByCategory() : null}

                </View>
            </ScrollView>


        </View>
    );

    function getTotalInventory(totalCount) {
        return (

            <View style={{
                ...styles.boxcontainer,
                height: verticalScale(85),
                backgroundColor: '#E0D6FF',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: moderateScale(20),
                alignItems: 'center',
                marginTop: verticalScale(25),
                borderRadius: moderateScale(10),
                zIndex: 0
            }}>

                <Text style={{
                    fontFamily: Fonts.type.bold,
                    fontSize: moderateScale(22),
                    color: '#503A9F',
                    flex: 0.6
                }}>
                    {catType === 'All Categories' ? (invType === arrInvType[0] ? 'Total Animals' : 'Total Products') : catType}
                </Text>
                <Text style={{
                    fontFamily: Fonts.type.bold,
                    fontSize: moderateScale(28),
                    color: '#503A9F',
                    flex: 0.4,
                    textAlign: 'right'
                }}>
                    {catType === 'All Categories' ? invType === arrInvType[0] ? totalAnimals.totalAnimals : totalProducts.totalProducts : countProduct}
                </Text>

            </View>

        )
    }


    function getAnimalStatus() {


        return (
            <FlatList
                key={'#'}
                ref={fListMain}
                numColumns={2}
                data={invType === arrInvType[0] ? ANIMAL_STATES : PRODUCT_STATES}
                style={{
                    marginTop: verticalScale(20),
                }}
                onScrollToIndexFailed={(error) => {
                    const offset = error.averageItemLength * error.index;
                    fListMain.current.scrollToOffset({ offset });
                    setTimeout(() => fListMain.current.scrollToIndex({ index: error.index }), 3000);
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            backgroundColor: item.bg,
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(10),
                            height: isTablet ? verticalScale(135) : verticalScale(105),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginEnd: (index % 2 === 0) ? verticalScale(10) : 0,
                            flex: 1,

                        }} onPress={() => {

                        }}>

                            <View style={{
                                flex: 0.5,
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                padding: moderateScale(10)
                            }}>
                                <AutoSizeText
                                    numberOfLines={2}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(18)}
                                    mode={ResizeTextMode.max_lines}
                                    style={{
                                        color: item.txtColor,
                                        flex: 0.7,
                                        fontFamily: Fonts.type.medium,
                                        marginBottom: verticalScale(10)
                                    }}>{item.category}
                                </AutoSizeText>

                                <Image source={item.icon} resizeMode='contain'
                                    style={{
                                        flex: 0.3,
                                        height: verticalScale(20), width: moderateScale(20)
                                    }} />

                            </View>
                            <AutoSizeText
                                numberOfLines={2}
                                minFontSize={moderateScale(10)}
                                fontSize={moderateScale(32)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    fontFamily: Fonts.type.bold,
                                    color: item.txtColor,
                                    textAlign: 'center',
                                    width: '100%',
                                    paddingStart: moderateScale(4),
                                    paddingEnd: moderateScale(4),

                                }}>{invType.includes(arrInvType[0]) ? getStatsByType(true, index) : getStatsByType(false, index)}
                            </AutoSizeText>
                        </View>

                    );
                }}

            />
        )
    }

    function renderDataByCategory() {
        if (invType.includes(arrInvType[0])) {
            let tmp = []
            tmp = animalData.filter((value, index) =>
                value.name === catType)

            return getSpecificAnimalDetail(tmp.length > 0 ? tmp[0].items : [])
        }
        else {
            let tmp = [];
            tmp = productData.filter((item, index) => {
                if (item.name === catType) {
                    return item;
                }
            })

            return getSpecificDetailProduct(tmp[0].items)
        }
    }

    function getSpecificAnimalDetail(animalCategories) {
        return (
            <FlatList
                key={'_'}
                nestedScrollEnabled={false}
                ref={fListRef}
                onScrollToIndexFailed={(error) => {
                    const offset = error.averageItemLength * error.index;
                    fListRef.current.scrollToOffset({ offset });
                    setTimeout(() => fListRef.current.scrollToIndex({ index: error.index }), 3000);
                }}
                data={animalCategories}
                style={{
                    marginTop: verticalScale(20),
                }}
                renderItem={({ item, index }) => {

                    return (
                        <View style={{
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(10),
                            height: verticalScale(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                            padding: moderateScale(10)

                        }} onPress={() => {

                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#464646',
                                    flex: 0.4,
                                    fontFamily: Fonts.type.medium,
                                }}>{item.name}
                            </AutoSizeText>

                            <View style={{ flex: 0.6, flexDirection: 'row' }}>

                                <View style={{
                                    flex: 2
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.alive}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>Alive
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flex: 2
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.died}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>Dead
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flex: 2
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.sold}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>Sold
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flex: 3.5
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.pregnant}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>Pregnant
                                    </AutoSizeText>

                                </View>

                            </View>



                        </View>

                    );
                }}

            />
        )
    }

    function getSpecificDetailProduct(productCategories) {
        return (
            <FlatList
                key={'_'}
                nestedScrollEnabled={false}
                ref={fListRef}
                onScrollToIndexFailed={(error) => {
                    const offset = error.averageItemLength * error.index;
                    fListRef.current.scrollToOffset({ offset });
                    setTimeout(() => fListRef.current.scrollToIndex({ index: error.index }), 3000);
                }}
                data={productCategories}
                style={{
                    marginTop: verticalScale(20),
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            backgroundColor: '#F5F5F5',
                            borderRadius: moderateScale(10),
                            marginTop: verticalScale(10),
                            height: verticalScale(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                            padding: moderateScale(10)

                        }} onPress={() => {

                        }}>

                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(16)}
                                mode={ResizeTextMode.max_lines}
                                style={{
                                    color: '#464646',
                                    flex: 0.4,
                                    fontFamily: Fonts.type.medium,
                                }}>{item.name}
                            </AutoSizeText>

                            <View style={{ flex: 0.6, flexDirection: 'row' }}>

                                <View style={{
                                    flex: 2
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.instock}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>InStock
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flex: 2
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.expired}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>Expired
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flex: 1.4
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.sold}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>Sold
                                    </AutoSizeText>

                                </View>
                                <View style={{
                                    flex: 2.5
                                }}>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(14)}
                                        fontSize={moderateScale(16)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.bold,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>{item.damaged}
                                    </AutoSizeText>
                                    <AutoSizeText
                                        numberOfLines={1}
                                        minFontSize={moderateScale(12)}
                                        fontSize={moderateScale(14)}
                                        mode={ResizeTextMode.max_lines}
                                        style={{
                                            fontFamily: Fonts.type.base,
                                            color: '#464646',
                                            textAlign: 'center',
                                            width: '100%',
                                            paddingStart: moderateScale(4),
                                            paddingEnd: moderateScale(4),

                                        }}>damaged
                                    </AutoSizeText>

                                </View>

                            </View>



                        </View>

                    );
                }}


            />

        )

    }


    function getStatsByType(isAnimal, index) {
        if (index === 0)
            return isAnimal ? totalAnimals.alive : totalProducts.instock
        else if (index === 1)
            return isAnimal ? totalAnimals.sick : totalProducts.expired;
        else if (index === 2)
            return isAnimal ? totalAnimals.dead : totalProducts.damaged;
        else if (index === 3)
            return isAnimal ? totalAnimals.pregnant : totalProducts.sold;
    }
}




const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "transparent",
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: moderateScale(40),
        backgroundColor: 'white',
        elevation: verticalScale(5),
        borderRadius: moderateScale(5),
        width: '100%'
    },
    generalTxt: {
        color: '#464646',
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

export default DashBoardView;