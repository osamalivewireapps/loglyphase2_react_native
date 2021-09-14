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
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    padding: 20,
                    paddingStart: 40,
                    paddingTop: 40,
                    flex: 0
                }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={(e) => backScreen(e)}>
                    <Image source={Icons.icon_arrow_back} style={{ marginTop: 2 }} />
                    <Text style={{ ...styles.generalTxt, marginStart: 10, marginTop: Platform.OS === 'android' ? -5 : 0 }}>Back</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, marginTop: 10 }}>{packageId}</Text>
                <Text style={{ ...styles.generalTxt, marginTop: 10 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</Text>
            </View>
            <ScrollView>
                <View style={{
                    flex: 8, marginStart: 20,
                    marginEnd: 20,
                    marginTop: 15
                }}>

                    {/* {getAccountView(listAccountType)} */}
                    {renderExpandableList(packagesType, packagesAmount, props)}

                    <TouchableOpacity
                        onPress={() => btnConfirmPress()}
                        style={{
                            backgroundColor: Colors.appBgColor, borderRadius: 30,
                            flex: 0, marginTop: 25,
                            marginStart: 10, marginEnd: 10
                        }}>
                        <Text style={{
                            fontSize: 22, textAlign: 'center', padding: 10,
                            paddingStart: 117, paddingEnd: 117,
                            paddingTop: 15, paddingBottom: 15,
                            ...styles.generalTxt
                        }}>{btnTxt}</Text>
                    </TouchableOpacity>


                </View>

            </ScrollView>
        </View>
    );
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
                        padding: 15, alignItems: 'center',
                        height: 80, flexDirection: 'row',
                        paddingEnd: 20
                    }}>
                    <Text style={{
                        ...styles.generalTxt,
                        fontFamily: Fonts.type.bold, fontSize: 22,
                        color: 'black',
                        paddingLeft: 20,
                        flex: 9,

                    }}>{item}</Text>
                    <Image source={Icons.icon_ios_arrow_down} style={{
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
                    padding: 15, justifyContent: 'center',
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
                                source={(props.accountPackage.outerIndex === outerId &&
                                    props.accountPackage.innerId === index) ? Icons.icon_check_paackage :
                                    Icons.icon_uncheck_paackage} />
                        </TouchableOpacity> :

                        <View />}
                    <AutoSizeText
                        numberOfLines={1}
                        minFontSize={14}
                        fontSize={14}
                        mode={ResizeTextMode.max_lines}
                        style={{
                            ...styles.generalTxt,
                            marginStart: 5,
                            marginEnd: 10, color: 'black',
                            fontFamily: Fonts.type.bold

                        }}>{data.name}</AutoSizeText>



                </View>
                <Text
                    style={{
                        ...styles.generalTxt,
                        fontSize: 12,
                        marginTop: 10,
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
                        fontSize: 12, padding: 4,

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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        marginStart: 10,
        marginEnd: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    generalTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
    styleTextInput: {
        fontFamily: Fonts.type.base,
        fontSize: 16,
        color: '#585858'
    },
    styleButtons: {
        borderColor: Colors.appBgColor,
        borderWidth: 1,
        paddingLeft: 5,
        paddingEnd: 5,
        borderRadius: 30,
        backgroundColor: 'white',
    }
});

export default BusAccountPackagesView;
