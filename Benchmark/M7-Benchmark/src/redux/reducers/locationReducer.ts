import {
  ADD_LOCATION,
  REMOVE_LOCATION,
  SET_MAIN_LOCATION,
} from "../actions/locations";
import { initialState } from "../index";
import { LocationActionType } from "../../types";

const locationsReducer = (
  state = initialState.location,
  action: LocationActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LOCATION:
      return { ...state, favs: [...state.favs, payload] };
    case REMOVE_LOCATION:
      return {
        ...state,
        favs: state.favs.filter((loc) => loc.name !== payload.name),
      };
    case SET_MAIN_LOCATION:
      return { ...state, active: payload };

    default:
      return state;
  }
};

export default locationsReducer;
