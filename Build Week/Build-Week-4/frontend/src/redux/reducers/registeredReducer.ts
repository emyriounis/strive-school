import { initialState } from "../index";
import { RegisteredActionType } from "../../types";
import { SET_REGISTERED } from "../actions/registered";

const registeredReducer = (
  state = initialState.registered,
  action: RegisteredActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_REGISTERED:
      return payload;

    default:
      return state;
  }
};

export default registeredReducer;
