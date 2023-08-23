import React from 'react'; 
import {BlurView} from '@react-native-community/blur';

import Styles from './indexCss';

const BlurViewAndroid = props => {
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

BlurViewAndroid.defaultProps = {
  isVisible: false, 
  children: null,
  blurStyle: {},
  blurType: 'light',
};
export default BlurViewAndroid;
