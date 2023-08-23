import React, {Component, PureComponent} from 'react';
import {Text, ScrollView} from 'react-native';

import ScrollPicker from '../ScrollPickerComponent';

class ScrollPickerComponent extends PureComponent {
  render() {
    const {dataSource, selectedIndex,scrollPickerProps, onValueChange} = this.props;
    return (
      <ScrollView decelerationRate={0.1} bounces={false}>
        <ScrollPicker
          dataSource={dataSource}
          selectedIndex={selectedIndex} 
          onValueChange={onValueChange}
          wrapperBackground={'#FFF'}
          highlightColor={'#EEEEEF'}
          highlightBorderWidth={5}
          activeItemColor={'#222121'}
          itemColor={'#B4B4B4'}
          {...scrollPickerProps}
        />
      </ScrollView>
    );
  }
}

export default ScrollPickerComponent;
