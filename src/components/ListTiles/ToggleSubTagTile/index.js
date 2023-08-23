import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {getWp} from '../../../app/utils';

import Styles from './indexCss';

const ToggleSubTagTile = props => {
  const {
    data,
    withEmoji,
    withPercentage,
    containerStyle,
    emojiNameStyle,
    percentageTextStyle,
    onPress,
    nameKey,
    isSelected,
  } = props;
  return (
    <View style={{alignItems: 'baseline'}}>
      <TouchableOpacity
        style={[
          Styles.container,
          isSelected && Styles.selectedContainer,
          containerStyle,
        ]}
        disabled={!onPress}
        onPress={() => onPress(data)}>
        {withEmoji && <Text style={[Styles.emojiStyle]}>{data?.emoji}</Text>}

        <Text style={[Styles.emojiName, emojiNameStyle]}>{data[nameKey]}</Text>
        {withPercentage && (
          <Text style={[Styles.percentageText, percentageTextStyle]}>
            {data?.percentage}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

ToggleSubTagTile.defaultProps = {
  emoji: null,
  data: {},
  percentage: null,
  containerStyle: {},
  emojiNameStyle: {},
  percentageTextStyle: {},
  onPress: null,
  withEmoji: false,
  withPercentage: false,
  nameKey: 'name',
  isSelected: false,
};
export default ToggleSubTagTile;
