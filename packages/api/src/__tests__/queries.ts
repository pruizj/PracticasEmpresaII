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

export const ADD_RATING_TO_MOVIE = `
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
}`;

export const CREATE_CINEMA = `
mutation CreateCinema($input: CinemaIn!) {
  createCinema(input: $input) {
    id
    name
    address
    rooms
    capacity
    createdAt
    updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
    }
  }
}`;

export const UPDATE_CINEMA = `
mutation UpdateCinema($updateCinemaId: ID!, $input: UpdateCinemaIn!) {
  updateCinema(id: $updateCinemaId, input: $input) {
    id
    name
    address
    rooms
    capacity
    createdAt
    updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
    }
  }
}`;

export const DELETE_CINEMA = `
mutation DeleteCinema($deleteCinemaId: ID!) {
  deleteCinema(id: $deleteCinemaId) {
    id
    name
    address
    rooms
    capacity
    createdAt
    updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
    }
  }
}`;

export const CINEMA = `
query Cinema($cinemaId: ID!) {
  cinema(id: $cinemaId) {
    id
    name
    address
    rooms
    capacity
    createdAt
    updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
    }
  }
}`;

export const CINEMAS = `
query Cinemas {
  cinemas {
    id
    name
    address
    rooms
    capacity
    createdAt
    updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
    }
  }
}`;

export const PAGINATED_CINEMAS = `
query PaginatedCinemas($page: Int, $pageSize: Int, $order: GeneralOrderType, $searchName: String) {
  paginatedCinemas(page: $page, pageSize: $pageSize, order: $order, searchName: $searchName) {
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
}`;

export const GET_CHATS = `
query GetChats {
  getChats {
    id
    name
    messages {
      id
      text
      createdBy {
        name
      }
    }
    participants {
      name
    }
  }
}
`;

export const JOIN = `
mutation Join($channelName: String!) {
  join(channelName: $channelName) {
    user {
      id
      name
      surname
      email
      password
      role
      authToken
    }
    channel {
      messages {
        createdBy {
          name
        }
        text
      }
      name
      participants {
        name
      }
    }
  }
}
`;

export const SEND_MESSAGE = `
mutation SendMessage($channelName: String!, $text: String!) {
  sendMessage(channelName: $channelName, text: $text) {
    id
    text
    createdBy {
      id
      name
      surname
      email
      password
      role
      authToken
    }
  }
}
`;

export const QUIT = `
mutation Mutation($channelName: String!) {
  quit(channelName: $channelName) {
    id
    messages {
      id
      text
      createdBy {
        name
      }
    }
    name
    participants {
      name
    }
  }
}
`;

export const BOOKINGS = `
query Bookings {
  bookings {
    id
    cinema {
      name
    }
    movie {
      title
    }
    day
    room
    seats
    user {
      name
    }
    price
    cardNumber
    expiry_date
    security_code
  }
}
`;

export const BOOKING = `
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
    room
    seats
    user {
      name
    }
    price
    cardNumber
    expiry_date
    security_code
  }
}
`;

export const CREATE_BOOKING = `
mutation CreateBooking($cinema: ID!, $schedule: ScheduleIn!, $seats: Int!, $cardNumber: String!, $expiryDate: Date!) {
  createBooking(cinema: $cinema, schedule: $schedule, seats: $seats, cardNumber: $cardNumber, expiry_date: $expiryDate) {
    id
    cinema {
      name
    }
    movie {
      title
    }
    day
    room
    seats
    user {
      name
    }
    price
    cardNumber
    expiry_date
    security_code
  }
}
`;

export const DELETE_BOOKING = `
mutation DeleteBooking($deleteBookingId: ID!) {
  deleteBooking(id: $deleteBookingId)
}
`;
