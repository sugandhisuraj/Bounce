import React from 'react';
import {View, Text} from 'react-native';

import PartyInfoTile from '../PartyInfoTile';
import Styles from './indexCss';
import AvatarWithUsername from '../../AvatarWithUsername';
import {getHp, getWp} from '../../../app/utils';
import {ImagesStack} from '../..';

let testImgs = [
  'https://dummyimage.com/600x400/000/1',
  'https://dummyimage.com/600x400/000/2',
  'https://dummyimage.com/600x400/000/1',
  'https://dummyimage.com/600x400/000/2',
  'https://dummyimage.com/600x400/000/1',
  'https://dummyimage.com/600x400/000/1',
  'https://dummyimage.com/600x400/000/2',
  'https://dummyimage.com/600x400/000/1',
  'https://dummyimage.com/600x400/000/2',
];
const BounceGroupNotification = () => {
  const AbsoluteComponent = () => (
    <View
      style={[
        Styles.imageStackContainer,
        testImgs.length > 5 && {right: getWp(25)},
      ]}>
      <ImagesStack
        images={testImgs}
        avatarSize={getHp(32)}
        lastStackWithCount={testImgs.length > 5 ? testImgs.length : null}
      />
    </View>
  );
  return (
    <View>
      <AvatarWithUsername
        userName={'Lauren Yermian '}
        hintText={`sent an event to your Bounce group`}
        hintTextStyle={Styles.hintTextStyle}
        userNameTextStyle={Styles.userNameTextStyle}
      />
      <PartyInfoTile
        containerStyle={{marginTop: getHp(20)}}
        AbsoluteComponent1={AbsoluteComponent}
      />
    </View>
  );
};

export default BounceGroupNotification;
