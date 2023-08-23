import React, {useMemo, Fragment} from 'react';
import {View, Text} from 'react-native';

import {ToolTip} from '../..';
import Styles from './indexCss';
import {SelectedDollar, UnselectedDollar} from '@svg';
import {getHp, getWp} from '../../../app/utils';
const VendorPriceInfo = props => {
  const {containerStyle, maxDollars, vendor} = props;

  let activeDollars = vendor.vendor?.dollar ?? 0;
  console.log('ACTIVE_DOLLARS - ', activeDollars);
  let hourlyRate = vendor.vendor?.hourlyRate ?? '';
  const DollarAsToolTip = () => {
    return (
      <View style={[Styles.container, containerStyle]}>
        {new Array(5).fill(1).map((d, i) => { 
          let ActDollar = i < activeDollars ? SelectedDollar : UnselectedDollar;
          return <ActDollar style={[Styles.dollarSvgStyle]} />;
        })}
      </View>
    );
  };
  let ctr = <DollarAsToolTip />;
  return (
    <ToolTip
      menuContentStyle={[Styles.menuContentStyle]}
      menuAnchorTouchStyle={{flexDirection: 'row'}}
      menuAnchor={ctr}>
      <Text style={[Styles.hourlyRateText]}>{`${hourlyRate} / hour`}</Text>
      <Text style={[Styles.hourlyRateTextInfo]}>{`Base Package`}</Text>
    </ToolTip>
  );
};

VendorPriceInfo.defaultProps = {
  containerStyle: {},
  maxDollars: 5,
  activeDollars: 3,
  vendor: {},
};
export default VendorPriceInfo;
