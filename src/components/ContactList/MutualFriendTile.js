import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import {Seperator} from '..';
import styles from './indexCss';
import {getHp, getWp} from '../../app/utils';
import ContactList from '.';
import GuestProfile from '../../Screens/BounceUsers/Profile/GuestProfile';
import MobxStore from '../../mobx';
import {GreyTick, SelectedBlueTick} from '@svg';
import {observer} from 'mobx-react';
const MutualFriendTile = props => {
  const {item, mutual, index, getRenderData, type, dataList} = props;
  const {city, avatarSource, fullName, icon, id} = getRenderData(item);

  return (
    <View style={{paddingHorizontal: 10, flex: 1}} key={index}>
      <View style={styles.RenderItemViewStyle}>
        <TouchableOpacity
          // disabled={type == ContactList.types.DeviceFriends}
          onPress={() => {
            if (type == ContactList.types.MutualFriends) {
              props.onSelectMutualFriends.call(null, item);
            }
            if (type == ContactList.types.BounceFriends) {
              props.navigation.navigate(GuestProfile.routeName, {
                guestUser: MobxStore.bounceUsersStore.getUserById(id),
              });
            }
          }}
          style={styles.contactRow}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: '10%'}}>
              <Avatar source={avatarSource} size={getHp(42)} rounded />
            </View>

            <View style={{marginLeft: 15, width: '80%'}}>
              <Text style={styles.NameStyle}>{fullName}</Text>
              {mutual && <Text style={styles.mutualGreyText}>{city}</Text>}
            </View>
          </View>
        </TouchableOpacity>
        {props.isMutualFriendSelected(item) ? (
          <SelectedBlueTick
            height={getHp(40)}
            width={getHp(40)}
            style={{marginRight: getWp(0)}}
          />
        ) : (
          <GreyTick
            height={getHp(20)}
            width={getHp(20)}
            style={{marginRight: getWp(0)}}
          />
        )}
      </View>

      {!(dataList.length - 1 == item.index) && <Seperator />}
    </View>
  );
};

export default observer(MutualFriendTile);
