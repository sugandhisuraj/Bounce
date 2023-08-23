import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  ImageCarousel,
  IconTitle,
  ReviewCard,
  Footer,
  CustomText,
} from '@components';
import {Girl} from '@assets';
import {styles as PageStyle} from './indexCss';
import {
  AddBlueWhite,
  AddBlue,
  DollarOnlyWhite,
  Webpin,
  BlackMenubar,
  Certified,
  Armed,
  Multilingual,
  Services,
  Cuisines,
  Equipments,
  Pdf,
} from '@svg';
import Ratings from '../../../components/RatingStar/Ratings';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {FONTSIZE, getHp, getWp} from '@utils';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import Spinner from 'react-native-loading-spinner-overlay';
import {pickDocument} from '@hooks';
import axios from 'axios';
import {
  ApiClient,
  AppNotificationService,
  AuthService,
} from '../../../app/services';
import DocumentPicker from 'react-native-document-picker';
import MobxStore from '../../../mobx';
import {observer} from 'mobx-react';
import UploadInventoryScreen from '../UploadInventory';

import {Toast} from '@constants';
import {VendorFieldsData} from '../../../app/constants';
import {
  Lists,
  Scaffold,
  ListTiles,
  VendorProfileWidgets,
} from '../../../components';
import ToastUtil from '../../../app/constants/toast';
import {filterArrOnDate} from '../../../app/utils';

var imgTemp = [];

function DjProfile(props) {
  let loader = false;
  const {
    authStore: {user, async: authStoreAsync},
    uiStore,
  } = MobxStore;
  const userProfile = user;
  let styles = PageStyle(uiStore.theme);
  const [getState, setState] = useState(0);
  const [getPRState, setPRState] = useState(0);
  const [getMedia, setMedia] = useState(null);
  const [getPdf, setPdf] = useState(null);
  const dispatch = useDispatch();
  const token = userProfile?.token;

  useEffect(() => {
    AppNotificationService.getVendorNotification();
  }, [MobxStore.authStore.user]);
  console.log(
    'LOGGED_IN_VENDORDATA_22 - ',
    JSON.stringify(MobxStore.authStore.user),
  );

  if (userProfile?.user == undefined) {
    return null;
  }
  const {
    about,
    fullName,
    city,
    language,
    username,
    vendor = {},
    vendorCategoryName = {},
    profileImage,
    menu,
    gallery,
    vendorType,
    rating = [],
  } = userProfile?.user;

  const {website, hourlyRate, inventory} = vendor;
  const vendorCategoryFieldsData =
    VendorFieldsData.VendorFieldsData.getCategory(vendorType);

  const handleCarousel = () => {
    return (
      <ImageCarousel
        addMoreIcon
        onPress={handleAddMedia}
        pagination
        imageArray={gallery.length == 0 ? [] : gallery}
        onSnapToItem={index => setState(index)}
        state={getState}
      />
    );
  };
  const PRhandleCarousel = () => {
    if (inventory != null && 'length' in inventory) {
      return (
        <ImageCarousel
          addMoreIcon
          onPress={onlyPartyRentalImage}
          imageBottomLeftText
          imageBottomRightRate
          pagination
          imageArray={inventory.length == 0 ? [] : inventory}
          onSnapToItem={index => setPRState(index)}
          state={getPRState}
        />
      );
    }
    return null;
  };
  const onlyPartyRentalImage = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      let len = 1;
      let propsImages = [];
      res.map(i => {
        let selectedImage = {
          id: Date.now() + len,
          uploaded: false,
          itemImage: i.uri,
          itemName: '',
          itemCost: '',
          fromPrevious: true,
        };
        propsImages.push(selectedImage);
        len++;
      });
      props.navigation.navigate(UploadInventoryScreen.routeName, {
        editMode: false,
        propsImages,
      });
    } catch (error) {
      console.log('ERROR - ', error);
    }
  };

  const handleImagesArray = async images => {
    try {
      MobxStore.toggleLoader(true);
      let milliseconds = new Date().getTime();
      let formData = new FormData();
      images.forEach(item => {
        formData.append('galleryFiles', {
          uri: item.path,
          type: 'image/jpeg',
          name: `image-${milliseconds}.jpg`,
        });
      });
      // console.log("INSIDE before api call");
      const RES_IMAGE = await ApiClient.authInstance.post(
        ApiClient.endPoints.vendorAddMedia,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      // console.log("RES_IMAGE", RES_IMAGE);
      await AuthService.reloadUser();
      // let strrr = await RES_IMAGE.data;
      // await strrr.map(item => {
      //   imgTemp.push(item.data.filePath);
      // });

      // // console.log("imgTemp", imgTemp);
      // setMedia(imgTemp);
      if (RES_IMAGE.status == 201 || RES_IMAGE.status == 200) {
        Toast('Media Added Successfully!');
      }
    } catch (error) {
      ToastUtil(
        error?.message ??
          errors?.response?.data?.message ??
          'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  // Handle Image not working after the UI change
  // Also check the ImageCarousel.js file in correspondance
  const handleAddMedia = async () => {
    try {
      const images = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        multiple: true,
      });

      return handleImagesArray(images);
    } catch (error) {
      console.log('ERROR_HANDLE_ADDMEDIA - ', error);
    }
  };
  const handleUploadMenuAndInventory = async () => {
    try {
      const res = await pickDocument();
      MobxStore.toggleLoader(true);
      let milliseconds = new Date().getTime();
      let formData = new FormData();
      let imgObj = {
        uri: `${res.fileCopyUri}`,
        type: 'application/pdf',
        name: `pdf-${milliseconds}.pdf`,
      };
      console.log('TOKEN', token);
      formData.append('pdf', imgObj); //Set method
      const reqRes = await axios.post(
        'http://3.12.168.164:3000/menu/addmenu',
        formData,
        {
          headers: {
            Authorization: 'bearer ' + `${token}`,
          },
        },
      );
      console.log('UPLOAD_PDF_RES', reqRes.data.userData.menu.filePath);
      await AuthService.reloadUser();
      setPdf(reqRes.data.userData.menu.filePath);
    } catch (error) {
      console.log('HANDLE_UPLOAD_MENU - ', error);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };

  const handleUploadPdf = async () => {
    // console.log(menu?.filePath)
    if (menu != null) {
      Linking.openURL(menu?.filePath);
    } else {
      Linking.openURL(getPdf);
    }
  };

  return (
    <Scaffold statusBarStyle={{backgroundColor: '#fff'}}>
      <Spinner visible={loader} color={'#1FAEF7'} />
      {!loader && (
        <ScrollView
          bounces={false}
          style={[styles.container]}
          contentContainerStyle={{flexGrow: 1, paddingBottom: getHp(100)}}>
          <Header
            AllAccounts={MobxStore.authStore.AllAccounts || []}
            leftDropdown={
              username !== null ? `@${username !== null ? username : ''}` : ''
            }
            share={<BlackMenubar height={25} width={25} />}
            onPress={() => {
              props.navigation.openDrawer();
            }}
            headerBackColor={{backgroundColor: '#fff'}}
            {...props}
          />

          <View style={styles.subContainer}>
            <View style={{paddingHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                {profileImage != null ? (
                  <Avatar
                    source={{uri: `${profileImage?.filePath}`}}
                    size={getHp(80)}
                    rounded
                  />
                ) : null}

                <View
                  style={{
                    paddingLeft: 15,
                    minWidth: '55%',
                    maxWidth: '65%',
                  }}>
                  {fullName !== null ? (
                    <Text style={[styles.fullName, {marginBottom: 0}]}>
                      {fullName}
                    </Text>
                  ) : null}
                  {city !== null ? (
                    <Text
                      style={[
                        styles.fullName,
                        {
                          opacity: 0.7,
                          fontFamily: 'AvenirNext-Regular',
                          color: uiStore.theme.colors.primaryText1,
                          fontSize: FONTSIZE.Text14,
                          marginTop: 4,
                        },
                      ]}>
                      {city.split(',', 1)}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: getHp(10),
                  marginLeft: getWp(5),
                }}>
                <VendorProfileWidgets.AvgRating
                  ratingText={userProfile.user.averageRating}
                />
                <VendorProfileWidgets.VendorPriceInfo
                  vendor={userProfile.user}
                  containerStyle={{marginLeft: getWp(15)}}
                />
              </View>

              {/* <View style={{flexDirection: 'row', marginVertical: 15}}>
                <Ratings rating={'N/A'} />

                {hourlyRate != null &&
                !vendorCategoryFieldsData?.isEventRentals ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 15,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#00E08F',
                        borderRadius: 5,
                        padding: 2,
                      }}>
                      <DollarOnlyWhite height={18} width={18} />
                    </View>
                    {vendorCategoryFieldsData?.isMusic ||
                    vendorCategoryFieldsData?.isPhoto ||
                    vendorCategoryFieldsData?.isVideo ? (
                      <>
                        <Text style={styles.hourStyle}>
                          {hourlyRate} / hour
                        </Text>

                        <Text
                          style={[
                            styles.hourStyle,
                            {color: '#696969', fontSize: FONTSIZE.Text14},
                          ]}>
                          {' '}
                          (Base Package)
                        </Text>
                      </>
                    ) : vendorCategoryFieldsData?.isFood ? (
                      <>
                        <Text style={styles.hourStyle}>
                          {hourlyRate} / guest
                        </Text>

                        <Text
                          style={[
                            styles.hourStyle,
                            {color: '#696969', fontSize: FONTSIZE.Text14},
                          ]}>
                          {' '}
                          (Base Package)
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.hourStyle}>{hourlyRate} / hour</Text>
                    )}
                  </View>
                ) : null}
              </View> */}

              {website != null ? (
                <View style={styles.websiteView}>
                  <Webpin height={getHp(21)} width={getWp(23)} />
                  <Text
                    onPress={() => Linking.openURL(`https://${website}`)}
                    style={styles.webText}>
                    {website}
                  </Text>
                </View>
              ) : null}

              <View
                style={[styles.partition, {marginTop: 20, marginBottom: 0}]}
              />

              {about != null ? (
                <CustomText
                  TextData={about}
                  styleProp={{
                    color: '#000',
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text14,
                    marginTop: getHp(10),
                  }}
                />
              ) : null}

              <View style={[styles.partition, {marginBottom: 20}]} />
            </View>

            {/* View Inventory Add Media Extra button START */}
            {!(inventory?.length == 0 || inventory == null) &&
            vendorCategoryFieldsData?.isEventRentals ? (
              <>
                <View style={styles.prView}>
                  <Text
                    style={[
                      styles.mediaText,
                      {
                        fontSize: FONTSIZE.Text16,
                        fontFamily: 'AvenirNext-Medium',
                        color: '#000',
                        marginBottom: getHp(10),
                      },
                    ]}>
                    {'Media'}
                  </Text>
                  {/* <TouchableOpacity onPress={onlyPartyRentalImage} >
                      <View style={styles.onlyFlex}>
                        <AddBlueWhite height={20} width={20} />
                        <Text style={styles.addButton}>{"Add"}</Text>
                      </View>
                    </TouchableOpacity> */}
                </View>
                {!(inventory?.length == 0 || inventory == null)
                  ? PRhandleCarousel()
                  : null}
              </>
            ) : (
              <>
                {(inventory?.length == 0 || inventory == null) &&
                  vendorCategoryFieldsData?.isEventRentals && (
                    <View>
                      <TouchableOpacity
                        onPress={onlyPartyRentalImage}
                        style={[styles.addMediaButton, styles.shadowStyle]}>
                        <View style={[styles.onlyFlex]}>
                          <AddBlue height={18} width={18} />
                          <Text
                            style={[
                              styles.mediaText,
                              {
                                letterSpacing: 0.3,
                                marginLeft: 10,
                                letterSpacing: 0.3,
                                marginVertical: 10,
                              },
                            ]}>
                            {' '}
                            {'Add Media'}{' '}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
              </>
            )}
            {/* View Inventory Add Media Extra button FINISH */}

            {!(
              userProfile?.user?.gallery == null ||
              userProfile?.user?.gallery.length == 0
            ) && !vendorCategoryFieldsData?.isEventRentals ? (
              <>
                <View style={styles.prView}>
                  <Text
                    style={[
                      styles.mediaText,
                      {
                        fontSize: FONTSIZE.Text16,
                        fontFamily: 'AvenirNext-Medium',
                        color: '#000',
                        marginBottom: getHp(10),
                      },
                    ]}>
                    {'Media'}
                  </Text>
                  {/* <TouchableOpacity onPress={handleImage} >
                      <View style={styles.onlyFlex}>
                        <AddBlueWhite height={20} width={20} />
                        <Text style={[styles.addButton, { marginLeft: 10 }]}>{"Add"}</Text>
                      </View>
                    </TouchableOpacity> */}
                </View>
                {!(
                  userProfile?.user?.gallery == null ||
                  userProfile?.user?.gallery.length == 0
                ) && !vendorCategoryFieldsData?.isEventRentals
                  ? handleCarousel()
                  : null}
              </>
            ) : (
              <View>
                {(userProfile?.user?.gallery == null ||
                  userProfile?.user?.gallery.length == 0) &&
                !vendorCategoryFieldsData?.isEventRentals ? (
                  <TouchableOpacity
                    onPress={() => {
                      // console.log('TEST - ', uiStore.theme.serialize());
                      // return;
                      // handleImage();
                      handleAddMedia();
                    }}
                    style={[styles.addMediaButton, styles.shadowStyle]}>
                    <View style={styles.onlyFlex}>
                      <AddBlue height={18} width={18} />
                      <Text
                        style={[
                          styles.mediaText,
                          {
                            marginLeft: 10,
                            letterSpacing: 0.3,
                            fontFamily: 'AvenirNext-Medium',
                            marginVertical: 10,
                          },
                        ]}>
                        {' '}
                        {'Add Media'}{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            {/* {
                !(gallery == null) ? handleCarousel() : null
              } */}

            {/* pdf section */}
            {
              <>
                {(vendorCategoryFieldsData?.isDrinks ||
                  vendorCategoryFieldsData?.isFood ||
                  vendorCategoryFieldsData?.isEventRentals) &&
                // (getPdf != null || getPdf.length != 0) ||
                menu != null ? (
                  <>
                    <TouchableOpacity
                      onPress={handleUploadPdf}
                      style={[styles.addMediaButton, styles.shadowStyle]}>
                      <Text
                        style={[
                          styles.mediaText,
                          {
                            letterSpacing: 0.4,
                            color: '#1FAEF7',
                            fontSize: FONTSIZE.Text20,
                            fontFamily: 'AvenirNext-Medium',
                          },
                        ]}>
                        {vendorCategoryFieldsData?.isEventRentals
                          ? 'View All Inventory'
                          : 'View Menu'}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (vendorCategoryFieldsData?.isDrinks ||
                    vendorCategoryFieldsData?.isFood ||
                    vendorCategoryFieldsData?.isEventRentals) &&
                  // (getPdf != null || getPdf.length != 0) ||
                  menu == null ? (
                  <TouchableOpacity
                    onPress={handleUploadMenuAndInventory}
                    style={[styles.addMediaButton, styles.shadowStyle]}>
                    <Text
                      style={[
                        styles.mediaText,
                        {
                          letterSpacing: 0.4,
                          color: '#1FAEF7',
                          fontSize: FONTSIZE.Text20,
                          fontFamily: 'AvenirNext-Medium',
                        },
                      ]}>
                      {vendorCategoryFieldsData?.isEventRentals
                        ? 'Upload Inventory'
                        : 'Upload Menu'}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </>
            }
          </View>
          <VendorProfileWidgets.VendorAmenities
            vendorData={userProfile?.user}
          />

          {rating?.length > 0 && (
            <Lists.HostVendorRating ratings={filterArrOnDate(rating.slice())} />
          )}
        </ScrollView>
      )}
    </Scaffold>
  );
}

DjProfile.routeName = '/DjProfile';
export default observer(DjProfile);
