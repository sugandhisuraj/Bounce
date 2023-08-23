import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Scaffold,
  Headers,
  Buttons,
  PriceRangeInput,
  GooglePlacesAutoComplete,
} from '../../../components';
import Styles, {Styled} from './indexCss';
import {FONTSIZE, getHp, getWp, wp} from '../../../app/utils';
import {useSearchBar} from '../../../app/hooks';
import SearchEventModel from './SearchEvent.model';
const SearchEventScreen = props => {
  const [googleInputAdd, setGoogleInputAdd] = useState('hello');
  const {
    searchQuery,
    SearchBarComponent,
    onChangeText: setSearchQuery,
  } = useSearchBar();
  const {screenType, onFilterApply} = props.route.params;

  const searchEventModel = SearchEventModel.getInstance();

  const searchDTO = searchEventModel.searchDTO;

  const currentFields = searchDTO.currentFields;
  const isApplyMode = Object.keys(currentFields).length == 0;
  useEffect(() => {
    searchDTO.initCurrentField();
    setGoogleInputAdd(searchDTO.address);
  }, []);
  useEffect(() => {
    setGoogleInputAdd(searchDTO.address);
  }, [searchDTO]);
  const onApplyPress = async () => {
    try {
      await onFilterApply(searchDTO.toJSON());
      searchDTO.setValue({currentFields: {...searchDTO.toJSON()}});
      props.navigation.goBack();
    } catch (error) {}
  };
  const onClearPress = async () => {
    searchDTO.reset();
    await onFilterApply(searchDTO.toJSON());
    setGoogleInputAdd('');
    props.navigation.goBack();
  };
  const DaysView = () => {
    return (
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {searchDTO.duration.map((duration, i) => {
          return (
            <Buttons.RoundToggle
              title={duration.heading}
              baseContainerStyle={Styles.daysViewRoundBaseContainer}
              containerStyle={[
                duration.value && {
                  backgroundColor: 'rgba(0, 224, 143, 0.24)',
                },
              ]}
              onPress={() => searchDTO.setDurationStatus(duration, i)}
            />
          );
        })}
      </ScrollView>
    );
  };

  const AgeView = () => {
    return (
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        <Buttons.RoundToggle
          title={'18 +'}
          baseContainerStyle={Styles.daysViewRoundBaseContainer}
          containerStyle={[
            searchDTO.plus18 && {
              backgroundColor: 'rgba(0, 224, 143, 0.24)',
            },
          ]}
          onPress={() => searchDTO.setValue({plus18: !searchDTO.plus18})}
        />
        <Buttons.RoundToggle
          title={'21 +'}
          baseContainerStyle={Styles.daysViewRoundBaseContainer}
          containerStyle={[
            searchDTO.plus21 && {
              backgroundColor: 'rgba(0, 224, 143, 0.24)',
            },
          ]}
          onPress={() => searchDTO.setValue({plus21: !searchDTO.plus21})}
        />
      </ScrollView>
    );
  };

  return (
    <Scaffold
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}
      statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <Headers.BackSearch
        onBackPress={() => props.navigation.goBack()}
        containerStyle={{backgroundColor: '#FBFBFB'}}
        backSearchComponent={() => {
          return SearchBarComponent({
            value: searchDTO.searchText,
            onChangeText: searchText => searchDTO.setValue({searchText}),
            searchQuery: searchDTO.searchText,
            placeholder: 'Search',
            containerStyle: [Styles.searchContainerStyle],
            StyledComponent: Styled.SearchContainer,
          });
        }}
      />
      <View style={{flex: 1}}>
        <ScrollView 
        keyboardShouldPersistTaps={'always'}
        bounces={false}>
          <View style={{paddingHorizontal: getHp(15)}}>
            <View style={[Styles.findEventsInContainer]}>
              <Text style={[Styles.findEventsInText]}>Find events in</Text>
              <GooglePlacesAutoComplete
                geolocationContainerStyle={[Styles.geolocationContainerStyle]}
                placeholder={'Location'}
                onPress={d => {
                  searchDTO.setValue({address: d.description});
                  setGoogleInputAdd(d.description);
                }}
                textInputProps={{
                  autoCorrect: false,
                  value: googleInputAdd,
                  onChangeText: address => {
                    console.log('ADD_1 - ', address);
                    setGoogleInputAdd(address);
                    searchDTO.setValue({address});
                  },
                }}
              />
            </View>
            <PriceRangeInput
              customToFromTitle={`${searchDTO.fromDistance} - ${searchDTO.toDistance} miles`}
              infoTextContainerStyle={{marginLeft: 0}}
              sliderLength={wp(86)}
              title={'Distance'}
              priceRanges={{
                min: 0,
                max: 100,
              }}
              containerStyle={{marginTop: getHp(15), paddingRight: getWp(10)}}
              rangeSelectedStyle={Styles.rangeSelectedStyle}
              priceToFromRangeTextStyle={[Styles.slidersSubTitleText]}
              marker1Value={searchDTO.fromDistance}
              marker2Value={searchDTO.toDistance}
              onMarkersValueChange={([from, to]) => {
                searchDTO.setValue({
                  fromDistance: from,
                  toDistance: to,
                });
              }}
            />
            <PriceRangeInput
              infoTextContainerStyle={{marginLeft: 0}}
              sliderLength={wp(86)}
              title={'Price Range'}
              priceRanges={{
                min: 0,
                max: 1000,
              }}
              containerStyle={{marginTop: getHp(15), paddingRight: getWp(10)}}
              rangeSelectedStyle={Styles.rangeSelectedStyle}
              priceToFromRangeTextStyle={[Styles.slidersSubTitleText]}
              marker1Value={searchDTO.fromPrice}
              marker2Value={searchDTO.toPrice}
              onMarkersValueChange={([from, to]) => {
                searchDTO.setValue({
                  fromPrice: from,
                  toPrice: to,
                });
              }}
            />
            {DaysView()}
            {AgeView()}
          </View>
        </ScrollView>
        {!isApplyMode && (
          <TouchableOpacity
            onPress={onClearPress}
            style={{alignSelf: 'center', marginVertical: getHp(10)}}>
            <Text style={Styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
        <Buttons.LinearGradient
          gradientColors={['#00CFFF', '#41DBFF', '#79E6FF']}
          onPress={onApplyPress}
          title={'Apply'}
          titleStyle={{
            letterSpacing: 0.3,
            fontWeight: '700',
            fontSize: FONTSIZE.Text18,
          }}
          showArrow={false}
          linearGradientStyle={{
            width: '95%',
            height: getHp(50),
            alignSelf: 'center',
            borderRadius: getHp(20),
          }}
        />
      </View>
    </Scaffold>
  );
};

SearchEventScreen.routeName = '/SearchEventScreen';
SearchEventScreen.screenTypes = {};
SearchEventScreen.screenTypes.SearchEvent = 'SearchEvent';
SearchEventScreen.screenTypes.NewsFeed = 'NewsFeed';
export default observer(SearchEventScreen);
