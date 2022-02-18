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
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';
import DeviceInfo from 'react-native-device-info';
import CRMStyles from '../crm_styles'
import CRMHeaderView from '../crm_header';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { changePaidStatus, InvoiceReminderEmail, getSalesInvoice } from '../../../actions/Sales';
import Util from '../../../utils';


function CRMPaymentDetailsView(props) {


    const isTablet = DeviceInfo.isTablet();

    const { paymentDetails, updateList } = props.route.params;

    const [tabs, setTab] = useState(0);

    const [orderSummaryList, setOrderSummaryList] = useState([]);

    console.log('payment details123--->', paymentDetails)

    const [saleDetail, setSaleDetail] = useState({});

    let dispatch = useDispatch();

    useEffect(() => {
        let tmp = [];
        tmp = paymentDetails.saleId.animals.concat(paymentDetails.saleId.products)
        setOrderSummaryList(tmp)
        setSaleDetail(paymentDetails)
    }, [])

    useEffect(() => {
        return (() => {
            setSaleDetail({})
            setOrderSummaryList([])
        })

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <CRMHeaderView
                iconStyles={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(40) }}
                name={`Invoice# ${paymentDetails.invoiceNumber}`} icon={Icons.icon_crm_payment_details} bgColor='#CD1818'
                {...props}
            />
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ paddingTop: moderateScale(30) }}>

                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(20)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: '#404040',
                            fontFamily: Fonts.type.bold,
                            paddingStart: moderateScale(35),
                            marginBottom: verticalScale(15)
                        }}>
                        Sales Details

                    </AutoSizeText>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', marginStart: moderateScale(25),
                        marginEnd: moderateScale(25)
                    }}>
                        <Image
                            source={(saleDetail && saleDetail.buyerId?.image) ? (saleDetail.buyerId.image) : Images.img_user_placeholder}
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
                                alignItems: 'center'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',

                                    }}
                                >
                                    Order ID
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
                                    {paymentDetails.saleId.saleUniqueId}
                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',

                                    }}
                                >
                                    Sold on
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
                                    {saleDetail.updatedAt ? moment(saleDetail.updatedAt).format('DD MMM,YYYY') : ''}
                                </AutoSizeText>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <AutoSizeText
                                    numberOfLines={1}
                                    minFontSize={moderateScale(12)}
                                    fontSize={moderateScale(12)}
                                    style={{
                                        fontFamily: Fonts.type.base,
                                        color: '#A1A1A1',

                                    }}
                                >
                                    Sold to
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
                                    {saleDetail?.buyerId?.name}
                                </AutoSizeText>
                            </View>
                        </View>

                    </View>

                    <View style={{
                        backgroundColor: '#EBEBEB',
                        width: '100%',
                        height: 1,
                        marginTop: verticalScale(10),
                        marginBottom: verticalScale(10)
                    }} />

                    <AutoSizeText
                        numberOfLines={2}
                        minFontSize={moderateScale(22)}
                        fontSize={moderateScale(20)}
                        mode={ResizeTextMode.overflow_replacement}
                        style={{
                            color: '#404040',
                            fontFamily: Fonts.type.bold,
                            paddingStart: moderateScale(35),
                            marginBottom: verticalScale(15)
                        }}>
                        Order Summary

                    </AutoSizeText>



                    <FlatList

                        data={orderSummaryList}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    ...CRMStyles.boxcontainer,
                                    shadowOpacity: 0.09,
                                    marginTop: verticalScale(10),
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
                                                {item.animalId ? item.animalId.data.name : item.productId.data.name}
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
                                                ${item.price}
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
                                                {item.animalId ? item.animalId.categoryName : item.productId.categoryName}
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
                                                    {item.quantity}
                                                </AutoSizeText>
                                            </View>
                                        </View>

                                    </View>

                                </View>
                            )
                        }}

                    />
                    <View style={{
                        backgroundColor: '#EBEBEB',
                        width: '100%',
                        height: 1,
                        marginTop: verticalScale(15),
                        marginBottom: verticalScale(20)
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
                            Discounted amount
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
                            ${saleDetail.saleId?.discount ? saleDetail.saleId.discount : 0}
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
                            ${saleDetail.saleId?.price}
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
                            Sales Tax
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
                            {saleDetail.saleId?.tax.toFixed(2)}%
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
                            Tax Amount
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
                            ${ Util.CalculateTaxAmount(saleDetail.saleId?.price, saleDetail.saleId?.tax).toFixed(2)}
                        </AutoSizeText>
                    </View>

                    <View style={{
                        backgroundColor: '#EBEBEB',
                        width: '100%',
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
                                fontFamily: Fonts.type.medium,
                                color: Colors.appBgColor,

                            }}
                        >
                            Total Amount
                        </AutoSizeText>
                        <AutoSizeText
                            numberOfLines={1}
                            minFontSize={moderateScale(12)}
                            fontSize={moderateScale(14)}
                            style={{
                                fontFamily: Fonts.type.bold,
                                color: Colors.appBgColor,
                                flex: 1,
                                textAlign: 'right',
                                marginStart: moderateScale(10)

                            }}
                        >
                            ${saleDetail.saleId?.totalPrice ? saleDetail.saleId.totalPrice : Util.CalculateTaxAmount(saleDetail.saleId?.price, saleDetail.saleId?.tax).toFixed(2)}
                        </AutoSizeText>
                    </View>

                    {saleDetail.installmentId ?
                        renderBreedItem(saleDetail.installmentId,1) : null}

                    {saleDetail.saleId&&!saleDetail.saleId.isPaid?
                    <TouchableOpacity style={{
                        ...CRMStyles.styleButtons,
                            backgroundColor: Colors.appBgColor,
                        marginTop: verticalScale(10),
                        marginStart: moderateScale(25),
                        marginEnd: moderateScale(25),



                    }} onPress={() => { handleInvoiceReminder() }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: moderateScale(12),
                            paddingBottom: moderateScale(12),
                            ...CRMStyles.generalTxt,color:'white'
                        }}>SET REMINDER</Text>
                    </TouchableOpacity>:null}

                    {saleDetail.saleId && !saleDetail.saleId.isPaid ?
                    <TouchableOpacity style={{
                        ...CRMStyles.styleButtons,
                        backgroundColor: 'white',
                        width: '100%'
                        }} onPress={() => { handleChangePaidStatus() }}>
                        <Text style={{
                            fontSize: moderateScale(22), textAlign: 'center',
                            padding: moderateScale(10),
                            paddingTop: moderateScale(12),
                            paddingBottom: moderateScale(12),
                            ...CRMStyles.generalTxt,
                            color: Colors.appBgColor,
                        }}>MARK AS PAID</Text>
                        </TouchableOpacity> : null}
                </View>
            </ScrollView>
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
                alignItems: 'center',
                marginStart: moderateScale(20),
                marginEnd: moderateScale(20),
                marginBottom: moderateScale(10)
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
                        Installment 
                    </AutoSizeText>
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
                            {props.saleDetail?.downpayment}
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

    function handleChangePaidStatus() {
        dispatch(changePaidStatus(saleDetail.installmentId ? saleDetail.installmentId._id : saleDetail.saleId._id,
            saleDetail.installmentId ? "installment" : "sale", saleDetail.saleId._id)).then(response => {
                if (response.payload) {
                    updateList();
                    props.navigation.pop()
                }
            })
    }

    function handleInvoiceReminder() {
        dispatch(InvoiceReminderEmail(saleDetail)).then(response => {
            if (response.payload) {
                Util.topAlert(response.payload);
                props.navigation.pop()
            }
        })

    }
}

export default CRMPaymentDetailsView;
