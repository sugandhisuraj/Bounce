import React, {useCallback, useImperativeHandle, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

import Styles from './indexCss';

const ToolTip = React.forwardRef((props, ref) => {
  const {
    customRef,
    menuContentStyle,
    menuAnchor,
    contentContainerStyle,
    menuStyle,
    menuAnchorTouchStyle,
  } = props;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleIsMenuVisible = useCallback(() => setIsMenuVisible(i => !i), []);
  useImperativeHandle(ref, () => ({
    hide: () => {
      setIsMenuVisible(i => false);
    },
  }));
  return (
    <Menu
      style={[menuStyle]}
      contentStyle={[Styles.menuContentStyle, menuContentStyle]}
      visible={isMenuVisible}
      anchor={
        <TouchableOpacity
          style={[menuAnchorTouchStyle]}
          onPress={handleIsMenuVisible}>
          {menuAnchor}
        </TouchableOpacity>
      }
      onDismiss={handleIsMenuVisible}>
      <View style={[Styles.contentContainerStyle, contentContainerStyle]}>
        {props.children}
      </View>
    </Menu>
  );
});

export default ToolTip;
