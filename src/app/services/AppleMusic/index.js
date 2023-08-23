// import AppleMusic from '@bouncyapp/react-native-apple-music';
import { APP_CONFIGURATIONS } from '../../constants';

class AppleMusicService {
  authenticate = () => {
    // try {
    //   console.log("AUTH - ");
    //   AppleMusic.initialize(APP_CONFIGURATIONS.SPOTIFY.clientID,'HZFFCHSALX','3').then((isAuth) => {
    //     console.log(isAuth);
    //   });
    // }catch(error) { 
    //   console.log("ERROR - ", error); 
    // }
  };
}

export default new AppleMusicService();
