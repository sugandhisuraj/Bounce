import React, {memo} from 'react';
import {Text, View} from 'react-native';

import {FONTSIZE, getHp, getWp} from '../../../app/utils';
import ScrollPickerComponent from '../../ScrollPicker';
import Styles from './indexCss';

const DATE_DATA_SOURCE = new Array(31).fill(1).map((_, i) => i + 1);
const MONTH_DATA_SOURCE = ['days', 'weeks', 'months', 'year'];
const DurationDropDownPicker = props => {
  const {containerStyle} = props;
  return (
    <View style={[Styles.container, containerStyle]}>
      <ScrollPickerComponent
        selectedIndex={5}
        dataSource={DATE_DATA_SOURCE}
        scrollPickerProps={{
          wrapperHeight: getHp(160),
          wrapperWidth: getWp(170),
          itemHeight: 40,
          textItemStyle: {
            textAlign: 'right',
            width: '75%',
          },
          highlightViewStyle: {
            borderRadius: 100,
            //backgroundColor: 'red'
          },
        }}
      />
      <ScrollPickerComponent
        selectedIndex={1}
        dataSource={MONTH_DATA_SOURCE}
        scrollPickerProps={{
          wrapperHeight: getHp(160),
          wrapperWidth: getWp(170),
          itemHeight: 40,
          textItemStyle: {
            textAlign: 'left',
            width: '75%',
          },
        }}
      />
    </View>
  );
};

export default memo(DurationDropDownPicker);
