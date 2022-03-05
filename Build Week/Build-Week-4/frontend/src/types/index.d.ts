export interface TokensType {
  accessToken: string;
  refreshToken: string;
}

export interface TokensActionType {
  type: "SET_CREDENTIALS" | "RESET_CREDENTIALS";
  payload: TokensType;
}

export interface RegisterInfoType {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginCredentialsType {
  identifier: string;
  password: string;
}

export interface StoreType {
  credentials: {
    accessToken: string;
    refreshToken: string;
  };
  registered: boolean;
  active: string | null;
  newMessage: string[];
}

export interface RegisteredActionType {
  type: "SET_REGISTERED";
  payload: boolean;
}

export interface ActiveActionType {
  type: "SET_ACTIVE";
  payload: string | null;
}

export interface NewMessagenType {
  type: "SET_NEW_MESSAGE" | "RESET_NEW_MESSAGE";
  payload: string;
}

export interface UserType {
  _id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface MessageType {
  _id: string;
  sender: string;
  content: {
    text?: string;
    media?: string;
  };
}

export interface ChatType {
  _id: string;
  members: UserType[];
  messages?: MessageType[];
  updatedAt: string;
}
