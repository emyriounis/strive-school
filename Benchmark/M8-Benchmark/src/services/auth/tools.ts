import jwt from "jsonwebtoken";
import {
  PayloadUserId,
  UserDocument,
  UserModel,
  UserType,
} from "../../types/types";

export const JWTAuthenticate = async (user: UserDocument | any) => {
  // any type!!!!!
  const accessToken: string | any = await generateJWTToken(
    { _id: user._id },
    "15m"
  );
  const refreshToken: string | any = await generateJWTToken(
    { _id: user._id },
    "2w"
  );

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const generateJWTToken = (payload: PayloadUserId, expTime: string) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: expTime },
      (err: Error | null, token: string | undefined) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );
// USAGE: const token = await generateJWTToken({_id: "oaijsdjasdojasoidj"})

export const verifyJWT = (token: string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );
// USAGE: const payload = await verifyJWT(token)
