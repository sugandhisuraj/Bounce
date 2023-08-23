import React from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Buttons} from '@components';

import {getHp, getWp} from '@utils';
import {BounceSmallLogo} from '@svg';
import Styles from './indexCss';
import {Placeholder} from '@assets';
const BounceWithFriendTile = props => {
  const {bwfData, bwfOnPress, data, containerStyle, bWFContainerStyle} = props;
  let avatar = Placeholder;
  return (
    <View style={[Styles.container, containerStyle]}>
      <View style={[Styles.fromInfoContainer]}>
        <Avatar
          source={avatar}
          size={30}
          containerStyle={{width: '8%'}}
          rounded
        />
        <Text style={[Styles.fromUserText]}>{`${
          bwfData?.fromUser?.fullName ?? ''
        } `}</Text>
        <Text
          style={[Styles.fromUserInfoText]}>{`wants to bounce with you`}</Text>
      </View>
      <Buttons.SvgButton
        containerStyle={[Styles.bWFContainer, bWFContainerStyle]}
        Svg={BounceSmallLogo}
        SvgStyle={{
          preserveAspectRatio: 'none',
          height: getHp(45),
          width: getWp(45),
        }}
        onPress={() => bwfOnPress(bwfData)}
        title={`Bounce with ${bwfData?.fromUser?.fullName ?? ''}`}
      />
    </View>
  );
};

BounceWithFriendTile.defaultProps = {
  bwfOnPress: null,
  data: null,
  containerStyle: {},
  bWFContainerStyle: {},
};
export default BounceWithFriendTile;
