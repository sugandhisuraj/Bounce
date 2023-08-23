import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput, FlatList} from 'react-native';
import {
  StarPerson,
  Peoples,
  Message,
  Download,
  Party,
  WhiteRightArrow,
} from '@assets';
import {TextIconButton, Buttons} from '@components';
import {BlueSendRequest, BlueArrowDown} from '@svg';
import {Avatar} from 'react-native-elements';
import {FONTSIZE, getHp, getWp} from '../../app/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from 'native-base';
import {styles} from './indexCss';
import {BlackClose} from '../../assets/Svg';
import RatingPage from '../../components/ReviewCard/RatingPage';
import MobxStore from '../../mobx';
import {observer} from 'mobx-react';
import {AuthService, FriendRequestService} from '../../app/services';
import {Toast} from '../../app/constants';
import Loader from 'react-native-loading-spinner-overlay';
import {Placeholder} from '@assets';
AntDesign.loadFont();
function FriendRequest(props) {
  const {type, Message_Stack, heading = ''} = props;
  const [showMore, setShowMore] = useState(false);
  const {authStore} = MobxStore;
  const {navigation} = props;
  const [spotifyModal, setSpotifyModal] = useState(false);
  const userinfo = authStore.user;
  const {pendingRequests} = userinfo.user;

  const onClosePress = async user => {
    try {
      MobxStore.toggleLoader(true);
      let toastMsg = '';
      let res;
      if (type == FriendRequest.types.OutgoingRequest) {
        toastMsg = 'Friend Request Successfully Cancelled';
        res = await FriendRequestService.cancelFriendRequest(user.id);
      } else {
        res = await FriendRequestService.denyFriendRequest(user.id);
        toastMsg = 'Friend Request Successfully Denied';
      }
      await AuthService.reloadUser();
      Toast(toastMsg);
    } catch (error) {
      console.log('APPROVE_FRIEND_REQUEST_ERROR = ', error);
      Toast('Something went wrong!');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const approveFriendRequest = async user => {
    try {
      MobxStore.toggleLoader(true);
      const res = await FriendRequestService.approveFriendRequest(user.id);
      await AuthService.reloadUser();
    } catch (error) {
      console.log('APPROVE_FRIEND_REQUEST_ERROR = ', error);
      Toast('Something went wrong!');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const renderItem = ({item, index}) => {
    const {fullName, profileImage} = item;
    let avatarImg = Placeholder;
    if (profileImage?.filePath) {
      avatarImg = {uri: profileImage?.filePath};
    }
    return (
      <View
        style={[
          styles.renderContainer,
          {paddingVertical: getWp(8), paddingHorizontal: getWp(20)},
        ]}>
        <View style={styles.flexDirectionStyle}>
          <Avatar source={avatarImg} size={40} rounded />

          <Text
            style={[
              styles.textStyle,
              {
                fontSize: FONTSIZE.Text18,
                width: '60%',
                marginHorizontal: getWp(10),
                marginLeft: 15,
              },
            ]}>
            {fullName}
          </Text>

          <View
            style={[
              styles.flexDirectionStyle,
              {
                width: '30%',
                justifyContent: 'flex-end',
                // borderWidth: 1,
                // borderColor: 'red',
                right: getWp(30),
              },
            ]}>
            {type == FriendRequest.types.InCommingRequest && (
              <Buttons.FriendRequestsStatus
                title={'Confirm'}
                onPress={approveFriendRequest.bind(null, item)}
                type={Buttons.FriendRequestsStatus.type.AddFriend}
              />
            )}

            <TouchableOpacity
              onPress={onClosePress.bind(null, item)}
              style={{
                backgroundColor: '#EEEEEE',
                padding: 7,
                borderRadius: 100,
                marginLeft: getWp(20),
              }}>
              <BlackClose height={12} width={12} />
            </TouchableOpacity>
          </View>
        </View>
        {Message_Stack.length != index + 1 && showMore && (
          <View style={styles.partition} />
        )}
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text
        style={[
          styles.headingStyle,
          {
            marginBottom: getHp(15),
            marginLeft: getWp(22)
          },
        ]}>
        {heading}
      </Text>

      {Message_Stack.length >= 1 && (
        <>
          <FlatList
            initialNumToRender={2}
            data={!showMore ? Message_Stack.slice(0, 1) : Message_Stack}
            renderItem={renderItem}
            keyExtractor={index => index}
            onEndReachedThreshold={0.5}
          />

          <View
            style={{
              backgroundColor: '#FBFBFB',
            }}>
            {Message_Stack.length !== 1 && (
              <Button
                onPress={() => {
                  setShowMore(i => !i);
                }}
                full
                light
                style={[
                  styles.showMoreButtonContainer,
                  { 
                    marginVertical: getHp(15)
                  },
                ]}>
                <Text
                  style={[
                    styles.showMoreTextStyle,
                    {fontFamily: 'AvenirNext-Medium', letterSpacing: 0.2},
                  ]}>
                  {!showMore ? `${Message_Stack.length - 1} More` : `Hide`}
                </Text>
                <View style={{marginStart: getHp(10)}}>
                  <AntDesign
                    color={'black'}
                    size={getHp(16)}
                    name={!showMore ? 'down' : 'up'}
                  />
                </View>
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
}

FriendRequest.types = {
  InCommingRequest: 'InCommingRequest',
  OutgoingRequest: 'OutgoingRequest',
};
export default observer(FriendRequest);
