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
import { hideLoaderOnly } from './../actions/SignUpModule';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.hideLoaderOnly();
    }

    render() {
        return (
            <SafeAreaView>
                <Image style={{ position: 'absolute', backgroundColor: Colors.appBgColor, height: Dimensions.get('screen').height, width: '100%' }} />

                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center', alignItems: 'center',
                }}>
                    <View style={{ flex: 5, width: '100%' }}>
                        <Image source={Images.img_animals}
                            resizeMode='contain'
                            style={{ height: '100%', width: '100%' }} />
                    </View>
                    <View style={{
                        width: '100%',
                        flex: 3, justifyContent: 'center', alignItems: 'center',

                    }}>
                        <Image source={Images.logo_logly_splash}
                            resizeMode='contain'
                            style={{ height: '50%', width: '80%' }} />
                        <Text style={{
                            fontSize: moderateScale(14), textAlign: 'center', marginTop: 0,
                            fontFamily: Fonts.type.light, color: 'white', marginStart: moderateScale(60), marginEnd: moderateScale(60)
                        }}>Share Your Love for Animals - Love Logged And Organized!</Text>
                    </View>
                    <View style={{
                        width: '85%',
                        flex: 2, justifyContent: 'flex-end', marginBottom: verticalScale(10)
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Registration') }}
                            style={{ marginTop: 0, backgroundColor: Colors.appYellow, borderRadius: moderateScale(20) }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                fontFamily: Fonts.type.light, color: Colors.appBgColor
                            }}>SIGNUP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Login') }}
                            style={{ marginTop: verticalScale(10), backgroundColor: 'white', borderRadius: moderateScale(20) }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),

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