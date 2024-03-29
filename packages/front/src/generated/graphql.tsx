import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Booking = {
  __typename?: "Booking";
  cardNumber: Scalars["String"];
  cinema: Cinema;
  day: Days;
  expiry_date: Scalars["Date"];
  id: Scalars["ID"];
  movie: Movie;
  price: Scalars["Float"];
  room: Scalars["Int"];
  seats: Scalars["Int"];
  security_code: Scalars["String"];
  time: Scalars["String"];
  user: User;
};

export type Channel = {
  __typename?: "Channel";
  id: Scalars["ID"];
  messages?: Maybe<Array<Message>>;
  name?: Maybe<Scalars["String"]>;
  participants?: Maybe<Array<User>>;
};

export type Cinema = {
  __typename?: "Cinema";
  address: Scalars["String"];
  capacity: Scalars["Int"];
  createdAt: Scalars["Date"];
  id: Scalars["ID"];
  movies: Array<Movie>;
  name: Scalars["String"];
  rooms: Scalars["Int"];
  schedule: Array<Schedule>;
  updatedAt: Scalars["Date"];
};

export type CinemaData = {
  __typename?: "CinemaData";
  address: Scalars["String"];
  capacity: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
  rooms: Scalars["Int"];
};

export type CinemaIn = {
  address: Scalars["String"];
  capacity: Scalars["Int"];
  name: Scalars["String"];
  rooms: Scalars["Int"];
  schedule?: InputMaybe<Array<ScheduleIn>>;
};

export enum Days {
  Friday = "Friday",
  Monday = "Monday",
  Saturday = "Saturday",
  Sunday = "Sunday",
  Thursday = "Thursday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday"
}

export enum GeneralOrderType {
  NameAz = "NameAZ",
  NameZa = "NameZA",
  RecentFirst = "RecentFirst",
  RecentLast = "RecentLast"
}

export type JoinResult = {
  __typename?: "JoinResult";
  channel: Channel;
  user: User;
};

export type Message = {
  __typename?: "Message";
  channel?: Maybe<Channel>;
  createdBy: User;
  id: Scalars["ID"];
  text?: Maybe<Scalars["String"]>;
};

export type Movie = {
  __typename?: "Movie";
  cast: Array<Scalars["String"]>;
  createdAt: Scalars["Date"];
  director: Scalars["String"];
  duration: Scalars["Int"];
  gender: Scalars["String"];
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  rating: Scalars["Int"];
  release: Scalars["Date"];
  synopsis: Scalars["String"];
  title: Scalars["String"];
  trailer?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["Date"];
};

export type MovieData = {
  __typename?: "MovieData";
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  rating: Scalars["Int"];
  release: Scalars["Date"];
  title: Scalars["String"];
};

export type MovieIn = {
  cast: Array<Scalars["String"]>;
  director: Scalars["String"];
  duration: Scalars["Int"];
  gender: Scalars["String"];
  image?: InputMaybe<Scalars["String"]>;
  rating: Scalars["Int"];
  release: Scalars["Date"];
  synopsis: Scalars["String"];
  title: Scalars["String"];
  trailer?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addRatingToMovie: Movie;
  changeRole: User;
  createBooking: Booking;
  createCinema: Cinema;
  createMovie: Movie;
  deleteBooking: Scalars["Boolean"];
  deleteCinema: Cinema;
  deleteMovie: Movie;
  deleteUser: User;
  join: JoinResult;
  login: ResultLogin;
  quit: Channel;
  register: User;
  sendMessage: Message;
  updateCinema: Cinema;
  updateMovie: Movie;
};

export type MutationAddRatingToMovieArgs = {
  id: Scalars["ID"];
  rating: Scalars["Int"];
};

export type MutationChangeRoleArgs = {
  id: Scalars["ID"];
  role: Role;
};

export type MutationCreateBookingArgs = {
  cardNumber: Scalars["String"];
  cinema: Scalars["ID"];
  expiry_date: Scalars["Date"];
  schedule: ScheduleIn;
  seats: Scalars["Int"];
  security_code?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateCinemaArgs = {
  input: CinemaIn;
};

export type MutationCreateMovieArgs = {
  input: MovieIn;
};

export type MutationDeleteBookingArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCinemaArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMovieArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationJoinArgs = {
  channelName: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationQuitArgs = {
  channelName: Scalars["String"];
};

export type MutationRegisterArgs = {
  input: UserIn;
};

export type MutationSendMessageArgs = {
  channelName: Scalars["String"];
  text: Scalars["String"];
};

export type MutationUpdateCinemaArgs = {
  id: Scalars["ID"];
  input: UpdateCinemaIn;
};

export type MutationUpdateMovieArgs = {
  id: Scalars["ID"];
  input: UpdateMovieIn;
};

export type PaginatedCinemas = {
  __typename?: "PaginatedCinemas";
  data: Array<CinemaData>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  totalNumber: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type PaginatedMovies = {
  __typename?: "PaginatedMovies";
  data: Array<MovieData>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  totalNumber: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  booking: Booking;
  bookings: Array<Booking>;
  cinema: Cinema;
  cinemas: Array<Cinema>;
  getChat: Channel;
  getChats: Array<Channel>;
  me: User;
  movie: Movie;
  movies: Array<Movie>;
  paginatedCinemas: PaginatedCinemas;
  paginatedMovies: PaginatedMovies;
  userBookings: Array<Booking>;
  users: Array<User>;
};

export type QueryBookingArgs = {
  id: Scalars["ID"];
};

export type QueryCinemaArgs = {
  id: Scalars["ID"];
};

export type QueryGetChatArgs = {
  id: Scalars["ID"];
};

export type QueryMovieArgs = {
  id: Scalars["ID"];
};

export type QueryPaginatedCinemasArgs = {
  order?: InputMaybe<GeneralOrderType>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchName?: InputMaybe<Scalars["String"]>;
};

export type QueryPaginatedMoviesArgs = {
  order?: InputMaybe<GeneralOrderType>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchTitle?: InputMaybe<Scalars["String"]>;
};

export type ResultLogin = {
  __typename?: "ResultLogin";
  role: Role;
  token: Scalars["String"];
};

export enum Role {
  Admin = "ADMIN",
  User = "USER"
}

export type Schedule = {
  __typename?: "Schedule";
  capacity: Scalars["Int"];
  day: Days;
  movie: Movie;
  room: Scalars["Int"];
  time: Scalars["String"];
};

export type ScheduleIn = {
  day: Days;
  movie: Scalars["ID"];
  room: Scalars["Int"];
  time: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  onMemberJoin?: Maybe<JoinResult>;
  onMessageAdded?: Maybe<Message>;
  onQuit?: Maybe<Channel>;
};

export type UpdateCinemaIn = {
  address?: InputMaybe<Scalars["String"]>;
  capacity?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  rooms?: InputMaybe<Scalars["Int"]>;
  schedule?: InputMaybe<Array<ScheduleIn>>;
};

export type UpdateMovieIn = {
  cast?: InputMaybe<Array<Scalars["String"]>>;
  director?: InputMaybe<Scalars["String"]>;
  duration?: InputMaybe<Scalars["Int"]>;
  gender?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  rating?: InputMaybe<Scalars["Int"]>;
  release?: InputMaybe<Scalars["Date"]>;
  synopsis?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  trailer?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  authToken: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  password: Scalars["String"];
  role: Role;
  surname?: Maybe<Scalars["String"]>;
};

export type UserIn = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  surname?: InputMaybe<Scalars["String"]>;
};

export type AddRatingToMovieMutationVariables = Exact<{
  addRatingToMovieId: Scalars["ID"];
  rating: Scalars["Int"];
}>;

export type AddRatingToMovieMutation = {
  __typename?: "Mutation";
  addRatingToMovie: {
    __typename?: "Movie";
    id: string;
    title: string;
    synopsis: string;
    gender: string;
    duration: number;
    director: string;
    cast: Array<string>;
    release: any;
    rating: number;
    image?: string | null;
    trailer?: string | null;
  };
};

export type BookingQueryVariables = Exact<{
  bookingId: Scalars["ID"];
}>;

export type BookingQuery = {
  __typename?: "Query";
  booking: {
    __typename?: "Booking";
    id: string;
    day: Days;
    time: string;
    room: number;
    seats: number;
    price: number;
    cinema: { __typename?: "Cinema"; name: string };
    movie: { __typename?: "Movie"; title: string };
    user: {
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    };
  };
};

export type BookingsQueryVariables = Exact<{ [key: string]: never }>;

export type BookingsQuery = {
  __typename?: "Query";
  bookings: Array<{
    __typename?: "Booking";
    id: string;
    day: Days;
    time: string;
    room: number;
    seats: number;
    price: number;
    cinema: { __typename?: "Cinema"; name: string; address: string };
    movie: { __typename?: "Movie"; title: string };
    user: {
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    };
  }>;
};

export type ChangeRoleMutationVariables = Exact<{
  changeRoleId: Scalars["ID"];
  role: Role;
}>;

export type ChangeRoleMutation = {
  __typename?: "Mutation";
  changeRole: {
    __typename?: "User";
    id: string;
    name: string;
    surname?: string | null;
    password: string;
    email: string;
    role: Role;
    authToken: string;
  };
};

export type CinemaQueryVariables = Exact<{
  cinemaId: Scalars["ID"];
}>;

export type CinemaQuery = {
  __typename?: "Query";
  cinema: {
    __typename?: "Cinema";
    id: string;
    name: string;
    address: string;
    rooms: number;
    capacity: number;
    schedule: Array<{
      __typename?: "Schedule";
      day: Days;
      time: string;
      room: number;
      capacity: number;
      movie: {
        __typename?: "Movie";
        id: string;
        title: string;
        synopsis: string;
        gender: string;
        duration: number;
        director: string;
        cast: Array<string>;
        release: any;
        rating: number;
        image?: string | null;
        trailer?: string | null;
      };
    }>;
    movies: Array<{
      __typename?: "Movie";
      id: string;
      title: string;
      synopsis: string;
      gender: string;
      duration: number;
      director: string;
      cast: Array<string>;
      release: any;
      rating: number;
      image?: string | null;
      trailer?: string | null;
    }>;
  };
};

export type CinemasQueryVariables = Exact<{ [key: string]: never }>;

export type CinemasQuery = {
  __typename?: "Query";
  cinemas: Array<{
    __typename?: "Cinema";
    id: string;
    name: string;
    address: string;
    rooms: number;
    capacity: number;
    schedule: Array<{
      __typename?: "Schedule";
      day: Days;
      time: string;
      room: number;
      capacity: number;
      movie: {
        __typename?: "Movie";
        id: string;
        title: string;
        synopsis: string;
        gender: string;
        duration: number;
        director: string;
        cast: Array<string>;
        release: any;
        rating: number;
        image?: string | null;
        trailer?: string | null;
      };
    }>;
    movies: Array<{
      __typename?: "Movie";
      id: string;
      title: string;
      synopsis: string;
      gender: string;
      duration: number;
      director: string;
      cast: Array<string>;
      release: any;
      rating: number;
      image?: string | null;
      trailer?: string | null;
    }>;
  }>;
};

export type CreateBookingMutationVariables = Exact<{
  cinema: Scalars["ID"];
  schedule: ScheduleIn;
  seats: Scalars["Int"];
  cardNumber: Scalars["String"];
  expiryDate: Scalars["Date"];
  securityCode?: InputMaybe<Scalars["String"]>;
}>;

export type CreateBookingMutation = {
  __typename?: "Mutation";
  createBooking: {
    __typename?: "Booking";
    id: string;
    day: Days;
    time: string;
    room: number;
    seats: number;
    price: number;
    cardNumber: string;
    expiry_date: any;
    security_code: string;
    cinema: { __typename?: "Cinema"; name: string };
    movie: { __typename?: "Movie"; title: string };
    user: {
      __typename?: "User";
      id: string;
      name: string;
      surname?: string | null;
      email: string;
    };
  };
};

export type CreateCinemaMutationVariables = Exact<{
  input: CinemaIn;
}>;

export type CreateCinemaMutation = {
  __typename?: "Mutation";
  createCinema: {
    __typename?: "Cinema";
    id: string;
    name: string;
    address: string;
    rooms: number;
    capacity: number;
    schedule: Array<{
      __typename?: "Schedule";
      day: Days;
      time: string;
      room: number;
      capacity: number;
      movie: {
        __typename?: "Movie";
        id: string;
        title: string;
        synopsis: string;
        gender: string;
        duration: number;
        director: string;
        cast: Array<string>;
        release: any;
        rating: number;
        image?: string | null;
        trailer?: string | null;
      };
    }>;
    movies: Array<{
      __typename?: "Movie";
      id: string;
      title: string;
      synopsis: string;
      gender: string;
      duration: number;
      director: string;
      cast: Array<string>;
      release: any;
      rating: number;
      image?: string | null;
      trailer?: string | null;
    }>;
  };
};

export type CreateMovieMutationVariables = Exact<{
  input: MovieIn;
}>;

export type CreateMovieMutation = {
  __typename?: "Mutation";
  createMovie: {
    __typename?: "Movie";
    id: string;
    title: string;
    synopsis: string;
    gender: string;
    duration: number;
    director: string;
    cast: Array<string>;
    release: any;
    rating: number;
    image?: string | null;
    trailer?: string | null;
  };
};

export type DeleteBookingMutationVariables = Exact<{
  deleteBookingId: Scalars["ID"];
}>;

export type DeleteBookingMutation = {
  __typename?: "Mutation";
  deleteBooking: boolean;
};

export type DeleteCinemaMutationVariables = Exact<{
  deleteCinemaId: Scalars["ID"];
}>;

export type DeleteCinemaMutation = {
  __typename?: "Mutation";
  deleteCinema: {
    __typename?: "Cinema";
    id: string;
    name: string;
    address: string;
    rooms: number;
    capacity: number;
    schedule: Array<{
      __typename?: "Schedule";
      day: Days;
      time: string;
      room: number;
      capacity: number;
      movie: {
        __typename?: "Movie";
        id: string;
        title: string;
        synopsis: string;
        gender: string;
        duration: number;
        director: string;
        cast: Array<string>;
        release: any;
        rating: number;
        image?: string | null;
        trailer?: string | null;
      };
    }>;
    movies: Array<{
      __typename?: "Movie";
      id: string;
      title: string;
      synopsis: string;
      gender: string;
      duration: number;
      director: string;
      cast: Array<string>;
      release: any;
      rating: number;
      image?: string | null;
      trailer?: string | null;
    }>;
  };
};

export type DeleteMovieMutationVariables = Exact<{
  deleteMovieId: Scalars["ID"];
}>;

export type DeleteMovieMutation = {
  __typename?: "Mutation";
  deleteMovie: {
    __typename?: "Movie";
    id: string;
    title: string;
    synopsis: string;
    gender: string;
    duration: number;
    director: string;
    cast: Array<string>;
    release: any;
    rating: number;
    image?: string | null;
    trailer?: string | null;
  };
};

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars["ID"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: {
    __typename?: "User";
    id: string;
    name: string;
    surname?: string | null;
    password: string;
    email: string;
    role: Role;
    authToken: string;
  };
};

export type GetChatQueryVariables = Exact<{
  getChatId: Scalars["ID"];
}>;

export type GetChatQuery = {
  __typename?: "Query";
  getChat: {
    __typename?: "Channel";
    id: string;
    name?: string | null;
    messages?: Array<{
      __typename?: "Message";
      id: string;
      text?: string | null;
      createdBy: {
        __typename?: "User";
        email: string;
        id: string;
        name: string;
        surname?: string | null;
      };
      channel?: {
        __typename?: "Channel";
        name?: string | null;
        id: string;
      } | null;
    }> | null;
    participants?: Array<{
      __typename?: "User";
      id: string;
      name: string;
      surname?: string | null;
      email: string;
    }> | null;
  };
};

export type GetChatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetChatsQuery = {
  __typename?: "Query";
  getChats: Array<{
    __typename?: "Channel";
    id: string;
    name?: string | null;
    messages?: Array<{
      __typename?: "Message";
      id: string;
      text?: string | null;
      createdBy: {
        __typename?: "User";
        id: string;
        email: string;
        name: string;
        surname?: string | null;
      };
    }> | null;
    participants?: Array<{
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    }> | null;
  }>;
};

export type JoinMutationVariables = Exact<{
  channelName: Scalars["String"];
}>;

export type JoinMutation = {
  __typename?: "Mutation";
  join: {
    __typename?: "JoinResult";
    channel: {
      __typename?: "Channel";
      id: string;
      name?: string | null;
      messages?: Array<{
        __typename?: "Message";
        id: string;
        text?: string | null;
        createdBy: {
          __typename?: "User";
          id: string;
          email: string;
          name: string;
          surname?: string | null;
        };
      }> | null;
      participants?: Array<{
        __typename?: "User";
        id: string;
        name: string;
        surname?: string | null;
        email: string;
      }> | null;
    };
    user: {
      __typename?: "User";
      id: string;
      name: string;
      surname?: string | null;
      email: string;
    };
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "ResultLogin"; token: string; role: Role };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    name: string;
    surname?: string | null;
    password: string;
    email: string;
    role: Role;
    authToken: string;
  };
};

export type MovieQueryVariables = Exact<{
  movieId: Scalars["ID"];
}>;

export type MovieQuery = {
  __typename?: "Query";
  movie: {
    __typename?: "Movie";
    id: string;
    title: string;
    synopsis: string;
    gender: string;
    duration: number;
    director: string;
    cast: Array<string>;
    release: any;
    rating: number;
    image?: string | null;
    trailer?: string | null;
  };
};

export type MoviesQueryVariables = Exact<{ [key: string]: never }>;

export type MoviesQuery = {
  __typename?: "Query";
  movies: Array<{
    __typename?: "Movie";
    id: string;
    title: string;
    synopsis: string;
    gender: string;
    duration: number;
    director: string;
    cast: Array<string>;
    release: any;
    rating: number;
    image?: string | null;
    trailer?: string | null;
  }>;
};

export type OnMemberJoinSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnMemberJoinSubscription = {
  __typename?: "Subscription";
  onMemberJoin?: {
    __typename?: "JoinResult";
    channel: {
      __typename?: "Channel";
      id: string;
      name?: string | null;
      messages?: Array<{
        __typename?: "Message";
        id: string;
        text?: string | null;
        createdBy: {
          __typename?: "User";
          id: string;
          email: string;
          name: string;
          surname?: string | null;
        };
      }> | null;
      participants?: Array<{
        __typename?: "User";
        id: string;
        email: string;
        name: string;
        surname?: string | null;
      }> | null;
    };
    user: {
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    };
  } | null;
};

export type OnMessageAddedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type OnMessageAddedSubscription = {
  __typename?: "Subscription";
  onMessageAdded?: {
    __typename?: "Message";
    id: string;
    text?: string | null;
    createdBy: {
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    };
    channel?: {
      __typename?: "Channel";
      id: string;
      name?: string | null;
      messages?: Array<{
        __typename?: "Message";
        id: string;
        text?: string | null;
        createdBy: {
          __typename?: "User";
          id: string;
          email: string;
          name: string;
          surname?: string | null;
        };
      }> | null;
      participants?: Array<{
        __typename?: "User";
        id: string;
        name: string;
        surname?: string | null;
        email: string;
      }> | null;
    } | null;
  } | null;
};

export type OnQuitSubscriptionVariables = Exact<{ [key: string]: never }>;

export type OnQuitSubscription = {
  __typename?: "Subscription";
  onQuit?: {
    __typename?: "Channel";
    id: string;
    name?: string | null;
    messages?: Array<{
      __typename?: "Message";
      id: string;
      text?: string | null;
      createdBy: {
        __typename?: "User";
        id: string;
        email: string;
        name: string;
        surname?: string | null;
      };
    }> | null;
    participants?: Array<{
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    }> | null;
  } | null;
};

export type PaginatedCinemasQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  order?: InputMaybe<GeneralOrderType>;
  searchName?: InputMaybe<Scalars["String"]>;
}>;

export type PaginatedCinemasQuery = {
  __typename?: "Query";
  paginatedCinemas: {
    __typename?: "PaginatedCinemas";
    page: number;
    pageSize: number;
    totalNumber: number;
    totalPages: number;
    data: Array<{
      __typename?: "CinemaData";
      id: string;
      name: string;
      address: string;
      rooms: number;
      capacity: number;
    }>;
  };
};

export type PaginatedMoviesQueryVariables = Exact<{
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  order?: InputMaybe<GeneralOrderType>;
  searchTitle?: InputMaybe<Scalars["String"]>;
}>;

export type PaginatedMoviesQuery = {
  __typename?: "Query";
  paginatedMovies: {
    __typename?: "PaginatedMovies";
    page: number;
    pageSize: number;
    totalNumber: number;
    totalPages: number;
    data: Array<{
      __typename?: "MovieData";
      id: string;
      image?: string | null;
      title: string;
      release: any;
      rating: number;
    }>;
  };
};

export type QuitMutationVariables = Exact<{
  channelName: Scalars["String"];
}>;

export type QuitMutation = {
  __typename?: "Mutation";
  quit: {
    __typename?: "Channel";
    id: string;
    name?: string | null;
    messages?: Array<{
      __typename?: "Message";
      id: string;
      text?: string | null;
      createdBy: {
        __typename?: "User";
        id: string;
        email: string;
        name: string;
        surname?: string | null;
      };
    }> | null;
    participants?: Array<{
      __typename?: "User";
      id: string;
      email: string;
      name: string;
      surname?: string | null;
    }> | null;
  };
};

export type RegisterMutationVariables = Exact<{
  input: UserIn;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "User";
    id: string;
    name: string;
    surname?: string | null;
    password: string;
    email: string;
    role: Role;
    authToken: string;
  };
};

export type SendMessageMutationVariables = Exact<{
  channelName: Scalars["String"];
  text: Scalars["String"];
}>;

export type SendMessageMutation = {
  __typename?: "Mutation";
  sendMessage: {
    __typename?: "Message";
    id: string;
    text?: string | null;
    createdBy: {
      __typename?: "User";
      id: string;
      name: string;
      surname?: string | null;
      email: string;
    };
    channel?: {
      __typename?: "Channel";
      id: string;
      name?: string | null;
      messages?: Array<{
        __typename?: "Message";
        id: string;
        text?: string | null;
        createdBy: {
          __typename?: "User";
          id: string;
          email: string;
          name: string;
          surname?: string | null;
        };
      }> | null;
      participants?: Array<{
        __typename?: "User";
        id: string;
        name: string;
        surname?: string | null;
        email: string;
      }> | null;
    } | null;
  };
};

export type UpdateCinemaMutationVariables = Exact<{
  updateCinemaId: Scalars["ID"];
  input: UpdateCinemaIn;
}>;

export type UpdateCinemaMutation = {
  __typename?: "Mutation";
  updateCinema: {
    __typename?: "Cinema";
    id: string;
    name: string;
    address: string;
    rooms: number;
    capacity: number;
    schedule: Array<{
      __typename?: "Schedule";
      day: Days;
      time: string;
      room: number;
      capacity: number;
      movie: {
        __typename?: "Movie";
        id: string;
        title: string;
        synopsis: string;
        gender: string;
        duration: number;
        director: string;
        cast: Array<string>;
        release: any;
        rating: number;
        image?: string | null;
        trailer?: string | null;
      };
    }>;
    movies: Array<{
      __typename?: "Movie";
      id: string;
      title: string;
      synopsis: string;
      gender: string;
      duration: number;
      director: string;
      cast: Array<string>;
      release: any;
      rating: number;
      image?: string | null;
      trailer?: string | null;
    }>;
  };
};

export type UpdateMovieMutationVariables = Exact<{
  updateMovieId: Scalars["ID"];
  input: UpdateMovieIn;
}>;

export type UpdateMovieMutation = {
  __typename?: "Mutation";
  updateMovie: {
    __typename?: "Movie";
    id: string;
    title: string;
    synopsis: string;
    gender: string;
    duration: number;
    director: string;
    cast: Array<string>;
    release: any;
    rating: number;
    image?: string | null;
    trailer?: string | null;
  };
};

export type UserBookingsQueryVariables = Exact<{ [key: string]: never }>;

export type UserBookingsQuery = {
  __typename?: "Query";
  userBookings: Array<{
    __typename?: "Booking";
    id: string;
    day: Days;
    time: string;
    room: number;
    seats: number;
    price: number;
    cinema: { __typename?: "Cinema"; name: string; address: string };
    movie: {
      __typename?: "Movie";
      image?: string | null;
      title: string;
      duration: number;
    };
  }>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    name: string;
    surname?: string | null;
    password: string;
    email: string;
    role: Role;
    authToken: string;
  }>;
};

export const AddRatingToMovieDocument = gql`
  mutation AddRatingToMovie($addRatingToMovieId: ID!, $rating: Int!) {
    addRatingToMovie(id: $addRatingToMovieId, rating: $rating) {
      id
      title
      synopsis
      gender
      duration
      director
      cast
      release
      rating
      image
      trailer
    }
  }
`;
export type AddRatingToMovieMutationFn = Apollo.MutationFunction<
  AddRatingToMovieMutation,
  AddRatingToMovieMutationVariables
>;

/**
 * __useAddRatingToMovieMutation__
 *
 * To run a mutation, you first call `useAddRatingToMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRatingToMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRatingToMovieMutation, { data, loading, error }] = useAddRatingToMovieMutation({
 *   variables: {
 *      addRatingToMovieId: // value for 'addRatingToMovieId'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useAddRatingToMovieMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddRatingToMovieMutation,
    AddRatingToMovieMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddRatingToMovieMutation,
    AddRatingToMovieMutationVariables
  >(AddRatingToMovieDocument, options);
}
export type AddRatingToMovieMutationHookResult = ReturnType<
  typeof useAddRatingToMovieMutation
>;
export type AddRatingToMovieMutationResult =
  Apollo.MutationResult<AddRatingToMovieMutation>;
export type AddRatingToMovieMutationOptions = Apollo.BaseMutationOptions<
  AddRatingToMovieMutation,
  AddRatingToMovieMutationVariables
>;
export const BookingDocument = gql`
  query Booking($bookingId: ID!) {
    booking(id: $bookingId) {
      id
      cinema {
        name
      }
      movie {
        title
      }
      day
      time
      room
      seats
      user {
        id
        email
        name
        surname
      }
      price
    }
  }
`;

/**
 * __useBookingQuery__
 *
 * To run a query within a React component, call `useBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingQuery({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useBookingQuery(
  baseOptions: Apollo.QueryHookOptions<BookingQuery, BookingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookingQuery, BookingQueryVariables>(
    BookingDocument,
    options
  );
}
export function useBookingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BookingQuery, BookingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookingQuery, BookingQueryVariables>(
    BookingDocument,
    options
  );
}
export type BookingQueryHookResult = ReturnType<typeof useBookingQuery>;
export type BookingLazyQueryHookResult = ReturnType<typeof useBookingLazyQuery>;
export type BookingQueryResult = Apollo.QueryResult<
  BookingQuery,
  BookingQueryVariables
>;
export const BookingsDocument = gql`
  query Bookings {
    bookings {
      id
      cinema {
        name
        address
      }
      movie {
        title
      }
      day
      time
      room
      seats
      user {
        id
        email
        name
        surname
      }
      price
    }
  }
`;

/**
 * __useBookingsQuery__
 *
 * To run a query within a React component, call `useBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookingsQuery(
  baseOptions?: Apollo.QueryHookOptions<BookingsQuery, BookingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BookingsQuery, BookingsQueryVariables>(
    BookingsDocument,
    options
  );
}
export function useBookingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BookingsQuery,
    BookingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BookingsQuery, BookingsQueryVariables>(
    BookingsDocument,
    options
  );
}
export type BookingsQueryHookResult = ReturnType<typeof useBookingsQuery>;
export type BookingsLazyQueryHookResult = ReturnType<
  typeof useBookingsLazyQuery
>;
export type BookingsQueryResult = Apollo.QueryResult<
  BookingsQuery,
  BookingsQueryVariables
>;
export const ChangeRoleDocument = gql`
  mutation ChangeRole($changeRoleId: ID!, $role: Role!) {
    changeRole(id: $changeRoleId, role: $role) {
      id
      name
      surname
      password
      email
      role
      authToken
    }
  }
`;
export type ChangeRoleMutationFn = Apollo.MutationFunction<
  ChangeRoleMutation,
  ChangeRoleMutationVariables
>;

/**
 * __useChangeRoleMutation__
 *
 * To run a mutation, you first call `useChangeRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeRoleMutation, { data, loading, error }] = useChangeRoleMutation({
 *   variables: {
 *      changeRoleId: // value for 'changeRoleId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useChangeRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeRoleMutation,
    ChangeRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangeRoleMutation, ChangeRoleMutationVariables>(
    ChangeRoleDocument,
    options
  );
}
export type ChangeRoleMutationHookResult = ReturnType<
  typeof useChangeRoleMutation
>;
export type ChangeRoleMutationResult =
  Apollo.MutationResult<ChangeRoleMutation>;
export type ChangeRoleMutationOptions = Apollo.BaseMutationOptions<
  ChangeRoleMutation,
  ChangeRoleMutationVariables
>;
export const CinemaDocument = gql`
  query Cinema($cinemaId: ID!) {
    cinema(id: $cinemaId) {
      id
      name
      address
      rooms
      capacity
      schedule {
        day
        time
        room
        capacity
        movie {
          id
          title
          synopsis
          gender
          duration
          director
          cast
          release
          rating
          image
          trailer
        }
      }
      movies {
        id
        title
        synopsis
        gender
        duration
        director
        cast
        release
        rating
        image
        trailer
      }
    }
  }
`;

/**
 * __useCinemaQuery__
 *
 * To run a query within a React component, call `useCinemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useCinemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCinemaQuery({
 *   variables: {
 *      cinemaId: // value for 'cinemaId'
 *   },
 * });
 */
export function useCinemaQuery(
  baseOptions: Apollo.QueryHookOptions<CinemaQuery, CinemaQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CinemaQuery, CinemaQueryVariables>(
    CinemaDocument,
    options
  );
}
export function useCinemaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CinemaQuery, CinemaQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CinemaQuery, CinemaQueryVariables>(
    CinemaDocument,
    options
  );
}
export type CinemaQueryHookResult = ReturnType<typeof useCinemaQuery>;
export type CinemaLazyQueryHookResult = ReturnType<typeof useCinemaLazyQuery>;
export type CinemaQueryResult = Apollo.QueryResult<
  CinemaQuery,
  CinemaQueryVariables
>;
export const CinemasDocument = gql`
  query Cinemas {
    cinemas {
      id
      name
      address
      rooms
      capacity
      schedule {
        day
        time
        room
        capacity
        movie {
          id
          title
          synopsis
          gender
          duration
          director
          cast
          release
          rating
          image
          trailer
        }
      }
      movies {
        id
        title
        synopsis
        gender
        duration
        director
        cast
        release
        rating
        image
        trailer
      }
    }
  }
`;

/**
 * __useCinemasQuery__
 *
 * To run a query within a React component, call `useCinemasQuery` and pass it any options that fit your needs.
 * When your component renders, `useCinemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCinemasQuery({
 *   variables: {
 *   },
 * });
 */
export function useCinemasQuery(
  baseOptions?: Apollo.QueryHookOptions<CinemasQuery, CinemasQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CinemasQuery, CinemasQueryVariables>(
    CinemasDocument,
    options
  );
}
export function useCinemasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CinemasQuery, CinemasQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CinemasQuery, CinemasQueryVariables>(
    CinemasDocument,
    options
  );
}
export type CinemasQueryHookResult = ReturnType<typeof useCinemasQuery>;
export type CinemasLazyQueryHookResult = ReturnType<typeof useCinemasLazyQuery>;
export type CinemasQueryResult = Apollo.QueryResult<
  CinemasQuery,
  CinemasQueryVariables
>;
export const CreateBookingDocument = gql`
  mutation CreateBooking(
    $cinema: ID!
    $schedule: ScheduleIn!
    $seats: Int!
    $cardNumber: String!
    $expiryDate: Date!
    $securityCode: String
  ) {
    createBooking(
      cinema: $cinema
      schedule: $schedule
      seats: $seats
      cardNumber: $cardNumber
      expiry_date: $expiryDate
      security_code: $securityCode
    ) {
      id
      cinema {
        name
      }
      movie {
        title
      }
      day
      time
      room
      seats
      user {
        id
        name
        surname
        email
      }
      price
      cardNumber
      expiry_date
      security_code
    }
  }
`;
export type CreateBookingMutationFn = Apollo.MutationFunction<
  CreateBookingMutation,
  CreateBookingMutationVariables
>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      cinema: // value for 'cinema'
 *      schedule: // value for 'schedule'
 *      seats: // value for 'seats'
 *      cardNumber: // value for 'cardNumber'
 *      expiryDate: // value for 'expiryDate'
 *      securityCode: // value for 'securityCode'
 *   },
 * });
 */
export function useCreateBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookingMutation,
    CreateBookingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBookingMutation,
    CreateBookingMutationVariables
  >(CreateBookingDocument, options);
}
export type CreateBookingMutationHookResult = ReturnType<
  typeof useCreateBookingMutation
>;
export type CreateBookingMutationResult =
  Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<
  CreateBookingMutation,
  CreateBookingMutationVariables
>;
export const CreateCinemaDocument = gql`
  mutation CreateCinema($input: CinemaIn!) {
    createCinema(input: $input) {
      id
      name
      address
      rooms
      capacity
      schedule {
        day
        time
        room
        capacity
        movie {
          id
          title
          synopsis
          gender
          duration
          director
          cast
          release
          rating
          image
          trailer
        }
      }
      movies {
        id
        title
        synopsis
        gender
        duration
        director
        cast
        release
        rating
        image
        trailer
      }
    }
  }
`;
export type CreateCinemaMutationFn = Apollo.MutationFunction<
  CreateCinemaMutation,
  CreateCinemaMutationVariables
>;

/**
 * __useCreateCinemaMutation__
 *
 * To run a mutation, you first call `useCreateCinemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCinemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCinemaMutation, { data, loading, error }] = useCreateCinemaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCinemaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCinemaMutation,
    CreateCinemaMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCinemaMutation,
    CreateCinemaMutationVariables
  >(CreateCinemaDocument, options);
}
export type CreateCinemaMutationHookResult = ReturnType<
  typeof useCreateCinemaMutation
>;
export type CreateCinemaMutationResult =
  Apollo.MutationResult<CreateCinemaMutation>;
export type CreateCinemaMutationOptions = Apollo.BaseMutationOptions<
  CreateCinemaMutation,
  CreateCinemaMutationVariables
>;
export const CreateMovieDocument = gql`
  mutation CreateMovie($input: MovieIn!) {
    createMovie(input: $input) {
      id
      title
      synopsis
      gender
      duration
      director
      cast
      release
      rating
      image
      trailer
    }
  }
`;
export type CreateMovieMutationFn = Apollo.MutationFunction<
  CreateMovieMutation,
  CreateMovieMutationVariables
>;

/**
 * __useCreateMovieMutation__
 *
 * To run a mutation, you first call `useCreateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovieMutation, { data, loading, error }] = useCreateMovieMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMovieMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMovieMutation,
    CreateMovieMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateMovieMutation, CreateMovieMutationVariables>(
    CreateMovieDocument,
    options
  );
}
export type CreateMovieMutationHookResult = ReturnType<
  typeof useCreateMovieMutation
>;
export type CreateMovieMutationResult =
  Apollo.MutationResult<CreateMovieMutation>;
export type CreateMovieMutationOptions = Apollo.BaseMutationOptions<
  CreateMovieMutation,
  CreateMovieMutationVariables
>;
export const DeleteBookingDocument = gql`
  mutation DeleteBooking($deleteBookingId: ID!) {
    deleteBooking(id: $deleteBookingId)
  }
`;
export type DeleteBookingMutationFn = Apollo.MutationFunction<
  DeleteBookingMutation,
  DeleteBookingMutationVariables
>;

/**
 * __useDeleteBookingMutation__
 *
 * To run a mutation, you first call `useDeleteBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookingMutation, { data, loading, error }] = useDeleteBookingMutation({
 *   variables: {
 *      deleteBookingId: // value for 'deleteBookingId'
 *   },
 * });
 */
export function useDeleteBookingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBookingMutation,
    DeleteBookingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteBookingMutation,
    DeleteBookingMutationVariables
  >(DeleteBookingDocument, options);
}
export type DeleteBookingMutationHookResult = ReturnType<
  typeof useDeleteBookingMutation
>;
export type DeleteBookingMutationResult =
  Apollo.MutationResult<DeleteBookingMutation>;
export type DeleteBookingMutationOptions = Apollo.BaseMutationOptions<
  DeleteBookingMutation,
  DeleteBookingMutationVariables
>;
export const DeleteCinemaDocument = gql`
  mutation DeleteCinema($deleteCinemaId: ID!) {
    deleteCinema(id: $deleteCinemaId) {
      id
      name
      address
      rooms
      capacity
      schedule {
        day
        time
        room
        capacity
        movie {
          id
          title
          synopsis
          gender
          duration
          director
          cast
          release
          rating
          image
          trailer
        }
      }
      movies {
        id
        title
        synopsis
        gender
        duration
        director
        cast
        release
        rating
        image
        trailer
      }
    }
  }
`;
export type DeleteCinemaMutationFn = Apollo.MutationFunction<
  DeleteCinemaMutation,
  DeleteCinemaMutationVariables
>;

/**
 * __useDeleteCinemaMutation__
 *
 * To run a mutation, you first call `useDeleteCinemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCinemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCinemaMutation, { data, loading, error }] = useDeleteCinemaMutation({
 *   variables: {
 *      deleteCinemaId: // value for 'deleteCinemaId'
 *   },
 * });
 */
export function useDeleteCinemaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCinemaMutation,
    DeleteCinemaMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCinemaMutation,
    DeleteCinemaMutationVariables
  >(DeleteCinemaDocument, options);
}
export type DeleteCinemaMutationHookResult = ReturnType<
  typeof useDeleteCinemaMutation
>;
export type DeleteCinemaMutationResult =
  Apollo.MutationResult<DeleteCinemaMutation>;
export type DeleteCinemaMutationOptions = Apollo.BaseMutationOptions<
  DeleteCinemaMutation,
  DeleteCinemaMutationVariables
>;
export const DeleteMovieDocument = gql`
  mutation DeleteMovie($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId) {
      id
      title
      synopsis
      gender
      duration
      director
      cast
      release
      rating
      image
      trailer
    }
  }
`;
export type DeleteMovieMutationFn = Apollo.MutationFunction<
  DeleteMovieMutation,
  DeleteMovieMutationVariables
>;

/**
 * __useDeleteMovieMutation__
 *
 * To run a mutation, you first call `useDeleteMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovieMutation, { data, loading, error }] = useDeleteMovieMutation({
 *   variables: {
 *      deleteMovieId: // value for 'deleteMovieId'
 *   },
 * });
 */
export function useDeleteMovieMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteMovieMutation,
    DeleteMovieMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(
    DeleteMovieDocument,
    options
  );
}
export type DeleteMovieMutationHookResult = ReturnType<
  typeof useDeleteMovieMutation
>;
export type DeleteMovieMutationResult =
  Apollo.MutationResult<DeleteMovieMutation>;
export type DeleteMovieMutationOptions = Apollo.BaseMutationOptions<
  DeleteMovieMutation,
  DeleteMovieMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
      name
      surname
      password
      email
      role
      authToken
    }
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const GetChatDocument = gql`
  query GetChat($getChatId: ID!) {
    getChat(id: $getChatId) {
      id
      name
      messages {
        id
        text
        createdBy {
          email
          id
          name
          surname
        }
        channel {
          name
          id
        }
      }
      participants {
        id
        name
        surname
        email
      }
    }
  }
`;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      getChatId: // value for 'getChatId'
 *   },
 * });
 */
export function useGetChatQuery(
  baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(
    GetChatDocument,
    options
  );
}
export function useGetChatLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(
    GetChatDocument,
    options
  );
}
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<
  GetChatQuery,
  GetChatQueryVariables
>;
export const GetChatsDocument = gql`
  query GetChats {
    getChats {
      id
      name
      messages {
        id
        text
        createdBy {
          id
          email
          name
          surname
        }
      }
      participants {
        id
        email
        name
        surname
      }
    }
  }
`;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    options
  );
}
export function useGetChatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChatsQuery,
    GetChatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(
    GetChatsDocument,
    options
  );
}
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<
  typeof useGetChatsLazyQuery
>;
export type GetChatsQueryResult = Apollo.QueryResult<
  GetChatsQuery,
  GetChatsQueryVariables
>;
export const JoinDocument = gql`
  mutation Join($channelName: String!) {
    join(channelName: $channelName) {
      channel {
        id
        name
        messages {
          id
          text
          createdBy {
            id
            email
            name
            surname
          }
        }
        participants {
          id
          name
          surname
          email
        }
      }
      user {
        id
        name
        surname
        email
      }
    }
  }
`;
export type JoinMutationFn = Apollo.MutationFunction<
  JoinMutation,
  JoinMutationVariables
>;

/**
 * __useJoinMutation__
 *
 * To run a mutation, you first call `useJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMutation, { data, loading, error }] = useJoinMutation({
 *   variables: {
 *      channelName: // value for 'channelName'
 *   },
 * });
 */
export function useJoinMutation(
  baseOptions?: Apollo.MutationHookOptions<JoinMutation, JoinMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<JoinMutation, JoinMutationVariables>(
    JoinDocument,
    options
  );
}
export type JoinMutationHookResult = ReturnType<typeof useJoinMutation>;
export type JoinMutationResult = Apollo.MutationResult<JoinMutation>;
export type JoinMutationOptions = Apollo.BaseMutationOptions<
  JoinMutation,
  JoinMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      role
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      surname
      password
      email
      role
      authToken
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MovieDocument = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      synopsis
      gender
      duration
      director
      cast
      release
      rating
      image
      trailer
    }
  }
`;

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useMovieQuery(
  baseOptions: Apollo.QueryHookOptions<MovieQuery, MovieQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    options
  );
}
export function useMovieLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    options
  );
}
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = Apollo.QueryResult<
  MovieQuery,
  MovieQueryVariables
>;
export const MoviesDocument = gql`
  query Movies {
    movies {
      id
      title
      synopsis
      gender
      duration
      director
      cast
      release
      rating
      image
      trailer
    }
  }
`;

/**
 * __useMoviesQuery__
 *
 * To run a query within a React component, call `useMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoviesQuery(
  baseOptions?: Apollo.QueryHookOptions<MoviesQuery, MoviesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MoviesQuery, MoviesQueryVariables>(
    MoviesDocument,
    options
  );
}
export function useMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MoviesQuery, MoviesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MoviesQuery, MoviesQueryVariables>(
    MoviesDocument,
    options
  );
}
export type MoviesQueryHookResult = ReturnType<typeof useMoviesQuery>;
export type MoviesLazyQueryHookResult = ReturnType<typeof useMoviesLazyQuery>;
export type MoviesQueryResult = Apollo.QueryResult<
  MoviesQuery,
  MoviesQueryVariables
>;
export const OnMemberJoinDocument = gql`
  subscription OnMemberJoin {
    onMemberJoin {
      channel {
        id
        name
        messages {
          id
          text
          createdBy {
            id
            email
            name
            surname
          }
        }
        participants {
          id
          email
          name
          surname
        }
      }
      user {
        id
        email
        name
        surname
      }
    }
  }
`;

/**
 * __useOnMemberJoinSubscription__
 *
 * To run a query within a React component, call `useOnMemberJoinSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMemberJoinSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMemberJoinSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnMemberJoinSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    OnMemberJoinSubscription,
    OnMemberJoinSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    OnMemberJoinSubscription,
    OnMemberJoinSubscriptionVariables
  >(OnMemberJoinDocument, options);
}
export type OnMemberJoinSubscriptionHookResult = ReturnType<
  typeof useOnMemberJoinSubscription
>;
export type OnMemberJoinSubscriptionResult =
  Apollo.SubscriptionResult<OnMemberJoinSubscription>;
export const OnMessageAddedDocument = gql`
  subscription OnMessageAdded {
    onMessageAdded {
      id
      text
      createdBy {
        id
        email
        name
        surname
      }
      channel {
        id
        name
        messages {
          id
          text
          createdBy {
            id
            email
            name
            surname
          }
        }
        participants {
          id
          name
          surname
          email
        }
      }
    }
  }
`;

/**
 * __useOnMessageAddedSubscription__
 *
 * To run a query within a React component, call `useOnMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMessageAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnMessageAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    OnMessageAddedSubscription,
    OnMessageAddedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    OnMessageAddedSubscription,
    OnMessageAddedSubscriptionVariables
  >(OnMessageAddedDocument, options);
}
export type OnMessageAddedSubscriptionHookResult = ReturnType<
  typeof useOnMessageAddedSubscription
>;
export type OnMessageAddedSubscriptionResult =
  Apollo.SubscriptionResult<OnMessageAddedSubscription>;
export const OnQuitDocument = gql`
  subscription OnQuit {
    onQuit {
      id
      name
      messages {
        id
        text
        createdBy {
          id
          email
          name
          surname
        }
      }
      participants {
        id
        email
        name
        surname
      }
    }
  }
`;

/**
 * __useOnQuitSubscription__
 *
 * To run a query within a React component, call `useOnQuitSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnQuitSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnQuitSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnQuitSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    OnQuitSubscription,
    OnQuitSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    OnQuitSubscription,
    OnQuitSubscriptionVariables
  >(OnQuitDocument, options);
}
export type OnQuitSubscriptionHookResult = ReturnType<
  typeof useOnQuitSubscription
>;
export type OnQuitSubscriptionResult =
  Apollo.SubscriptionResult<OnQuitSubscription>;
export const PaginatedCinemasDocument = gql`
  query PaginatedCinemas(
    $page: Int
    $pageSize: Int
    $order: GeneralOrderType
    $searchName: String
  ) {
    paginatedCinemas(
      page: $page
      pageSize: $pageSize
      order: $order
      searchName: $searchName
    ) {
      page
      pageSize
      totalNumber
      totalPages
      data {
        id
        name
        address
        rooms
        capacity
      }
    }
  }
`;

/**
 * __usePaginatedCinemasQuery__
 *
 * To run a query within a React component, call `usePaginatedCinemasQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedCinemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedCinemasQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      order: // value for 'order'
 *      searchName: // value for 'searchName'
 *   },
 * });
 */
export function usePaginatedCinemasQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PaginatedCinemasQuery,
    PaginatedCinemasQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PaginatedCinemasQuery, PaginatedCinemasQueryVariables>(
    PaginatedCinemasDocument,
    options
  );
}
export function usePaginatedCinemasLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginatedCinemasQuery,
    PaginatedCinemasQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PaginatedCinemasQuery,
    PaginatedCinemasQueryVariables
  >(PaginatedCinemasDocument, options);
}
export type PaginatedCinemasQueryHookResult = ReturnType<
  typeof usePaginatedCinemasQuery
>;
export type PaginatedCinemasLazyQueryHookResult = ReturnType<
  typeof usePaginatedCinemasLazyQuery
>;
export type PaginatedCinemasQueryResult = Apollo.QueryResult<
  PaginatedCinemasQuery,
  PaginatedCinemasQueryVariables
>;
export const PaginatedMoviesDocument = gql`
  query PaginatedMovies(
    $page: Int
    $pageSize: Int
    $order: GeneralOrderType
    $searchTitle: String
  ) {
    paginatedMovies(
      page: $page
      pageSize: $pageSize
      order: $order
      searchTitle: $searchTitle
    ) {
      page
      pageSize
      totalNumber
      totalPages
      data {
        id
        image
        title
        release
        rating
      }
    }
  }
`;

/**
 * __usePaginatedMoviesQuery__
 *
 * To run a query within a React component, call `usePaginatedMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      order: // value for 'order'
 *      searchTitle: // value for 'searchTitle'
 *   },
 * });
 */
export function usePaginatedMoviesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PaginatedMoviesQuery,
    PaginatedMoviesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PaginatedMoviesQuery, PaginatedMoviesQueryVariables>(
    PaginatedMoviesDocument,
    options
  );
}
export function usePaginatedMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaginatedMoviesQuery,
    PaginatedMoviesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PaginatedMoviesQuery,
    PaginatedMoviesQueryVariables
  >(PaginatedMoviesDocument, options);
}
export type PaginatedMoviesQueryHookResult = ReturnType<
  typeof usePaginatedMoviesQuery
>;
export type PaginatedMoviesLazyQueryHookResult = ReturnType<
  typeof usePaginatedMoviesLazyQuery
>;
export type PaginatedMoviesQueryResult = Apollo.QueryResult<
  PaginatedMoviesQuery,
  PaginatedMoviesQueryVariables
>;
export const QuitDocument = gql`
  mutation Quit($channelName: String!) {
    quit(channelName: $channelName) {
      id
      name
      messages {
        id
        text
        createdBy {
          id
          email
          name
          surname
        }
      }
      participants {
        id
        email
        name
        surname
      }
    }
  }
`;
export type QuitMutationFn = Apollo.MutationFunction<
  QuitMutation,
  QuitMutationVariables
>;

/**
 * __useQuitMutation__
 *
 * To run a mutation, you first call `useQuitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quitMutation, { data, loading, error }] = useQuitMutation({
 *   variables: {
 *      channelName: // value for 'channelName'
 *   },
 * });
 */
export function useQuitMutation(
  baseOptions?: Apollo.MutationHookOptions<QuitMutation, QuitMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<QuitMutation, QuitMutationVariables>(
    QuitDocument,
    options
  );
}
export type QuitMutationHookResult = ReturnType<typeof useQuitMutation>;
export type QuitMutationResult = Apollo.MutationResult<QuitMutation>;
export type QuitMutationOptions = Apollo.BaseMutationOptions<
  QuitMutation,
  QuitMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: UserIn!) {
    register(input: $input) {
      id
      name
      surname
      password
      email
      role
      authToken
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const SendMessageDocument = gql`
  mutation SendMessage($channelName: String!, $text: String!) {
    sendMessage(channelName: $channelName, text: $text) {
      id
      text
      createdBy {
        id
        name
        surname
        email
      }
      channel {
        id
        name
        messages {
          id
          text
          createdBy {
            id
            email
            name
            surname
          }
        }
        participants {
          id
          name
          surname
          email
        }
      }
    }
  }
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      channelName: // value for 'channelName'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SendMessageDocument,
    options
  );
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>;
export type SendMessageMutationResult =
  Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export const UpdateCinemaDocument = gql`
  mutation UpdateCinema($updateCinemaId: ID!, $input: UpdateCinemaIn!) {
    updateCinema(id: $updateCinemaId, input: $input) {
      id
      name
      address
      rooms
      capacity
      schedule {
        day
        time
        room
        capacity
        movie {
          id
          title
          synopsis
          gender
          duration
          director
          cast
          release
          rating
          image
          trailer
        }
      }
      movies {
        id
        title
        synopsis
        gender
        duration
        director
        cast
        release
        rating
        image
        trailer
      }
    }
  }
`;
export type UpdateCinemaMutationFn = Apollo.MutationFunction<
  UpdateCinemaMutation,
  UpdateCinemaMutationVariables
>;

/**
 * __useUpdateCinemaMutation__
 *
 * To run a mutation, you first call `useUpdateCinemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCinemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCinemaMutation, { data, loading, error }] = useUpdateCinemaMutation({
 *   variables: {
 *      updateCinemaId: // value for 'updateCinemaId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCinemaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCinemaMutation,
    UpdateCinemaMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCinemaMutation,
    UpdateCinemaMutationVariables
  >(UpdateCinemaDocument, options);
}
export type UpdateCinemaMutationHookResult = ReturnType<
  typeof useUpdateCinemaMutation
>;
export type UpdateCinemaMutationResult =
  Apollo.MutationResult<UpdateCinemaMutation>;
export type UpdateCinemaMutationOptions = Apollo.BaseMutationOptions<
  UpdateCinemaMutation,
  UpdateCinemaMutationVariables
>;
export const UpdateMovieDocument = gql`
  mutation UpdateMovie($updateMovieId: ID!, $input: UpdateMovieIn!) {
    updateMovie(id: $updateMovieId, input: $input) {
      id
      title
      synopsis
      gender
      duration
      director
      cast
      release
      rating
      image
      trailer
    }
  }
`;
export type UpdateMovieMutationFn = Apollo.MutationFunction<
  UpdateMovieMutation,
  UpdateMovieMutationVariables
>;

/**
 * __useUpdateMovieMutation__
 *
 * To run a mutation, you first call `useUpdateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovieMutation, { data, loading, error }] = useUpdateMovieMutation({
 *   variables: {
 *      updateMovieId: // value for 'updateMovieId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMovieMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMovieMutation,
    UpdateMovieMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(
    UpdateMovieDocument,
    options
  );
}
export type UpdateMovieMutationHookResult = ReturnType<
  typeof useUpdateMovieMutation
>;
export type UpdateMovieMutationResult =
  Apollo.MutationResult<UpdateMovieMutation>;
export type UpdateMovieMutationOptions = Apollo.BaseMutationOptions<
  UpdateMovieMutation,
  UpdateMovieMutationVariables
>;
export const UserBookingsDocument = gql`
  query UserBookings {
    userBookings {
      id
      cinema {
        name
        address
      }
      movie {
        image
        title
        duration
      }
      day
      time
      room
      seats
      price
    }
  }
`;

/**
 * __useUserBookingsQuery__
 *
 * To run a query within a React component, call `useUserBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserBookingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserBookingsQuery,
    UserBookingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserBookingsQuery, UserBookingsQueryVariables>(
    UserBookingsDocument,
    options
  );
}
export function useUserBookingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserBookingsQuery,
    UserBookingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserBookingsQuery, UserBookingsQueryVariables>(
    UserBookingsDocument,
    options
  );
}
export type UserBookingsQueryHookResult = ReturnType<
  typeof useUserBookingsQuery
>;
export type UserBookingsLazyQueryHookResult = ReturnType<
  typeof useUserBookingsLazyQuery
>;
export type UserBookingsQueryResult = Apollo.QueryResult<
  UserBookingsQuery,
  UserBookingsQueryVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      name
      surname
      password
      email
      role
      authToken
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
