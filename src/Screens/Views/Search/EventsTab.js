import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FONTSIZE, getHp, getWp} from '@utils';

import {PartyService} from '../../../app/services';
import MobxStore from '../../../mobx';
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import {RegexCollection} from '@constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {observer} from 'mobx-react';
import {PartyUtils} from '../../../app/utils';
import {widthPercentageToDP} from 'react-native-responsive-screen';

function EventsTab(props) {
  const {searchEvents} = MobxStore;

  const renderEvents = ({item, index}) => {
    const partyCoverPhoto = PartyUtils.getPartyCoverPhoto(item.gallery); 
    let partyAddress = item?.location?.addressStr;
    if (partyAddress.length > 50) {
      partyAddress = partyAddress.substr(0, 48) + '...';
    }
    return (
      <TouchableOpacity
        onPress={() =>
          // props.navigation.navigate(HostView.routeName, {
          //   party: item,
          // })
          PartyService.navigationToEventPageOrNewsFeed(item)
        }
        key={index}
        style={{backgroundColor: '#FBFBFB'}}>
        <View
          style={{
            backgroundColor: '#FBFBFB',
            borderRadius: 10,
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: getHp(12),
          }}>
          <Avatar
            source={partyCoverPhoto}
            size={125}
            avatarStyle={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
          />

          <View style={{marginLeft: 10, flex: 1, paddingVertical: 5}}>
            <Text
              style={[
                styles.EventsTextStyle,
                {color: '#000', marginVertical: 5, fontSize: FONTSIZE.Text16},
              ]}>
              {item?.title}
            </Text>
            <Text
              style={[
                styles.EventsTextStyle,
                {
                  color: '#000',
                  marginVertical: 3,
                  fontSize: FONTSIZE.Text13,
                  fontFamily: 'AvenirNext-Medium',
                },
              ]}>
              {partyAddress}
            </Text>
            <Text
              style={[
                styles.EventsTextStyle,
                {
                  color: '#000',
                  marginVertical: 3,
                  fontSize: FONTSIZE.Text13,
                  fontFamily: 'AvenirNext-Medium',
                },
              ]}>
              {moment.utc(item?.date).format(RegexCollection.PartyTimeFormat)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FBFBFB'}}>
      <ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={{marginTop: getHp(15)}}>
        <View
          style={{
            paddingHorizontal: 10,
            backgroundColor: '#FBFBFB',
            flex: 1,
          }}>
          {searchEvents.searchEvents.length > 0 && (
            <FlatList
              bounces={false}
              data={searchEvents.searchEvents}
              renderItem={renderEvents}
              keyExtractor={index => index}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: '110%',
                    marginVertical: getHp(12),
                    borderWidth: getHp(1),
                    borderColor: '#E4EEF1',
                  }}
                />
              )}
              style={{marginTop: getHp(5), marginBottom: getHp(20)}}
            />
          )}
        </View>
        <View style={{height: 60}} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  EventsTextStyle: {
    color: '#FFFFFF',
    fontSize: FONTSIZE.Text13,
    fontFamily: 'AvenirNext-Bold',
  },
  shadowStyle: {
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  searchBarStyle: {
    elevation: 0,
    borderRadius: 9,
    backgroundColor: '#F2F5F6',
    height: getHp(32),
    fontSize: FONTSIZE.Text14,
    width: '80%',
    alignSelf: 'center',
  },
  sliderStyle: {
    marginVertical: 20,
  },
  tagsStyle: {
    backgroundColor: '#F2F5F6',
    borderRadius: 13,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: getWp(10),
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    elevation: 2,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 20,
  },
  QRcontainer: {
    elevation: 5,
    padding: 30,
    borderRadius: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    paddingTop: 80,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  textStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text14,
  },
  allFrnds: {
    width: '100%',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    height: 46,
  },
  fullTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

EventsTab.routeName = '/EventsTab';
export default observer(EventsTab);
