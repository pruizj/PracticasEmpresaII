import CinemasWeb from "../components/CinemasWeb";
import { useRouter } from "next/router";
import ColumnSelectionUser from "../components/ColumnSelectionUser";

const UserDashboardPageCinemas = () => {
  const router = useRouter();

  return (
    <ColumnSelectionUser activeSection="Cinemas">
      <CinemasWeb />
    </ColumnSelectionUser>
  );
};

export default UserDashboardPageCinemas;
