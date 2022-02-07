/** @format */

export const ADD_TO_PLAYLISTS = "ADD_TO_PLAYLISTS";
export const ADD_TRACKS_TO_SINGLEPLAYLIST = "ADD_TRACKS_TO_SINGLEPLAYLIST";
export const ADD_TRACK = "ADD_TRACK";

export const addToPlayListsAction = (track) => ({
  type: ADD_TO_PLAYLISTS,
  payload: track,
});

export const addTrackAction = (track, playlist) => ({
  type: ADD_TRACK,
  song: track,
  name: playlist,
});
