import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {
  CustomTextinput,
  FloatingInput,
  CustomButton,
  ConnectSocialMedia,
  InputSocialMedia,
  GooglePlacesInput,
  HostToggleButton,
  Header,
  ListTiles,
} from '@components';
import {Avatar} from 'react-native-elements';
import {
  UploadBlue,
  BlackClose,
  Spotify,
  AppleMusic,
  Insta,
  Linkedin,
  Twitter,
  Tiktok,
  Snapchat,
} from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import {FONTSIZE} from '@utils';
import {useSelector, useDispatch} from 'react-redux';
import {getHp, getWp} from '@utils';
import Spinner from 'react-native-loading-spinner-overlay';
import {PrivacyBlock, Toggle} from '@components';
import {ApiClient, AuthService} from '../../../app/services';
import MobxStore from '../../../mobx';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './indexCss.js'; 
import {ConfirmationPopups} from '../../../components/AppPopups';
export default function HostProfile(props) {
  console.log('PROPS -> ', props);
  const {user: userinfo} = MobxStore.authStore;
  let spotifyStatus = MobxStore.authStore.getSpotifyData();
  const [loader, setLoader] = useState(false);
  const [fullName, setFullname] = useState('');
  const [getBirthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');

  const [instagram, setInstagram] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [friendCount, setFriendCount] = useState(false);
  const [hosting, setHosting] = useState(false);
  const [attending, setAttending] = useState(false);
  const [interested, setInterested] = useState(false);

  const dispatch = useDispatch();
  const token = userinfo?.token;
  const user = userinfo?.user;
  if (!user) {
    return null;
  }
  const connectSpotify = async () => {
    if (Platform.OS == 'ios') {
      return Toast('Working in Progress');
    }
    return await SpotifyService.connectToSpotify();
  };
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPicture(image.path);
    });
  };

  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => setPicture(null)}
        style={styles.crossButton}>
        <BlackClose height={15} width={15} />
      </TouchableOpacity>
    );
  };

  // useEffect(() => {
  //   AuthService.reloadUser();
  // }, [MobxStore.authStore.user]);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    
    console.log("USER_HERE - ", JSON.stringify(user));
    setLoader(true);
    setPicture(user?.profileImage?.filePath);
    setFullname(user?.fullName);
    setBio(user?.about);
    setProfession(user?.profession);
    setCity(user?.city);
    setBirthday(user.birthday);

    setSnapchat(user?.snapchatUsername);
    setTiktok(user?.tiktokUsername);
    setTwitter(user?.twitterUsername);
    setLinkedIn(user?.linkedInUsername);

    setFriendCount(user?.friendCount);
    setHosting(user?.hosting);
    setAttending(user?.attending);
    setInterested(user?.interested);
    setLoader(false);
  };

  const handleSubmit = async () => {
    if (picture == null) {
      Toast('Please select a profile picture!');
      return;
    }
    setLoader(true);

    let milliseconds = new Date().getTime();
    let imgObj = {
      uri: `${picture}`,
      type: 'image/jpeg',
      name: `image-${milliseconds}.jpg`,
    };

    let formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('city', city);
    formData.append('birthday', getBirthday);
    formData.append('about', bio);
    formData.append('profession', profession);
    formData.append('profileImageFile', imgObj);
    formData.append('friendCount', friendCount);
    formData.append('hosting', hosting);
    formData.append('attending', attending);
    formData.append('interested', interested);
    formData.append('snapchatUsername', snapchat);
    formData.append('tiktokUsername', tiktok);
    formData.append('twitterUsername', twitter);
    formData.append('linkedInUsername', linkedIn);

    console.log('TOKEN', token);
    console.log(
      'Hosting->attending->interested',
      hosting,
      attending,
      interested,
    );

    await ApiClient.authInstance
      .post(ApiClient.endPoints.postUser, formData)
      .then(async i => {
        //await fetchProfile();
        //MobxStore.authStore.async.reloadUser();
        AuthService.reloadUser();
        console.log(i);
        if (i.status == 201 || i.status == 200) {
          setLoader(false);
          setTimeout(() => {
            Toast('Profile Updated Successfully!');
            props.navigation.goBack();
          }, 100);
        }
      })
      .catch(e => {
        console.log(e);
        setLoader(false);
      });

    setLoader(false);
  };
  const onPressBack = () => {
    if (
      user?.profileImage?.filePath == picture &&
      user?.fullName == fullName &&
      user?.profession == profession &&
      user?.about == bio &&
      user?.friendCount == friendCount &&
      user?.hosting == hosting &&
      user?.attending == attending &&
      user?.interested == interested
    ) {
      props.navigation.goBack();
      return;
    }
    return MobxStore.popupStore.setConfirmationPopup({
      visible: true,
      type: ConfirmationPopups.popupType.LeaveHostProfile,
      onCancel: () => {
        props.navigation.goBack();
      },
      onSuccess: () => {
        handleSubmit();
      },
    });
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#fff'}}>
     
      <Spinner visible={loader} color={'#1FAEF7'} />
      <Header
        back
        headerTitle={'Host Profile'}
        onPress={onPressBack}
        headerBackColor={{backgroundColor: '#fff'}}
      />
      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        {picture == null ? (
          <TouchableOpacity
            onPress={handleImage}
            style={{
              padding: 20,
              marginVertical: getHp(30),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <UploadBlue height={getHp(90)} width={getHp(90)} />
            <Text
              style={{
                fontSize: FONTSIZE.Text16,
                color: '#000',
                marginTop: 10,
                fontFamily: 'AvenirNext-Regular',
              }}>
              {'Upload Profile Picture'}
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <View
              style={{
                marginVertical: getHp(0),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => openFooter(true)}
                style={{marginVertical: 30}}>
                <Avatar
                  source={{
                    uri: picture,
                  }}
                  size={getHp(150)}
                  rounded
                />
                <View style={{alignItems: 'center'}}>
                  <UploadBlue
                    height={getHp(60)}
                    width={getWp(60)}
                    style={{
                      position: 'absolute',
                      bottom: -25,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                {footer ? <ImageFooter /> : null}
              </TouchableOpacity>
            </View>
          </>
        )}

        <View
          style={{
            backgroundColor: '#FBFBFB', 
          }}>
          <View style={{paddingHorizontal: getWp(10)}}>
            <FloatingInput
              custom
              floatingLabel={'Full Name'}
              value={fullName == '' ? '' : fullName}
              onChange={value => setFullname(value)}
            />

            <GooglePlacesInput
              custom
              floatingLabel={'City'}
              onPress={data => {
                setCity(data.description);
              }}
              value={city === 'null' ? '' : city}
            />

            <FloatingInput
              custom
              floatingLabel={'Profession'}
              value={profession == 'null' ? '' : profession}
              onChange={value => setProfession(value)}
            />

            <CustomTextinput
              custom
              text={'Bio'}
              multiline
              value={bio == 'null' ? '' : bio}
              onChange={value => setBio(value)}
            />

            {/* </View> */}

            <View
              style={{
                backgroundColor: '#F2F5F6',
                height: getHp(8),
                marginVertical: getHp(30),
              }}
            />

             
           
          </View>

          {/* Privacy Block */}
          {/* <View
            style={{
              backgroundColor: '#F2F5F6',
              height: getHp(8),
              marginVertical: getHp(30),
            }}
          /> */}

          <View style={{paddingHorizontal: getWp(10)}}>
            <Text style={[styles.privacyTitle]}>{'Privacy Settings'}</Text>
            <Text
              style={{
                fontFamily: 'AvenirNext-Regular',
                color: '#999999',
                fontSize: FONTSIZE.Text14,
                marginVertical: getHp(5),
              }}>
              {'Choose what you want to make public.'}
            </Text>
          </View>

          <HostToggleButton
            placeholder={'Friend Count'}
            switchOn={friendCount}
            onChange={() => setFriendCount(!friendCount)}
            containerStyle={{
              paddingHorizontal: getWp(10),
              marginVertical: getHp(20),
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
            }}
          />

          <Text
            style={{
              fontFamily: 'AvenirNext-Regular',
              color: '#999999',
              fontSize: FONTSIZE.Text14,
              marginBottom: getHp(10),
              paddingHorizontal: getWp(10),
            }}>
            {'Only public events from the news feed are shared.'}
          </Text>

          <HostToggleButton
            placeholder={'Hosting'}
            switchOn={hosting}
            onChange={() => setHosting(!hosting)}
          />
          <HostToggleButton
            placeholder={'Attending'}
            switchOn={attending}
            onChange={() => setAttending(!attending)}
          />
          <HostToggleButton
            placeholder={'Interested'}
            switchOn={interested}
            onChange={() => setInterested(!interested)}
          />
        </View>
        {/*Endd Privacy Block */}

        <View style={{paddingHorizontal: getWp(10)}}>
          <CustomButton
            complete
            bar
            onPress={handleSubmit}
            ButtonTitle={'Save Changes'}
            containerStyleProp={{marginBottom: 2}}
          />
        </View>
      </KeyboardAwareScrollView>
    </Scaffold>
  );
}
HostProfile.routeName = '/HostProfile';

/*


              <InputSocialMedia
                icon={<Tiktok height={getHp(28)} width={getWp(28)} />}
                placeholder={`@tiktok`}
                onChangeText={value => setTiktok(value)}
                value={tiktok == 'null' ? '' : tiktok}
              />
              <InputSocialMedia
                icon={<Snapchat height={getHp(31)} width={getHp(31)} />}
                placeholder={`@snapchat`}
                onChangeText={value => setSnapchat(value)}
                value={snapchat == 'null' ? '' : snapchat}
              />
              <InputSocialMedia
                icon={<Twitter height={getHp(29)} width={getWp(29)} />}
                placeholder={`@twitter`}
                onChangeText={value => setTwitter(value)}
                value={twitter == 'null' ? '' : twitter}
              />
              <InputSocialMedia
                icon={<Linkedin height={getHp(31)} width={getHp(30)} />}
                placeholder={`@linkedin`}
                onChangeText={value => setLinkedIn(value)}
                value={linkedIn == 'null' ? '' : linkedIn}
              />
              */

              /*

               <Text
              style={[
                styles.headerTitle,
                {
                  fontSize: FONTSIZE.Text18,
                  marginBottom: getHp(15),
                  color: '#000',
                  fontFamily: 'AvenirNext-Medium',
                },
              ]}>
              {'App Sync'}
            </Text>

            <ListTiles.SocialTile
              type={ListTiles.SocialTile.types.Connect}
              containerStyle={{marginTop: getHp(10)}}
              onActionTitlePress={() => {
                if (spotifyStatus.connected || Platform.OS == 'ios') {
                  return Toast('Functionality Under development');
                }
                connectSpotify();
              }}
              SocialIcon={<Spotify height={getHp(30)} width={getHp(30)} />}
              title={'Spotify'}
              actionTitle={spotifyStatus.connected ? 'Refresh' : 'Connect'}
            />

             
            <ConnectSocialMedia
                icon={<Insta height={getHp(30)} width={getHp(30)} />}
                placeholder={`Instagram `}
              />

            
            <ConnectSocialMedia
                icon={<Spotify height={getHp(30)} width={getHp(30)} />}
                placeholder={`Spotify `}
              />

             
            <ConnectSocialMedia
                icon={<AppleMusic height={getHp(30)} width={getHp(30)} />}
                placeholder={`Apple Music `}
                containerStyle={{ marginTop: getHp(5), marginBottom: getHp(30) }}
              />
              */