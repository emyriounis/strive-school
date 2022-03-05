import { ActiveActionType } from "../../types";
import { SET_ACTIVE } from "../actions/active";
import { initialState } from "../index";

const activeReducer = (
  state = initialState.active,
  action: ActiveActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ACTIVE:
      return payload;

    default:
      return state;
  }
};

export default activeReducer;
