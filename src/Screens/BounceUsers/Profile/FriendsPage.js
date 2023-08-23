import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import {DollarWhite, Food, Security, Video, Girl} from '@assets';
import {FONTSIZE, getHp, getWp} from '@utils';
import {observer} from 'mobx-react';
import MobxStore from '../../../mobx';
import {Scaffold} from '@components';
import {Searchbar} from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';
import {ContactList, Lists, ListTiles} from '../../../components';
import {
  AuthService,
  DeviceContactService,
  FriendRequestService,
  RNShareService,
} from '../../../app/services';
import {Toast} from '../../../app/constants';
import GuestProfile from './GuestProfile';
import {ApiClient} from '../../../app/services';
function FriendsPage(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const onRefreshScreen = async () => {
    try {
      setRefreshing(i => !i);
      await AuthService.reloadUser();
      await DeviceContactService.checkPermission();
    } catch (error) {
      console.log('ERROR_ON_REFRESHING - ', error);
      Toast('Something went wrong!');
    } finally {
      setRefreshing(i => !i);
    }
  };
  const onTitlePress = async friend => {
    try {
      props.navigation.navigate(GuestProfile.routeName, {
        guestUser: friend,
      });
    } catch (error) {}
  };

  const RenderFindFriendsData = () => {
    return (
      <View style={{alignSelf: 'center', width: '92%'}}>
        <Lists.BounceFriendRequestList
          minRender={8}
          searchQuery={searchQuery}
          containerStyle={{marginTop: getHp(20)}}
          listContainerStyle={{marginTop: getHp(20)}}
          onTitlePress={onTitlePress}
        />
        <Lists.ContactsList
          tileStyles={{
            tileIconContainerStyle: {width: '10%'},
            tileTitleContainerStyle: {width: '75%'},
          }}
          searchQuery={searchQuery}
          containerStyle={{marginTop: getHp(40)}}
        />
      </View>
    );
  };
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
      <ScrollView
        //bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={onRefreshScreen}
          />
        }
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: '#FBFBFB',
        }}>
        <RenderFindFriendsData />

        <View style={{height: 50}} />
      </ScrollView>
    </Scaffold>
  );
}
FriendsPage.routeName = '/FriendsPage';
FriendsPage.types = {
  FindFriends: 'FindFriends',
};
export default observer(FriendsPage);
const styles = StyleSheet.create({
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
    height: Platform.OS == 'ios' ? getHp(38) : getHp(43),
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

/*
  {/* {contactTitle == 'Find Friends' ? (
                  <ContactList
                    heading={'Find Friends'}
                    dataList={allUser}
                    {...props}
                    full={true}
                  />
                ) : contactTitle == 'See All Friends' ? (
                  <>
                    <ContactList
                      heading={'People You Might Know'}
                      dataList={FriendsList}
                      {...props}
                      full={false}
                    />
                    <ContactList
                      heading={'My Friends'}
                      dataList={FriendsList}
                      {...props}
                    />
                  </>
                ) : contactTitle == 'Mutual Friends + All' ? (
                  <>
                    <ContactList
                      heading={'Mutual Friends'}
                      dataList={DATA}
                      {...props}
                    />
                    <ContactList heading={'All'} dataList={DATA} {...props} />
                  </>
                ) : null}  
                */
