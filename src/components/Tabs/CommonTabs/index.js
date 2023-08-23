import React, {useCallback, useEffect,useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Tabs, Tab} from 'native-base';

import {PolygonSvg} from '@assets';
import {getHp, getWp} from '../../../app/utils';
import Styles from './indexCss';

const CommonTabs = props => {
  const [polygonIndex, setPolygonIndex] = useState(0);
  const {
    containerStyle = {},
    tabContainerStyle = {},
    tabBarUnderlineStyle = {},
    tabStyle = {},
    textStyle = {},
    activeTabStyle = {},
    activeTextStyle = {},
    tabData = [],
    polygonConfig = [],
    polygonContainerStyle = {},
    tabsProps = {},
    onChangeTab = () => {},
  } = props;
  useEffect(() => {
    setPolygonIndex(0); 
  }, [polygonConfig])
  const updatePolygonState = useCallback(
    item => {
      setPolygonIndex(_ => item.i);
      onChangeTab(tabData[item.i], item.i);
    },
    [onChangeTab, polygonIndex],
  );
  const RenderPolygon = () => {
    return (
      <View
        style={[
          Styles.polygonContainerStyle,
          {
            left:
              polygonConfig[shouldRenderTab.length - 1][polygonIndex] ??
              polygonConfig[polygonIndex],
          },
          polygonContainerStyle,
        ]}>
        <PolygonSvg
          preserveAspectRatio="none"
          height={getHp(20)}
          width={getWp(42)}
        />
      </View>
    );
  };
  const renderTab = (tabItem, tabIndex) => {
    let renderS = Platform.select({
      ios: {
        tabStyle: [Styles.tabStyle, tabStyle],
        textStyle: [Styles.textStyle, textStyle],
        activeTabStyle: [Styles.activeTabStyle, activeTabStyle],
        activeTextStyle: [Styles.activeTextStyle, activeTextStyle],
      },
      android: {
        tabStyle: {backgroundColor: '#FBFBFB'},
        textStyle: {color: '#000', fontFamily: 'AvenirNext-Regular'},
        activeTabStyle: {backgroundColor: '#FBFBFB'},
        activeTextStyle: {color: '#000', fontFamily: 'AvenirNext-Medium'},
      },
    });

    return (
      <Tab
        {...renderS}
        // tabStyle={{backgroundColor: '#FBFBFB'}}
        // textStyle={{color: '#000', fontFamily: 'AvenirNext-Regular'}}
        // activeTabStyle={{backgroundColor: '#FBFBFB'}}
        // activeTextStyle={{color: '#000', fontFamily: 'AvenirNext-Medium'}}
        // tabStyle={[Styles.tabStyle, tabStyle]}
        // textStyle={[Styles.textStyle, textStyle]}
        // activeTabStyle={[Styles.activeTabStyle, activeTabStyle]}
        // activeTextStyle={[Styles.activeTextStyle, activeTextStyle]}
        heading={tabItem.heading}>
        {tabItem.Component(tabItem, tabIndex)}
      </Tab>
    );
  };
  const RenderCustomPolygon = () => {
    return (
      <View
        style={[
          Styles.polygonCustomView,
          {
            left:
              polygonConfig[shouldRenderTab.length - 1][polygonIndex] ??
              polygonConfig[polygonIndex],
          },
          polygonContainerStyle,
        ]}
      />
    );
  };
  let shouldRenderTab = tabData.filter(tab => {
    if (!('shouldRender' in tab)) {
      return true;
    }
    return tab.shouldRender;
  });
  if (shouldRenderTab.length == 0) {
    return false;
  }
  return (
    <View style={[Styles.containerStyle, containerStyle]}>
      {/* {polygonConfig.length > 0 && <RenderPolygon />} */}
      {polygonConfig.length > 0 && <RenderCustomPolygon />}
      <Tabs
        {...tabsProps}
        onChangeTab={updatePolygonState}
        tabContainerStyle={[Styles.tabContainerStyle, , tabContainerStyle]}
        tabBarUnderlineStyle={[
          Styles.tabBarUnderlineStyle,
          tabBarUnderlineStyle,
        ]}>
        {shouldRenderTab.map(renderTab)}
      </Tabs>
    </View>
  );
};
export default CommonTabs;
