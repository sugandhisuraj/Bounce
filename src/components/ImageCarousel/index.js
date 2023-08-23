import React from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Food, Security, Video, Drinks} from '@assets';
import {FONTSIZE, getHp, getWp} from '@utils';
import {BlackDollar, AddBlue} from '@svg';
import {Placeholder} from '../../assets';

const {width} = Dimensions.get('window');
const height = (width * 100) / 60;

export default function ImageCarousel(props) {
  const {
    imageArray,
    onSnapToItem,
    state,
    imageBottomLeftText = null,
    imageBottomRightRate = null,
    pagination = false,
    value = false,
    onPress = () => {},
    addMoreIcon = false,
    onPressCarousalItems = null
  } = props;
  const renderItem = ({item, index}) => {
    // console.log("ITEM IN CAROUSEL->", item);
    return (
      <TouchableOpacity 
      disabled={!onPressCarousalItems}
      activeOpacity={1}
      style={{}} onPress={onPressCarousalItems}>
        {value === 'Instagram' ? (
          <View style={{}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Image source={item} style={styles.instaStyles} />
              <Image source={item} style={styles.instaStyles} />
              <Image source={item} style={styles.instaStyles} />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Image source={item} style={styles.instaStyles} />
              <Image source={item} style={styles.instaStyles} />
              <Image source={item} style={styles.instaStyles} />
            </View>
          </View>
        ) : value === 'Friends' ? (
          // <View style={{ width: '95%' }}>
          <View style={styles.singleImage}>
            <View style={styles.friendsView}>
              <Image
                source={{uri: item?.profileImage?.filePath}}
                style={styles.friendsImage}
              />
              <Text style={styles.textImage}>{item?.fullName}</Text>
            </View>
          </View>
        ) : // </View>
        value == 'Music' ? (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              paddingVertical: 10,
              flex: 1,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={item}
                style={{
                  borderRadius: 7,
                  width: getWp(180),
                  height: getHp(180),
                  margin: 2,
                }}
              />

              <Text
                style={[
                  styles.textImage,
                  {
                    marginVertical: 5,
                    paddingBottom: 0,
                    fontSize: FONTSIZE.Text18,
                  },
                ]}>
                {'Blue World'}
              </Text>

              <Text
                style={[
                  styles.textImage,
                  {
                    color: '#696969',
                    paddingBottom: 0,
                    fontSize: FONTSIZE.Text13,
                  },
                ]}>
                {'Mac Miller'}
              </Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Image
                source={item}
                style={{
                  borderRadius: 7,
                  width: getWp(180),
                  height: getHp(180),
                  margin: 2,
                }}
              />

              <Text
                style={[
                  styles.textImage,
                  {
                    marginVertical: 5,
                    paddingBottom: 0,
                    fontSize: FONTSIZE.Text18,
                  },
                ]}>
                {'Blue World'}
              </Text>

              <Text
                style={[
                  styles.textImage,
                  {
                    color: '#696969',
                    paddingBottom: 0,
                    fontSize: FONTSIZE.Text13,
                  },
                ]}>
                {'Mac Miller'}
              </Text>
            </View>
          </View>
        ) : value == 'CreateInvitation' ? (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Image
              source={{
                uri: item,
              }}
              style={{width: '100%', height: 375}}
            />
          </View>
        ) : value == 'Normal' ? (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image source={item} style={{width: '100%', height: 400}} />
          </View>
        ) : value == 'NewsFeed' ? (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={item.length != 0 ? {uri: item?.filePath} : Placeholder}
              style={{width: '100%', height: 400}}
            />
          </View>
        ) : (
          <View style={{}}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#fff',
              }}>
              {imageBottomLeftText && (
                <View
                  style={[
                    styles.flexDirectionStyle,
                    {width: '100%', backgroundColor: '#F2F5F6'},
                  ]}>
                  <Text style={[styles.fullInventoryTitleStyle]}>
                    {item.itemName}
                  </Text>
                  <View style={[styles.flexDirectionStyle]}>
                    <BlackDollar height={getHp(26)} width={getWp(26)} />
                    <Text
                      style={[
                        styles.reviewsTitleStyle,
                        {marginLeft: 5, fontSize: FONTSIZE.Text20},
                      ]}>
                      {item.itemCost}
                    </Text>
                  </View>
                </View>
              )}
              <Image
                source={{
                  uri: item?.filePath ? item.filePath : `${item.itemImage}`,
                }}
                style={{width: '100%', height: 400}}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel 
        data={imageArray}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={onSnapToItem}
      />
      {!pagination ? null : (
        <Pagination
          containerStyle={{
            backgroundColor: 'rgba(52, 52, 52, 0)',
            marginVertical: -20,
          }}
          dotsLength={imageArray.length}
          activeDotIndex={state}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: -10,
            backgroundColor: '#1FAEF7',
          }}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            backgroundColor: '#696969',
          }}
          inactiveDotScale={0.6}
        />
      )}
      {addMoreIcon && (
        <TouchableOpacity onPress={onPress} style={styles.imageButton}>
          <AddBlue height={25} width={25} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  instaStyles: {
    borderRadius: 4,
    height: getHp(118),
    width: getWp(118),
    margin: 2,
  },
  imageButton: {
    borderRadius: 100,
    elevation: 10,
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    zIndex: 100,
    bottom: getHp(40),
    right: getWp(20),
  },
  friendsImage: {
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    width: getWp(80),
    height: getHp(80),
    margin: 0,
  },
  singleImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //   borderBottomLeftRadius:7,
    //   borderBottomEndRadius:7
  },
  friendsView: {
    // justifyContent: 'center',
    height: getHp(104),
    backgroundColor: '#fff',
    borderRadius: 7,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  textImage: {
    paddingTop: 3,
    fontFamily: 'AvenirNext-Medium',
    color: '#000',
    fontSize: FONTSIZE.Text12,
    width: '50%',
    textAlign: 'center',
  },
  fullInventoryTitleStyle: {
    fontFamily: 'AvenirNext-Regular',
    color: '#000',
    fontSize: FONTSIZE.Text17,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 0,
  },
  flexDirectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fourItems: {
    backgroundColor: '#000000',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewsTitleStyle: {
    fontFamily: 'AvenirNext-Medium',
    color: '#000',
  },
  footerList: {
    height: 70,
    width: 100,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  selectedFooterItem: {
    backgroundColor: 'rgba(255, 46, 0, 0.24)',
  },
});
