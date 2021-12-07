/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Pdf from 'react-native-pdf';
import { Icons } from '../../../theme';
import Util from '../../../utils';

export default function PdfReader(props) {
    console.log("pdf--->", props.route.params.uri);

    const [isUnmount, setisUnmount] = useState(false);


    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
            <TouchableOpacity onPress={() => {
                props.navigation.pop()
                setisUnmount(true)
            }}>
                <Image source={Icons.icon_whitebg_back} resizeMode='contain'
                    style={{
                        height: moderateScale(45), width: moderateScale(45),

                    }} />
            </TouchableOpacity>
            <Pdf
                source={{ uri: props.route.params.uri }}
                onLoadProgress={(percent) => {
                    console.log('percent--->', percent)
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                    setTimeout(() => {
                        if (!isUnmount)
                            alert(error)

                    }, 1000)
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});