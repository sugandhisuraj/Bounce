import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  NativeModule,
} from 'react-native';
import {
  Header,
  CustomButton,
  ReviewCard,
  Footer,
  CustomText,
  Scaffold,
} from '@components';
import {GreyHamburger, BlackCircleCross} from '@svg';
// import { handleImage } from '@components/ImageVideoPlaceholder'
import ImagePicker from 'react-native-image-crop-picker';
import {ImageStore} from 'react-native';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Avatar} from 'react-native-elements';
import {Observer, observer} from 'mobx-react';
import PlanPartyModel from './PlanPartyModel';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {ImageVideoService} from '../../../../app/services';
import ToastUtil from '../../../../app/constants/toast';
import {
  Buttons,
  EventPageWidgets,
  Headers,
  Seperator,
} from '../../../../components';
import {
  FileMIMETypesUtils,
  FONTFAMILY,
  PartyUtils,
} from '../../../../app/utils';
function UploadMedia(props) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  let goBack = false;
  if (props.route?.params) {
    goBack = props.route?.params.goBack;
  }
  let partyModel = PlanPartyModel.getInstance();
  const [state, setState] = useState({});
  const partyImages = [
    ...partyModel.party.galleryFiles,
     ...partyModel.party.gallery,
  ];
  useEffect(() => {
    const listener = partyModel.party?.subscribe(() => {
      setState(() => ({}));
    });
    setTimeout(() => {
      handleImage();
    }, 500);
    return () => {
      listener.unsubscribe();
    };
  }, []);

  const handleImage = async () => {
    try {
      setIsDeleteMode(_ => false);
      const images = await ImageVideoService.pickPhoto({
        mediaType: 'any',
        multiple: true,
      });
      console.log('SELECTED_IMAGES_PARTY - ', images);
      partyModel.party.addGallery(images);
    } catch (e) {}
  };
  const deleteImage = (action, path) => {
    partyModel.party.removeGallery(action, path);
  };
  const onPartyImageEdit = async (index, item) => {
    if (!item.path) {
      return ToastUtil(`Can't edit picture!`);
    }
    try {
      const updatedImage = await ImageVideoService.editImage({
        path: item.path,
        freeStyleCropEnabled: true,
      });
      console.log('UPDATED_IMAGE - ', updatedImage);
      const newGalleryImages = [...partyModel.party.galleryFiles];
      newGalleryImages[index] = updatedImage;
      partyModel.party.updateGallery(newGalleryImages);
    } catch (e) {}
  };

  const onDeleteAssetsPress = item => {
    if (partyModel.isEditMode && item.filePath) {
      return Alert.alert('Message', 'Sure Delete Image?', [
        {
          text: 'Okay',
          onPress: () => {
            deleteImage(true, item.filePath);
          },
        },
        {
          text: 'Cancel',
        },
      ]);
    }
    return deleteImage(false, item.path);
  };
  const renderItem = ({item, index, drag}) => {
    if (item == undefined) {
      return false;
    } 
    console.log('RENDER_ITEM_1 - ', item, index);
    const widgetMode = isDeleteMode
      ? EventPageWidgets.PartyImageInput.WidgetModes.Delete
      : null;

    const mimeType = FileMIMETypesUtils.getAssetTypeFromFileURL(item?.fileName ?? item?.filePath);
    console.log('ASSET_MIME_TYpe - ', mimeType);
    console.log("itr-test - ",item);
    let PhotoVideoWidget = null;
    if (mimeType.isVideo) {
      PhotoVideoWidget = (
        <EventPageWidgets.PartyVideoInput
          widgetMode={widgetMode}
          forCoverPhoto={index == 0}
          source={item?.path ?? item?.filePath}
          onDeletePress={onDeleteAssetsPress}
          onHamburgerPress={drag}
        />
      );
    } else {
      PhotoVideoWidget = (
        <EventPageWidgets.PartyImageInput
          widgetMode={widgetMode}
          forCoverPhoto={index == 0}
          source={item}
          onDeletePress={onDeleteAssetsPress}
          onHamburgerPress={drag}
          onEditPress={onPartyImageEdit.bind(null, index)}
          showEdit={item?.creationDate}
        />
      );
    }
    return <Fragment>{PhotoVideoWidget}</Fragment>;
  };
  const RenderImagesSection = () => {
    return (
      <DraggableFlatList
        bounces={false}
        style={{
          marginBottom: getHp(10),
          marginTop: getHp(25),
          flex: 1,
          flexGrow: 1,
        }}
        data={partyImages}
        keyExtractor={(item, index) => item.path}
        renderItem={renderItem}
        onDragEnd={({data}) => partyModel.party.updateGallery(data)}
      />
    );
  };
  return (
    <Scaffold
      statusBarStyle={{backgroundColor: '#FBFBFB'}}
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}>
      <View style={styles.container}>
        <Headers.BackTile
          title={'Upload Media'}
          onBackPress={() => props.navigation.goBack()}
        />

        <View style={[styles.topActionTray]}>
          <Buttons.PrimaryButton
            containerStyle={{width: getWp(160)}}
            titleStyle={[styles.deleteTitleStyle]}
            title={!isDeleteMode ? 'Delete' : 'Done'}
            onPress={() => {
              if (partyImages.length == 0) {
                return;
              }
              setIsDeleteMode(_ => !_);
            }}
          />
          <Buttons.PrimaryButton
            onPress={handleImage}
            containerStyle={{width: getWp(160)}}
            titleStyle={[styles.deleteTitleStyle, {color: '#00CFFF'}]}
            title={'Add Images'}
          />
        </View>

        {RenderImagesSection()}
        <Buttons.LinearGradient
          gradientColors={['#00CFFF', '#68E3FF']}
          touchContainerStyle={styles.sendItTouchContainer}
          onPress={() => props.navigation.goBack()}
          // onPress={() => {
          //   console.log(FileMIMETypesUtils.getAssetTypeFromFileURL('ds.mov'))
          // }}
          title={'Continue'}
          titleStyle={{
            letterSpacing: 0.3,
            fontWeight: '700',
            fontSize: FONTSIZE.Text18,
          }}
          showArrow={false}
          linearGradientStyle={{
            width: '90%',
            height: getHp(50),
            alignSelf: 'center',
            borderRadius: getHp(20),
            bottom: getHp(5),
          }}
          touchContainerStyle={{flex: 1, width: '100%'}}
        />
      </View>
    </Scaffold>
  );
}
const styles = StyleSheet.create({
  deleteTitleStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    fontSize: FONTSIZE.Text18,
    color: '#FF005C',
  },
  topActionTray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '82%',
    alignSelf: 'center',
    marginTop: getHp(20),
  },
  container: {
    backgroundColor: '#FBFBFB',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  number: {
    // fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Regular',
  },
});
UploadMedia.routeName = '/UploadMedia';
export default observer(UploadMedia);

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {
//   Header,
//   CustomButton,
//   ReviewCard,
//   Footer,
//   CustomText,
//   Scaffold,
// } from '@components';
// import {GreyHamburger, BlackCircleCross} from '@svg';
// // import { handleImage } from '@components/ImageVideoPlaceholder'
// import ImagePicker from 'react-native-image-crop-picker';
// import {ImageStore} from 'react-native';
// import {FONTSIZE, getHp, getWp} from '@utils';
// import {Avatar} from 'react-native-elements';
// import {Observer, observer} from 'mobx-react';
// import PlanPartyModel from './PlanPartyModel';
// import DraggableFlatList from 'react-native-draggable-flatlist';
// import {ImageVideoService} from '../../../../app/services';
// import ToastUtil from '../../../../app/constants/toast';
// function UploadMedia(props) {
//   let goBack = false;
//   if (props.route?.params) {
//     goBack = props.route?.params.goBack;
//   }
//   let partyModel = PlanPartyModel.getInstance();
//   const [state, setState] = useState({});

//   useEffect(() => {
//     const listener = partyModel.party?.subscribe(() => {
//       setState(() => ({}));
//     });
//     setTimeout(() => {
//       handleImage();
//     }, 500);
//     return () => {
//       listener.unsubscribe();
//     };
//   }, []);

//   const handleImage = async () => {
//     try {
//       const images = await ImageVideoService.pickPhoto();
//       console.log('SELECTED_IMAGES_PARTY - ', images);
//       partyModel.party.addGallery([images]);
//     } catch (e) {
//       if (e == 'Error: User cancelled image selection') {
//         return;
//       }
//       return ToastUtil('Error while processing assets!');
//     }
//   };
//   const deleteImage = (action, path) => {
//     partyModel.party.removeGallery(action, path);
//   };
//   const renderItem = ({item, index, drag}) => {
//     if (item == undefined) {
//       return false;
//     }
//     console.log('ITEM_UPLOAD_MEDIA - ', item);
//     return (
//       <View>
//         <View
//           style={{
//             marginVertical: getHp(10),
//             justifyContent: 'space-between',
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: getWp(20),
//           }}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Text
//               style={[
//                 styles.number,
//                 {
//                   color: '#000',
//                   fontSize: FONTSIZE.Text20,
//                   fontFamily: 'AvenirNext-Regular',
//                   marginRight: getWp(30),
//                 },
//               ]}>
//               {index + 1}
//             </Text>

//             <View>
//               {index == 0 ? (
//                 <Text style={[styles.number, {marginVertical: getHp(10)}]}>
//                   {'Cover Photo'}
//                 </Text>
//               ) : null}
//               <View>
//                 <Avatar
//                   source={{uri: item.path || item.filePath}}
//                   avatarStyle={{borderRadius: 13}}
//                   size={125}
//                 />
//                 <TouchableOpacity
//                   style={{
//                     position: 'absolute',
//                     right: 3,
//                     top: 3,
//                     height: 30,
//                     width: 30,
//                   }}
//                   onPress={() => {
//                     if (partyModel.isEditMode && item.filePath) {
//                       return Alert.alert('Message', 'Sure Delete Image?', [
//                         {
//                           text: 'Okay',
//                           onPress: () => {
//                             deleteImage(true, item.filePath);
//                           },
//                         },
//                         {
//                           text: 'Cancel',
//                         },
//                       ]);
//                     }
//                     return deleteImage(false, item.path);
//                   }}>
//                   <BlackCircleCross height={30} width={30} />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity onLongPress={drag}>
//             <GreyHamburger height={30} width={30} />
//           </TouchableOpacity>
//         </View>
//         {/* {index !== getMedia.length - 1 ?
//                     <View style={{ height: getHp(0.5), width: '100%', backgroundColor: '#CCCCCC' }} />
//                     :
//                     null} */}
//       </View>
//     );
//   };
//   return (
//     <Scaffold>
//       <View style={styles.container}>
//         <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
//           <Header
//             headerTitle={'Upload Media'}
//             back
//             onPress={() => props.navigation.goBack()}
//             headerBackColor={{backgroundColor: '#FBFBFB'}}
//           />

//           <DraggableFlatList
//             style={{height: 100}}
//             data={[
//               ...partyModel.party.galleryFiles.filter(i => i != undefined),
//               ...partyModel.party.gallery,
//             ]}
//             keyExtractor={(item, index) => item.path}
//             renderItem={renderItem}
//             onDragEnd={({data}) => partyModel.party.updateGallery(data)}
//           />
//           <View
//             style={{
//               alignSelf: 'center',
//               width: '100%',
//               paddingBottom: getHp(0),
//             }}>
//             <CustomButton
//               bar
//               colDoubleButton
//               ButtonTitle={'Add Images'}
//               ButtonTitle2={'Continue'}
//               onPress1={handleImage}
//               onPress={() => {
//                 if (goBack) {
//                   return props.navigation.goBack();
//                 }
//               }}
//             />
//           </View>
//         </ScrollView>
//       </View>
//     </Scaffold>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FBFBFB',
//     flex: 1,
//     height: '100%',
//     width: '100%',
//   },
//   number: {
//     // fontWeight: 'bold',
//     color: 'rgba(0, 0, 0, 0.6)',
//     fontSize: FONTSIZE.Text16,
//     fontFamily: 'AvenirNext-Regular',
//   },
// });
// UploadMedia.routeName = '/UploadMedia';
// export default observer(UploadMedia);
