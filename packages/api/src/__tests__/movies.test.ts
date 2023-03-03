import { Mongoose } from "mongoose";
import { MovieModel } from "../db-models/movie";
import { UserModel } from "../db-models/user";
import { Movie, PaginatedMovies, User } from "../gql/types";
import { movie1, movie2, movie3 } from "./data/movie";
import { user } from "./data/user";
import { AfterAll, BeforeAll } from "./functions";
import { graphQLHelper } from "./graphqlHelper";
import { MOVIES, PAGINATED_MOVIES, REGISTER } from "./queries";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("Movies", () => {
  it("should return movies", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel(movie1);
    await newMovie1.save();
    const newMovie2 = new MovieModel(movie2);
    await newMovie2.save();
    const newMovie3 = new MovieModel(movie3);
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      MOVIES,
      {},
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { movies } = result2.data as { movies: Movie[] };

    expect(movies).toMatchObject([
      {
        ...movie1,
        id: newMovie1._id.toString()
      },
      {
        ...movie2,
        id: newMovie2._id.toString()
      },
      {
        ...movie3,
        id: newMovie3._id.toString()
      }
    ]);

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies order: a to z", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel({
      ...movie1,
      title: "A movie"
    });
    await newMovie1.save();
    const newMovie2 = new MovieModel({
      ...movie2,
      title: "B movie"
    });
    await newMovie2.save();
    const newMovie3 = new MovieModel({
      ...movie3,
      title: "C movie"
    });
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      { order: "NameAZ" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 1,
      pageSize: 3,
      totalPages: 1,
      totalNumber: 3,
      data: [
        {
          id: newMovie1._id.toString(),
          title: "A movie",
          image: movie1.image,
          release: movie1.release,
          rating: movie1.rating
        },
        {
          id: newMovie2._id.toString(),
          title: "B movie",
          image: movie2.image,
          release: movie2.release,
          rating: movie2.rating
        },
        {
          id: newMovie3._id.toString(),
          title: "C movie",
          image: movie3.image,
          release: movie3.release,
          rating: movie3.rating
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies order: z to a", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel({
      ...movie1,
      title: "A movie"
    });
    await newMovie1.save();
    const newMovie2 = new MovieModel({
      ...movie2,
      title: "B movie"
    });
    await newMovie2.save();
    const newMovie3 = new MovieModel({
      ...movie3,
      title: "C movie"
    });
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      { order: "NameZA" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 1,
      pageSize: 3,
      totalPages: 1,
      totalNumber: 3,
      data: [
        {
          id: newMovie3._id.toString(),
          title: "C movie",
          image: movie3.image,
          release: movie3.release,
          rating: movie3.rating
        },
        {
          id: newMovie2._id.toString(),
          title: "B movie",
          image: movie2.image,
          release: movie2.release,
          rating: movie2.rating
        },
        {
          id: newMovie1._id.toString(),
          title: "A movie",
          image: movie1.image,
          release: movie1.release,
          rating: movie1.rating
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies order: recent release first", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel({
      ...movie1,
      release: new Date("2020-01-01")
    });
    await newMovie1.save();
    const newMovie2 = new MovieModel({
      ...movie2,
      release: new Date("2020-01-02")
    });
    await newMovie2.save();
    const newMovie3 = new MovieModel({
      ...movie3,
      release: new Date("2023-05-03")
    });
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      { order: "RecentFirst" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 1,
      pageSize: 3,
      totalPages: 1,
      totalNumber: 3,
      data: [
        {
          id: newMovie3._id.toString(),
          title: movie3.title,
          image: movie3.image,
          release: new Date("2023-05-03"),
          rating: movie3.rating
        },
        {
          id: newMovie2._id.toString(),
          title: movie2.title,
          image: movie2.image,
          release: new Date("2020-01-02"),
          rating: movie2.rating
        },
        {
          id: newMovie1._id.toString(),
          title: movie1.title,
          image: movie1.image,
          release: new Date("2020-01-01"),
          rating: movie1.rating
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies order: oldest release first", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel({
      ...movie1,
      release: new Date("2020-01-01")
    });
    await newMovie1.save();
    const newMovie2 = new MovieModel({
      ...movie2,
      release: new Date("2020-01-02")
    });
    await newMovie2.save();
    const newMovie3 = new MovieModel({
      ...movie3,
      release: new Date("2023-05-03")
    });
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      { order: "RecentLast" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 1,
      pageSize: 3,
      totalPages: 1,
      totalNumber: 3,
      data: [
        {
          id: newMovie1._id.toString(),
          title: movie1.title,
          image: movie1.image,
          release: new Date("2020-01-01"),
          rating: movie1.rating
        },
        {
          id: newMovie2._id.toString(),
          title: movie2.title,
          image: movie2.image,
          release: new Date("2020-01-02"),
          rating: movie2.rating
        },
        {
          id: newMovie3._id.toString(),
          title: movie3.title,
          image: movie3.image,
          release: new Date("2023-05-03"),
          rating: movie3.rating
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies paginated and default order", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel({
      ...movie1,
      release: new Date("2020-01-01")
    });
    await newMovie1.save();
    const newMovie2 = new MovieModel({
      ...movie2,
      release: new Date("2020-01-02")
    });
    await newMovie2.save();
    const newMovie3 = new MovieModel({
      ...movie3,
      release: new Date("2023-05-03")
    });
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      { page: 1, pageSize: 2 },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 1,
      pageSize: 2,
      totalPages: 2,
      totalNumber: 3,
      data: [
        {
          id: newMovie3._id.toString(),
          title: movie3.title,
          image: movie3.image,
          release: new Date("2023-05-03"),
          rating: movie3.rating
        },
        {
          id: newMovie2._id.toString(),
          title: movie2.title,
          image: movie2.image,
          release: new Date("2020-01-02"),
          rating: movie2.rating
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies filtered by title", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create movies in database
    const newMovie1 = new MovieModel({
      ...movie1,
      title: "A movie"
    });
    await newMovie1.save();
    const newMovie2 = new MovieModel({
      ...movie2,
      title: "B movie"
    });
    await newMovie2.save();
    const newMovie3 = new MovieModel({
      ...movie3,
      title: "C movie"
    });
    await newMovie3.save();

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      { searchTitle: "A" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 1,
      pageSize: 1,
      totalPages: 1,
      totalNumber: 1,
      data: [
        {
          id: newMovie1._id.toString(),
          title: "A movie",
          image: movie1.image,
          release: movie1.release,
          rating: movie1.rating
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return no movies if there are no movies in database", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // get movies
    const result2 = await graphQLHelper(
      PAGINATED_MOVIES,
      {},
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedMovies } = result2.data as {
      paginatedMovies: PaginatedMovies;
    };

    expect(paginatedMovies).toMatchObject({
      page: 0,
      pageSize: 0,
      totalPages: 0,
      totalNumber: 0,
      data: []
    });

    // clean database
    await UserModel.deleteMany({});
  });
});
