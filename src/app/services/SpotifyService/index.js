import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';
import {APP_CONFIGURATIONS} from '../../constants';
import ToastUtil from '../../constants/toast';
import ApiClient from '../ApiClient';
import MobxStore from '../../../mobx';
import {Spotify} from '../../Entities';
import AuthService from '../AuthService';

class SpotifyService {
  connectToSpotify = async () => {
    try {
      const session = await SpotifyAuth.authorize(APP_CONFIGURATIONS.SPOTIFY);
      //await SpotifyRemote.connect(session.accessToken);
      console.log('SPOTIFY_RESPONSE_TEST -: ', JSON.stringify(session));
      setTimeout(() => {
        return this.saveSpotifyToken(session.accessToken);
      }, 700);
    } catch (e) {
      ToastUtil('Something went wrong! Try Again');
      console.log('Spotify Error ----> ', e);
    }
  };

  saveSpotifyToken = async accessToken => {
    try {
      MobxStore.toggleLoader(true);
      const saveAccessTokenResponse = await ApiClient.authInstance.post(
        ApiClient.endPoints.spotifyConnect,
        {
          accessToken,
        },
      );
      console.log(
        'SAVE_SPOTIFY_ACCESS_RESPONSE_SSAC - ',
        saveAccessTokenResponse.data,
      );
      if (saveAccessTokenResponse.status == 201) {
         AuthService.reloadUser();
      } else {
        throw {response: saveAccessTokenResponse};
      }
    } catch (error) {
      console.log('SAVE_SPOTIFY_ERROR - ', JSON.stringify(error?.response));
      let msg = error?.response?.data?.message ?? 'Something went wrong';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  getSpotifyData = async () => {
    try {
      MobxStore.toggleLoader(true);
      const getSpotifyDataRes = await ApiClient.authInstance.get(
        ApiClient.endPoints.getSpotifyData,
      );
      console.log('GET_SPOTIFY_DATA_STATUS - ', getSpotifyDataRes.status);
      if (getSpotifyDataRes.status != 200) {
        throw new Error('Something went wrong');
      }
      MobxStore.socialStore.setSpotify(
        Spotify.fromJSON(getSpotifyDataRes.data),
      );
    } catch (error) {
      console.log('SAVE_SPOTIFY_ERROR - ', error);
      let msg = error?.response?.data?.message ?? 'Something went wrong';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
}

export default Object.freeze(new SpotifyService());
