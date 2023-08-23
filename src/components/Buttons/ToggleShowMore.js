import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {getHp, getWp, FONTSIZE} from '../../app/utils';
const ToggleShowMoreButton = props => {
  const {showMore, itemLength = 0,containerStyle = {}, onButtonPress} = props;
  return (
    <View style={[styles.containerStyle,containerStyle]}>
      <Button
        onPress={onButtonPress}
        full
        light
        style={[styles.showMoreButtonContainer]}>
        <Text style={[styles.showMoreTextStyle]}>
          {!showMore ? `${itemLength} More` : `Hide`}
        </Text>
        <View style={{marginStart: getHp(10)}}>
          <AntDesign
            color={'black'}
            size={getHp(16)}
            name={!showMore ? 'down' : 'up'}
          />
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: '#FBFBFB'},
  showMoreButtonContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginTop: getHp(16),
    backgroundColor: '#F2F5F6',
    borderWidth: 1,
    borderColor: '#E4EEF1',
    borderRadius: getHp(10),
    borderBottomLeftRadius: getHp(10),
    borderBottomRightRadius: getHp(10),
  },
  showMoreTextStyle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: FONTSIZE.Text16,
    lineHeight: getHp(22),
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
  },
});

export default ToggleShowMoreButton;
