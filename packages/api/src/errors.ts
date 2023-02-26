export type ErrorType = {
  message: string;
  code: string;
};

export const ERROR: Record<string, ErrorType> = {
  INVALID_RATING: {
    message: "INVALID_RATING",
    code: "400"
  },
  CINEMA_NOT_FOUND: {
    message: "CINEMA_NOT_FOUND",
    code: "404"
  },
  MOVIE_NOT_FOUND: {
    message: "MOVIE_NOT_FOUND",
    code: "404"
  },
  CINEMA_ALREADY_EXISTS: {
    message: "CINEMA_ALREADY_EXISTS",
    code: "409"
  },
  INVALID_NUMBER: {
    message: "INVALID_NUMBER",
    code: "400"
  },
  INVALID_VIDEO_ID: {
    message: "INVALID_VIDEO_ID",
    code: "400"
  },
  INVALID_DATE: {
    message: "INVALID_DATE",
    code: "400"
  },
  MOVIE_ALREADY_EXISTS: {
    message: "MOVIE_ALREADY_EXISTS",
    code: "409"
  },
  MOVIE_NOT_DELETED: {
    message: "MOVIE_NOT_DELETED",
    code: "500"
  },
  INVALID_DURATION: {
    message: "INVALID_DURATION",
    code: "400"
  },
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
  },
  INTERNAL_ERROR: {
    message: "INTERNAL_ERROR",
    code: "500"
  }
};
