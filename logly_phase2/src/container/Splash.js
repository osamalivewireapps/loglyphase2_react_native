/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { View, Text, ImageBackground, Image, SafeAreaView, Dimensions, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { DisableLoader } from '../actions/LoaderProgress';
import { Fonts, Images, Colors } from '../theme';
import { hideLoaderOnly } from './../actions/SignUpModule'

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.hideLoaderOnly();
    }

    render() {
        return (
            <SafeAreaView>
                <Image source={Images.appBg} style={{ position: 'absolute' }} />

                <View style={{
                    height: '100%',
                    justifyContent: 'center', alignItems: 'center',
                }}>
                    <View style={{ flex: 5 }}>
                        <Image source={Images.img_animals}
                            resizeMode='contain'
                            style={{ height: Dimensions.get('screen').height / 2 }} />
                    </View>
                    <View style={{
                        flex: 3, justifyContent: 'center', alignItems: 'center',

                    }}>
                        <Image source={Images.logo_logly_splash} />
                        <Text style={{
                            fontSize: 14, textAlign: 'center', marginTop: 0,
                            fontFamily: Fonts.type.light, color: 'white', marginStart: 60, marginEnd: 60
                        }}>Share Your Love for Animals - Love Logged And Organized!</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'flex-end', marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Registration') }}
                            style={{ marginTop: 0, backgroundColor: Colors.appYellow, borderRadius: 20 }}>
                            <Text style={{
                                fontSize: 22, textAlign: 'center', padding: 10, paddingStart: 120, paddingEnd: 120,

                                fontFamily: Fonts.type.light, color: Colors.appBgColor
                            }}>SIGNUP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Login') }}
                            style={{ marginTop: 10, backgroundColor: 'white', borderRadius: 20 }}>
                            <Text style={{
                                fontSize: 22, textAlign: 'center', padding: 10, paddingStart: 127, paddingEnd: 127,

                                fontFamily: Fonts.type.light, color: Colors.appBgColor
                            }}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>


                </View>



            </SafeAreaView>);
    }
}


const mapDispatchToProps = dispatch => ({
    hideLoaderOnly: () => dispatch(hideLoaderOnly()),
});


export default connect(
    null,
    mapDispatchToProps,
)(SplashScreen);
