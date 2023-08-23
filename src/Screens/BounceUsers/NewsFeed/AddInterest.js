import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
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

import {PartyService} from '../../../app/services';
import MobxStore from '../../../mobx';

import ToastUtil from '../../../app/constants/toast';
import ConditionalRenderNewsFeed from './ConditionalRenderNewsFeed';

function AddInterest(props) {
  const {tagStore, interestedParty} = MobxStore;
  const {user: userinfo} = MobxStore.authStore;

  useEffect(() => {
    onScreenLoad();
  }, []);
  const onScreenLoad = async () => {
    try {
      MobxStore.toggleLoader(true);
      const Tags = await PartyService.getTags();
      await PartyService.getAllPublicParties();
    } catch (e) {
      ToastUtil(
        e?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  useEffect(() => {
    interestedParty.interestedTags.sync(userinfo.user.userInterest);
  }, [userinfo]);

  const handleSubmit = async () => {
    try {
      const resp = await PartyService.addInterestController();
      if (resp != false) {
        setTimeout(() => {
          props.navigation.navigate(ConditionalRenderNewsFeed.routeName);
        }, 100);
      }
    } catch (error) {}
  };

  const onSelectTags = ({tag, subTags}) => {
    try {
      interestedParty.interestedTags.onSelectTag(tag, subTags);
    } catch (error) {
      console.log('ERROR_ONSELECT - ', error);
    }
  };

  console.log('TAG_STORE_DATA - ', JSON.stringify(tagStore.getTags()));
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        {userinfo.user.userInterest.length != 0 && (
          <Header
            headerStyleProp={{fontFamily: 'AvenirNext-DemiBold'}}
            back
            headerTitle={'My Interests'}
            onPress={() => {
              props.navigation.goBack();
            }}
            headerBackColor={{backgroundColor: '#fff', elevation: 0}}
          />
        )}
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          style={styles.container}
          contentContainerStyle={{flexGrow: 1}}>
          {userinfo.user.userInterest.length == 0 && (
            <View>
              <Text
                style={[
                  styles.headerTitle,
                  {
                    fontSize: FONTSIZE.Text22,
                    marginTop: getHp(15),
                  },
                ]}>
                {'Add Interests'}
              </Text>
              <Text
                style={[
                  styles.headerTitle,
                  {
                    fontSize: FONTSIZE.Text14,
                    fontFamily: 'AvenirNext-Regular',
                    letterSpacing: 0.2,
                    marginBottom: getHp(15),
                  },
                ]}>
                {'Personalize your feed of events!'}
              </Text>
            </View>
          )}

          {/* <Text style={[styles.headerTitle, {marginVertical: getHp(15)}]}>
            {'Music'}
          </Text> */}
          {/* First Spotify */}
          {/* <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
            <View style={styles.flex}>
              <Spotify height={getHp(30)} width={getHp(30)} />
              <Text
                style={[
                  styles.headerTitle,
                  {
                    fontFamily: 'AvenirNext-Medium',
                    marginLeft: 13,
                  },
                ]}>
                {'Spotify'}
              </Text>
            </View>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: '#1FAEF7',
                  fontFamily: 'AvenirNext-Medium',
                  marginRight: getWp(10),
                },
              ]}>
              {'Connect'}
            </Text>
          </TouchableOpacity> */}

          {/* Second Apple Music */}
          {/* <TouchableOpacity
            style={[
              styles.socialButton,
              styles.shadowStyle,
              {marginTop: getHp(5), marginBottom: getHp(30)},
            ]}>
            <View style={styles.flex}>
              <AppleMusic height={getHp(30)} width={getHp(30)} />
              <Text
                style={[
                  styles.headerTitle,
                  {fontFamily: 'AvenirNext-Medium', marginLeft: 13},
                ]}>
                {'Apple Music'}
              </Text>
            </View>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: '#1FAEF7',
                  fontFamily: 'AvenirNext-Medium',
                  marginRight: getWp(10),
                },
              ]}>
              {'Connect'}
            </Text>
          </TouchableOpacity> */}

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
          <View
            style={{height: props?.fromBottomNav ? getHp(150) : getHp(90)}}
          />
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSubmit}
          style={[
            styles.shadowStyle,
            styles.SaveButton,
            props?.fromBottomNav && {
              bottom: getHp(Platform.OS == 'ios' ? 60 : 100),
            },
          ]}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'AvenirNext-DemiBold',
              fontSize: FONTSIZE.Text21,
            }}>
            {`${MobxStore.interestedParty.computeAddInterestResults()} Result`}
          </Text>
        </TouchableOpacity>
      </View>
    </Scaffold>
  );
}
AddInterest.routeName = '/AddInterest';
export default observer(AddInterest);

const styles = StyleSheet.create({
  SaveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(50),
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 17,
    alignSelf: 'center',
    position: 'absolute',
    bottom: getHp(30),
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
