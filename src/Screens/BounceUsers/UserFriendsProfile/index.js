import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  Linking,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import {
  Header,
  ImageCarousel,
  Tabview,
  FriendsListRender,
  Footer,
  CustomText,
  Lists,
  ListTiles,
  Scaffold,
} from '@components';
import {useBackHandler} from '@react-native-community/hooks';
import {DJ, DJ1, DJ2} from '@assets';
import {styles} from './indexCss';
import {BlackMenubar, Scanner, AppleMusic, BluePerson} from '@svg';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {connect, useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {pickDocument} from '@hooks';
import MobxStore from '../../../mobx';
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
} from '@svg';
import {
  AccountService,
  AppNotificationService,
  DeviceContactService,
  FriendRequestService,
  PartyService,
  SpotifyService,
  VendorService,
} from '../../../app/services';
import {observer} from 'mobx-react';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Toast} from '@constants';
import HostProfile from '../HostProfile/HostProfile';
import Right from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import FriendsPage from '../Profile/FriendsPage';

import MyBounceWithFriends from '../MyBounceWithFriends';
import {useIsFocused} from '@react-navigation/native';
import ToastUtil from '../../../app/constants/toast';
import {Music} from '@svg';
import GuestProfile from '../../BounceUsers/Profile/GuestProfile';
import {PriceInfoRow} from '../../../components';
Text.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};

function UserFriendsProfile(props) {
  const {authStore} = MobxStore;
  const userinfo = authStore.user;
  const [getMedia, setMedia] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const imageArray = [DJ, DJ1, DJ2];
  const [state, setState] = useState(0);
  const isFocused = useIsFocused();
  useBackHandler(() => {
    if (isFocused) {
      Alert.alert(
        'Message',
        'Sure Exit App?',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Exit',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
    return isFocused;
  });
  const {
    friends,
    username,
    fullName,
    city,
    about,
    profession,
    snapchatUsername,
    instagramUsername,
    tiktokUsername,
    twitterUsername,
    linkedInUsername,
    profileImage = {},
    age,
  } = userinfo?.user;

  const connectSpotify = async () => {
    if (Platform.OS == 'ios') {
      return ToastUtil('Working in Progress');
    }
    return await SpotifyService.connectToSpotify();
  };

  useEffect(() => {
    PartyService.getTags();
    PartyService.getParty();
    //FriendRequestService.getAllUser();
    AppNotificationService.getUserNotification();
    // DeviceContactService.checkPermission();
    VendorService.setFavoritesVendor(false);
    //PartyService.getNewsFeed(false);
  }, [authStore.user]);

  const handleCarousel = () => {
    return (
      <View
        style={
          {
            // flexDirection: 'row',
            // flexWrap: 'wrap',
            // width: '100%'
          }
        }>
        <FlatList
          data={friends}
          renderItem={item => {
            return <FriendsListRender item={item} />;
          }}
          keyExtractor={index => index}
          // horizontal
          // style={{flexWrap: 'wrap',}}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
        />
      </View>
    );
  };

  const handleImage = async () => {
    {
      vendorType !== 'Bartender' &&
      vendorType !== 'Catering' &&
      vendorType !== 'Event Rentals'
        ? ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
          }).then(images => {
            setMedia(
              images.map(i => {
                return i.path;
              }),
            );
          })
        : pickDocument();
    }
  };

  const onFriendAvatarPress = async guestUser => {
    try {
      props.navigation.navigate(GuestProfile.routeName, {
        guestUser
      });
    } catch (error) {}
  };
  let spotifyStatus = authStore.getSpotifyData();

  const tags = [
    {
      name: 'EDM',
    },
    {
      name: 'Hip Hop',
    },
  ];
  console.log('test - ', JSON.stringify(MobxStore.authStore.user));
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      {!loader && (
        <Header
          AllAccounts={authStore.AllAccounts}
          leftDropdown={
            username !== null ? `@${username !== null ? username : ''}` : ''
          }
          scanner={<Scanner height={25} width={25} />}
          share={<BlackMenubar height={25} width={25} />}
          onPressScanner={() => props.navigation.navigate(QRcode.routeName)}
          onPress={() => {
            props.navigation.openDrawer();
          }}
          headerBackColor={{backgroundColor: '#FFFFFF'}}
          {...props}
        />
      )}
      <View>
        {/* <ListTiles.ToggleSubTagTile 
        data={tags[0]}
      /> */}
      </View>

      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: '#FBFBFB',
        }}>
        <Spinner visible={loader} color={'#1FAEF7'} />
        {!loader && (
          <View>
            <View style={styles.subContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Avatar
                  source={{uri: `${profileImage?.filePath}`}}
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
                    {fullName}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.cityAll]}>
                      {age}
                      {city && city != 'null' && ' • ' + city.split(',', 1)}
                      {profession && profession != 'null' && ' • ' + profession}
                    </Text>
                    {(!profession || profession == '') && (
                      <TouchableOpacity
                        style={[
                          styles.editButtonStyle,
                          styles.shadowStyle,
                          {
                            width: getWp(48),
                            paddingHorizontal: getWp(0),
                            paddingVertical: 1,
                            marginLeft: getWp(10),
                          },
                        ]}
                        onPress={() =>
                          props.navigation.navigate(HostProfile.routeName)
                        }>
                        <Icon name="plus" color={'#1FAEF7'} size={15} />
                        <Text style={[styles.editButton, {}]}>{'Job'}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* <View style={[styles.flex]}>
                    {
                      <>
                        <Text style={styles.cityAll}>{age}</Text>
                        <View style={styles.dot} />
                      </>
                    }

                    {!(city == '' || city == 'null' || city == null) && (
                      <>
                        <Text style={styles.cityAll}>
                          {city.split(',', 1)}
                           
                        </Text>
                        <View style={styles.dot} />
                      </>
                    )}

                    {!(
                      profession == null ||
                      profession == '' ||
                      profession == 'null'
                    ) ? (
                      <Text style={styles.cityAll}>{profession}</Text>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.editButtonStyle,
                          styles.shadowStyle,
                          {
                            width: getWp(48),
                            paddingHorizontal: getWp(0),
                            paddingVertical: 1,
                            marginLeft: 2,
                          },
                        ]}
                        onPress={() =>
                          props.navigation.navigate(HostProfile.routeName)
                        }>
                        <Icon name="plus" color={'#1FAEF7'} size={15} />
                        <Text style={[styles.editButton, {}]}>{'Job'}</Text>
                      </TouchableOpacity>
                    )}
                  </View> */}
                </View>
              </View>

              <View
                style={[
                  styles.flex,
                  {width: '80%', marginVertical: 10, alignItems: 'center'},
                ]}>
                <TouchableOpacity
                  style={[
                    styles.editButtonStyle,
                    styles.shadowStyle,
                    {paddingVertical: 5, marginRight: getWp(15)},
                  ]}
                  onPress={() =>
                    props.navigation.navigate(HostProfile.routeName)
                  }>
                  <Text style={styles.editButton}>{'Edit Profile'}</Text>
                </TouchableOpacity>

                {instagramUsername != null && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.instagram.com/${instagramUsername}`,
                      )
                    }>
                    <Insta height={getHp(30)} width={getWp(30)} />
                  </TouchableOpacity>
                )}

                {!(
                  tiktokUsername == null ||
                  tiktokUsername == '' ||
                  tiktokUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.tiktok.com/${tiktokUsername}`,
                      )
                    }>
                    <Tiktok height={getHp(28)} width={getWp(28)} />
                  </TouchableOpacity>
                )}

                {!(
                  twitterUsername == null ||
                  twitterUsername == '' ||
                  twitterUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(`https://twitter.com/${twitterUsername}`)
                    }>
                    <Twitter height={getHp(29)} width={getWp(29)} />
                  </TouchableOpacity>
                )}

                {!(
                  snapchatUsername == null ||
                  snapchatUsername == '' ||
                  snapchatUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.snapchat.com/add/${snapchatUsername}`,
                      )
                    }>
                    <Snapchat height={getHp(31)} width={getWp(31)} />
                  </TouchableOpacity>
                )}

                {!(
                  linkedInUsername == null ||
                  linkedInUsername == '' ||
                  linkedInUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() => Linking.openURL(`${linkedInUsername}`)}>
                    <Linkedin height={getHp(31)} width={getWp(30)} />
                  </TouchableOpacity>
                )}
              </View>

              {!(about == '' || about == 'null' || about == null) && (
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
                    {about}
                  </Text>
                </>
              )}

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
                  style={[
                    styles.fullTouch,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                  onPress={() => {
                    console.log('CLICK');
                    props.navigation.navigate(MyBounceWithFriends.routeName);
                  }}>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        marginRight: 15,
                        fontSize: FONTSIZE.Text16,
                      },
                    ]}>
                    {'Bounce with Friends'}
                  </Text>
                  <Right name="angle-right" color="#FFFFFF" size={25} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {/* Subcontainer view end  */}

            <Tabview {...props} />

            <View
              style={{
                height: 1,
                backgroundColor: '#EEEEEE',
                marginTop: 10,
                marginBottom: 15,
              }}
            />

            <View style={{paddingHorizontal: 10}}>
              {/* First Gallery Block of Friends */}
              {friends?.length == 0 || friends?.length == undefined ? (
                <TouchableOpacity
                  style={[
                    styles.fullTouch,
                    styles.linearGradient,
                    styles.shadowStyle,
                    {
                      height: getHp(50),
                      borderRadius: 13,
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={() =>
                    props.navigation.navigate(FriendsPage.routeName, {
                      actionType: FriendsPage.types.FindFriends,
                    })
                  }>
                  <BluePerson height={25} width={19} />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        marginLeft: 20,
                        fontFamily: 'AvenirNext-DemiBold',
                        color: '#1FAEF7',
                      },
                    ]}>
                    {'Find Friends'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{marginVertical: 5, paddingVertical: 10}}>
                  <Lists.FriendAvatarList
                    onPress={onFriendAvatarPress}
                    containerStyle={{marginTop: 10}}
                    DataList={friends}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(FriendsPage.routeName, {
                        contactTitle: 'See All Friends',
                        FriendsList: friends,
                      })
                    }
                    style={styles.allFrnds}>
                    <Text style={[styles.aboutText]}>{'See All Friends'}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/*END*** First Gallery Block of Friends */}

              <View
                style={{
                  backgroundColor: '#EEEEEE',
                  height: 1,
                  marginVertical: 15,
                }}
              />

              {/* <ListTiles.SocialTile
                SocialIcon={<Insta height={getHp(30)} width={getHp(30)} />}
                title={'Instagram'}
              />
              <ListTiles.SocialTile
                containerStyle={{marginTop: getHp(14)}}
                onActionTitlePress={() => {
                  if (spotifyStatus.connected || Platform.OS == 'ios') {
                    return ToastUtil('Functionality Under development');
                  }
                  connectSpotify();
                }}
                SocialIcon={<Spotify height={getHp(30)} width={getHp(30)} />}
                title={'Spotify'}
                actionTitle={spotifyStatus.connected ? 'Refresh' : 'Connect'}
              />
              <ListTiles.SocialTile
                containerStyle={{marginTop: getHp(14)}}
                SocialIcon={<AppleMusic height={getHp(30)} width={getHp(30)} />}
                title={'Apple Music'}
              /> */}
            </View>

            {/* {spotifyStatus.connected && spotifyStatus.topTracks.length > 0 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: getWp(22),
                    marginBottom: getHp(25),
                    marginTop: getHp(35),
                  }}>
                  <Music height={getHp(20)} width={getWp(20)} />
                  <Text
                    style={{
                      marginLeft: getHp(5),
                      fontWeight: '500',
                      fontSize: FONTSIZE.Text15,
                      color: '#000',
                    }}>
                    Favorite Music
                  </Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {spotifyStatus.topTracks.map(track => {
                    return <ListTiles.SpotifyFavoriteMusic track={track} />;
                  })}
                </ScrollView>
              </>
            )} */}
          </View>
        )}
        <View style={{height: 100}} />
      </ScrollView>
      {/* </View> */}
    </Scaffold>
  );
}
UserFriendsProfile.routeName = '/UserFriendsProfile';
export default observer(UserFriendsProfile);
