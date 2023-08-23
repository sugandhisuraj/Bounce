import React, {Fragment, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {
  IconTitle,
  Root,
  BlueCard,
  BlackCard,
  Footer,
  ModalPopup,
} from '@components';

import {
  StarPerson,
  Girl,
  Message,
  WhiteDownload,
  DJ,
  CoverPhoto,
} from '@assets';
import {Avatar} from 'react-native-elements';
import {FONTSIZE, getWp} from '@utils';
import {WhiteCalender, Scanner, DirectionBlue} from '@svg';
import {filterPartyOnFutureAndPast, getHp} from '../../../app/utils';
import {Lists, ListTiles, Scaffold} from '../../../components';
import {observer} from 'mobx-react';
import {VendorService} from '../../../app/services';
import PartyRentalsModel from './PartyRentals.model';

 

const PartyRental = () => {
  const partyRentalModel = PartyRentalsModel.getInstance();
  useEffect(() => {
    partyRentalModel.fetchHiredVendorParties();
  }, []);

  const RenderParties = (
    ListData = [],
    heading,
    containerStyle = {},
    flatListContentContainerStyle = {},
  ) => {
    if (ListData.length == 0) {
      return null;
    }
    return (
      <Lists.NewToggleList
        flatListProps={{
          scrollEnabled: false,
        }}
        containerStyle={[{backgroundColor: '#FBFBFB'}, containerStyle]}
        heading={heading}
        ListData={ListData}
        ListTile={({item}) => (
          <ListTiles.VendorHiredVendorParties partyData={item} />
        )}
        CustomDivider={
          <View style={{height: getHp(15), backgroundColor: '#F2F5F6'}} />
        }
        listViewContainerStyle={{marginTop: getHp(15)}}
        flatListContentContainerStyle={flatListContentContainerStyle}
      />
    );
  };
  const allhiredVendorParties = partyRentalModel.hiredVendorParties;
  const isPartyLoading = partyRentalModel.isLoading;

  if (isPartyLoading) {
    return null;
  }
  const filteredByFutureAndPast = filterPartyOnFutureAndPast(
    allhiredVendorParties.map(p => p.party),
  );
  let futureParties = filteredByFutureAndPast.futureParties.map(p => {
    return allhiredVendorParties.find(hP => hP.party?.id == p.id);
  });
  let pastParties = filteredByFutureAndPast.pastParties.map(p => {
    return allhiredVendorParties.find(hP => hP.party?.id == p.id);
  });

  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <ScrollView style={{backgroundColor: '#FBFBFB'}} bounces={false}>
        {RenderParties(
          futureParties,
          'Upcoming Events',
          {
            marginTop: getHp(20),
          },
          {paddingBottom: pastParties.length == 0 ? getHp(70) : 0},
        )}
        {pastParties.length > 0 && (
          <Fragment>
            {futureParties.length > 0 && (
              <View style={{height: getHp(15), backgroundColor: '#F2F5F6'}} />
            )}
            {RenderParties(
              pastParties,
              'Past Events',
              {marginTop: getHp(10)},
              {paddingBottom: getHp(70)},
            )}
          </Fragment>
        )}
      </ScrollView>
    </Scaffold>
  );
};

PartyRental.routeName = '/PartyRental';

export default observer(PartyRental);
const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  textStyle1: {
    fontSize: FONTSIZE.Text18,
    color: '#000',
    marginLeft: 10,
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 0.1,
  },
  mapStyle: {
    height: getHp(50),
    elevation: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  renderContainer: {
    // flex:1
    backgroundColor: '#fff',
    marginBottom: 15,
    // width: '100%',
    // paddingBottom:10,
    paddingVertical: 10,
  },
  headingStyle: {
    // marginVertical:getHp(5),
    letterSpacing: 0.4,
    color: '#000',
    fontSize: 20,
    fontFamily: 'AvenirNext-DemiBold',
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexDirectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#000000',
    fontSize: FONTSIZE.Text20,
    fontFamily: 'AvenirNext-Medium',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 40,
  },

  mapText: {
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text12,
    paddingVertical: 8,
  },
});
