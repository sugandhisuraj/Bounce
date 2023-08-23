import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  RefreshControl,
  Linking,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Header,
  ImageCarousel,
  GuestTabview,
  FriendsListRender,
  ReviewCard,
  Footer,
  CustomText,
  TabView,
} from '@components';
import {Message, Favourite, Girl, DJ, DJ1, DJ2} from '@assets';
import {styles} from './indexCss';
import {
  BlackMenubar,
  Scanner,
  AppleMusic,
  BluePerson,
  BounceSmallLogo,
} from '@svg';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {connect, useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import Spinner from 'react-native-loading-spinner-overlay';
import {pickDocument} from '@hooks';
import {fetchGet, postData} from '../../../FetchServices';
import {UserContext} from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import Drawer from '../../Drawer/UserCustomDrawer';
import QRcode from '../../Views/QRcode';
import LinearGradient from 'react-native-linear-gradient';
import {
  WhitePerson,
  UploadBlue,
  InstaNew,
  GreyCross,
  FavouriteMusic,
  Spotify,
  Insta,
  Twitter,
  Tiktok,
  Linkedin,
  Snapchat,
  BlackPerson,
  DotSvg,
} from '@svg';
import {PartyService, RNShareService} from '../../../app/services';
import CreateInvitation from '../../../Screens/BounceVendors/PlanParty/CreateInvitation';
import {observer} from 'mobx-react';
import axios from 'axios';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Scaffold, Lists} from '@components';
import {Toast} from '@constants';
import HostProfile from '../HostProfile/HostProfile';
import Right from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import spotifyToken from '../../../app/SDK/Spotify/spotify_token';
import FriendsPage from '../Profile/FriendsPage';
import {Searchbar} from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';
import {Placeholder} from '@assets';
import {ApiClient} from '../../../app/services';
import CommonInterestNewsFeed from '../NewsFeed/CommonInterestNewsFeed';
import {FriendRequestService, AuthService} from '../../../app/services';
import MutualFriend from './MutualFriend';
import {FriendShipStatus} from '../../../app/Entities';
import MyBounceWithFriendsParties from '../MyBounceWithFriendsParties';
import {ReportBlockPopups} from '../../../components/AppPopups';
import {Buttons} from '../../../components';
import GuestProfileModel from './GuestProfile.model';
import NavigationService from '../../../navigation/NavigationService';
import ToastUtil from '../../../app/constants/toast';

EntypoIcon.loadFont();
Text.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};
const GuestProfile = props => {
  const {guestUser: guestUserProp} = props.route.params;
  const {current: guestProfileModel} = useRef(GuestProfileModel.getInstance());
  const {guestUserWithParties} = guestProfileModel;
  const {authStore, bounceWithFriendsStore, popupStore} = MobxStore;
  console.log('GUEST_USER_DATA_333 - ', JSON.stringify(guestUserWithParties));

  useEffect(() => {
    guestProfileModel.getGuestAllData(guestUserProp.id, props);
    return () => {
      console.log('UN_MOUNTED - ', guestUserProp.id);
      GuestProfileModel.removeInstance();
    };
  }, []);
  const onBlockUser = async () => {
    try {
      MobxStore.toggleLoader(true);
      const blockUserRes = await FriendRequestService.toggleBlockUser(
        guestUserWithParties.id,
      );
      console.log('BLOCK_USER_RES - ', blockUserRes);
      await AuthService.reloadUser();
      await guestProfileModel.getGuestAllData(guestUserWithParties.id);
      MobxStore.popupStore.resetReportBlockPopup();
    } catch (error) {
      Toast('Something went wrong! Try Again');
      console.log('ERROR_BLOCKING_USER - ', error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onPressBlockUser = () => {
    MobxStore.popupStore.setReportBlockPopup({
      visible: true,
      guestUser: guestUserWithParties,
      type: ReportBlockPopups.popupType.BlockUser,
      onPress: onBlockUser,
      isBlocked: isIBlockedThisUser,
    });
  };
  const handleSubmit = async () => {
    try {
      if (isIBlockedThisUser) {
        return onPressBlockUser();
      }
      if (
        guestUserWithParties?.friendRequestStatus ==
        FriendShipStatus.FriendRequestSent
      ) {
        return ToastUtil('Already requested');
      }
      if (
        FriendShipStatus.FriendRequestApproved ==
        guestUserWithParties?.friendRequestStatus
      ) {
        popupStore.setUnfriendPopup({
          visible: true,
          friend: guestUserWithParties,
          onSuccess: async () => {
            await FriendRequestService.unfriendUser(guestUserWithParties.id);
            await guestProfileModel.getGuestAllData(guestUserWithParties.id);
          },
        });
        return;
      }
      await FriendRequestService.sendRequest(guestUserWithParties.id);
      await guestProfileModel.getGuestAllData(guestUserWithParties.id);
    } catch (error) {}
  };

  const onBounceWithGuestUserPress = async () => {
    try {
      bounceWithFriendsStore.selectedBounceUsers.resetAndAddData(
        guestUserWithParties,
      );
      MobxStore.toggleLoader(true);
      FriendRequestService.sendBounceWithFriendsNotifications();
      await FriendRequestService.bounceWithFriends();

      props.navigation.navigate(MyBounceWithFriendsParties.routeName, {
        persistBWFRecords: true,
      });
    } catch (error) {
      Toast('Something went wrong!');
    } finally {
      MobxStore.toggleLoader(false);
    }
    return;
    props.navigation.navigate(MutualFriend.routeName, {
      type: MutualFriend.types.MutualFriends,
    });
  };
  const onPressGuestFriends = friend => {
    NavigationService.push(GuestProfile.routeName, {
      guestUser: friend,
    });
  };

  const isIBlockedThisUser = authStore.user.isIBlockedThisUser(
    guestUserWithParties.id,
  );
  if (Object.keys(guestUserWithParties).length == 0) {
    return null;
  }
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      {guestProfileModel.isGuestUserAvailable() && (
        <View
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFF',
              height: getHp(50),
            },
          ]}>
          <TouchableOpacity
            style={{width: '10%', alignItems: 'flex-end'}}
            onPress={() => props.navigation.goBack()}>
            <Back name="chevron-back" color={'#000'} size={getHp(33)} />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'AvenirNext-Medium',
              fontSize: 20,
              letterSpacing: 0.3,
              width: '72%',
              textAlign: 'center',
            }}>{`${guestUserWithParties?.username}`}</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={onPressBlockUser}
              style={{marginRight: getWp(10)}}>
              <DotSvg height={getHp(28)} width={getWp(25)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => RNShareService.shareBounceUserProfile(authStore.user.user,guestUserWithParties)}>
              <EntypoIcon name={'share'} size={getHp(23)} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView 
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: '#FBFBFB',
        }}>
        <View>
          <View style={styles.subContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Avatar
                source={{uri: `${guestUserWithParties.profileImage?.filePath}`}}
                source={
                  guestUserWithParties.profileImage == null
                    ? Placeholder
                    : {uri: guestUserWithParties.profileImage?.filePath}
                }
                size="large"
                rounded
              />

              <View
                style={{
                  marginLeft: getHp(15),
                  marginBottom: getHp(5),
                  width: '77%',
                  borderWidth: 0,
                  borderColor: 'red',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: FONTSIZE.Text20,
                    fontFamily: 'AvenirNext-Medium',
                    marginBottom: getHp(5),
                  }}>
                  {guestUserWithParties.fullName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.cityAll]}>
                    {guestUserWithParties.age}
                    {guestUserWithParties.city &&
                      guestUserWithParties.city != 'null' &&
                      ' • ' + guestUserWithParties.city.split(',', 1)}
                    {guestUserWithParties.profession &&
                      guestUserWithParties.profession != 'null' &&
                      ' • ' + guestUserWithParties.profession}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.flex,
                {
                  width: '80%',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              {/* <TouchableOpacity
                // onPress={() =>
                //   Linking.openURL(
                //     `https://www.instagram.com/${instagramUsername}`
                //   )
                // }
                >
                  <Insta height={getHp(30)} width={getWp(30)} />
                </TouchableOpacity>

                <TouchableOpacity
                // onPress={() =>
                //   Linking.openURL(`https://twitter.com/narendramodi`)
                // }
                >
                  <Twitter height={getHp(29)} width={getWp(29)} />
                </TouchableOpacity>

                <TouchableOpacity
                // onPress={() =>
                //   Linking.openURL(
                //     `https://www.snapchat.com/add/${snapchatUsername}`
                //   )
                // }
                >
                  <Snapchat height={getHp(31)} width={getWp(31)} />
                </TouchableOpacity>

                <TouchableOpacity
                // onPress={() =>
                //   Linking.openURL(`https://www.tiktok.com/@davidwarner31`)
                // }
                >
                  <Tiktok height={getHp(28)} width={getWp(28)} />
                </TouchableOpacity>
                <TouchableOpacity
                // onPress={() =>
                //   Linking.openURL(`https://www.tiktok.com/@davidwarner31`)
                // }
                >
                  <Linkedin height={getHp(31)} width={getWp(30)} />
                </TouchableOpacity> */}
            </View>

            {!(
              guestUserWithParties.about == '' ||
              guestUserWithParties.about == 'null' ||
              guestUserWithParties.about == null
            ) && (
              <>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      marginTop: getHp(15),
                      marginBottom: 10,
                      lineHeight: 22,
                      fontSize: FONTSIZE.Text16,
                    },
                  ]}>
                  {guestUserWithParties.about}
                </Text>
              </>
            )}

            <Buttons.FriendRequestsStatus
              onPress={handleSubmit}
              type={
                isIBlockedThisUser
                  ? Buttons.FriendRequestButton.type.Blocked
                  : FriendShipStatus.forText(
                      guestUserWithParties.friendRequestStatus,
                    )
              }
            />
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#16B0FE', '#3FBEFF']}
              style={[
                styles.linearGradient,
                {
                  width: '100%',
                  height: getHp(38),
                  borderRadius: 13,
                  marginTop: 10,
                  marginBottom: 10,
                },
              ]}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onBounceWithGuestUserPress}>
                <Text style={[styles.buttonText, {marginRight: 15}]}>
                  {`Bounce with ${guestUserWithParties.fullName}`}
                </Text>
                <Right name="angle-right" color="#FFFFFF" size={25} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* Subcontainer view end  */}

          {guestUserWithParties.attendingParties.length > 0 ||
          guestUserWithParties.interestedParties.length > 0 ||
          guestUserWithParties.hostingParties.length > 0 ? (
            <GuestTabview {...props} {...guestUserWithParties} />
          ) : null}

          {guestUserWithParties.friends.length > 0 && (
            <>
              <Lists.FriendAvatarList
                onPress={onPressGuestFriends}
                containerStyle={{marginTop: 10}}
                DataList={[
                  ...guestUserWithParties.mutualFriends,
                  ...guestUserWithParties.friends,
                ]}
                friendTextData={
                  guestUserWithParties.mutualFriends.length > 0
                    ? `(${guestUserWithParties.mutualFriends.length} Mutual)`
                    : ''
                }
              />
              <View
                style={{
                  height: 1,
                  backgroundColor: '#EEEEEE',
                  marginTop: 10,
                  marginBottom: 15,
                }}
              />
            </>
          )}

          <View style={{paddingHorizontal: 10}}>
            {/* <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#16B0FE', '#3FBEFF']}
                                style={[
                                    styles.linearGradient, {
                                        height: getHp(38),
                                        borderRadius: 13,
                                        justifyContent: 'center'
                                    }
                                ]}>
                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => props.navigation.navigate(FriendsPage.routeName)}>
                                    <WhitePerson height={25} width={19} style={{ marginBottom: -5 }} />
                                    <Text style={[styles.buttonText, { marginLeft: 20, fontFamily: 'AvenirNext-Medium', color: '#FFFFFF' }]}>
                                        {'Find Friends'}</Text>
                                </TouchableOpacity>
                            </LinearGradient> */}

            {/* <View style={{ backgroundColor: '#EEEEEE', height: 1, marginVertical: 15 }} /> */}

            {/* Social Media Section Start */}
            {/* 1st */}
            {/* <View style={styles.flex}>
                                <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
                                    <View style={styles.flex}>
                                        <Insta height={getHp(30)} width={getHp(30)} />
                                        <Text
                                            style={styles.socialText}>
                                            {'Instagram'}
                                        </Text>
                                    </View>
                                    <Text
                                        style={[
                                            styles.headerTitle,
                                            { color: '#1FAEF7', fontFamily: 'AvenirNext-Medium', marginRight: getWp(10) },
                                        ]}>
                                        {'Connect'}
                                    </Text>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}

            {/* 2nd */}
            {/* <View style={styles.flex}>
                                <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
                                    <View style={styles.flex}>
                                        <Spotify height={getHp(30)} width={getHp(30)} />
                                        <Text
                                            style={styles.socialText}>
                                            {'Spotify'}
                                        </Text>
                                    </View>
                                    <Text
                                        style={[
                                            styles.headerTitle,
                                            {
                                                color: '#1FAEF7',
                                                fontFamily: 'AvenirNext-Medium',
                                                marginRight: getWp(10)
                                            },
                                        ]}>
                                        {'Connect'}
                                    </Text>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}

            {/* 3rd */}
            {/* <View style={[styles.flex, { marginBottom: getHp(30) }]}>
                                <TouchableOpacity style={[styles.socialButton, styles.shadowStyle,]}>
                                    <View style={styles.flex}>
                                        <AppleMusic height={getHp(30)} width={getHp(30)} />
                                        <Text
                                            style={styles.socialText}>
                                            {'Apple Music'}
                                        </Text>
                                    </View>
                                    <Text
                                        style={[
                                            styles.headerTitle,
                                            {
                                                color: '#1FAEF7',
                                                fontFamily: 'AvenirNext-Medium',
                                                marginRight: getWp(10)
                                            },
                                        ]}>
                                        {'Connect'}
                                    </Text>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}

            {/* 4th */}
            {/* <View style={styles.flex}>
                                <TouchableOpacity style={[styles.socialButton, {
                                    borderWidth: 1,
                                    borderColor: '#DDDDDD',
                                    elevation: 0
                                }]}>
                                    <View style={styles.flex}>
                                        <Tiktok height={getHp(30)} width={getHp(30)} />
                                        <TextInput
                                            placeholder={`@tiktok`}
                                            placeholderTextColor={'#999999'}
                                            onChangeText={value => setTiktok(value)}
                                            style={[styles.socialText, styles.TiktokStyle]}
                                            value={tiktok}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}

            {/* 5th */}
            {/* <View style={styles.flex}>
                                <TouchableOpacity style={[styles.socialButton, {
                                    borderWidth: 1,
                                    borderColor: '#DDDDDD',
                                    elevation: 0
                                }]}>
                                    <View style={styles.flex}>
                                        <Snapchat height={getHp(30)} width={getHp(30)} />
                                        <TextInput
                                            placeholder={`@snapchat`}
                                            placeholderTextColor={'#999999'}
                                            // onChangeText={value => setSnapchat(value)}
                                            style={[styles.socialText, styles.TiktokStyle]}
                                        // value={snapchat == '' ? '' : snapchat}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}

            {/* 6th */}
            {/* <View style={styles.flex}>
                                <TouchableOpacity style={[styles.socialButton, {
                                    borderWidth: 1,
                                    borderColor: '#DDDDDD',
                                    elevation: 0
                                }]}>
                                    <View style={styles.flex}>
                                        <Twitter height={getHp(30)} width={getHp(30)} />
                                        <TextInput
                                            placeholder={`@twitter`}
                                            placeholderTextColor={'#999999'}
                                            onChangeText={value => setTwitter(value)}
                                            style={[styles.socialText, styles.TiktokStyle]}
                                            value={twitter}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}

            {/* 7th */}
            {/* <View style={styles.flex}>
                                <TouchableOpacity style={[styles.socialButton, {
                                    borderWidth: 1,
                                    borderColor: '#DDDDDD',
                                    elevation: 0
                                }]}>
                                    <View style={styles.flex}>
                                        <Linkedin height={getHp(30)} width={getHp(30)} />
                                        <TextInput
                                            placeholder={`@linkedin `}
                                            placeholderTextColor={'#999999'}
                                            onChangeText={value => setTwitter(value)}
                                            style={[styles.socialText, styles.TiktokStyle]}
                                            value={twitter}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <GreyCross height={getHp(15)} width={getWp(15)} style={{ marginLeft: 20 }} />
                            </View> */}
          </View>
          <View
            style={[
              styles.flex,
              {
                paddingHorizontal: 10,
                marginBottom: getHp(60),
              },
            ]}></View>
          <View style={{paddingVertical: 10}} />
        </View>
      </ScrollView>
    </Scaffold>
  );
};
GuestProfile.routeName = '/GuestProfile';

export default observer(GuestProfile);

/*
 
 getInitalRelation.friendRequestStatus == 'FriendRequestApproved' ? "Friends"
                                                    :
                                                    getInitalRelation.friendRequestStatus == 'NoFriendRequest' ?
                                                        "Add Friend"
                                                        :
                                                        getInitalRelation.friendRequestStatus == 'FriendRequestSent' ?
                                                            "Pending"
                                                            :
                                                            getInitalRelation.friendRequestStatus == 'FriendRequestDenied' ?
                                                                "Denied"
                                                                :
                                                                "FriendRequestPendingApproval"
                                                                */
/*

 {authStore.user.user.id ==
              guestUserWithParties.id ? null : isIBlockedThisUser ? (
                <Buttons.PrimaryButton
                  onPress={onPressBlockUser}
                  withShadow={false}
                  titleStyle={{color: '#FF2E00', fontSize: FONTSIZE.Text14}}
                  title={'Blocked'}
                  containerStyle={{
                    backgroundColor: '#FFD0C6',
                    borderRadius: getHp(10),
                    width: getWp(100),
                    height: getHp(30),
                  }}
                />
              ) : (
                <LinearGradient
                  pointerEvents={
                    FriendShipStatus.NoFriendRequest ==
                      guestUserWithParties?.friendRequestStatus ||
                    FriendShipStatus.FriendRequestApproved ==
                      guestUserWithParties?.friendRequestStatus
                      ? 'auto'
                      : 'none'
                  }
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0}}
                  colors={['#4FC3FF', '#00A7FD']}
                  style={[
                    {
                      borderRadius: 5,
                    },
                  ]}>
                  <TouchableOpacity
                    style={[
                      styles.editButtonStyle,
                      styles.shadowStyle,
                      {
                        paddingVertical: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00A7FD',
                      },
                    ]}
                    onPress={handleSubmit}>
                    <Text style={styles.editButton}>
                      {FriendShipStatus.forText(
                        guestUserWithParties.friendRequestStatus,
                      )}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
              */
