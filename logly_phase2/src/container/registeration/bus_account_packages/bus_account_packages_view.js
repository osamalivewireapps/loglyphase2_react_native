/* eslint-disable curly */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import React, { } from 'react';
import { TouchableOpacity, View, SafeAreaView, Text, Dimensions, StyleSheet, Image, FlatList } from 'react-native';
import { Colors, Fonts, Icons } from '../../../theme';
import { ScrollView } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import CollapsibleSection from '../../../components/CollapsibleSection';
import { INDIVIDUAL } from '../../../constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

function BusAccountPackagesView(props) {

    const { btnConfirmPress, showBack, backScreen, packagesType, packagesAmount,
        accountPackage, selectAccountPackage, isShowBack, packageId } = props;
    let btnTxt = showBack ? "BACK" : "PROCEED";

    console.log("package amount-->", packagesAmount)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.appBgColor }} />

            <View
                style={{
                    backgroundColor: Colors.appBgColor,
                    borderBottomLeftRadius: moderateScale(20),
                    borderBottomRightRadius: moderateScale(20),
                    padding: verticalScale(20),
                    paddingStart: moderateScale(40),
                    paddingTop: verticalScale(40),
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: verticalScale(2), height: verticalScale(12), width: moderateScale(8) }} />
                    <Text style={{ ...styles.generalTxt, marginStart: moderateScale(10), marginTop: Platform.OS === 'android' ? verticalScale(-2) : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: moderateScale(30), marginTop: verticalScale(10) }}>{packageId === INDIVIDUAL ? "Pet Lover" : packageId}</Text>
                <Text style={{ ...styles.generalTxt, marginTop: verticalScale(10) }}>We provide Premium Business tools needed to run and scale your business, while saving time, money and building incredible trust with your clients
                </Text>
            </View>


            {packageId !== INDIVIDUAL ? (
                <ScrollView>
                    <View style={{
                        flex: 8, marginStart: moderateScale(20),
                        marginEnd: moderateScale(20),
                        marginTop: verticalScale(15)
                    }}>


                        {/* {getAccountView(listAccountType)} */}
                        {renderExpandableList(packagesType, packagesAmount, props)}

                        <TouchableOpacity
                            onPress={() => btnConfirmPress()}
                            style={{
                                backgroundColor: Colors.appBgColor, borderRadius: moderateScale(30),
                                flex: 0, marginTop: verticalScale(25),
                                marginStart: moderateScale(10), marginEnd: moderateScale(10)
                            }}>
                            <Text style={{
                                fontSize: 22, textAlign: 'center', padding: verticalScale(10),
                                paddingStart: 127, paddingEnd: 127,
                                paddingTop: verticalScale(10),
                                paddingBottom: verticalScale(10),
                                ...styles.generalTxt
                            }}>{btnTxt}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>) :
                (<View style={{
                    height: Dimensions.get('window').height/2,
                    justifyContent:'center'

                }}>
                    <Text style={{ ...styles.generalTxt, color: 'black',textAlign: 'center',fontSize:moderateScale(30),fontFamily:Fonts.type.bold}}>{getFreeTxt()}</Text>
                </View>
                )}


        </View>
    );
}


function getFreeTxt(){
    return "This is a Free\nSubscription.";
}

function renderExpandableList(packagesType, packagesAmount, props) {
    return (
        <FlatList
            data={packagesType}
            renderItem={({ item, index }) => (
                renderCollapsibleItem(item, index, packagesAmount, props)
            )}
        />
    )
}


function renderCollapsibleItem(item, index, packagesAmount, props) {
    return (
        <CollapsibleSection
            header={
                <View

                    style={{
                        ...styles.boxcontainer,
                        padding: moderateScale(15), alignItems: 'center',
                        height: verticalScale(70), flexDirection: 'row',
                        paddingEnd: moderateScale(20)
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold, fontSize: moderateScale(22),
                        color: 'black',
                        paddingLeft: moderateScale(20),
                        flex: 9,

                    }}>{item}</Text>
                    <Image source={Icons.icon_ios_arrow_down} style={{height:verticalScale(5),width:moderateScale(8)
                    }} />

                </View>
            }
        >
            <View>
                {getAccountView(packagesAmount[index], item, index, props)}
            </View>
        </CollapsibleSection>
    )
}

function getAccountView(listData, packageType, outerId, props) {

    console.log("listdata--->", listData)
    return listData.map((data, index) => {

        return (
            <View

                style={{
                    ...styles.boxcontainer,
                    padding: moderateScale(15), justifyContent: 'center',
                    backgroundColor: index === 0 ? '#FFEBEB' : (index > 0 ? '#FEFADC' : '#9EFF87')

                }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.isShowBack === false ?
                        <TouchableOpacity
                            onPress={(e) => props.selectAccountPackage({
                                outerIndex: outerId,
                                innerId: index
                            })}>
                            <Image
                                style={{ height: verticalScale(10), width: moderateScale(10) }}
                                source={(props.accountPackage.outerIndex === outerId &&
                                    props.accountPackage.innerId === index) ? Icons.icon_check_paackage :
                                    Icons.icon_uncheck_paackage} />
                        </TouchableOpacity> :

                        <View />}

                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={moderateScale(14)}
                        fontSize={moderateScale(14)}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            marginStart: moderateScale(5),
                            marginEnd: moderateScale(10), color: 'black',
                            fontFamily: Fonts.type.bold

                        }}>{data.name}</AutoSizeText>



                </View>
                <Text
                    style={{
                        ...styles.generalTxt,
                        fontSize: moderateScale(12),
                        marginTop: verticalScale(10),
                        color: 'black',

                    }}>{getFormattedTxt(data, props.packageId)}</Text>




                <TouchableOpacity style={{
                    ...styles.styleButtons,
                    alignSelf: 'flex-end'
                }} >
                    <Text style={{
                        textAlign: 'center',
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold,
                        color: Colors.appBgColor,
                        fontSize: moderateScale(12), padding: moderateScale(4),

                    }}>{packageType.toLowerCase() === "lifetime" ? "$ " + data.lifetimePrice + "/ lifetime" : (packageType === "Monthly" ? " $" + data.monthlyPrice + "/ month" : " $" + data.yearlyPrice + "/ year")}</Text>
                </TouchableOpacity>


            </View>

        )
    })


}

const getFormattedTxt = (data, packageId) => {
    if (packageId.includes("Service")) {
        return "Allowed Appointments:10 " + "\nAllowed Services 40" + "\nAllowed Employees " + data.allowedEmp
    }
    else
        return data.description + "\nAllowed Animals " + data.allowedAnimal + "\nAllowed Products " + data.allowedProduct + "\nAllowed Employees " + data.allowedEmp
}

const styles = StyleSheet.create({

    boxcontainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: moderateScale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: verticalScale(5),
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        marginStart: moderateScale(10),
        marginEnd: moderateScale(10),
        marginBottom: verticalScale(10),
        marginTop: verticalScale(10),
        width: '100%'
    },
    generalTxt: {
        color: 'white',
        fontSize: moderateScale(16),
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858'
    },
    styleButtons: {
        borderColor: Colors.appBgColor,
        borderWidth: moderateScale(1),
        paddingLeft: moderateScale(5),
        paddingEnd: moderateScale(5),
        borderRadius: moderateScale(30),
        backgroundColor: 'white',
    }
});

export default BusAccountPackagesView;
