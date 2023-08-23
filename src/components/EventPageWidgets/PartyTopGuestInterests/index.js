import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';

import { getHp,getWp } from '../../../app/utils';
import * as ListTiles from '../../ListTiles'; 
import Styles from './indexCss';
import {InfoRoundGrey} from '@assets';

const PartyTopGuestInterests = props => {
  const {hostViewInstance} = props;
  let allUserInterests = hostViewInstance?.getTopGuestInterests() ?? [];
  if (allUserInterests.length == 0) {
    return null;
  }
  return (
    <View style={[Styles.container]}>
      <Text style={Styles.topGuestText}>Top Guest Interests</Text>
      <View style={Styles.onAvgTextContainer}>
        <Text style={Styles.avgText}>
          On average, each guest has 20 friends attending.
        </Text>

        <TouchableOpacity
          onPress={() => window.toggleMutualFriendBlurView(true)}>
          <Avatar source={InfoRoundGrey} size={getHp(18)} />
        </TouchableOpacity>
      </View>

      <View style={[Styles.topGuestsContainer]}>
        {allUserInterests?.map(tag => {
          return (
            <ListTiles.ToggleSubTagTile
              withPercentage={true}
              withEmoji={true}
              key={tag.id}
              containerStyle={Styles.subtagContainerStyle}
              data={tag}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PartyTopGuestInterests;
