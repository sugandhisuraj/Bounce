import React from 'react';
import {Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {getHp} from '../../app/utils';

import Styles from './indexCss';

const RowCheckBox = props => {
  const {
    containerStyle,
    onCheckBoxPress,
    data, 
    isChecked,
    LeftComponent,
    dataKey,
  } = props;
  return (
    <View style={[Styles.container, containerStyle]}>
      {LeftComponent ? (
        LeftComponent
      ) : (
        <Text style={[Styles.titleText]}>
          {(dataKey && data && data[dataKey]) ?? 'Add Title'}
        </Text>
      )}
      <CheckBox
        onPress={() => onCheckBoxPress(data)}
        uncheckedColor={'#999999'}
        checkedColor={'#69CCFF'}
        style={[Styles.checkboxStyle]}
        size={getHp(25)}
        checked={isChecked}
      />
    </View>
  );
};
RowCheckBox.defaultProps = {
  data: {},
  containerStyle: {},
  onCheckBoxPress: () => false,
  isChecked: false,
  LeftComponent: null,
  isChecked: false,
  dataKey: 'name',
};
export default RowCheckBox;
