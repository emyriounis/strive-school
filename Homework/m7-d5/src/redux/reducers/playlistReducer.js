/** @format */
import { ADD_TO_PLAYLISTS } from "../actions/playlistsAction.js";
import { ADD_TRACK } from "../actions/playlistsAction.js";
import { initialState } from "../index.js";

const playlistsReducer = (state = initialState.playlists, action) => {
  const { type, song, name, payload } = action;
  console.log(action);
  switch (type) {
    //--------->>
    case ADD_TO_PLAYLISTS:
      return {
        ...state,
        createdLists: [...state.createdLists, { title: payload, songs: [] }],
      };
    case ADD_TRACK:
      console.log({
        ...state,
        createdLists: [...state.createdLists].map((playlist) =>
          playlist.title === name
            ? {
                title: name,
                songs: [...playlist.songs, song],
              }
            : playlist
        ),
      });
      return {
        ...state,
        createdLists: [...state.createdLists].map((playlist) =>
          playlist.title === name
            ? {
                title: playlist.tilte,
                songs: [...playlist.songs, song],
              }
            : playlist
        ),
      };
    default:
      return state;
  }
};

export default playlistsReducer;
