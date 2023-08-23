import { StyleSheet } from 'react-native';
import { getHp, getWp } from '../../app/utils';

export default StyleSheet.create({
    containerStyle: {
        flexDirection: 'row'
    },
    starContainer: {
        height: getHp(40),
        width: getHp(40),
        borderRadius: getHp(10),
        backgroundColor: '#F2F5F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: getWp(8)
    }
});