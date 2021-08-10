/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, Dimensions, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts, Images, Colors } from '../theme';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Image source={Images.appBg} style={{ position: 'absolute' }} />

                <View style={{
                    justifyContent: 'center', alignItems: 'center', height: '100%',
                }}>
                    <Image source={Images.img_animals} style={{}} />
                    <Image source={Images.logo_logly_splash} style={{ marginTop: 40 }} />
                    <Text style={{
                        fontSize: 14, textAlign: 'center', marginTop: 10,
                        fontFamily: Fonts.type.light, color: 'white', marginStart: 60, marginEnd: 60
                    }}>Share Your Love for Animals - Love Logged And Organized!</Text>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Registration') }}
                        style={{ marginTop: 30, backgroundColor: Colors.appYellow, borderRadius: 20 }}>
                        <Text style={{
                            fontSize: 22, textAlign: 'center', padding: 10, paddingStart: 120, paddingEnd: 120,

                            fontFamily: Fonts.type.light, color: Colors.appBgColor
                        }}>SIGNUP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Login') }}
                        style={{ marginTop: 20, backgroundColor: 'white', borderRadius: 20 }}>
                        <Text style={{
                            fontSize: 22, textAlign: 'center', padding: 10, paddingStart: 127, paddingEnd: 127,

                            fontFamily: Fonts.type.light, color: Colors.appBgColor
                        }}>LOGIN</Text>
                    </TouchableOpacity>



                </View>



            </SafeAreaView>);
    }
}


export default SplashScreen;
