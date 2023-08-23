import MimeTypesLib from 'mime-types';
import {MimeTypes} from '../constants';

const AssetsTypes = {
  isVideo: false,
  isPhoto: false,
};
const generateAssetType = () => Object.assign({}, AssetsTypes);

export const getAssetTypeFromMimeType = mimeType => {
  let returnObject = generateAssetType();
  if (MimeTypes.VIDEO_MIME_TYPES.includes(mimeType)) {
    returnObject.isVideo = true;
  } else if (MimeTypes.IMAGES_MIME_TYPES.includes(mimeType)) {
    returnObject.isPhoto = true;
  }
  return returnObject;
};

export const getAssetTypeFromFileURL = url => {
  const mimeType = MimeTypesLib.lookup(url);
  console.log(`MIME_TYPE_FOR_PATH - ${url} is ${mimeType}`);
  return getAssetTypeFromMimeType(mimeType);
};
