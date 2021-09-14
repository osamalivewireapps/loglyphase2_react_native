/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icons from '../theme/Icons';


export default function InputPasswordToggle({ style, inputStyle, icon, iconColor, iconSize, ...rest }, ref) {
    const [visible, setVisible] = useState(false);
    const refContainer = useRef(ref);

    return (
        <View style={[style, styles.container]}>
            <TextInput style={[styles.input, inputStyle]} secureTextEntry={!visible} {...rest} ref={refContainer} />
            <TouchableOpacity
                style={{ marginStart: 10}}
                onPress={() => {
                    setVisible(!visible);
                }}>
                <Image
                    source={visible ? Icons.icon_open_eye : Icons.icon_close_eye} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 10
    },
    input: {
        flex: 1,
    }
})

InputPasswordToggle.propTypes = {
    icon: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

InputPasswordToggle.defaultProps = {
    icon: null,
    style: {},
    iconColor: '#222',
    iconSize: 20,
    inputStyle: {}
};
