export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE";
export const RESET_NEW_MESSAGE = "RESET_NEW_MESSAGE";

export const setNewMessageAction = (_id: string) => ({
  type: SET_NEW_MESSAGE,
  payload: _id,
});

export const resetNewMessageAction = (_id: string) => ({
  type: RESET_NEW_MESSAGE,
  payload: _id,
});
