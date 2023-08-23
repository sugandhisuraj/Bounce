import React, {Fragment, useState, useEffect, useRef} from 'react';
import {Text, View, Dimensions, Animated} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Styles from './indexCss';
import {FileMIMETypesUtils, PartyUtils} from '../../../app/utils';
import RenderPartyImageOrVideo from '../../EventPageWidgets/RenderPartyImageOrVideo';
import {transform} from 'lodash';
import {Easing} from 'react-native-reanimated';

const WindowWidth = Dimensions.get('window').width;
const PartyImageVideo = props => {
  const {
    containerStyle,
    data,
    width,
    imageProps,
    imageStyle,
    videoProps,
    videoStyle,
    pagination,
    setActiveIndex,
  } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  let carousalRef = useRef(null);
  let calculateWidth = 100 / data.length;
  const onSnapToItem = activeDotIndex => {
    setActiveDotIndex(_ => activeDotIndex);
    setActiveIndex(activeDotIndex);
  };

  const RenderItem = ({item, index}) => {
    //console.log('ITEM_1_Here - ', item);
    const partyCover = PartyUtils.getPartyURLOrPlaceholder(item);
    const sourceType = partyCover?.uri
      ? FileMIMETypesUtils.getAssetTypeFromFileURL(partyCover.uri)
      : FileMIMETypesUtils.getAssetTypeFromFileURL('test.jpeg');
    return (
      <View key={index} style={{backgroundColor: 'transparent'}}>
        <RenderPartyImageOrVideo
          source={partyCover}
          sourceType={sourceType}
          sourceStyle={[Styles.imageContainer, imageStyle]}
          sourceProps={{
            controls: true,
            autoplay: false,
            paused: true,
          }}
        />
        {pagination && data?.length > 1 && (
          <Pagination
            containerStyle={Styles.paginationContainerStyle}
            dotsLength={data.length}
            activeDotIndex={activeDotIndex}
            dotStyle={[
              Styles.paginationDotStyle,
              {
                width:
                  Dimensions.get('screen').width *
                  parseFloat(`0.${calculateWidth}`),
              },
            ]}
            inactiveDotStyle={[
              Styles.paginationInactiveDotScale,
              {
                width:
                  Dimensions.get('screen').width *
                  parseFloat(`0.${calculateWidth}`)-15,
              },
            ]}
            inactiveDotScale={0.7}
          />
        )}
      </View>
    );
    // const getAssetType = FileMIMETypesUtils.getAssetTypeFromFileURL(item);
    // console.log('ASSET_TYPE_2 - ', getAssetType);
    // let widget = null;
    // if (getAssetType.isVideo) {
    //   widget = <VideoComponent.PlayVideo source={item} {...videoProps} />;
    // } else {
    //   widget = (
    //     <FastImage
    //       source={{uri: item}}
    //       style={}
    //       {...imageProps}
    //     />
    //   );
    // }
    // return <Fragment>{widget}</Fragment>;
  };
  return (
    <View style={[Styles.containerStyle, containerStyle]}>
      <Carousel
        ref={carousalRef}
        data={data}
        renderItem={RenderItem}
        sliderWidth={width || WindowWidth}
        itemWidth={width || WindowWidth}
        onSnapToItem={onSnapToItem}
        currentIndex={activeDotIndex}
        decelerationRate={'fast'}
        loop={true}
        autoplay={true}
        autoplayInterval={30000}
      />
      {/* {pagination && data?.length > 1 && (
        <Pagination
          containerStyle={Styles.paginationContainerStyle}
          dotsLength={data.length}
          activeDotIndex={activeDotIndex}
          dotStyle={[Styles.paginationDotStyle, {width: Dimensions.get('screen').width*parseFloat(`0.${calculateWidth}`)} ]}
          inactiveDotStyle={[Styles.paginationInactiveDotScale, {width: Dimensions.get('screen').width*parseFloat(`0.${calculateWidth}`)}]}
          inactiveDotScale={0.7}

        />
      )} */}
    </View>
  );
};
export default PartyImageVideo;
