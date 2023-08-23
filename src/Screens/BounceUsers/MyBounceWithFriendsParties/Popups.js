import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react';

import {EventPageWidgets} from '../../../components';
import {GreenHeart} from '@svg';
import {CenterRoundBlurView} from '../../../components/AppPopups/Frames';
import MobxStore from '../../../mobx';
import Styles from './indexCss';
import {getHp, getWp} from '../../../app/utils';
import NavigationService from '../../../navigation/NavigationService';

const ScreenPopups = props => {
  const {commonInterestsPopup,
    setCommonInterestsPopup} = props;
  const {bounceWithFriendsStore} = MobxStore;
  let bwfCommonTags = bounceWithFriendsStore.getCommonTags();
  console.log('BWF_COMMON_TAGS - ', bwfCommonTags);

  if (!commonInterestsPopup) {
      return null;
  }
  return (
    <CenterRoundBlurView showClose onClosePress={() => setCommonInterestsPopup(false)}>
      <View style={[Styles.commonInterestPopupContainer]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GreenHeart />
          <Text style={[Styles.commonInterestHeading]}>Common Interests</Text>
        </View>

        <EventPageWidgets.SelectedTagsInParty
          widgetType={NavigationService.screenNames.BWF}
          preAllSubTags={bwfCommonTags}
          tileContainerStyle={{marginTop: getHp(10), marginRight: getWp(10)}}
          scrollViewProps={{
            horizontal: false,
            style: {marginTop: getHp(15)},
            contentContainerStyle: {
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
          }}
        />
      </View>
    </CenterRoundBlurView>
  );
};

export default observer(ScreenPopups);
