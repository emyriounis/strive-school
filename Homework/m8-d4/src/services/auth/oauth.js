import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import UsersModel from "../users/schema.js";
import { JWTAuthenticate } from "./tools.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${process.env.API_URL}/login/googleRedirect`,
  },
  async (accessToken, refreshToken, profile, passportNext) => {
    try {
      console.log("PROFILE: ", profile);

      const user = await UsersModel.findOne({ googleId: profile.id });

      if (user) {
        const tokens = await JWTAuthenticate(user);
        passportNext(null, { tokens });
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
