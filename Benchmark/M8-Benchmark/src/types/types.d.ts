import { Document, Model } from "mongoose";

export interface ErrorType {
  status: number;
  name: string;
  message: string;
}

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  birthday?: Date;
  posts?: Post[];
  refreshToken?: string;
  googleId?: string;
}

export interface PostType {
  category: string;
  title: string;
  cover: string;
  readTime: number;
  authors: User[];
  likes: User[];
  content?: string;
  comments: CommentDocument[];
}

export interface CommentType {
  comment: string;
  createdAt: string;
}

export interface UserDocument extends Document, UserType {}

export interface UserModel extends Model<UserDocument> {
  checkCredentials(
    email: string,
    plainPW: string
  ): Promise<UserDocument | null>;
}

export interface PayloadUserId {
  _id: string;
}

export interface PostDocument extends Document, PostType {}

export interface PostModel extends Model<PostDocument> {}

export interface CommentDocument extends Document, CommentType {}

export interface TokensType {
  accessToken: string;
  refreshToken: string;
}
export interface GoogleUserType {
  name: { givenName: string; familyName: string };
  emails: {
    value: string;
  }[];
  id: string;
}
