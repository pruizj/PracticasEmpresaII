import Movies from "../components/Movies";
import { useRouter } from "next/router";
import ColumnSelectionAdmin from "../components/ColumnSelectionAdmin";

const AdminDashboardPageMovies = () => {
  const router = useRouter();

  return (
    <ColumnSelectionAdmin activeSection="Movies">
      <Movies />
    </ColumnSelectionAdmin>
  );
};

export default AdminDashboardPageMovies;
