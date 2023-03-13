import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
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
  id: Scalars["ID"];
  name: Scalars["String"];
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Cinema: ResolverTypeWrapper<Cinema>;
  CinemaData: ResolverTypeWrapper<CinemaData>;
  CinemaIn: CinemaIn;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Days: Days;
  GeneralOrderType: GeneralOrderType;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieData: ResolverTypeWrapper<MovieData>;
  MovieIn: MovieIn;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedCinemas: ResolverTypeWrapper<PaginatedCinemas>;
  PaginatedMovies: ResolverTypeWrapper<PaginatedMovies>;
  Query: ResolverTypeWrapper<{}>;
  ResultLogin: ResolverTypeWrapper<ResultLogin>;
  Role: Role;
  Schedule: ResolverTypeWrapper<Schedule>;
  ScheduleIn: ScheduleIn;
  String: ResolverTypeWrapper<Scalars["String"]>;
  UpdateCinemaIn: UpdateCinemaIn;
  UpdateMovieIn: UpdateMovieIn;
  User: ResolverTypeWrapper<User>;
  UserIn: UserIn;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Cinema: Cinema;
  CinemaData: CinemaData;
  CinemaIn: CinemaIn;
  Date: Scalars["Date"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Movie: Movie;
  MovieData: MovieData;
  MovieIn: MovieIn;
  Mutation: {};
  PaginatedCinemas: PaginatedCinemas;
  PaginatedMovies: PaginatedMovies;
  Query: {};
  ResultLogin: ResultLogin;
  Schedule: Schedule;
  ScheduleIn: ScheduleIn;
  String: Scalars["String"];
  UpdateCinemaIn: UpdateCinemaIn;
  UpdateMovieIn: UpdateMovieIn;
  User: User;
  UserIn: UserIn;
};

export type AuthDirectiveArgs = {
  requires?: Maybe<Array<Role>>;
};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CinemaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Cinema"] = ResolversParentTypes["Cinema"]
> = {
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  movies?: Resolver<Array<ResolversTypes["Movie"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rooms?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  schedule?: Resolver<
    Array<ResolversTypes["Schedule"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CinemaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CinemaData"] = ResolversParentTypes["CinemaData"]
> = {
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MovieResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Movie"] = ResolversParentTypes["Movie"]
> = {
  cast?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  director?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  release?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  synopsis?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  trailer?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MovieData"] = ResolversParentTypes["MovieData"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  release?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addRatingToMovie?: Resolver<
    ResolversTypes["Movie"],
    ParentType,
    ContextType,
    RequireFields<MutationAddRatingToMovieArgs, "id" | "rating">
  >;
  changeRole?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationChangeRoleArgs, "id" | "role">
  >;
  createCinema?: Resolver<
    ResolversTypes["Cinema"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCinemaArgs, "input">
  >;
  createMovie?: Resolver<
    ResolversTypes["Movie"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateMovieArgs, "input">
  >;
  deleteCinema?: Resolver<
    ResolversTypes["Cinema"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCinemaArgs, "id">
  >;
  deleteMovie?: Resolver<
    ResolversTypes["Movie"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteMovieArgs, "id">
  >;
  deleteUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, "id">
  >;
  login?: Resolver<
    ResolversTypes["ResultLogin"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  register?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "input">
  >;
  updateCinema?: Resolver<
    ResolversTypes["Cinema"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCinemaArgs, "id" | "input">
  >;
  updateMovie?: Resolver<
    ResolversTypes["Movie"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMovieArgs, "id" | "input">
  >;
};

export type PaginatedCinemasResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedCinemas"] = ResolversParentTypes["PaginatedCinemas"]
> = {
  data?: Resolver<Array<ResolversTypes["CinemaData"]>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedMoviesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedMovies"] = ResolversParentTypes["PaginatedMovies"]
> = {
  data?: Resolver<Array<ResolversTypes["MovieData"]>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  cinema?: Resolver<
    ResolversTypes["Cinema"],
    ParentType,
    ContextType,
    RequireFields<QueryCinemaArgs, "id">
  >;
  cinemas?: Resolver<Array<ResolversTypes["Cinema"]>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  movie?: Resolver<
    ResolversTypes["Movie"],
    ParentType,
    ContextType,
    RequireFields<QueryMovieArgs, "id">
  >;
  movies?: Resolver<Array<ResolversTypes["Movie"]>, ParentType, ContextType>;
  paginatedCinemas?: Resolver<
    ResolversTypes["PaginatedCinemas"],
    ParentType,
    ContextType,
    Partial<QueryPaginatedCinemasArgs>
  >;
  paginatedMovies?: Resolver<
    ResolversTypes["PaginatedMovies"],
    ParentType,
    ContextType,
    Partial<QueryPaginatedMoviesArgs>
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type ResultLoginResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ResultLogin"] = ResolversParentTypes["ResultLogin"]
> = {
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Schedule"] = ResolversParentTypes["Schedule"]
> = {
  day?: Resolver<ResolversTypes["Days"], ParentType, ContextType>;
  movie?: Resolver<ResolversTypes["Movie"], ParentType, ContextType>;
  time?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  authToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cinema?: CinemaResolvers<ContextType>;
  CinemaData?: CinemaDataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Movie?: MovieResolvers<ContextType>;
  MovieData?: MovieDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedCinemas?: PaginatedCinemasResolvers<ContextType>;
  PaginatedMovies?: PaginatedMoviesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResultLogin?: ResultLoginResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
