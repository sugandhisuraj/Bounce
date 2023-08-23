import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Styles from './indexCss';
import {SelectedDollar, UnselectedDollar} from '@svg';

const PriceInfoRow = props => {
  const {data, containerStyle, onPress, isRowSelected} = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={!onPress ? null : () => onPress(data)}
      activeOpacity={0.5}
      style={[
        Styles.container,
        isRowSelected && Styles.selectedRowStyle,
        containerStyle,
      ]}>
      <View style={[Styles.dollarContainer]}>
        {new Array(data.total).fill(1).map((d, i) => {
          if (i < data.selected) {
            return <SelectedDollar style={[Styles.svgsStyle]} />;
          }
          return <UnselectedDollar style={[Styles.svgsStyle]} />;
        })}
      </View>
      <Text style={[Styles.priceStyle]}>{data.price}</Text>
    </TouchableOpacity>
  );
};

PriceInfoRow.defaultProps = {
  data: {},
  containerStyle: {},
  onPress: null,
  isRowSelected: false,
};
export default PriceInfoRow;
