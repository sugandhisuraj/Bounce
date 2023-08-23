import React from 'react';
import {Text, View} from 'react-native';

import Styles from './indexCss'
import {SelectedDollar, UnselectedDollar} from '@svg';

const SelectedUnselectedDollars = props => {
  const {selectedDollars, unSelectedDollars, containerStyle} = props;

  let total = selectedDollars + unSelectedDollars;
  return (
    <View style={[Styles.container]}>
      {new Array(total).fill(1).map((d, i) => {
          if (i < selectedDollars) {
            return <SelectedDollar style={[Styles.svgsStyle]} />;
          }
        return <UnselectedDollar style={[Styles.svgsStyle]} />;
      })}
    </View>
  );
};

export default SelectedUnselectedDollars;
