/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Animated, Easing, View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Colors, Fonts, Icons, Images } from '../../../theme';

import CRMStyles from './../crm_styles'
import CRMHeaderView from '../crm_header';
import CRMAddAnimalView from './crm_select_animal';
import ViewPager from '@react-native-community/viewpager';
import CRMAddBreedView from './crm_select_breed';
import CRMMyOrder from './crm_my_order';
import CRMOrderSummary from './crm_order_summary';
import { getAnimals } from '../../../actions/AnimalModule';
import { getProducts } from '../../../actions/ProductModule';
import { useDispatch } from 'react-redux';

function CRMNewOrderView(props) {


    const isTablet = Platform.isTV;

    const pagerRef = useRef(null);
    const [pageNumber, setPageNumber] = useState(0);

    const [allAnimals, setAllAnimals] = useState([]);
    const [allTeams, setAllTeams] = useState([]);
    const [finalAnimalList, setFinalAnimalList] = useState();
    const [finalTeamList, setFinalTeamList] = useState();
    const [addCartAnimals, setAddCartAnimals] = useState([]);
    const [addCartProducts, setAddCartProducts] = useState([]);
    const [discount, setdiscount] = useState(0);
    const [amount, setAmount] = useState(null);
    const [tax, settax] = useState(0);
    const [downPayment, setDownPayment] = useState('');
    const [installment, setInstallment] = useState([]);
    const [cartList, setFinalCartList] = useState([]);
    const [buyer, setBuyer] = useState({});

    let dispatch = useDispatch();
    let animalFilter = '';
    let productFilter = '';

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <CRMHeaderView
                iconStyles={{ flex: isTablet ? 0.18 : 0.35, width: '100%', height: moderateScale(50) }}
                name="New Order" icon={Icons.icon_crm_order} bgColor='#161D6E'
                {...props}
                backScreen={() => backScreen()}
            />

            <ViewPager style={{ flex: 1 }} scrollEnabled={false} ref={pagerRef}>
                <View key={0}>
                    <CRMAddAnimalView {...props} nextScreen={() => nextScreen()}
                        cartAnimals={(e) => {
                            let tmp = [];
                            tmp = tmp.concat(e);
                            setAddCartAnimals(tmp)
                        }}

                        cartProducts={(e) => {
                            let tmp = [];
                            tmp = tmp.concat(e);
                            setAddCartProducts(tmp)
                        }}
                        getAnimalList={(e) => {
                            return new Promise((resolve) => {
                                if (!allAnimals || allAnimals.length === 0 || !animalFilter.includes(e)) {
                                    getAnimal(e).then(response => {
                                        console.log('response neworder--->', response)
                                        resolve(response)
                                        setAllAnimals(response)

                                    });
                                } else if (allAnimals.length > 0) {
                                    resolve(allAnimals)
                                }
                                animalFilter = e;
                            })
                        }}

                        getTeamList={(e) => {
                            return new Promise((resolve) => {
                                if (!allTeams || allTeams.length === 0 || !productFilter.includes(e)) {
                                    getTeams().then(response => {
                                        console.log('response--->', response)
                                        setAllTeams(response)
                                        resolve(response)
                                    });
                                } else if (allTeams.length > 0) {
                                    resolve(allTeams)
                                }

                                productFilter = e;
                            })
                        }}

                        getFinalAnimalList={(e) => {
                            console.log('final animals--->', e)
                            setFinalAnimalList(e)
                        }}

                        getFinalTeamList={(e) => {
                            console.log('final teams--->', e)
                            setFinalTeamList(e)
                        }
                        }
                    />
                </View>
                <View key={1}>
                    <CRMAddBreedView {...props} nextScreen={() => nextScreen()} buyer={(e) => setBuyer(e)} />

                </View>
                <View key={2}>
                    <CRMMyOrder {...props} nextScreen={() => nextScreen()} cartAnimals={addCartAnimals} cartProducts={addCartProducts} setInvoice={(e) => {
                        console.log('new order view--->', e);
                        settax(e.tax);
                        setAmount(e.amount);
                        setdiscount(e.discount);
                        setInstallment(e.installments);
                        setDownPayment(e.downPayment);
                        setFinalCartList(e.cartList);
                    }} />

                </View>
                <View key={3}>
                    <CRMOrderSummary {...props} nextScreen={() => nextScreen()} 
                    orderSummary={{
                        tax: tax, amount: amount, discount: discount, installment: installment, downPayment: downPayment,
                        cartList: cartList, buyer
                    }} 
                    />

                </View>

            </ViewPager>

        </View>
    );

    function nextScreen() {
        if (pageNumber + 1 < 4) {
            pagerRef.current.setPage(pageNumber + 1);
            setPageNumber(pageNumber + 1)
        } else {
            setTimeout(() => {
                setPageNumber(0)
                pagerRef.current.setPage(0);

            }, 1000)
            props.navigation.navigate('CrmOrderCompleted');
        }


    }

    function backScreen(e) {
        if (pageNumber > 0) {
            pagerRef.current.setPage(pageNumber - 1);
            setPageNumber(pageNumber - 1)
        }
        else {
            props.navigation.pop()
        }
    }

    function getAnimal(e) {

        console.log('api calling', e)
        return new Promise((resolve) => {
            dispatch(getAnimals(e)).then((response) => {
                resolve(response.payload);
            })
        })
    }

    function getTeams() {
        return new Promise((resolve) => {
            dispatch(getProducts()).then((response) => {
                resolve(response.payload);
            })
        })
    }
}

export default CRMNewOrderView;
