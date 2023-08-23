import { StyleSheet } from 'react-native';
import { FONTFAMILY, FONTSIZE } from '../../../app/utils';


export default StyleSheet.create({
    container :{

    },
    heading: {
         fontFamily: FONTFAMILY.AvenirNextRegular,
         fontWeight: '600',
         fontSize: FONTSIZE.Text18,
         color: '#000000'
    },
    listContainerStyle: {
        flexDirection :'row',
        flexWrap: 'wrap'
    }
});