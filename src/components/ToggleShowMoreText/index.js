import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import Styles from './indexCss';

const ToggleShowMoreText = props => {
  const {
    text,
    textLength,
    containerStyle,
    descriptionTextStyle,
    showMoreTextStyle,
    showMoreContainerStyle,
    onShowMorePress,
  } = props;
  let shouldRenderShowMore = text.length > textLength;

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = useCallback(() => setShowMore(i => !i), []);

  let textContent = text;
  if (textLength) {
    textContent = text.substr(0, showMore ? text.length : textLength);
  }
  const numOfLine = textContent.split(/\r\n|\r|\n/).length;

  if (!showMore && numOfLine > 3) {
    textContent = text.substr(0, 50);
  }
  return (
    <View style={[Styles.container, containerStyle]}>
      <Text style={[Styles.descriptionText, descriptionTextStyle]}>
        {textContent}
        {shouldRenderShowMore && !showMore && <Text>... </Text>}
        {shouldRenderShowMore && (
          <TouchableOpacity
            style={[showMoreContainerStyle]}
            onPress={() =>
             {
              onShowMorePress ? onShowMorePress() : toggleShowMore();
             }
            }>
            <Text style={[Styles.showMore, showMoreTextStyle]}>
              {` see ${showMore ? 'less' : 'more'}`}
            </Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

ToggleShowMoreText.defaultProps = {
  text: '',
  textLength: 10,
  containerStyle: {},
  descriptionTextStyle: {},
  showMoreTextStyle: {},
  showMoreContainerStyle: {},
  onShowMorePress: null
};
export default ToggleShowMoreText;
