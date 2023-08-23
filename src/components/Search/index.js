import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
// import {Searchbar} from 'react-native-paper';
//import SearchBar from 'react-native-dynamic-search-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Styles from './indexCss';
import {FONTSIZE, getHp, getWp, FONTFAMILY} from '../../app/utils';

Entypo.loadFont();
Ionicons.loadFont();

const Search = props => {
  const {
    placeholder = 'Add Placeholder',
    searchQuery = '',
    containerStyle = {},
    onChangeText = () => {},
    inputStyle = {},
    withShadow = false,
    isTouchable = false,
    onPress,
    StyledComponent,
  } = props;

  let containerStyleVar = [
    Styles.container,
    withShadow && Styles.shadowStyle,
    containerStyle,
  ];
  const onPressAction = () => {
    if (isTouchable && onPress) {
      onPress();
    }
  };
  // const Wrapper = isTouchable ? TouchableOpacity : View;
  const Wrapper = StyledComponent ? StyledComponent : View;
  return (
    <Wrapper
      onStartShouldSetResponder={onPressAction}
      onPress={onPressAction}
      style={containerStyleVar}>
      <Entypo name={'magnifying-glass'} color={'#999'} size={getHp(20)} />
      <TextInput
        onPressIn={onPressAction}
        pointerEvents={isTouchable ? 'none' : undefined}
        placeholderTextColor={'#909090'}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onChangeText}
        style={[Styles.searchInput, inputStyle]}
      />
      <TouchableOpacity
        disabled={!onChangeText || searchQuery.length == 0}
        onPress={() => onChangeText('')}
        style={Styles.closeTouchContainer}>
        {searchQuery.length > 0 && (
          <Ionicons
            name={'close'}
            color={'#999'}
            style={{backgroundColor: containerStyleVar.backgroundColor}}
            size={getHp(25)}
          />
        )}
      </TouchableOpacity>
    </Wrapper>
  );
};

export default Search;
