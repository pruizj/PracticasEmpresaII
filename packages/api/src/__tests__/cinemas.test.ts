import { Mongoose } from "mongoose";
import { AfterAll, BeforeAll } from "./functions";
import { user } from "./data/user";
import { graphQLHelper } from "./graphqlHelper";
import { CINEMAS, PAGINATED_CINEMAS, REGISTER } from "./queries";
import { Cinema, PaginatedCinemas, User } from "../gql/types";
import { MovieModel } from "../db-models/movie";
import { movie1, movie2, movie3 } from "./data/movie";
import { CinemaModel } from "../db-models/cinema";
import { cinema1, cinema2, cinema3 } from "./data/cinema";
import { UserModel } from "../db-models/user";

let db: Mongoose;

beforeAll(async () => {
  const result = await BeforeAll(db);
  db = result;
});

afterAll(async () => {
  const result = await AfterAll(db);
  db = result;
});

describe("Cinemas", () => {
  it("should return cinemas", async () => {
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

    // create cinemas in database
    const newCinema1 = new CinemaModel({
      ...cinema1,
      schedule: [
        {
          day: "Monday",
          time: "12:00",
          movie: newMovie1._id.toString()
        },
        {
          day: "Monday",
          time: "15:00",
          movie: newMovie2._id.toString()
        }
      ]
    });
    await newCinema1.save();

    const newCinema2 = new CinemaModel({
      ...cinema2,
      schedule: [
        {
          day: "Wednesday",
          time: "12:00",
          movie: newMovie1._id.toString()
        }
      ]
    });
    await newCinema2.save();

    const newCinema3 = new CinemaModel({
      ...cinema3,
      schedule: [
        {
          day: "Monday",
          time: "12:00",
          movie: newMovie3._id.toString()
        }
      ]
    });
    await newCinema3.save();

    // get cinemas
    const result2 = await graphQLHelper(
      CINEMAS,
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

    const { cinemas } = result2.data as { cinemas: Cinema[] };

    expect(cinemas).toMatchObject([
      {
        ...cinema1,
        id: newCinema1._id.toString(),
        schedule: [
          {
            day: "Monday",
            time: "12:00",
            movie: movie1
          },
          {
            day: "Monday",
            time: "15:00",
            movie: movie2
          }
        ]
      },
      {
        ...cinema2,
        id: newCinema2._id.toString(),
        schedule: [
          {
            day: "Wednesday",
            time: "12:00",
            movie: movie1
          }
        ]
      },
      {
        ...cinema3,
        id: newCinema3._id.toString(),
        schedule: [
          {
            day: "Monday",
            time: "12:00",
            movie: movie3
          }
        ]
      }
    ]);

    // clean database
    await MovieModel.deleteMany({});
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies order:a to z", async () => {
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

    // create cinemas in database
    const newCinema1 = new CinemaModel({
      ...cinema1,
      name: "A cinema",
      schedule: [
        {
          day: "Monday",
          time: "12:00",
          movie: newMovie1._id.toString()
        },
        {
          day: "Monday",
          time: "15:00",
          movie: newMovie2._id.toString()
        }
      ]
    });
    await newCinema1.save();

    const newCinema2 = new CinemaModel({
      ...cinema2,
      name: "B cinema",
      schedule: [
        {
          day: "Wednesday",
          time: "12:00",
          movie: newMovie1._id.toString()
        }
      ]
    });
    await newCinema2.save();

    const newCinema3 = new CinemaModel({
      ...cinema3,
      name: "C cinema",
      schedule: [
        {
          day: "Monday",
          time: "12:00",
          movie: newMovie3._id.toString()
        }
      ]
    });
    await newCinema3.save();

    // get cinemas
    const result2 = await graphQLHelper(
      PAGINATED_CINEMAS,
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

    const { paginatedCinemas } = result2.data as {
      paginatedCinemas: PaginatedCinemas;
    };

    expect(paginatedCinemas).toMatchObject({
      page: 1,
      pageSize: 3,
      totalPages: 1,
      totalNumber: 3,
      data: [
        {
          id: newCinema1._id.toString(),
          name: "A cinema",
          address: cinema1.address
        },
        {
          id: newCinema2._id.toString(),
          name: "B cinema",
          address: cinema2.address
        },
        {
          id: newCinema3._id.toString(),
          name: "C cinema",
          address: cinema3.address
        }
      ]
    });

    // clean database
    await MovieModel.deleteMany({});
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return movies order:z to a", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create cinemas in database
    const newCinema1 = new CinemaModel({
      ...cinema1,
      name: "A cinema"
    });
    await newCinema1.save();

    const newCinema2 = new CinemaModel({
      ...cinema2,
      name: "B cinema"
    });
    await newCinema2.save();

    const newCinema3 = new CinemaModel({
      ...cinema3,
      name: "C cinema"
    });
    await newCinema3.save();

    // get cinemas
    const result2 = await graphQLHelper(
      PAGINATED_CINEMAS,
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

    const { paginatedCinemas } = result2.data as {
      paginatedCinemas: PaginatedCinemas;
    };

    expect(paginatedCinemas).toMatchObject({
      page: 1,
      pageSize: 3,
      totalPages: 1,
      totalNumber: 3,
      data: [
        {
          id: newCinema3._id.toString(),
          name: "C cinema",
          address: cinema3.address
        },
        {
          id: newCinema2._id.toString(),
          name: "B cinema",
          address: cinema2.address
        },
        {
          id: newCinema1._id.toString(),
          name: "A cinema",
          address: cinema1.address
        }
      ]
    });

    // clean database
    await CinemaModel.deleteMany({});
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

    // create cinemas in database
    const newCinema1 = new CinemaModel({
      ...cinema1,
      name: "A cinema"
    });
    await newCinema1.save();

    const newCinema2 = new CinemaModel({
      ...cinema2,
      name: "B cinema"
    });
    await newCinema2.save();

    const newCinema3 = new CinemaModel({
      ...cinema3,
      name: "C cinema"
    });
    await newCinema3.save();

    // get cinemas
    const result2 = await graphQLHelper(
      PAGINATED_CINEMAS,
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

    const { paginatedCinemas } = result2.data as {
      paginatedCinemas: PaginatedCinemas;
    };

    expect(paginatedCinemas).toMatchObject({
      page: 1,
      pageSize: 2,
      totalPages: 2,
      totalNumber: 3,
      data: [
        {
          id: newCinema3._id.toString(),
          name: "C cinema",
          address: cinema3.address
        },
        {
          id: newCinema2._id.toString(),
          name: "B cinema",
          address: cinema2.address
        }
      ]
    });

    // clean database
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return cinemas filtered by name", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // create cinemas in database
    const newCinema1 = new CinemaModel({
      ...cinema1,
      name: "A cinema"
    });
    await newCinema1.save();

    const newCinema2 = new CinemaModel({
      ...cinema2,
      name: "B cinema"
    });
    await newCinema2.save();

    const newCinema3 = new CinemaModel({
      ...cinema3,
      name: "C cinema"
    });
    await newCinema3.save();

    // get cinemas
    const result2 = await graphQLHelper(
      PAGINATED_CINEMAS,
      { searchName: "A cinema" },
      {
        user: {
          ...user,
          id: register.id,
          authToken: register?.authToken,
          role: register?.role
        }
      }
    );

    const { paginatedCinemas } = result2.data as {
      paginatedCinemas: PaginatedCinemas;
    };

    expect(paginatedCinemas).toMatchObject({
      page: 1,
      pageSize: 1,
      totalPages: 1,
      totalNumber: 1,
      data: [
        {
          id: newCinema1._id.toString(),
          name: "A cinema",
          address: cinema1.address
        }
      ]
    });

    // clean database
    await CinemaModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it("should return no cinemas if there are no cinemas in database", async () => {
    // create user in database
    const result = await graphQLHelper(
      REGISTER,
      { input: user },
      { user: undefined }
    );
    const { register } = result.data as { register: User };

    // get cinemas
    const result2 = await graphQLHelper(
      PAGINATED_CINEMAS,
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

    const { paginatedCinemas } = result2.data as {
      paginatedCinemas: PaginatedCinemas;
    };

    expect(paginatedCinemas).toMatchObject({
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
