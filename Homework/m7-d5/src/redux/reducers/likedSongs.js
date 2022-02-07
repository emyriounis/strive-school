import { initialState } from "../index.js";
import { ADD_TO_LIKED_SONGS, REMOVE_FROM_LIKED_SONGS } from "../actions";

const likedSongs = (state = initialState.liked, action) => {
  switch (action.type) {
    case ADD_TO_LIKED_SONGS:
      return { ...state, songs: [...state.songs, action.payload] };
    case REMOVE_FROM_LIKED_SONGS:
      return {
        ...state,
        songs: [...state.songs].filter((song) => song !== action.payload),
      };

    default:
      return state;
  }
};

export default likedSongs;
