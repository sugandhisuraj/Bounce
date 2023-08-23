import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

import {YellowStar} from '@svg';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

const FeaturingButton = props => {
  const {totalHiredVendors = 0} = props;
  return (
    <Styled.FeatureBtn
      disabled={!props.onPress}
      onPress={props.onPress}
      style={[Styles.featureBtn]}>
      <YellowStar height={getHp(24)} width={getHp(24)} />
      <Text style={[Styles.featuringText]}>Featuring</Text>
      <Text style={[Styles.featuringText]}>{totalHiredVendors}</Text>
    </Styled.FeatureBtn>
  );
};

const Styled = {
  FeatureBtn: styled.TouchableOpacity`
    background: #ffffff;
    box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.13);
    border-radius: 13px;
  `,
};

const Styles = StyleSheet.create({
  featureBtn: {
    width: '48%',
    height: getHp(36),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWp(12),
  },
  featuringText: {
    letterSpacing: 0.7,
    color: '#FFC700',
    fontWeight: '600',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontSize: FONTSIZE.Text15,
  },
});
export default FeaturingButton;
