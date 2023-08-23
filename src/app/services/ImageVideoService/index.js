import ImageCropPicker from 'react-native-image-crop-picker';
import ToastUtil from '../../constants/toast';

class ImageVideoService {
  pickPhoto = async (imagePickerProps = {}) => {
    try {
      const pickedImages = await ImageCropPicker.openPicker({
        ...imagePickerProps,
      });

      return Promise.resolve(pickedImages);
    } catch (e) {
      this.handleCommonError(e);
      return Promise.reject(error);
    }
  };
  editImage = async (imagePickerProps = {}) => {
    try {
      const pickedImages = await ImageCropPicker.openCropper({
        ...imagePickerProps,
        
      });

      return Promise.resolve(pickedImages);
    } catch (e) {
      this.handleCommonError(e);
      return Promise.reject(e);
    }
  };
  handleCommonError = e => {
    if (e == 'Error: User cancelled image selection') {
      return;
    }
    ToastUtil('Error while processing assets!');
  };
}

export default new ImageVideoService();
