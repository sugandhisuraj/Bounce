import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

const PartyPublicParivateTag = props => {
  const {party} = props;

  const PrivateView = prop => {
    const {containerStyle} = prop;
    return (
      <View style={[Styles.container, containerStyle]}>
        <Text style={[Styles.statusText]}>Private</Text>
      </View>
    );
  };
  const DraftView = prop => {
    const {containerStyle} = prop;
    return (
      <View
        style={[
          Styles.container,
          Styles.draftContainer,
          {backgroundColor: '#22AFF7'},
          containerStyle,
        ]}>
        <Text style={[Styles.statusText]}>Draft</Text>
      </View>
    );
  };
  return {
    PrivateView,
    DraftView,
  };
};

const Styles = StyleSheet.create({
  container: {
    height: getHp(22),
    backgroundColor: '#CF69FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: getHp(10),
    borderTopRightRadius: getHp(5),
  },
  draftContainer: {
    borderBottomStartRadius: getHp(0),
    borderTopRightRadius: getHp(0),
    borderTopLeftRadius: getHp(10),
    borderBottomRightRadius: getHp(5),
  },
  statusText: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    fontSize: FONTSIZE.Text13,
    letterSpacing: 0.3,
    paddingHorizontal: getWp(6),
    color: 'white',
  },
});
export default PartyPublicParivateTag;
