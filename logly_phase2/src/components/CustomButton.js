/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Util from '../utils';

export default function CustomButton(props) {
  const { isSameUser, onPress, styles } = props;
  console.log('custom button--->', props.children);

  return (

    <TouchableOpacity
      style={{ ...styles }}
      onPress={e => {
        if (isSameUser) {
          onPress();
        } else {
          //Util.topAlert('ponka');
        }
      }}
    >{props.children}</TouchableOpacity>
  );
}
