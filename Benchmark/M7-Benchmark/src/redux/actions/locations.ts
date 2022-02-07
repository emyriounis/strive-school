import { LocationType } from "../../types/index";

export const ADD_LOCATION = "ADD_LOCATION";
export const REMOVE_LOCATION = "REMOVE_LOCATION";
export const SET_MAIN_LOCATION = "SET_MAIN_LOCATION";

export const addLocationAction = (location: LocationType) => ({
  type: ADD_LOCATION,
  payload: location,
});

export const removeLocationAction = (location: LocationType) => ({
  type: REMOVE_LOCATION,
  payload: location,
});

export const setLocationAction = (location: LocationType) => ({
  type: SET_MAIN_LOCATION,
  payload: location,
});
