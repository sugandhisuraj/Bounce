import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Scaffold, RatingComponent, Buttons} from '@components';
import Styles from './indexCss';
import {getHp} from '../../../app/utils';
import {Placeholder} from '../../../assets';
import MobxStore from '../../../mobx';
import {Toast} from '@constants';
import {VendorService} from '../../../app/services';

const PRETEXT_ARR = [
  'Great work ethic',
  'Problem solver',
  'Organized',
  'Highly motivated',
  'Great time management',
  'Communicates effectively',
  'Prompt and on time',
];
const UserToVendorRatingScreen = props => {
  const {vendor, party, onSuccessRating, ratingSelected} = props.route.params;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(ratingSelected ?? 2);
  let source = Placeholder;
  if (vendor?.profileImage?.filePath) {
    source = {uri: vendor?.profileImage?.filePath};
  }

  onPreTextPress = text => {
    setReview(c => {
      c = c.concat(' ' + text);
      return c;
    });
  };

  const SendRating = async () => {
    try {
      if (review.length == 0) {
        return Toast('Please write review!');
      }
      MobxStore.toggleLoader(true);
      const ratingRes = await VendorService.hostToVendorRating({
        vendorId: vendor.id,
        partyId: party.id,
        rating,
        review,
      });
      console.log(ratingRes);
      console.log('RATING_RES_RES');
      Toast('Review Successsfully Saved');
      if (onSuccessRating) {
        onSuccessRating();
      }
      props.navigation.goBack();
    } catch (error) {
      Toast(error.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const PreText = ({text}) => {
    return (
      <View style={{alignSelf: 'baseline'}}>
        <TouchableOpacity
          onPress={() => onPreTextPress(text)}
          style={[Styles.preTextContainer]}>
          <Text style={[Styles.preTextStyle]}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <KeyboardAwareScrollView
      bounces={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1, backgroundColor: '#FBFBFB'}}
        style={[Styles.container]}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={[Styles.backIconContainer]}
            onPress={() => props.navigation.goBack()}>
            <Back name="chevron-back" color={'#000'} size={getHp(30)} />
          </TouchableOpacity>

          <Avatar
            containerStyle={[Styles.avatarContainerStyle]}
            rounded
            source={source}
            size={getHp(100)}
          />
          <RatingComponent
            activeStar={rating}
            onRating={r => {
              console.log('ON_RATTING_CHANGE - ', r);
              setRating(r);
            }}
            containerStyle={[Styles.ratingContainerStyle]}
          />
          <View style={[Styles.breakLine]} />

          <TextInput
            textAlignVertical={'top'}
            value={review}
            onChangeText={setReview}
            multiline={true}
            style={[Styles.commentInputText]}
            placeholder={'Review...'}
            placeholderTextColor={'#000'}
          />

          <View style={[Styles.pretextConsumeContainer]}>
            {PRETEXT_ARR.map(text => (
              <PreText text={text} />
            ))}
          </View>
        </View>

        <Buttons.LinearGradient
          titleStyle={[Styles.selectButtonTitleStyle]}
          linearGradientStyle={Styles.selectButtonStyle}
          showArrow={false}
          title={`Send`}
          onPress={SendRating}
        />
      </KeyboardAwareScrollView>
    </Scaffold>
  );
};

UserToVendorRatingScreen.routeName = '/UserToVendorRatingScreen';
export default UserToVendorRatingScreen;
