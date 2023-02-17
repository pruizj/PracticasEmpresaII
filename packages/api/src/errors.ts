export type ErrorType = {
  message: string;
  code: string;
};

export const ERROR: Record<string, ErrorType> = {
  LOGIN_NEEDED: {
    message: "LOGIN_NEEDED",
    code: "401"
  },
  ROLE_NEEDED: {
    message: "ROLE_NEEDED",
    code: "401"
  },
  INVALID_USER_OR_PASSWORD: {
    message: "INVALID_USER_OR_PASSWORD",
    code: "400"
  },
  USER_NOT_FOUND: {
    message: "USER_NOT_FOUND",
    code: "404"
  },
  USER_ALREADY_EXISTS: {
    message: "USER_ALREADY_EXISTS",
    code: "409"
  },
  TOKEN_INVALID: {
    message: "TOKEN_INVALID",
    code: "401"
  },
  PASSWORD_NOT_SECURE: {
    message: "PASSWORD_NOT_SECURE",
    code: "400"
  }
};
