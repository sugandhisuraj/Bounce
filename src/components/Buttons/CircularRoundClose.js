import React from 'react';
import {StyleSheet, Text,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { FONTSIZE, getHp,getWp } from '../../app/utils';
const CircularRoundClose = (props) => {
    const {
        containerStyle,
        onClosePress
    } = props;
    return (
        <TouchableOpacity
        activeOpacity={.3}
        disabled={!onClosePress}
          onPress={onClosePress}
          style={[Styles.container, containerStyle]}>
          <AntDesign style={[Styles.closeIcon]} name={'close'} />
        </TouchableOpacity>
    );
}

const Styles = StyleSheet.create({
    container: { 
        height: getHp(70),
        width: getHp(70),
        borderRadius: getHp(150),
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeIcon: {
        fontSize: FONTSIZE.Text45,
        color: 'black',
      },
});
CircularRoundClose.defaultProps = {
    containerStyle:{},
    onClosePress: null
}
export default CircularRoundClose;