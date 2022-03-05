export const SET_ACTIVE = "SET_ACTIVE";

export const setActiveAction = (_id: string | null) => ({
  type: SET_ACTIVE,
  payload: _id,
});
