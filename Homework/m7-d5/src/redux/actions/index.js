
export const ADD_TO_LIKED_SONGS = "ADD_TO_LIKED_SONGS";
export const REMOVE_FROM_LIKED_SONGS = "REMOVE_FROM_LIKED_SONGS";

export const addToLikedSongsAction = (song) => ({
  type: ADD_TO_LIKED_SONGS,
  payload: song,
});
export const SELECTED_SONG = "SELECTED_SONG ";
export const SELECTED_ALBUM = "SELECTED_ALBUM "
export const addSelectedSong = (song) => ({
  type: SELECTED_SONG ,
  payload: song
  });
  export const addSelectedAlbum = (album) => ({
    type:  SELECTED_ALBUM,
    payload: album
    });
  

export const removeFromLikedSongsAction = (song) => ({
  type: REMOVE_FROM_LIKED_SONGS,
  payload: song,
});

// export const getJobsActions = (url) => {
//   return async (dispatch, getState) => {
//     try {
//       const resp = await fetch(url);
//       if (resp.ok) {
//         const { data } = await resp.json();
//         dispatch({
//           type: UPDATE_JOBS,
//           payload: data,
//         });
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
