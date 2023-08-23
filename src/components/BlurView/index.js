import React from 'react';
import {BlurView} from '@react-native-community/blur';

import Styles from './indexCss';

const BlurViewComp = props => {
  const {isVisible, blurStyle, blurType, children} = props;

  const BlurViewComponent = () => {
    return (
      <BlurView
        style={[Styles.blur, blurStyle]}
        blurType={blurType}
        blurAmount={10}
        reducedTransparencyFallbackColor="white">
        {children}
      </BlurView>
    );
  };
  if (!isVisible) {
    return null;
  }
  return <BlurViewComponent />;
};

BlurViewComp.defaultProps = {
  isVisible: false,
  children: null,
  blurStyle: {},
  blurType: 'dark',
};
export default BlurViewComp;
