import { movieResolver } from "./movie";
import { userResolver } from "./user";
import { cinemaResolver } from "./cinema";
import { forumResolver } from "./forum";

export const allResolvers = [
  movieResolver,
  userResolver,
  cinemaResolver,
  forumResolver
];
