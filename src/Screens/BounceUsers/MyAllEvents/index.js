import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View, FlatList, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import moment from 'moment';
import {Avatar, Divider} from 'react-native-elements';

import {RegexCollection} from '../../../app/constants';
import {Scaffold, Header, AppTabs, Lists} from '@components';
import {getWp, getHp, FONTSIZE, filterPartyOnFutureAndPast} from '@utils';
import MobxStore from '../../../mobx';
import {useSearchBar} from '../../../app/hooks';
import Styles from './indexCss';
import CreateInvitation from '../../BounceVendors/PlanParty/CreateInvitation';
import HostView from '../../BounceVendors/PlanParty/HostView';
import {utcToCurrentTimeZone} from '../../../app/utils';
import {EventPageWidgets, Headers} from '../../../components';
import {PartyService} from '../../../app/services';
import RenderPartyImageOrVideo from '../../../components/EventPageWidgets/RenderPartyImageOrVideo';
const MyAllEvents = props => {
  const {partyStore} = MobxStore;
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();

  const onPressPartyTile = (type, item) => {
    if (type == MyAllEvents.tabTypes.Hosting) {
      if (item.isDraft) {
        return props.navigation.navigate(CreateInvitation.routeName, {
          party: item,
          isEditParty: true,
          onBackRoute: MyAllEvents.routeName,
        });
      }
    }
    PartyService.navigationToEventPageOrNewsFeed(item);
  };
  const AttendingSectionRender = (type, allItem, {item, index}) => {
    return (
      <EventPageWidgets.PartyInfoTile
        party={item}
        onPress={onPressPartyTile.bind(null, type)}
      />
    );
  };

  const HostingTab = tabType => {
    let futurePastParties = {
      futureParties: [],
      pastParties: [],
    };
    if (tabType == MyAllEvents.tabTypes.Hosting) {
      let hParty = partyStore.getHostingParties() ?? [];
      futurePastParties = filterPartyOnFutureAndPast(hParty);
    } else if (tabType == MyAllEvents.tabTypes.Attending) {
      let aParty = partyStore.getAttendingParties() ?? [];
      futurePastParties = filterPartyOnFutureAndPast(aParty);
    } else {
      let iParty = partyStore.getInterestedParties() ?? [];
      futurePastParties = filterPartyOnFutureAndPast(iParty);
    }
    return (
      <View style={{flex: 1}}>
        {SearchBarComponent({
          placeholder: 'Search',
          containerStyle: Styles.searchContainer,
        })}
        <ScrollView bounces={false}>
          {futurePastParties.futureParties.length > 0 && (
            <Lists.NewToggleList
              flatListProps={{
                scrollEnabled: false,
              }}
              searchQuery={searchQuery}
              containerStyle={{paddingHorizontal: getHp(15)}}
              heading={''}
              ListData={futurePastParties.futureParties}
              ListTile={AttendingSectionRender.bind(
                null,
                tabType,
                futurePastParties.futureParties,
              )}
              dividerStyle={{marginVertical: getHp(15)}}
              searchFilter={Lists.NewToggleList.SEARCH_FILTERS.Party}
              listViewContainerStyle={{marginTop: 0}}
            />
          )}
          {futurePastParties.pastParties.length > 0 && (
            <Lists.NewToggleList
              flatListProps={{
                scrollEnabled: false,
              }}
              searchQuery={searchQuery}
              headingTextStyle={{marginLeft: 0}}
              containerStyle={{
                paddingHorizontal: getHp(15),
                marginTop:
                  futurePastParties.futureParties.length > 0
                    ? getHp(30)
                    : getHp(10),
              }}
              listViewContainerStyle={{marginTop: getHp(20)}}
              heading={'Past Events'}
              ListData={futurePastParties.pastParties}
              ListTile={AttendingSectionRender.bind(
                null,
                tabType,
                futurePastParties.pastParties,
              )}
              dividerStyle={{marginVertical: getHp(15)}}
              searchFilter={Lists.NewToggleList.SEARCH_FILTERS.Party}
            />
          )}
          <View style={{height: 50}} />
        </ScrollView>
      </View>
    );
  };
  const TabConfig = [
    {
      heading: 'Hosting',
      Component: HostingTab.bind(null, MyAllEvents.tabTypes.Hosting),
      shouldRender: true,
    },
    {
      heading: 'Attending',
      Component: HostingTab.bind(null, MyAllEvents.tabTypes.Attending),
      shouldRender: true,
    },
    {
      heading: 'Interested',
      Component: HostingTab.bind(null, MyAllEvents.tabTypes.Interested),
      shouldRender: true,
    },
  ];
  console.log('DONT_REMOVE_IT - ', JSON.stringify(partyStore.party));
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      {/* <Header
        withShadow={false}
        back
        onPress={() => {
          props.navigation.goBack();
        }}
        headerTitle={`All Events`}
        headerContainerStyle={{backgroundColor: '#FBFBFB', height: getHp(55)}}
        headerStyleProp={{fontWeight: '600', fontSize: 22}}
      /> */}
      <Headers.BackTile
        title={`All Events`}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <AppTabs.CommonTabs
        // containerStyle={{borderWidth: 1, borderColor: 'blue'}}
        onChangeTab={() => setSearchQuery('')}
        tabData={TabConfig}
        polygonConfig={[getWp(45), getWp(180), getWp(320)]}
      />
    </Scaffold>
  );
};
MyAllEvents.routeName = '/MyAllEvents';

MyAllEvents.tabTypes = {};
MyAllEvents.tabTypes.Attending = 'Attending';
MyAllEvents.tabTypes.Hosting = 'Hosting';
MyAllEvents.tabTypes.Interested = 'Interested';
export default observer(MyAllEvents);
