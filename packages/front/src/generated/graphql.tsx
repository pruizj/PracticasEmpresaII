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
  createCinema: Cinema;
  createMovie: Movie;
  deleteCinema: Cinema;
  deleteMovie: Movie;
  deleteUser: User;
  login: ResultLogin;
  register: User;
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

export type MutationCreateCinemaArgs = {
  input: CinemaIn;
};

export type MutationCreateMovieArgs = {
  input: MovieIn;
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

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  input: UserIn;
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
  cinema: Cinema;
  cinemas: Array<Cinema>;
  me: User;
  movie: Movie;
  movies: Array<Movie>;
  paginatedCinemas: PaginatedCinemas;
  paginatedMovies: PaginatedMovies;
  users: Array<User>;
};

export type QueryCinemaArgs = {
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
  day: Days;
  movie: Movie;
  time: Scalars["String"];
};

export type ScheduleIn = {
  day: Days;
  movie: Scalars["ID"];
  time: Scalars["String"];
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
    createdAt: any;
    updatedAt: any;
  };
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
      createdAt
      updatedAt
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
