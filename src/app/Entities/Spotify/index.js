class Spotify {
  connected = false;

  static fromJSON = (spotifyJsonData = {}) => { 
    let spotifyInstance = new Spotify();
    spotifyInstance.connected = true;
    Object.assign(spotifyInstance, spotifyJsonData);
    return spotifyInstance;
  };
}

export default Spotify;
