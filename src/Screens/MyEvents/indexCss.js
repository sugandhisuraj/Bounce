import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE } from '@utils'

const { height, width } = Dimensions.get("screen")

const styles = StyleSheet.create({
   bottomContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 15,
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      width: '100%',
    },
    directionView: {
      elevation: 2,
      borderRadius: 13,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: 40,
   },
   tagStyle: {
      marginVertical: 5,
      elevation: 2,
      height: 40,
      justifyContent:'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 13,
      backgroundColor: '#fff',
      paddingHorizontal: 20
   },
   Tiktok: {
      marginLeft: 10,
      fontFamily: 'AvenirNext-Bold',
      color: '#000',
      width: '100%'
   },
   flex: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
   },
   iconStyle: {
      //   height:20,
      //   width:20,
      paddingRight: 0,
      marginRight: 5

   },
   tagTextStyle: {
      color: '#000',
      fontSize: FONTSIZE.Text16,

   },
   textStyle: {
      color: '#fff',
      fontSize: 20,
   },
   editButtonStyle: {
      elevation: 2,
      borderRadius: 7,
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: '#fff',
   },
   socialButton: {
      width: '90%',
      height: 50,
      elevation: 1,
      borderRadius: 13,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
   },
   linearGradient: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal:10,
      height: 32,
      elevation: 2,
      backgroundColor: '#F2F5F6',
      marginVertical: 10,
      borderRadius: 20,
   },
   allFrnds: {
      marginTop: 10,
      borderRadius: 9,
      alignItems: 'center',
      padding: 5,
      borderWidth: 1,
      borderColor: '#E4EEF1',
      backgroundColor: '#F2F5F6',
      paddingVertical: 10
   },
   // socialButton: {
   //    elevation: 3,
   //    borderRadius: 7,
   //    padding: 5,
   //    paddingHorizontal: 10,
   //    backgroundColor: '#fff',

   // },
   partition: {
      width: '90%',
      height: 0.1,
      backgroundColor: '#ddd',
      alignSelf: 'center'
   },
   addMediaButton: {
      elevation: 5,
      backgroundColor: '#fff',
      width: '80%',
      alignSelf: 'center',
      borderRadius: 24,
      alignItems: 'center',
      paddingVertical: 15,
      marginTop: 10,
      marginBottom: 20
   },
   websiteView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingVertical: 25
      // width: '40%',
      // justifyContent: 'space-between'
   },
   container: {
      // justifyContent:'center',
      flex: 1,
      
      backgroundColor: '#FBFBFB',
   },
   subContainer: {
      // flexDirection: 'column',
      // justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      // width:'90%'
      // height: height/3
   },

   belowTextStyle: {
      color: '#000',
      fontSize: FONTSIZE.Text18,
      opacity: 0.8,
      fontFamily: 'AvenirNext-Regular',
   },
   headerTitle: {
      color: '#000',
      fontSize: 18,
      // opacity: 0.5,
      // marginBottom: 5,
      fontFamily: 'AvenirNext-Medium',
   },
   BasePackageTitle: {
      color: '#000',
      fontSize: 18,
      opacity: 0.5,
      marginBottom: 5,
      fontFamily: 'AvenirNext-Regular',
   },
   websiteImageStyle: {
      height: 80,
      width: 150,
      borderRadius: 15
   },

   websiteUrlStyle: {
      alignSelf: 'center',
      color: '#1FAEF7',
      fontSize: 12,
      fontFamily: 'AvenirNext-Regular',
   },
   hostDetail: {
      color: '#000',
      fontSize: 20,
      opacity: 0.9,
      fontFamily: 'AvenirNext-Regular',
      textAlign: 'center',
      marginVertical: 15

   },
   InstaText: {
      color: '#000',
      fontSize: FONTSIZE.Text14,
      marginLeft: 10,
      fontFamily: 'AvenirNext-Bold'
   },

   aboutText: {
      color: '#000',
      fontSize: FONTSIZE.Text16,
      fontFamily: 'AvenirNext-Regular'
   },
   Textarea: {
      borderWidth: 1,
      borderColor: "#DDDDDD",
      backgroundColor: '#FFFFFF',
      marginVertical: 10,
      fontSize: FONTSIZE.Text16,
      borderRadius: 15,
      paddingLeft: 20,
   }
   ,

   iconWithBelowTextStyle: {
      height: 0,
      width: 0,
      // marginRight:15

   },
   editButton: {
      color: '#1FAEF7',
      fontSize: FONTSIZE.Text14,
      fontWeight: 'bold',
      fontFamily: 'AvenirNext-Regular'
   }
})
export {
   styles
}
