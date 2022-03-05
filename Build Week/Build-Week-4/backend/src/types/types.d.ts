import { Document, Model } from "mongoose";
import { Options } from "multer-storage-cloudinary";
import { Socket } from "socket.io";

export interface ErrorType {
  name: string;
  status: number;
  message: string;
}

export interface UserType {
  _id?: string;
  email: string;
  password: string;
  avatar: string;
  status: string;
  username: string;
  refreshToken?: string;
}

export interface UserDocument extends Document, UserType {}

export interface UserModel extends Model<UserDocument> {
  authenticate(
    identifier: string,
    plainPassword: string
  ): Promise<UserDocument | null>;
}

export interface ChatType {
  _id?: string;
  members: string[];
  messages: [
    {
      sender: string;
      content: {
        text?: string;
        media?: string;
      };
    }
  ];
}

export interface ChatDocument extends Document, ChatType {}

export interface ChatModel extends Model<ChatDocument> {}

declare global {
  namespace Express {
    export interface Request {
      user: UserType;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
      userID: string;
    }
  }
}
declare interface cloudinaryOptions extends Options {
  params: {
    folder: string;
  };
}
interface ExtendedSocket extends Socket {
  userId?: string;
}
