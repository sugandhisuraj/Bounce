import { action, makeAutoObservable, observable } from "mobx";
import { Spotify } from "../../../app/Entities";
class SocialStore {

    @observable spotify = new Spotify();

    constructor() {
        makeAutoObservable(this);
    }
    @action
    setSpotify(spotify) {
        this.spotify = spotify;
    }
}
export default SocialStore;