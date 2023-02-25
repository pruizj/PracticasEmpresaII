import { movieResolver } from "./movie";
import { userResolver } from "./user";
import { cinemaResolver } from "./cinema";

export const allResolvers = [movieResolver, userResolver, cinemaResolver];
