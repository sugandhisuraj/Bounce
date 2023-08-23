import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getWp} from '../../../app/utils';

import * as Buttons from '../../Buttons';
import Styles from './indexCss';

const SelectedUnselected = props => {
  const {
    tabs,
    selectedTabIndex,
    onSelect,
    tabContainerStyle,
    tabButtonContainerStyle,
    tabActiveColor,
    tabUnActiveColor,
    textActiveColor,
    textUnActiveColor,
  } = props;

  const ButtonsWithIcon = (tab, i) => {
    let isTabChecked = selectedTabIndex == i ?? false;
    let tabStyleOnStatus = isTabChecked
      ? [
          Styles.tabButton,
          Styles.selectedTabButton,
          tabActiveColor && {backgroundColor: tabActiveColor},
        ]
      : [
          Styles.tabButton,
          tabUnActiveColor && {backgroundColor: tabUnActiveColor},
        ];

    let textStyleOnStatus = isTabChecked
      ? [
          Styles.selectedHeadingTextStyle,
          textActiveColor && {color: textActiveColor},
        ]
      : [];
    let RenderIcon = null;

    if (isTabChecked && tab.CheckedIcon != undefined) {
      RenderIcon = tab.CheckedIcon;
    } else if (tab.UncheckedIcon != undefined) {
      RenderIcon = tab.UncheckedIcon;
    }
    return (
      <TouchableOpacity
        style={[...tabStyleOnStatus, tabButtonContainerStyle, tab.style]}
        onPress={() => onSelect(tab, i)}>
        {RenderIcon}
        <Text
          style={[
            Styles.headingTextStyle,
            RenderIcon && {marginLeft: getWp(13)},
            ...textStyleOnStatus,
          ]}>
          {tab.heading}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[Styles.tabContainer, tabContainerStyle]}>
      {tabs.map(ButtonsWithIcon)}
      {/* {tabs.map((tab, index) => {
        return (
          <Buttons.ToogleLinearGradient
            key={index}
            title={tab.heading}
            checked={tab.heading == selectedTab?.heading}
            onPress={() => onSelect(tab)}
            containerStyle={[tab?.style, tabButtonContainerStyle]}
            checkedColors={tabActiveColors}
            uncheckedColors={tabUnActiveColors}
          />
        );
      })} */}
    </View>
  );
};

SelectedUnselected.defaultProps = {
  tabs: [],
  selectedTab: {},
  tabContainerStyle: {},
  tabButtonContainerStyle: {},
  tabActiveColor: null,
  tabUnActiveColor: null,
  textActiveColor: null,
  textUnActiveColor: null,
};
export default SelectedUnselected;
