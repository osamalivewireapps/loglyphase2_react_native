/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { Text, Image, SafeAreaView } from 'react-native'
import { Colors, Fonts, Images } from '../../theme';
import * as Animatable from 'react-native-animatable';
import { DotsLoader} from 'react-native-indicator';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

class BusProfileSetup extends Component {

   
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }


    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true })
        }, 800);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                {this.state.isVisible ?

                    <Animatable.View
                        animation="slideInDown"
                        duration={4000}
                        onAnimationEnd={() => { this.props.navigation.navigate('BusProfile')}}
                        style={{maxHeight: Dimensions.get('screen').height - Dimensions.get('screen').height / 2 }}>
                        <View style={{
                            paddingTop: Dimensions.get('screen').height / 3,
                            justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxHeight: Dimensions.get('screen').height - Dimensions.get('screen').height / 2
                        }} >
                            <Image source={Images.appBg} style={{
                                alignSelf: 'center',
                                position: 'absolute', width: '100%',
                                borderBottomLeftRadius: moderateScale(60),
                                borderBottomRightRadius: moderateScale(60)
                            }} />
                            <Text style={{
                                ...styles.generalTxt,
                                fontFamily: Fonts.type.bold,
                                fontSize: moderateScale(20),
                                margin: moderateScale(30),
                                textAlign: 'center'
                            }}>Let's setup your Business Profile </Text>
                            <DotsLoader size={moderateScale(15)} color='white' />
                 
                        </View>
                    </Animatable.View> :
                    null}
            </View>
        )
    }
}

export default BusProfileSetup;

const styles = StyleSheet.create({

    generalTxt: {
        color: 'white',
        fontSize: moderateScale(18),
        fontFamily: Fonts.type.base
    },
  
});