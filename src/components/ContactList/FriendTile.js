import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import {Seperator} from '..';
import styles from './indexCss';
import {getHp, getWp} from '../../app/utils';
import ContactList from '.';
import GuestProfile from '../../Screens/BounceUsers/Profile/GuestProfile';
import MobxStore from '../../mobx';
import {observer} from 'mobx-react';

const FriendTile = props => {
  const {item, mutual, index, getRenderData, type, dataList} = props;
  const {city, avatarSource, fullName, icon, id, username} =
    getRenderData(item);

  return (
    <View style={{paddingHorizontal: 10}} key={index}>
      <View style={styles.RenderItemViewStyle}>
        <TouchableOpacity
          disabled={type == ContactList.types.DeviceFriends}
          onPress={() => {
            if (type == ContactList.types.BounceFriends) {
              let UserData = MobxStore.bounceUsersStore.getUserById(id);
              if (!UserData) {
                return;
              }
              props.navigation.navigate(GuestProfile.routeName, {
                guestUser: UserData,
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
              {/* <Text style={styles.NameStyle}>{username}</Text> */}
              {mutual && <Text style={styles.mutualGreyText}>{city}</Text>}
            </View>
          </View>
        </TouchableOpacity>
        {icon}
      </View>

      {!(dataList.length - 1 == item.index) && <Seperator />}
    </View>
  );
};

export default observer(FriendTile);
