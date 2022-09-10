import Config from "../config/Config";
import JWT from "jsonwebtoken";

const createToken = (
  payload: object, // username or userId
  expiresIn: string | number = "1 min"
) => {
  const accessToken = Config.jwtSecret;

  return new Promise<string>((resolve, reject) => {
    JWT.sign(payload, accessToken, { expiresIn }, (error, token) => {
      // sign: (payload: any, secretOrPrivateKey: any, options: any, callback: any) => any
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = (jwtString: string) => {
  const accessToken = Config.jwtSecret;

  return new Promise<string>((resolve, reject) => {
    JWT.verify(jwtString, accessToken, (error, token) => {
      // sign: (payload: any, secretOrPrivateKey: any, options: any, callback: any) => any
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

export { createToken, verifyToken };
