import { initialState } from "../index";
import { TokensActionType } from "../../types";
import { RESET_CREDENTIALS, SET_CREDENTIALS } from "../actions/credentials";

const credentialsReducer = (
  state = initialState.credentials,
  action: TokensActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CREDENTIALS:
      return payload;
    case RESET_CREDENTIALS:
      return { accessToken: "", refreshToken: "" };

    default:
      return state;
  }
};

export default credentialsReducer;
