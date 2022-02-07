/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import likedSongs from "../redux/reducers/likedSongs.js";
// import favComReducer from "../reducers/favComReducer.js";
import { selectedSongReducer } from "./reducers/selectedSongReducer";
import thunk from "redux-thunk";
import playlistsReducer from "./reducers/playlistReducer";
import undoable from "redux-undo";

const composeThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  liked: {
    songs: [
      {
        id: 691864172,
        readable: true,
        title: "Jazz",
        title_short: "Jazz",
        title_version: "",
        link: "https://www.deezer.com/track/691864172",
        duration: 198,
        rank: 757219,
        explicit_lyrics: false,
        explicit_content_lyrics: 0,
        explicit_content_cover: 0,
        preview:
          "https://cdns-preview-7.dzcdn.net/stream/c-7d384d8e3da32c7759b7e679e9148e90-6.mp3",
        md5_image: "81ccf65d4426f968f35d672237bfa71e",
        artist: {
          id: 53345732,
          name: "Eva",
          link: "https://www.deezer.com/artist/53345732",
          picture: "https://api.deezer.com/artist/53345732/image",
          picture_small:
            "https://e-cdns-images.dzcdn.net/images/artist/ae81283187f0f2c9b083c46d445e2434/56x56-000000-80-0-0.jpg",
          picture_medium:
            "https://e-cdns-images.dzcdn.net/images/artist/ae81283187f0f2c9b083c46d445e2434/250x250-000000-80-0-0.jpg",
          picture_big:
            "https://e-cdns-images.dzcdn.net/images/artist/ae81283187f0f2c9b083c46d445e2434/500x500-000000-80-0-0.jpg",
          picture_xl:
            "https://e-cdns-images.dzcdn.net/images/artist/ae81283187f0f2c9b083c46d445e2434/1000x1000-000000-80-0-0.jpg",
          tracklist:
            "https://striveschool-api.herokuapp.com/api/deezer/artist/53345732/top?limit=50",
          type: "artist",
        },
        album: {
          id: 99410932,
          title: "Queen",
          cover: "https://api.deezer.com/album/99410932/image",
          cover_small:
            "https://e-cdns-images.dzcdn.net/images/cover/81ccf65d4426f968f35d672237bfa71e/56x56-000000-80-0-0.jpg",
          cover_medium:
            "https://e-cdns-images.dzcdn.net/images/cover/81ccf65d4426f968f35d672237bfa71e/250x250-000000-80-0-0.jpg",
          cover_big:
            "https://e-cdns-images.dzcdn.net/images/cover/81ccf65d4426f968f35d672237bfa71e/500x500-000000-80-0-0.jpg",
          cover_xl:
            "https://e-cdns-images.dzcdn.net/images/cover/81ccf65d4426f968f35d672237bfa71e/1000x1000-000000-80-0-0.jpg",
          md5_image: "81ccf65d4426f968f35d672237bfa71e",
          tracklist: "https://api.deezer.com/album/99410932/tracks",
          type: "album",
        },
        type: "track",
      },
    ],
  },
  playlists: {
    createdLists: [{ title: "fav", songs: [] }],
  },
  selectedSong: {
    selectedSong: null,
    selectedAlbum: null,
  },
};

const bigReducer = combineReducers({
  liked: likedSongs,
  // counter: undoable(counter),
  selectedSong: selectedSongReducer,
  playlists: playlistsReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
);

export default configureStore;
