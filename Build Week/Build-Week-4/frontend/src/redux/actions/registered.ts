export const SET_REGISTERED = "SET_REGISTERED";

export const setRegisteredAction = (registered: boolean) => ({
  type: SET_REGISTERED,
  payload: registered,
});
