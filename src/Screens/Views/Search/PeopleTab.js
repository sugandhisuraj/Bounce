import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Lists} from '@components';
import {FriendRequestService} from '../../../app/services';
import MobxStore from '../../../mobx';
import Spinner from 'react-native-loading-spinner-overlay';
import {getHp, getWp, height} from '../../../app/utils';
import GuestProfile from '../../BounceUsers/Profile/GuestProfile';
import {observer} from 'mobx-react';
function PeopleTab(props) {
  const {searchEvents} = MobxStore;

  const onTitlePress = async guestUser => {
    try {
      props.navigation.navigate(GuestProfile.routeName, {
        guestUser,
      });
    } catch (error) {}
  };
  return (
    <View style={{backgroundColor: '#FBFBFB'}}>
      <Lists.BounceFriendRequestList
        heading={'Suggested'}
        searchQuery={searchEvents.searchText}
        containerStyle={{
          alignSelf: 'center',
          marginTop: getHp(25),
          paddingHorizontal: getWp(14),
        }}
        listContentContainerStyle={{
          paddingBottom: getHp(200),
        }}
        listContainerStyle={{marginTop: getHp(20), paddingHorizontal: getHp(6)}}
        onTitlePress={onTitlePress}
      />
    </View>
  );
}
export default observer(PeopleTab);
