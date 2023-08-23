import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header, FloatingInput, CustomButton, Root} from '@components';
import {Avatar} from 'react-native-elements';
import {UploadBlue, BlackClose} from '@svg';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {FONTSIZE, validateEmail, validatePass} from '@utils';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import {getHp, getWp} from '@utils';
import {ApiClient} from '../../../app/services';
import VendorMarketProfile from './VendorMarketProfile';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import VendorSignupStore from './VendorSignupStore';
import {observer} from 'mobx-react';
import MobxStore from '../../../mobx';

function VendorSignup(props) {
  const vendorSignupStore = VendorSignupStore.getInstance();
  vendorSignupStore.listener;
  const [footer, openFooter] = useState(false);

  useEffect(() => {
    vendorSignupStore.clearAllSelectionLists();
  }, []);
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      //setPicture(image);
      vendorSignupStore.updateVendorFields({
        profileImageFile: image.path,
      });
    });
  };

  const ImageFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          vendorSignupStore.updateVendorFields({
            profileImageFile: null,
          });
        }}
        style={styles.crossButton}>
        <BlackClose height={15} width={15} />
      </TouchableOpacity>
    );
  };

  const handleData = async () => {
    try {
      //return props.navigation.navigate(VendorMarketProfile.routeName);
      let validateE = validateEmail(vendorSignupStore.vendorFields.email);
      // let validateP = await validatePass(password)
      if (vendorSignupStore.vendorFields.username?.length == 0) {
        return Toast('Please enter username !');
      } else if (!validateE) {
        return Toast('Please enter valid email !');
      } else if (vendorSignupStore.vendorFields.password?.length < 7) {
        return Toast('Password should be 8 characters long !');
      } else if (vendorSignupStore.vendorFields.profileImageFile == null) {
        return Toast('Please select the profile picture !');
      }
      MobxStore.toggleLoader(true);
      let body = {
        username: vendorSignupStore.vendorFields.username.toLowerCase(),
        email: vendorSignupStore.vendorFields.email.toLowerCase(),
      };
      const response = await ApiClient.instance.post(
        ApiClient.endPoints.validateVendor,
        body,
      );
      if (response.status != 201) {
        throw {response};
      }
      console.log('VALIDATE_VENDOR_RES - ', response.data);
      props.navigation.navigate(VendorMarketProfile.routeName);
    } catch (err) {
      Toast(err?.response?.data?.message ?? 'Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const handleSpace = (value, type = 'Username') => {
    let regSpace = new RegExp(/\s/);
    if (regSpace.test(value)) {
      Toast(`${type} ` + 'cannot contain space !');
    }
    vendorSignupStore.updateVendorFields({
      username: value.trim(),
    });
  };
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#F4F4F4'}}>
      <Header
        withShadow={false}
        headerBackColor={{paddingBottom: 20, backgroundColor: '#F4F4F4'}}
        back
        headerStyleProp={{fontFamily: 'AvenirNext-DemiBold'}}
        headerTitle={`Create ${vendorSignupStore.selectedVendorBusinessCategory.vendorCategory} Profile`}
        onPress={() => props.navigation.goBack()}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        bounces={false}
        alwaysBounceVertical={false}>
        {/* <ScrollView
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ backgroundColor: '#FBFBFB', flex: 1 }}> */}

        <View
          style={{
            paddingBottom: getHp(0),
            paddingHorizontal: getWp(10),
            backgroundColor: '#FBFBFB',
          }}>
          {!vendorSignupStore.vendorFields.profileImageFile ? (
            <View
              style={{
                padding: 0,
                marginVertical: getHp(60),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleImage}
                style={[
                  styles.shadowStyle,
                  {
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={{
                    borderRadius: 100,
                    elevation: 10,
                    backgroundColor: '#fff',
                  }}>
                  <UploadBlue height={getHp(100)} width={getHp(100)} />
                </View>

                <Text
                  style={{
                    fontSize: FONTSIZE.Text16,
                    color: '#000',
                    marginTop: 15,
                    fontFamily: 'AvenirNext-Regular',
                  }}>
                  {'Upload Profile Picture'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View
                style={{
                  marginVertical: getHp(23),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => openFooter(true)}
                  style={{marginVertical: 30}}>
                  <Avatar
                    source={{
                      uri: vendorSignupStore.vendorFields.profileImageFile,
                    }}
                    size={getHp(250)}
                    rounded
                  />
                  <View style={{alignItems: 'center'}}>
                    <UploadBlue
                      height={getHp(90)}
                      width={getWp(90)}
                      style={{
                        position: 'absolute',
                        bottom: -40,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  {footer ? <ImageFooter /> : null}
                </TouchableOpacity>
              </View>
            </>
          )}
          <FloatingInput
            floatingLabel={'Full Name'}
            onChange={businessOwnerName =>
              vendorSignupStore.updateVendorFields({
                businessOwnerName,
              })
            }
            value={vendorSignupStore.vendorFields.businessOwnerName}
          />
          <FloatingInput
            autoCapitalize={'none'}
            floatingLabel={'Username'}
            onChange={value => handleSpace(value)}
            value={vendorSignupStore.vendorFields.username}
          />
          {/* <FloatingInput
            keyboardType={'numeric'}
            floatingLabel={'Phone Number'}
            onChange={value => setPhone(value)}
            value={phone}
          /> */}
          <FloatingInput
            autoCapitalize={'none'}
            floatingLabel={'Email'}
            value={vendorSignupStore.vendorFields.email}
            onChange={email =>
              vendorSignupStore.updateVendorFields({
                email,
              })
            }
          />

          <FloatingInput
            autoCapitalize={'none'}
            floatingLabel={'Password'}
            onChange={password =>
              vendorSignupStore.updateVendorFields({
                password,
              })
            }
            Password
            value={vendorSignupStore.vendorFields.password}
          />
          <View style={{marginVertical: getHp(10)}} />
        </View>
        <View
          style={{alignSelf: 'center', marginBottom: getHp(30), width: '95%'}}>
          <CustomButton complete onPress={handleData} />
        </View>
      </KeyboardAwareScrollView>
    </Scaffold>
  );
}
VendorSignup.routeName = '/VendorSignup';

const styles = StyleSheet.create({
  crossButton: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: -10,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default observer(VendorSignup);
