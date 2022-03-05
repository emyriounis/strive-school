import { NextFunction } from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import UsersModel from "../users/schema.js";
import { JWTAuthenticate } from "./tools.js";
import { GoogleUserType, TokensType } from "../../types/types.d";

const googleStrategy = new GoogleStrategy.Strategy(
  {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${process.env.API_URL}/login/googleRedirect`,
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: GoogleUserType,
    passportNext: NextFunction
  ) => {
    try {
      console.log("PROFILE: ", profile);

      const user = await UsersModel.findOne({ googleId: profile.id });

      if (user) {
        try {
          const tokens: TokensType = await JWTAuthenticate(user);
          passportNext(null, tokens);
        } catch (error) {
          passportNext(error);
        }
      } else {
        const newUser = new UsersModel({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        const savedUser = await newUser.save();
        const tokens = await JWTAuthenticate(savedUser);
        passportNext(null, { tokens });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

passport.serializeUser(function (data, passportNext) {
  console.log(data);
  passportNext(null, data);
});

export default googleStrategy;
