import {StyleSheet} from 'react-native';
import {getHp, getWp, FONTSIZE, FONTFAMILY} from '../../app/utils';

const borderWidth = 0;
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth,
    borderColor: 'red',
    alignItems: 'center',
    paddingLeft: getWp(15),
    height: getHp(35),
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(10),
    //overflow: 'hidden',
  },
  searchInput: {
    borderWidth,
    borderColor: 'blue',
    height: '100%',
    letterSpacing: 0.2,
    color: '#000',
    width: '78%',
    fontWeight: '500',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    padding: 0,
    margin: 0,
  },
  closeTouchContainer: {
    borderWidth,
    borderColor: 'orange',
    height: '100%',
    width: '11%',
    justifyContent: 'center',
  },
  shadowStyle: {

  }
});

/*

const styles = StyleSheet.create({
  inputStyle: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    alignSelf: 'center',
    letterSpacing: 0.2,
    padding: 0,
    margin: 0,
  },
  containerStyle: {
    borderRadius: getHp(10),
    backgroundColor: '#FFF',
    height: getHp(40),
    fontSize: FONTSIZE.Text16,
    width: '80%',
    alignSelf: 'center',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

// return (
  //   <SearchBar
  //     searchIconImageStyle={{tintColor: '#999'}}
  //     clearIconImageStyle={{tintColor: '#999'}}
  //     iconColor="#999999"
  //     placeholderTextColor={'#999'}
  //     placeholder={placeholder}
  //     value={searchQuery}
  //     onChangeText={onChangeText}
  //     onClearPress={() => onChangeText('')}
  //     style={[
  //       styles.containerStyle,
  //       containerStyle,
  //       withShadow && styles.shadowStyle,
  //     ]}
  //     textInputStyle={[styles.inputStyle, inputStyle]}
  //   />
  // );
  // return (
  //   <Searchbar
  //     style={[styles.containerStyle, containerStyle]}
  //     placeholder={placeholder}
  //     onChangeText={onChangeText}
  //     value={searchQuery}
  //     inputStyle={(styles.inputStyle, inputStyle)}
  //     iconColor={'#999999'}
  //     placeholderTextColor={'#909090'}
  //   />
  // );
*/
