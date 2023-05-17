import MoviesWeb from "../components/MoviesWeb";
import { useRouter } from "next/router";
import ColumnSelectionUser from "../components/ColumnSelectionUser";

const UserDashboardPageMovies = () => {
  const router = useRouter();

  return (
    <ColumnSelectionUser activeSection="Movies">
      <MoviesWeb />
    </ColumnSelectionUser>
  );
};

export default UserDashboardPageMovies;
