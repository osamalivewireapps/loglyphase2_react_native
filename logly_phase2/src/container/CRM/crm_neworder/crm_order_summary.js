/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import { TextInput } from 'react-native';
import { order } from 'styled-system';
import moment from 'moment';
import { addSale } from '../../../actions/Sales'
import { useDispatch } from 'react-redux';

function CRMOrderSummary(props) {

    console.log("props-order summary------->", props)
    const { nextScreen, orderSummary} = props;

    const { tax, amount, discount, installment, downPayment, cartList, buyer } = orderSummary;

    const isTablet = DeviceInfo.isTablet();
    const initialBreeder = [{ id: 0 }, { id: 1 }, { id: 2 }]
    const [isSelect, setIsSelect] = useState(-1);

    let dispatch = useDispatch();

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
                            Breeder Information
                        </Text>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.medium,
                                color: '#404040',
                                marginTop: verticalScale(10),
                                marginStart: moderateScale(25)

                            }}
                        >
                            {buyer.name}
                        </AutoSizeText>

                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#A1A1A1',
                                marginStart: moderateScale(25)

                            }}
                        >
                            {buyer.email}
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(12)}
                            style={{
                                fontFamily: Fonts.type.base,
                                color: '#404040',
                                marginStart: moderateScale(25)

                            }}
                        >
                            {buyer.phone}
                        </AutoSizeText>

                        <View style={{
                            backgroundColor: '#EBEBEB',
                            marginTop: verticalScale(10),
                            height: 1,
                            marginBottom: verticalScale(15)
                        }} />

                        <FlatList

                            data={cartList}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        ...CRMStyles.boxcontainer,
                                        marginTop: verticalScale(10),
                                        shadowOpacity: 0.09,
                                        height: verticalScale(55),
                                        borderRadius: moderateScale(15),
                                        flexDirection: 'row', alignItems: 'center', marginStart: moderateScale(25),
                                        marginEnd: moderateScale(25)
                                    }}
                                    >
                                        <Image
                                            source={Images.img_user_placeholder}
                                            resizeMode='cover'
                                            style={{
                                                width: moderateScale(65),
                                                height: verticalScale(55),
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
                                                    {item.data.name}
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
                                                    ${item.data.price}
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
                                                    {item._id.substring(0, 8)}
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
                                                        {item.cart}
                                                    </AutoSizeText>
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                );
                            }}

                        />

     
                        <View style={{
                            backgroundColor: '#EBEBEB',
                            marginTop: verticalScale(10),
                            height: 1,
                            marginBottom: verticalScale(10)
                        }} />


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
                                    color: '#A1A1A1',

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
                                    color: '#A1A1A1',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                ${discount}
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
                                    color: '#A1A1A1',

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
                                    color: '#A1A1A1',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                ${amount?.subTotal}
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
                                    color: '#A1A1A1',

                                }}
                            >
                                Salex Tax
                            </AutoSizeText>
                            <AutoSizeText
                                numberOfLines={1}
                                minFontSize={moderateScale(12)}
                                fontSize={moderateScale(14)}
                                style={{
                                    fontFamily: Fonts.type.medium,
                                    color: '#A1A1A1',
                                    flex: 1,
                                    textAlign: 'right',
                                    marginStart: moderateScale(10)

                                }}
                            >
                                {tax.toFixed(2)} %
                            </AutoSizeText>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: verticalScale(5),
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
                                ${amount?.totalAmount && amount.totalAmount}
                            </AutoSizeText>
                        </View>

                        <View style={{
                            backgroundColor: '#EBEBEB',
                            height: 1,
                        }} />

                        <FlatList
                            data={installment}
                            contentContainerStyle={{
                                marginTop: verticalScale(0)
                            }}
                            renderItem={({ item, index }) => {
                                return renderBreedItem(item, index);
                            }}
                        />

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
                    onPress={(e) => newOrder()}>
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
                marginBottom: index === installment.length - 1 ? verticalScale(10) : 0
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
                    {/* <TouchableOpacity
                        onPress={() => {
                            setIsEditObj({ downPayment: index === 0 ? true : false, installNo: index + 1 });
                            setIsEdit(true);
                            setCurrentIndex(index);
                            setInstallAmount(item.amount)
                            setSelected(item.date);
                            setCloseBottonSheet(true);

                        }}>
                        <Image source={Icons.icon_services_edit}
                            resizeMode='contain' style={{
                                tintColor: '#A1A1A1',
                                marginEnd: moderateScale(2), height: verticalScale(15), width: moderateScale(15)
                            }}

                        />
                    </TouchableOpacity> */}
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
                        {moment(item.date).format('DD MMM,YYYY')}
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
                        ${item.amount}
                    </AutoSizeText>
                </View>

            </View>
        );
    }


    function newOrder() {

        let animalList = cartList.filter((value) =>
            value.cart && value.data.Sex
        )
        animalList = animalList.map(value => {
            return { animalId: value._id, quantity: value.cart, price: value.data.price }
        });

        let productList = cartList.filter((value) =>
            value.cart && !value.data.Sex
        )
        productList = productList.map(value => {
            return { productId: value._id, quantity: value.cart, price: value.data.price }
        });

        let data = {
            downpayment: downPayment, tax: tax, amount: {
                subTotal: amount.subTotal, totalAmount: amount.totalAmount,
                discount: discount, priceWithoutDiscount: parseFloat(discount) + parseFloat(amount.totalAmount)
            },

            installments: installment,
            buyerId: buyer._id,
            animals: animalList,
            products: productList
        }
        console.log('data to submit-->', data);
        dispatch(addSale(data)).then((proceed) => {
            if (proceed){
                nextScreen()
            }
        })
    }


}

export default CRMOrderSummary;
