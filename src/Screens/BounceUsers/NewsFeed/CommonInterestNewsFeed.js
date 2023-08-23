import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {
  Scaffold,
  ImageCarousel,
  Media,
  CustomSearchbar,
  Header,
  CustomText,
  Buttons,
  Lists,
} from '@components';
import {FONTSIZE, getHp, smallHitSlop} from '@utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThreeDots, DJ, DJ1, DJ2} from '@assets';
import {BlackOutlineShare, Saved, BookmarkedSvg} from '@svg';
import {observer} from 'mobx-react';
import Back from 'react-native-vector-icons/AntDesign';
import {getWp} from '../../../app/utils';
import MobxStore from '../../../mobx';
import {RegexCollection} from '../../../app/constants';
import moment from 'moment';
import {BounceSmallLogo} from '@svg';
import MyBounceWithFriends from '../MyBounceWithFriends';
import {useSearchBar, useKeyboardStatus} from '@hooks';
import HostView from '../../BounceVendors/PlanParty/HostView';
import { PartyService } from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
const {height, width} = Dimensions.get('screen');

function CommonInterestNewsFeed(props) {
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();
  const [isKeyboardOpen] = useKeyboardStatus();
  const {bounceWithFriendsStore} = MobxStore;
  const [state, setState] = useState(0);

  const onBookMarkPress = async item => {
    try {
      MobxStore.toggleLoader(true);
      const onBookMarkAdded = await PartyService.addBookMark(item.id);
      await PartyService.getParty();
      ToastUtil(onBookMarkAdded?.Message ?? 'Added to Bookmark');
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const handleCarousel = imageArray => {
    return (
      <ImageCarousel
        imageArray={imageArray}
        onSnapToItem={index => setState(index)}
        state={state}
        noAddButton={false}
        value={'NewsFeed'}
        pagination={true}
      />
    );
  };

  const flatlist = ({item}) => {
    let subTags = [];
    item.partyTags.map(party => {
      subTags.push(...party.subTags);
    });
    return (
      <View style={{marginBottom: getHp(40)}}>
        {item.gallery.length > 0 && handleCarousel(item.gallery)}
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: getHp(0),
          }}>
          <View style={[styles.timeViewStyle, {paddingVertical: getHp(5)}]}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(HostView.routeName, {
                  party: item,
                });
              }}>
              <Text style={styles.eventTitleStyle}>{item.title}</Text>
            </TouchableOpacity>

            <View style={styles.downloadView}>
              <TouchableOpacity onPress={onBookMarkPress.bind(null, item)}>
                {MobxStore.partyStore.isPartyLikedByMe(item) ? (
                  <BookmarkedSvg height={24} width={22} />
                ) : (
                  <Saved height={24} width={22} />
                )}
              </TouchableOpacity>
              <BlackOutlineShare height={24} width={26} />
            </View>
          </View>
          <Text style={styles.timeStyle}>
            {moment(item.date).format(RegexCollection.PartyTimeFormat)}
          </Text>
          <RenderSubTags
            shouldCheckForExist={true}
            subTagsData={subTags}
            containerStyle={{marginTop: getHp(30)}}
          />
        </View>
      </View>
    );
  };
  const RenderSubTags = ({
    subTagsData,
    containerStyle = {},
    shouldCheckForExist = false,
  }) => {
    return (
      <ScrollView 
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
      style={[styles.collapsedContainer, containerStyle]}>
        {subTagsData.map(subTags => {
          let emoji = subTags?.emoji ? subTags?.emoji : '';
          let title = subTags?.name ? subTags?.name : subTags;
          let backgroundColor = !shouldCheckForExist ? '#CEF6E8' : '#F2F5F6';
          if (shouldCheckForExist) {
            let isTagExist =
              bounceWithFriendsStore.isTagExistInCommonTags(subTags);
            if (isTagExist) {
              backgroundColor = '#CEF6E8';
            }
          }
          return (
            <View style={[styles.itemView, {backgroundColor}]}>
              <Text style={styles.itemTextStyle}>{`${emoji} ${title}`}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  console.log("TEST - ", JSON.stringify(MobxStore.partyStore.party));
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          hitSlop={smallHitSlop}>
          <Back name="left" color={'#000'} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {`You, ${bounceWithFriendsStore.getBounceWithFriendsName()} like:`}
        </Text>
      </View>
      {SearchBarComponent({
        placeholder: 'Search Contacts',
        containerStyle: styles.searchContainer,
      })}
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        style={{flex: 1, borderWidth: 0, borderColor: 'blue'}}>
        <RenderSubTags
          containerStyle={{marginHorizontal: getWp(5), marginTop: 0}}
          shouldCheckForExist={false}
          subTagsData={bounceWithFriendsStore.getCommonTags()}
        />

        <Lists.NewToggleList
          flatListProps={{
            bounces: false,
          }}
          searchFilter={Lists.NewToggleList.SEARCH_FILTERS.Party}
          searchQuery={searchQuery}
          heading={''}
          ListTile={flatlist}
          ListData={[...bounceWithFriendsStore.getCommonParties()]}
        />
      </ScrollView>
      {!isKeyboardOpen && (
        <Buttons.SvgButton
          containerStyle={{
            marginVertical: getHp(10),
            width: '95%',
          }}
          Svg={BounceSmallLogo}
          SvgStyle={{
            preserveAspectRatio: 'none',
            height: getHp(45),
            width: getWp(45),
          }}
          onPress={() => {
            //props.navigation.goBack();
            props.navigation.navigate(MyBounceWithFriends.routeName, {
              persistBWFRecords: props.route.params?.persistBWFRecords ?? false,
            });
          }}
          title={'Add Friends'}
        />
      )}
    </Scaffold>
  );
}
CommonInterestNewsFeed.routeName = '/CommonInterestNewsFeed';
export default observer(CommonInterestNewsFeed);

const styles = StyleSheet.create({
  timeViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeStyle: {
    color: '#696969',
    fontFamily: 'AvenirNext-Medium',
    fontSize: FONTSIZE.Text16,
  },
  eventTitleStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text18,
    fontFamily: 'AvenirNext-DemiBold',
  },
  downloadView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'space-around',
  },
  SaveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(34),
    margin: getHp(10),
    backgroundColor: '#F2F5F6',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#E4EEF1',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    // elevation: 1,
  },
  firstBlock: {
    height: height / 4,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingVertical: 5,
    alignItems: 'center',
  },
  addInterest: {
    elevation: 5,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 24,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  headerTitle: {
    alignSelf: 'center',
    marginLeft: getWp(10),
    color: '#ABB3B6',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
    width: '85%',
  },
  itemView: {
    height: 35,
    backgroundColor: 'rgba(0, 224, 143, 0.24)',
    justifyContent: 'center',
    paddingHorizontal: getHp(15),
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  itemTextStyle: {
    fontSize: FONTSIZE.Text14,
    fontWeight: '500',
    lineHeight: 28,
    color: '#000',
  },
  collapsedContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchContainer: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: getHp(15),
    borderRadius: getHp(15),
    height: Platform.OS == 'ios' ? getHp(38) : getHp(43),
  },
});
