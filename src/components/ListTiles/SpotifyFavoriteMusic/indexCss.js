import { StyleSheet } from 'react-native';
import { FONTFAMILY, FONTSIZE, getHp } from '../../../app/utils';

export default StyleSheet.create({
    trackContainer: {
        borderRadius: getHp(10),
        width: getHp(150),
        marginHorizontal: getHp(20)
    },
    trackImage: {
        height: getHp(150),
        width: getHp(150),
        borderRadius: getHp(10)
    },
    trackName: {
        marginTop: getHp(12),
        fontWeight: '400',
        fontSize: FONTSIZE.Text16,
        fontFamily: FONTFAMILY.AvenirNextMedium,
        textAlign: 'center'
    }
});

