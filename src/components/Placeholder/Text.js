import React, {useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Styles from './indexCss';

const TextComponent = props => {
  const {
    textLength = null,
    text = '',
    containerStyle = {},
    textStyle = {},
  } = props;
  let shouldRenderShowMore = text.length > textLength;

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = useCallback(() => setShowMore(i => !i), []);

  let textContent = text;
  if (textLength) {
    textContent = text.substr(0, showMore ? text.length : textLength);
  }
  return (
    <View
      style={[
        Styles.container,
        Styles.shadowStyle,
        Styles.textComponent,
        containerStyle,
      ]}>
      <Text style={[Styles.text, textStyle]}>
        {textContent}
        {shouldRenderShowMore && !showMore && <Text>... </Text>}
        {shouldRenderShowMore && (
          <TouchableOpacity onPress={toggleShowMore}>
            <Text style={[Styles.showMore]}>
              {' '}
              view {showMore ? 'less' : 'more'}
            </Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

export default TextComponent;
