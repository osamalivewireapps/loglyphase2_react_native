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
                            style={{ height: '100%', width: moderateScale(160) }} />
                    </View>
                    <Pages
                        containerStyle={{ ...styles.viewPager, paddingBottom: verticalScale(0) }}
                        indicatorColor={Colors.appBgColor}
                    >
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={Images.bg_splash1}
                                resizeMode='contain'
                                style={{ height: '70%', width: '100%' }} />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(10),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>LOGLY for Pet Parents</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                paddingTop: verticalScale(5),
                                padding: moderateScale(10),

                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>LOGLY is Free for Pet Parents, Social Pet Profiles, Activity Reminders, Lost Pet Alert System. Socially Connected Community to local vetted Animal Care Businesses and Much More.</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={Images.bg_splash2}
                                resizeMode='contain'
                                style={{ height: '70%', width: '100%' }} />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(10),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>LOGLY for Pet Care Businesses</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(5),
                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>Enjoy business growth without lots of the frustrations with other pet platforms. Flat-rate pricing, ability to communicate with clients, faster payouts and you own your growing client list.</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={Images.bg_splash3}
                                resizeMode='contain'
                                style={{ height: '70%', width: '100%' }} />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(10),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>LOGLY for Animal Care Non-Profits</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(5),

                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>We believe in your passion work, for that we have developed a dedicated platform to assist with Donations, Volunteers and Fostering.  Also with 501c, enjoy LOGLY business software for FREE.</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={Images.bg_splash4}
                                resizeMode='contain'
                                style={{ height: '70%', width: '100%' }} />
                            <Text style={{
                                fontSize: moderateScale(22),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(10),
                                fontFamily: Fonts.type.bold, color: '#464646'
                            }}>LOGLY’s Mission</Text>

                            <Text style={{
                                fontSize: moderateScale(13),
                                textAlign: 'center',
                                padding: moderateScale(10),
                                paddingTop: verticalScale(5),
                                fontFamily: Fonts.type.base, color: '#464646'
                            }}>By Socially Connecting all 3 pillars, our vision is a platform for the betterment and love of all pets that enriches and fills our lives with unconditional love.</Text>
                        </View>
                    </Pages>

                    <View style={{
                        width: '85%',
                        height: '15%',
                        marginTop: verticalScale(10),
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