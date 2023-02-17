import { UserModel } from "../db-models/user";
import { ERROR } from "../errors";
import { User } from "../gql/types";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
const jwt = require("jsonwebtoken");

export const checkToken = async (token: string): Promise<User> => {
  const user: any = await verify(token, JWT_SECRET || "");
  if (!user) {
    throw new Error(ERROR.TOKEN_INVALID.message);
  }
  const userData = await UserModel.findOne({ email: user.email }).exec();

  if (!userData) {
    throw new Error(ERROR.USER_NOT_FOUND.message);
  }
  return {
    id: userData._id.toString(),
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    authToken: userData.authToken
  };
};

export function checkPasswordSecure(password: string) {
  const AtLeastOneLowerCase = /[a-z]/;
  const AtLeastOneUpperCase = /[A-Z]+/;
  const AtLeastOneNumber = /[0-9]+/;
  const AtLeastOneSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const AtLeastEightCharacters = /.{8,}/;
  return (
    AtLeastOneLowerCase.test(password) &&
    AtLeastOneUpperCase.test(password) &&
    AtLeastOneNumber.test(password) &&
    AtLeastOneSpecialCharacter.test(password) &&
    AtLeastEightCharacters.test(password)
  );
}
