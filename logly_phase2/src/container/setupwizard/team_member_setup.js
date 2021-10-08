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

class TeamMemberSetup extends Component {

   
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
                        onAnimationEnd={() => { this.props.navigation.navigate('TeamSetup')}}
                        style={{maxHeight: Dimensions.get('screen').height - Dimensions.get('screen').height / 2 }}>
                        <View style={{
                            paddingTop: Dimensions.get('screen').height / 4,
                            justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxHeight: Dimensions.get('screen').height - Dimensions.get('screen').height / 2
                        }} >
                            <Image source={Images.appBg} style={{ alignSelf: 'center', position: 'absolute', borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }} />
                            <Text style={{ ...styles.generalTxt, fontFamily: Fonts.type.bold, fontSize: 30, margin: 30, textAlign: 'center' }}>We are almost done... Let's add your team members now</Text>
                            <DotsLoader size={15} color='white'/>
                 
                        </View>
                    </Animatable.View> :
                    null}
            </View>
        )
    }
}

export default TeamMemberSetup;

const styles = StyleSheet.create({

    generalTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.type.base
    },
  
});