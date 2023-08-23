import React from 'react';
import {TouchableWithoutFeedback,Keyboard} from 'react-native';

export default DismissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {
      console.log("CLICKED");
      Keyboard.dismiss();
    }}>
      {children}
    </TouchableWithoutFeedback>
  );
};
