/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { TextInput,FlatList, Text, View, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import { CommonActions } from '@react-navigation/routers';
import moment from 'moment';
import ImagePlaceholder from '../../../components/ImagePlaceholder';
import { RefreshControl } from 'react-native';

function ProductListingView(props) {

    const [searchTxt, setSearchTxt] = useState('');
    const [productList, setProductList] = useState([]);

    const isTablet = DeviceInfo.isTablet();

    const { listProduct, applyFilter, filterObj, updateProduct } = props;

    
    useEffect(() => {
        if (listProduct.length > 0) {
            setProductList(props.productListing.filter((e) => {
                return (e.data.name.toLowerCase().startsWith(searchTxt.toLowerCase()) || e.categoryName.toLowerCase().includes(searchTxt.toLowerCase()))
            }))
        }
    }, [searchTxt]);

    useEffect(() => {
        //if (listProduct.length > 0) {
        setProductList(listProduct)
        setRefreshing(false)
    }, [listProduct]);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        updateProduct();
    }

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
                        <TouchableOpacity onPress={() => {
                            const resetAction = CommonActions.reset({
                                index: 1,
                                routes: [{ name: "Splash" }, { name: "HomeDrawer" }],
                            });

                            props.navigation.dispatch(resetAction);

                        }}>


                            <Image source={Icons.icon_header_home} resizeMode='contain' style={{ height: moderateScale(45), width: moderateScale(45) }} />
                        </TouchableOpacity>
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
                        Products

                    </AutoSizeText>
                    <Image source={Icons.icon_header_regproduct} resizeMode='contain'
                        style={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(60) }} />
                </View>

            </View>
                <View style={{ flex: 1}}>

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
                                    placeholder='Search Products'
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

                            <TouchableOpacity onPress={() => { props.navigation.navigate('FilterProducts', { ...props, filterList: ((e) => applyFilter(e)), customFilters: filterObj }) }}>
                                <Image source={Icons.icon_filter_list} resizeMode='contain' style={{ height: moderateScale(20), width: moderateScale(20) }} />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View flex={1}>
                        <FlatList
                            numColumns={2}
                            contentContainerStyle={{
                                padding: moderateScale(25)
                            }}

                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={productList}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            props.navigation.navigate('ProductDetail', { id: item._id, updateProduct: updateProduct });
                                        }}
                                        style={{
                                            ...styles.boxcontainer,
                                            marginTop: verticalScale(10),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginEnd: (index % 2 === 0) ? (index === props.productListing.length - 1) ? 0 : verticalScale(10) : 0,
                                            flex: 1,
                                            height: isTablet ? verticalScale(195) : verticalScale(160),
                                        }}>

                                        <View style={{
                                            width: '100%',
                                            flex: 1,
                                            backgroundColor: 'white',
                                            borderRadius: moderateScale(10),

                                        }}>

                                            <ImagePlaceholder
                                                showActivityIndicator={false}
                                                activityIndicatorProps={{
                                                    size: 'small',
                                                    color: '#777777',
                                                }}
                                                resizeMode='cover'
                                                placeholderStyle={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: moderateScale(10),
                                                    borderBottomLeftRadius: 0,
                                                    borderBottomRightRadius: 0,

                                                }}
                                                imgStyle={{
                                                    borderRadius: moderateScale(10),
                                                    borderBottomLeftRadius: 0,
                                                    borderBottomRightRadius: 0,
                                                    borderWidth: 1,
                                                    borderColor: 'transparent'
                                                }}

                                                style={{
                                                    borderRadius: moderateScale(10),
                                                }}

                                                src={item.image}
                                                placeholder={Icons.icon_paw}
                                            />


                                            <View style={{
                                                padding: moderateScale(5),
                                                paddingTop: moderateScale(8),
                                                paddingStart: moderateScale(8),
                                                paddingEnd: moderateScale(8),
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(12)}
                                                    fontSize={moderateScale(15)}
                                                    mode={ResizeTextMode.max_lines}
                                                    style={{
                                                        ...styles.generalTxt,
                                                        fontFamily: Fonts.type.bold,
                                                        color: '#464646',
                                                        width: '60%',
                                                        textAlign: 'left',
                                                        textAlignVertical: 'center',
                                                    }}>{item.data.name}
                                                </AutoSizeText>

                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(12)}
                                                    fontSize={moderateScale(14)}
                                                    mode={ResizeTextMode.max_lines}
                                                    style={{
                                                        ...styles.generalTxt,
                                                        fontFamily: Fonts.type.medium,
                                                        color: '#464646',
                                                        width: '40%',
                                                        textAlign: 'right'

                                                    }}>{item.categoryName}
                                                </AutoSizeText>
                                            </View>
                                            <View style={{
                                                padding: moderateScale(5),
                                                paddingTop: 0,
                                                paddingStart: moderateScale(8),
                                                paddingEnd: moderateScale(8),
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(10)}
                                                    fontSize={moderateScale(12)}
                                                    mode={ResizeTextMode.max_lines}
                                                    style={{
                                                        ...styles.generalTxt,
                                                        color: '#777777',
                                                        width: '30%',
                                                        textAlign: 'left',
                                                    }}>Reg Date
                                                </AutoSizeText>

                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(10)}
                                                    fontSize={moderateScale(12)}
                                                    mode={ResizeTextMode.max_lines}
                                                    style={{
                                                        ...styles.generalTxt,
                                                        color: '#777777',
                                                        width: '70%',
                                                        textAlign: 'right'

                                                    }}>{moment(item.createdAt).format('DD MMM YYYY')}
                                                </AutoSizeText>
                                            </View>
                                            <View style={{
                                                padding: moderateScale(5),
                                                paddingTop: 0,
                                                paddingStart: moderateScale(8),
                                                paddingEnd: moderateScale(8),
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(10)}
                                                    fontSize={moderateScale(12)}
                                                    mode={ResizeTextMode.max_lines}
                                                    style={{
                                                        ...styles.generalTxt,
                                                        color: '#777777',
                                                        width: '30%',
                                                        textAlign: 'left',
                                                    }}>Status
                                                </AutoSizeText>

                                                <AutoSizeText
                                                    numberOfLines={1}
                                                    minFontSize={moderateScale(10)}
                                                    fontSize={moderateScale(12)}
                                                    mode={ResizeTextMode.max_lines}
                                                    style={{
                                                        ...styles.generalTxt,
                                                        color: '#464646',
                                                        width: '70%',
                                                        textAlign: 'right'

                                                    }}>{item.status}
                                                </AutoSizeText>
                                            </View>

                                        </View>



                                    </TouchableOpacity>
                                )
                            }}

                        />

                    </View>


                </View>

            <TouchableOpacity
                style={{
                    height: moderateScale(50),
                    width: moderateScale(50),
                    alignSelf: 'flex-end',
                    top: Dimensions.get('screen').height - moderateScale(80),
                    right: moderateScale(20),
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}
                onPress={() => {
                    props.navigation.navigate('RegisterProduct', { updateProduct: updateProduct})
                }}>
                <Image backgroundColor={Colors.appBgColor}
                    style={{
                        height: moderateScale(50),
                        width: moderateScale(50),
                        borderRadius: moderateScale(50),
                        position: 'absolute'

                    }}

                />
                <Image
                    source={Icons.icon_white_plus}
                    style={{
                        height: moderateScale(20),
                        width: moderateScale(20),
                    }}>

                </Image>
            </TouchableOpacity>
        </View>

    );


}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: 'black',
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

export default ProductListingView;