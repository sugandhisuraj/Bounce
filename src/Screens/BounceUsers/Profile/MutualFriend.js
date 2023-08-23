import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {FONTSIZE, getHp, getWp} from '@utils';
import {observer} from 'mobx-react';
import MobxStore from '../../../mobx';
import {Scaffold} from '@components';
import {Searchbar} from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';
import {ContactList, Buttons, Lists, ListTiles} from '../../../components';
import {
  DeviceContactService,
  FriendRequestService,
  RNShareService,
} from '../../../app/services';
import {Toast} from '../../../app/constants';
import CommonInterestNewsFeed from '../NewsFeed/CommonInterestNewsFeed';
import {BounceSmallLogo} from '@svg';
import {BlurView} from '@react-native-community/blur';
import {FriendShipStatus} from '../../../app/Entities';
const MututalFriendsPage = props => {
  const [refreshing, setRefreshing] = useState(false);
  const { guestUserStore, bounceWithFriendsStore} = MobxStore;
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    bounceWithFriendsStore.selectedBounceUsers.reset();
  }, []);
  const onRefreshScreen = async () => {};
  const onSelectMutualFriends = mutualFriend => {
    bounceWithFriendsStore.selectedBounceUsers.toggle(mutualFriend);
  };
  const isMutualFriendSelected = friend => {
    return bounceWithFriendsStore.selectedBounceUsers.isDataExist(friend)
      .exist;
  };

  const getCommonData = async () => {
    try {
      if (bounceWithFriendsStore.selectedBounceUsers.data().length == 0) {
        return Toast('Select Mutual Friend');
      }
      MobxStore.toggleLoader(true);
      await FriendRequestService.bounceWithFriends();
      MobxStore.toggleLoader(false);

      props.navigation.navigate(CommonInterestNewsFeed.routeName);
      return;
    } catch (error) {
      console.log('ERROR_ON_COMMON - ', error);
      Toast('Something went wrong!');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const renderMutualFriends = () => {
    return (
      <View style={{width: '95%', alignSelf: 'center'}}>
        {guestUserStore.getMutualFriends().length > 0 && (
          <Fragment>
            <ContactList
              searchQuery={searchQuery}
              type={ContactList.types.MutualFriends}
              onSelectMutualFriends={onSelectMutualFriends}
              isMutualFriendSelected={isMutualFriendSelected}
              dataList={guestUserStore.getMutualFriends()}
              {...props}
              minSize={5}
            />

            <Buttons.SvgButton
              Svg={BounceSmallLogo}
              SvgStyle={{
                preserveAspectRatio: 'none',
                height: getHp(45),
                width: getWp(45),
              }}
              onPress={getCommonData}
              title={'Bounce with Friends'}
            />
          </Fragment>
        )}
        <View style={{}}>
          {!guestUserStore.guestUser?.friendCount &&
            FriendShipStatus.FriendRequestApproved !=
              guestUserStore?.guestUser?.friendRequestStatus && (
              <BlurView
                style={[styles.blur]}
                blurType={'light'}
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              />
            )} 
          <Lists.BounceFriendRequestList
            tileType={ListTiles.BounceFriendRequestStatus.tileType.Icon}
            ListData={guestUserStore.getAllGuestUsersFriend()}
            minRender={8}
            searchQuery={searchQuery}
            containerStyle={{marginTop: getHp(20)}}
            listContainerStyle={{marginTop: getHp(20)}}
            onTitlePress={null}
          />
        </View>
      </View>
    );
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshScreen} />
        }
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: '#FBFBFB',
        }}>
        <View>
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
            <Searchbar
              placeholder={'Search Friends'}
              onChangeText={onChangeSearch}
              value={searchQuery}
              inputStyle={{
                fontSize: FONTSIZE.Text16,
                fontFamily: 'AvenirNext-Regular',
                alignSelf: 'center',
              }}
              style={styles.searchBarStyle}
              iconColor={'#999999'}
              placeholderTextColor={'#909090'}
            />
          </View>
          <View style={styles.container}>{renderMutualFriends()}</View>
        </View>
      </ScrollView>
    </Scaffold>
  );
};
MututalFriendsPage.routeName = '/MututalFriendsPage';
MututalFriendsPage.types = {
  MutualFriends: 'MutualFriends',
};
export default observer(MututalFriendsPage);
const styles = StyleSheet.create({
  blur: {
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: 'transparent',
    zIndex: 1000,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    flex: 1,
  },
  headerFlex: {
    flexDirection: 'row',
    paddingVertical: getHp(10),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchBarStyle: {
    elevation: 0,
    borderRadius: 9,
    backgroundColor: '#F2F5F6',
    height: getHp(50),
    fontSize: FONTSIZE.Text16,
    width: '80%',
    alignSelf: 'center',
  },
  past: {
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 30,
    justifyContent: 'space-evenly',
  },
  private: {
    backgroundColor: '#1FAEF7',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
  },
  doubleSubcontainer: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '70%',
    alignSelf: 'center',
  },
  doubleButton: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    // elevation: 10,
    backgroundColor: '#fff',
    // flex: 1,
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
    // overflow: 'visible'
  },
  fullInventoryTitleStyle: {
    marginLeft: 10,
    color: '#1FAEF7',
    fontSize: 18,
    letterSpacing: 0.8,
  },
  reviewsTitleStyle: {
    marginVertical: 30,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  TextInputStyle: {
    backgroundColor: '#fff',
    // borderRadius: 24,
    paddingLeft: 25,
    fontSize: 18,
    // borderWidth: 1,

    width: '80%',
    borderRadius: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000000',
    width: '100%',
  },
  bottomButton: {
    borderRadius: 24,
    backgroundColor: '#333333',
    flexDirection: 'column',
    paddingVertical: 10,
    maxHeight: '100%',
    minWidth: '45%',
    alignItems: 'center',
  },
  ContainerStyle: {
    width: '100%',
    marginVertical: 4,
  },
  ButtonStyle: {
    backgroundColor: '#212121',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  TitleStyle: {
    fontSize: 16,
    paddingVertical: 0,
  },
});
