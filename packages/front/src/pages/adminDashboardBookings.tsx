import Bookings from "../components/Bookings";
import { useRouter } from "next/router";
import ColumnSelectionAdmin from "../components/ColumnSelectionAdmin";

const AdminDashboardPageBookings = () => {
  const router = useRouter();

  return (
    <ColumnSelectionAdmin activeSection="Bookings">
      <Bookings />
    </ColumnSelectionAdmin>
  );
};

export default AdminDashboardPageBookings;
