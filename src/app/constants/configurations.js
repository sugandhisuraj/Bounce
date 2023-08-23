import {ApiScope} from 'react-native-spotify-remote';
import AppJSON from '../../../app.json';

class APP_CONFIGURATIONS {
  APP_ENV = {
    DEVELOPMENT: 'DEVELOPMENT',
    PRODUCTION: 'PRODUCTION',
  };

  VERSION = AppJSON.bounceVersion;

  ENV = AppJSON.isProduction
    ? this.APP_ENV.PRODUCTION
    : this.APP_ENV.DEVELOPMENT;

  IS_PRODUCTION = this.ENV == this.APP_ENV.PRODUCTION;
  IS_DEVELOPMENT = this.ENV == this.APP_ENV.DEVELOPMENT;
  SPOTIFY = {
    clientID: 'a667534a6cef4088acac224d3fd07480',
    redirectURL: `http://3.12.168.164:3000/spotify/spotifyCallback`,
    tokenRefreshURL: 'https://accounts.spotify.com/api/token',
    tokenSwapURL: 'https://accounts.spotify.com/api/token',
    authType: 'TOKEN',
    scopes: [
      ApiScope.AppRemoteControlScope,
      ApiScope.UserReadEmailScope,
      ApiScope.UserReadPrivateScope,
      ApiScope.UserFollowModifyScope,
      ApiScope.UserFollowReadScope,
      ApiScope.UserTopReadScope,
      ApiScope.AppRemoteControlScope,
    ],
  };
  IOS_APP_LINK = `itms-apps://itunes.apple.com/us/app/id1572622963?mt=8`;
  ANDROID_APP_LINK = `http://play.google.com/store/apps/details?id=com.bounce.apps`;
  STRIPE = {
    publishingDevKey: `pk_test_51IjamrFA7GDhqLcryzrxNLkqmxLbdtYcjoz2WmfWN4lscfkgGReF65ZNacyadI2ueiOCN1KbyR6RA3Ji7pyWca7S00v6Pe1PF7`,
    publishingProductKey: `pk_live_51IjamrFA7GDhqLcrWZI3qejrFezmUNrglcAcXfoXOTwuynkN8WfSSVUVnA9MbN6m9cfTmv4ACEobGGxF6qXcAzvy008pdDGtQH`,
  };
  quEncryptionKey = '154wdfssad12@$g#';

  PRIVACY_POLICY_LINK = `https://8f99c70b-a342-4d09-84c5-c632e6b5b707.filesusr.com/ugd/42a7ea_1466eb735f96403aad53f9ed9f280a50.pdf`;

  TERMS_CONDITIONS_USE = `https://8f99c70b-a342-4d09-84c5-c632e6b5b707.filesusr.com/ugd/42a7ea_2f68036ced274ff5b3c943da468e8fe6.pdf`;
}

export default Object.freeze(new APP_CONFIGURATIONS());

/*
/*

import {ApiScope} from 'react-native-spotify-remote';
import {ApiClient} from '../services';
class APP_CONFIGURATIONS {
  SPOTIFY = {
    clientID: 'a667534a6cef4088acac224d3fd07480',
    redirectURL: `http://3.12.168.164:3000/spotify/spotifyCallback`,
    tokenRefreshURL: 'https://accounts.spotify.com/api/token',
    tokenSwapURL: 'https://accounts.spotify.com/api/token',
    //authType: 'TOKEN',
    authType: 'TOKEN',
    scopes: [
      ApiScope.PlaylistReadPrivateScope,
      ApiScope.PlaylistReadCollaborativeScope,
      ApiScope.PlaylistModifyPublicScope,
      ApiScope.PlaylistModifyPrivateScope,
      ApiScope.UserFollowReadScope,
      ApiScope.UserFollowModifyScope,
      ApiScope.UserLibraryReadScope,
      ApiScope.UserLibraryModifyScope,
      ApiScope.UserReadBirthDateScope,
      ApiScope.UserReadEmailScope,
      ApiScope.UserReadPrivateScope,
      ApiScope.UserTopReadScope,
      ApiScope.UGCImageUploadScope,
      ApiScope.StreamingScope,
      ApiScope.AppRemoteControlScope,
      ApiScope.UserReadPlaybackStateScope,
      ApiScope.UserReadPlaybackPosition,
      ApiScope.UserModifyPlaybackStateScope,
      ApiScope.UserReadCurrentlyPlayingScope,
      ApiScope.UserReadRecentlyPlayedScope,
      ApiScope.UserReadCurrentlyPlaying,
    ],
  };
}

export default Object.freeze(new APP_CONFIGURATIONS());

*/
