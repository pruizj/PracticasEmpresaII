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
  Booking: ResolverTypeWrapper<Booking>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Channel: ResolverTypeWrapper<Channel>;
  Cinema: ResolverTypeWrapper<Cinema>;
  CinemaData: ResolverTypeWrapper<CinemaData>;
  CinemaIn: CinemaIn;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Days: Days;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  GeneralOrderType: GeneralOrderType;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  JoinResult: ResolverTypeWrapper<JoinResult>;
  Message: ResolverTypeWrapper<Message>;
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
  Subscription: ResolverTypeWrapper<{}>;
  UpdateCinemaIn: UpdateCinemaIn;
  UpdateMovieIn: UpdateMovieIn;
  User: ResolverTypeWrapper<User>;
  UserIn: UserIn;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Booking: Booking;
  Boolean: Scalars["Boolean"];
  Channel: Channel;
  Cinema: Cinema;
  CinemaData: CinemaData;
  CinemaIn: CinemaIn;
  Date: Scalars["Date"];
  Float: Scalars["Float"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  JoinResult: JoinResult;
  Message: Message;
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
  Subscription: {};
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

export type BookingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Booking"] = ResolversParentTypes["Booking"]
> = {
  cardNumber?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  cinema?: Resolver<ResolversTypes["Cinema"], ParentType, ContextType>;
  day?: Resolver<ResolversTypes["Days"], ParentType, ContextType>;
  expiry_date?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  movie?: Resolver<ResolversTypes["Movie"], ParentType, ContextType>;
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  room?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  seats?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  security_code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  time?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Channel"] = ResolversParentTypes["Channel"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["Message"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  participants?: Resolver<
    Maybe<Array<ResolversTypes["User"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  capacity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rooms?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type JoinResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["JoinResult"] = ResolversParentTypes["JoinResult"]
> = {
  channel?: Resolver<ResolversTypes["Channel"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Message"] = ResolversParentTypes["Message"]
> = {
  channel?: Resolver<Maybe<ResolversTypes["Channel"]>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  createBooking?: Resolver<
    ResolversTypes["Booking"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateBookingArgs,
      "cardNumber" | "cinema" | "expiry_date" | "schedule" | "seats"
    >
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
  deleteBooking?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBookingArgs, "id">
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
  join?: Resolver<
    ResolversTypes["JoinResult"],
    ParentType,
    ContextType,
    RequireFields<MutationJoinArgs, "channelName">
  >;
  login?: Resolver<
    ResolversTypes["ResultLogin"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  quit?: Resolver<
    ResolversTypes["Channel"],
    ParentType,
    ContextType,
    RequireFields<MutationQuitArgs, "channelName">
  >;
  register?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "input">
  >;
  sendMessage?: Resolver<
    ResolversTypes["Message"],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, "channelName" | "text">
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
  booking?: Resolver<
    ResolversTypes["Booking"],
    ParentType,
    ContextType,
    RequireFields<QueryBookingArgs, "id">
  >;
  bookings?: Resolver<
    Array<ResolversTypes["Booking"]>,
    ParentType,
    ContextType
  >;
  cinema?: Resolver<
    ResolversTypes["Cinema"],
    ParentType,
    ContextType,
    RequireFields<QueryCinemaArgs, "id">
  >;
  cinemas?: Resolver<Array<ResolversTypes["Cinema"]>, ParentType, ContextType>;
  getChat?: Resolver<
    ResolversTypes["Channel"],
    ParentType,
    ContextType,
    RequireFields<QueryGetChatArgs, "id">
  >;
  getChats?: Resolver<
    Array<ResolversTypes["Channel"]>,
    ParentType,
    ContextType
  >;
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
  userBookings?: Resolver<
    Array<ResolversTypes["Booking"]>,
    ParentType,
    ContextType
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
  capacity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  day?: Resolver<ResolversTypes["Days"], ParentType, ContextType>;
  movie?: Resolver<ResolversTypes["Movie"], ParentType, ContextType>;
  room?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  time?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  onMemberJoin?: SubscriptionResolver<
    Maybe<ResolversTypes["JoinResult"]>,
    "onMemberJoin",
    ParentType,
    ContextType
  >;
  onMessageAdded?: SubscriptionResolver<
    Maybe<ResolversTypes["Message"]>,
    "onMessageAdded",
    ParentType,
    ContextType
  >;
  onQuit?: SubscriptionResolver<
    Maybe<ResolversTypes["Channel"]>,
    "onQuit",
    ParentType,
    ContextType
  >;
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
  Booking?: BookingResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  Cinema?: CinemaResolvers<ContextType>;
  CinemaData?: CinemaDataResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JoinResult?: JoinResultResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieData?: MovieDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedCinemas?: PaginatedCinemasResolvers<ContextType>;
  PaginatedMovies?: PaginatedMoviesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResultLogin?: ResultLoginResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
