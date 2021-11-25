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
import { Pages } from 'react-native-pages';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.hideLoaderOnly();
    }

    render() {
        return (
            <SafeAreaView>
                <Image style={{ position: 'absolute', backgroundColor: 'white', height: Dimensions.get('screen').height, width: '100%' }} />

                <View style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                }}>
                    <View style={{ height: '15%', justifyContent: 'center' }}>
                        <Image source={Images.img_logo_splash}
                            resizeMode='contain'
                            style={{height:'100%',width:moderateScale(160)}} />
                    </View>
                    <Pages
                        containerStyle={{ ...styles.viewPager,paddingBottom:verticalScale(10) }}
                        indicatorColor={Colors.appBgColor}
                    >
                        <View style={{ flex:1,alignItems: 'center' }}>
                            <Image source={Images.bg_splash1}
                                resizeMode='contain'
                                style={{height:'70%',width:'100%'}} />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(20),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>Register your Pet</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                padding: moderateScale(10),

                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, dolore magna aliquyam erat, sed diam voluptua.</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={Images.bg_splash2}
                                resizeMode='contain'
                                style={{ height: '70%', width:'100%' }}  />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(20),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>Track your Pet Activity</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                padding: moderateScale(10),

                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, dolore magna aliquyam erat, sed diam voluptua.</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={Images.bg_splash3}
                                resizeMode='contain'
                                style={{ height: '70%', width: '100%' }} />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(20),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>Buy and Sell your Pet</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                padding: moderateScale(10),

                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, dolore magna aliquyam erat, sed diam voluptua.</Text>
                        </View> 
                    </Pages>

                    <View style={{
                        width: '85%',
                        height: '15%',
                        marginTop:verticalScale(10),
                        justifyContent: 'flex-end', marginBottom: verticalScale(10)
                    }}>

                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Login') }}
                            style={{ marginTop: 0, backgroundColor: Colors.appBgColor, borderRadius: moderateScale(20) }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),

                                fontFamily: Fonts.type.base, color: 'white'
                            }}>LOG IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Registration') }}
                            style={{ marginTop: verticalScale(10), backgroundColor: Colors.appYellow, borderRadius: moderateScale(20) }}>
                            <Text style={{
                                fontSize: moderateScale(22), textAlign: 'center',
                                padding: moderateScale(10),
                                fontFamily: Fonts.type.base, color: Colors.appBgColor
                            }}>SIGN UP</Text>
                        </TouchableOpacity>


                    </View>
                </View>


            </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    viewPager: {
        height: '70%',
        width: '100%',
        flex: 1,


    },
});

const mapDispatchToProps = dispatch => ({
    hideLoaderOnly: () => dispatch(hideLoaderOnly()),
});


export default connect(
    null,
    mapDispatchToProps,
)(SplashScreen);