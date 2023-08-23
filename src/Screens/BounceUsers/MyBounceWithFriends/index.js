import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';

import {observer} from 'mobx-react';

import Toast from '../../../app/constants/toast';
import {BounceSmallLogo} from '@svg';
import {getHp, getWp, FONTSIZE} from '../../../app/utils';
import {Lists, ListTiles, Scaffold, Buttons} from '../../../components';
import MobxStore from '../../../mobx';
import {useToggleShowMore} from '../../../app/hooks';
import styles from './indexCss';
import CommonInterestNewsFeed from '../NewsFeed/CommonInterestNewsFeed';
import {FriendRequestService} from '../../../app/services';
import {useSearchBar} from '../../../app/hooks';
import MyBounceWithFriendsParties from '../MyBounceWithFriendsParties';
const MyBounceWithFriends = props => {
  const {searchQuery, SearchBarComponent} = useSearchBar();
  const {authStore, bounceWithFriendsStore} = MobxStore;
  let persistBWFRecords = props.route.params?.persistBWFRecords ?? false;
  useEffect(() => {
    if (persistBWFRecords) {
      return;
    }
    bounceWithFriendsStore.selectedBounceUsers.reset();
  }, [persistBWFRecords]);

  const ToggleFriendListTile = ({item, index}) => {
    return (
      <ListTiles.ToggleFriendTile
        tileStyles={{
          tileTitleContainerStyle: {width: '75%'},
          tileIconContainerStyle: {
            width: '10%',
          },
        }}
        friend={item}
        isFriendSelected={f =>
          bounceWithFriendsStore.selectedBounceUsers.isDataExist(f).exist
        }
        onRightIconPress={f =>
          bounceWithFriendsStore.selectedBounceUsers.toggle(f)
        }
      />
    );
  };

  const onBounceWithFriendsPress = async () => {
    if (bounceWithFriendsStore.selectedBounceUsers.data().length == 0) {
      return Toast('Select atleast 1 Friend');
    }
    try {
      MobxStore.toggleLoader(true);
      FriendRequestService.sendBounceWithFriendsNotifications();
      await FriendRequestService.bounceWithFriends();
      MobxStore.toggleLoader(false);
      props.navigation.navigate(MyBounceWithFriendsParties.routeName);
    } catch (error) {
      Toast('Something went wrong!');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  //dont' touch
  bounceWithFriendsStore.selectedBounceUsers.data();
  //dont' touch
  const myFriends = authStore.getMyFriends() ?? [];

  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          marginVertical: getHp(15),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Back
            name="chevron-back"
            color={'#000'}
            style={{marginRight: 20, marginLeft: 10}}
            size={30}
          />
        </TouchableOpacity>
        {SearchBarComponent({
          containerStyle: styles.searchContainer,
          placeholder: 'Search Friends',
        })}
      </View>

      {myFriends.length > 0 && (
        <Lists.ToggleList
          containerStyle={{
            marginTop: getHp(10),
            marginBottom: getHp(30),
            //height: '75%',
            flex: 1,
            width: '92%',
            alignSelf: 'center',
          }}
          listContainerStyle={{marginTop: getHp(25)}}
          searchQuery={searchQuery}
          searchFilter={Lists.ToggleList.SEARCH_FILTERS.FRIEND}
          ListTile={ToggleFriendListTile}
          heading={'My Friends'}
          ListData={myFriends}
        />
      )}
      {myFriends.length > 0 && (
        <Buttons.SvgButton
          containerStyle={styles.bWfContainerStyle}
          Svg={BounceSmallLogo}
          SvgStyle={{
            preserveAspectRatio: 'none',
            height: getHp(45),
            width: getWp(45),
          }}
          onPress={onBounceWithFriendsPress}
          title={'Bounce with Friends'}
        />
      )}
    </Scaffold>
  );
};
MyBounceWithFriends.routeName = '/MyBounceWithFriends';

export default observer(MyBounceWithFriends);
