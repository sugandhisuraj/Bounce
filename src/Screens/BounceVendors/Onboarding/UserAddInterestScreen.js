import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Scaffold,
  TagsCollapsible,
  Media,
  Header,
  Footer,
  CustomText,
} from '@components';
import {FONTSIZE, getHp, getWp} from '@utils';
import {observer} from 'mobx-react';
import {Spotify, AppleMusic} from '@svg';
import MobxStore from '../../../mobx';
import {PartyService, ApiClient, AuthService} from '../../../app/services';
import {Divider} from 'react-native-paper';
import ToastUtil from '../../../app/constants/toast';
import UserHomeDrawerNavigator from '../../../navigation/UserNavigation/drawerNavigation';
function UserAddInterestScreen(props) {
  const {navigation} = props;
  const {userData} = props.route.params;
  const {tagStore, interestedParty, authStore} = MobxStore;

  useEffect(() => {
    onScreenLoad();
  }, []);
  const onScreenLoad = async () => {
    try {
      MobxStore.toggleLoader(true);
      interestedParty.interestedTags.sync([]);
      await PartyService.getTags();
      await PartyService.getAllPublicParties();
    } catch (error) {
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const handleSubmit = async () => {
    if (interestedParty.interestedTags.tags.length == 0) {
      return ToastUtil('Add atleast 1 Interest');
    }
    try {
      MobxStore.toggleLoader(true);
      const savePartyTagsResponse = await PartyService.addInterest(
        interestedParty.interestedTags.tags,
        {Authorization: `Bearer ${userData.accessToken}`},
      );
      let actualUserData = await AuthService.getUserByToken(
        userData.accessToken,
      );
      userData.user = actualUserData;
      userData.token = userData.accessToken;

      AuthService.onUserAuthenticated(userData);
      if (
        MobxStore.authStore.user?.isAuthenticated &&
        MobxStore.authStore.user?.isUser
      ) {
        return navigation.replace(UserHomeDrawerNavigator.routeName);
      }
    } catch (error) {
      console.log('ERROR_WHILE_CREATE_USER - ', error);
      ToastUtil(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const onSelectTags = ({tag, subTags}) => {
    try {
      interestedParty.interestedTags.onSelectTag(tag, subTags);
    } catch (error) {
      console.log('ERROR_ONSELECT - ', error);
    }
  };
  console.log('SELECTED_TAGS - ', interestedParty.interestedTags.tags);
  return (
    <Scaffold
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}
      statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <ScrollView bounces={false} style={styles.container}>
        <View
          style={{paddingHorizontal: getWp(12), backgroundColor: '#FBFBFB'}}>
          <Text
            style={[
              styles.headerTitle,
              {
                fontSize: FONTSIZE.Text22,
                marginTop: getHp(15),
                color: '#1FADF7',
              },
            ]}>
            {'Add Interests 💚'}
          </Text>
          <Text
            style={[
              styles.headerTitle,
              {
                fontSize: FONTSIZE.Text14,
                fontFamily: 'AvenirNext-Regular',
                letterSpacing: 0.2,
                marginBottom: getHp(15),
                fontWeight: '500',
              },
            ]}>
            {`Pick at least three tags for events, activities, and people reccomendations`}
          </Text>
        </View>

        <View style={{paddingHorizontal: getWp(0)}}>
          {tagStore.getTags().map(t => {
            return (
              <TagsCollapsible
                MyInterest={true}
                Data={t.clone()}
                onAdd={onSelectTags}
                isOnSelect={({tagObj, item}) => {
                  let isExist = interestedParty.interestedTags.isTagSelected(
                    tagObj,
                    item,
                  );
                  return isExist.tagExist && isExist.subTagExist;
                }}
              />
            );
          })}
        </View>
        <Divider style={{marginVertical: getHp(20)}} />
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.shadowStyle, styles.SaveButton]}>
        <Text
          style={{
            color: '#000',
            fontFamily: 'AvenirNext-DemiBold',
            fontSize: FONTSIZE.Text21,
          }}>
          {`${MobxStore.interestedParty.computeAddInterestResults()} Result`}
        </Text>
      </TouchableOpacity>
    </Scaffold>
  );
}
UserAddInterestScreen.routeName = '/UserAddInterestScreen';
export default observer(UserAddInterestScreen);

const styles = StyleSheet.create({
  SaveButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(50),
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 17,
    marginTop: getHp(15),
  },
  smallButtonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    elevation: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#FBFBFB',
    flex: 1,
    marginTop: getHp(20),
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  firstBlock: {
    marginBottom: getHp(20),
    paddingTop: getHp(10),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  addInterest: {
    elevation: 5,
    backgroundColor: '#fff',
    height: getHp(130),
    width: getHp(150),
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999999',
  },
  headerTitle: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-DemiBold',
  },
  itemView: {
    height: 35,
    backgroundColor: '#F2F5F6',
    justifyContent: 'center',
    paddingHorizontal: getHp(15),
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  socialButton: {
    height: getHp(50),
    elevation: 0,
    borderRadius: 13,
    paddingHorizontal: getWp(10),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

/* 
<TouchableOpacity
          onPress={() => {
            console.log("SKIP_CALL");
            window.showSkipAddInterestInfo();
          }}
          style={[
            styles.SaveButton,
            {
              backgroundColor: '#FBFBFB',
              marginTop: 5,
            },
          ]}>
          <Text
            style={{
              color: '#1FAEF7',
              fontFamily: 'AvenirNext-DemiBold',
              fontSize: FONTSIZE.Text16,
            }}>
            {'Skip'}
          </Text>
        </TouchableOpacity>
        */
