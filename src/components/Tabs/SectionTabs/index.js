import React, {Children, useState} from 'react';
import {View} from 'react-native';

import * as Buttons from '../../Buttons';
import Styles from './indexCss';

const SectionTabs = props => {
  const {
    children = null,
    sectionTabsComponent = null,
    tabs = [],
    containerStyle = {},
    contentContainerStyle = {},
    onTabPress = () => {},
    tabContainerStyle = {},
    tabButtonContainerStyle = {},
    tabActiveColors = null,
    tabUnActiveColors = null,
    initialIndex = 0,
  } = props;
  if (!Array.isArray(tabs)) {
    return <Text>Required Tabs Props(Array)!</Text>;
  }
  if (tabs.length == 0) {
    return <Text>Tabs Length is Empty!</Text>;
  }
  const [selectedTabIndex, setSelectedTabIndex] = useState(initialIndex);
  const onSwitchTab = tabIndex => {
    onTabPress(tabIndex);
    setSelectedTabIndex(i => tabIndex);
  };
  let renderComponent = children;
  if (renderComponent == null) {
    renderComponent = sectionTabsComponent;
  }
  return (
    <View style={[Styles.container, containerStyle]}>
      <View style={[Styles.tabContainer, tabContainerStyle]}>
        {tabs.map((btns, index) => {
          return (
            <Buttons.ToogleLinearGradient
              title={btns.heading}
              checked={selectedTabIndex == index}
              onPress={() => onSwitchTab(index)}
              containerStyle={[tabButtonContainerStyle]}
              checkedColors={tabActiveColors}
              uncheckedColors={tabUnActiveColors}
            />
          );
        })}
      </View>
      <View style={[Styles.contentContainer, contentContainerStyle]}>
        {renderComponent
          ? renderComponent(tabs[selectedTabIndex], selectedTabIndex)
          : tabs[selectedTabIndex]?.Component()}
      </View>
    </View>
  );
};

export default SectionTabs;
