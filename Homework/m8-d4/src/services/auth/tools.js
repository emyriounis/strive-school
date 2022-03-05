import jwt from "jsonwebtoken";

export const JWTAuthenticate = async (user) => {
  const accessToken = await generateJWTToken({ _id: user._id }, "15m");
  const refreshToken = await generateJWTToken({ _id: user._id }, "2w");

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const generateJWTToken = (payload, expTime) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: expTime },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );
// USAGE: const token = await generateJWTToken({_id: "oaijsdjasdojasoidj"})

export const verifyJWT = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );
// USAGE: const payload = await verifyJWT(token)
