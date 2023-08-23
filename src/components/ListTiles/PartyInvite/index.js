import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import styles from './indexCss';
import {ThreeBlackDots, Party} from '@svg';
import {FONTSIZE, getHp, getWp} from '../../../app/utils';
import {Placeholder} from '../../../assets';
const PartyInviteListTile = props => {
  const {partyInvite, onInvitePartyTilePress, onRightIconPress} = props;
  console.log('INVITE_DT - ', partyInvite.renderData());
  let inviteData = partyInvite.renderData();
  let avatar = Placeholder;
  if (inviteData?.invitedByIcon) {
    avatar = {uri: inviteData?.invitedByIcon};
  }
  return (
    <TouchableOpacity 
    disabled={!onInvitePartyTilePress}
    onPress={() => onInvitePartyTilePress(partyInvite)}
    style={[styles.renderContainer, {marginTop: 5}, styles.shadowStyle]}>
      <View
        style={[
          styles.flexDirectionStyle,
          {
            alignItems: 'flex-start',
          },
        ]}>
        <Party height={29} width={30} />
        <View
          style={{width: '75%', marginHorizontal: getWp(10), marginLeft: 15}}>
          <Text style={[styles.textStyle, {fontSize: FONTSIZE.Text18}]}>
            {`${inviteData.partyTitle}`}
          </Text>
          <Text style={[styles.timeStyle]}>{inviteData.partyTime}</Text>
        </View>
        <ThreeBlackDots height={10} width={25} />
      </View>

      <View style={[styles.flexDirectionStyle, {marginTop: getHp(20)}]}>
        {/* <Avatar
          source={party?.getInvitedTile() ?? }
          size={30}
          containerStyle={{width: '8%'}}
          rounded
        /> */}
        <Avatar
          source={avatar}
          size={30}
          containerStyle={{width: '8%'}}
          rounded
        /> 
        <Text
          style={[
            styles.textStyle,
            {width: '60%', marginHorizontal: getWp(10), marginLeft: 15},
          ]}>
          {`${inviteData.invitedBy}`}
          <Text
            style={[
              styles.textStyle,
              {
                width: '60%',
                marginHorizontal: getWp(10),
                fontFamily: 'AvenirNext-Regular',
                letterSpacing: 0.1,
              },
            ]}>
            {'  invited you'}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

PartyInviteListTile.defaultProps = {
  party: null,
  onInvitePartyTilePress: null,
  onRightIconPress: null,
};
export default PartyInviteListTile;
