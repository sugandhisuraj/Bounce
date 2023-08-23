import React, {useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import RNSlider from '@ptomasroos/react-native-multi-slider';

import {getHp, wp} from '../../app/utils';
import Styles from './indexCss';

const PriceRangeInput = props => {
  const {
    onMarkersValueChange,
    marker2Value,
    marker1Value,
    priceRangeTextStyle,
    containerStyle,
    infoTextContainerStyle,
    priceRanges,
    priceRangeInfo,
    title,
    priceToFromRangeTextStyle,
    rangeSelectedStyle,
    sliderLength,
    customToFromTitle,
  } = props;

  let renderPlus = '';
  if (marker2Value == priceRanges.max) {
    renderPlus = '+';
  }
  return (
    <View style={[Styles.container, containerStyle]}>
      <View style={[Styles.infoTextContainer, infoTextContainerStyle]}>
        <Text style={[Styles.priceRangeText, priceRangeTextStyle]}>
          {title}
        </Text>
        {priceRangeInfo && priceRangeInfo?.length > 0 && (
          <Text style={[Styles.hourlyRateText]}>{priceRangeInfo}</Text>
        )}
        <Text style={[Styles.priceToFromRange, priceToFromRangeTextStyle]}>
          {customToFromTitle
            ? customToFromTitle
            : `$${marker1Value} - $${marker2Value}${renderPlus}`}
        </Text>
      </View>
      <RNSlider
        values={[marker1Value, marker2Value]}
        isMarkersSeparated={true}
        enabledOne={true}
        enabledTwo={true}
        containerStyle={[Styles.rangeContainerStyle]}
        trackStyle={[Styles.rangeTrackStyle]}
        selectedStyle={[Styles.rangeSelectedStyle, rangeSelectedStyle]}
        min={priceRanges.min}
        max={priceRanges.max}
        markerContainerStyle={[Styles.rangeMarkerContainerStyle]}
        onValuesChange={onMarkersValueChange}
        sliderLength={sliderLength}
        markerStyle={[Styles.markerStyle]}
      />
    </View>
  );
};
PriceRangeInput.defaultProps = {
  customToFromTitle: null,
  title: 'Price Range',
  priceRangeInfo: null,
  priceRangeTextStyle: {},
  priceToFromRangeTextStyle: {},
  rangeSelectedStyle: {},
  containerStyle: {},
  infoTextContainerStyle: {},
  marker1Value: 0,
  marker2Value: 1000,
  onMarkersValueChange: () => null,
  priceRanges: {
    min: 0,
    max: 0,
  },
  sliderLength: wp(85),
};
export default PriceRangeInput;
