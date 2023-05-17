import Cinemas from "../components/Cinemas";
import { useRouter } from "next/router";
import ColumnSelectionAdmin from "../components/ColumnSelectionAdmin";

const AdminDashboardPageCinemas = () => {
  const router = useRouter();

  return (
    <ColumnSelectionAdmin activeSection="Cinemas">
      <Cinemas />
    </ColumnSelectionAdmin>
  );
};

export default AdminDashboardPageCinemas;
