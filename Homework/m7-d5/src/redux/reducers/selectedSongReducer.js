import { SELECTED_SONG, SELECTED_ALBUM } from "../actions";
import { initialState } from "..";

export const selectedSongReducer = (
  state = initialState.selectedSong,
  action
) => {
  switch (action.type) {
    case SELECTED_SONG:
      return { ...state, selectedSong: action.payload };

    case SELECTED_ALBUM:
      return { ...state, selectedAlbum: action.payload };

    default:
      return state;
  }
};
