import React from 'react';
import { Button,Text,View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImageCropPickerPoc = () => {

    const handleOpenImagePicker = async () => {
        const imgs = await ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true, 
        });

        console.log("IMAGES_PICKED - ", JSON.stringify(imgs));
    }
    return (
        <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
            <Button 
                title={'Open Picker'}
                onPress={handleOpenImagePicker}
            />
             
        </View>
    );
}
export default ImageCropPickerPoc;