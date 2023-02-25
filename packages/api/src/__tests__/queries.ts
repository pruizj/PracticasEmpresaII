export const REGISTER = `
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
}`;

export const LOGIN = `
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password){
    token
    role
  }
}`;

export const CHANGE_ROLE = `
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
}`;

export const DELETE_USER = `
mutation Mutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    id
    name
    surname
    password
    email
    role
    authToken
  }
}`;

export const ME = `
query Query {
  me {
    id
    name
    surname
    password
    email
    role
    authToken
  }
}`;

export const USERS = `
query Query {
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

export const CREATE_MOVIE = `
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
    createdAt
    updatedAt
  }
} `;

export const UPDATE_MOVIE = `
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
    createdAt
    updatedAt
  }
} `;

export const DELETE_MOVIE = `
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
    createdAt
    updatedAt
  }
} `;

export const MOVIE = `
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
    createdAt
    updatedAt
  }
} `;

export const MOVIES = `
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
    createdAt
    updatedAt
  }
} `;

export const PAGINATED_MOVIES = `
query PaginatedMovies($page: Int, $pageSize: Int, $order: GeneralOrderType, $searchTitle: String) {
  paginatedMovies(page: $page, pageSize: $pageSize, order: $order, searchTitle: $searchTitle) {
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
} `;
