import Users from "../components/Users";
import { useRouter } from "next/router";
import ColumnSelectionAdmin from "../components/ColumnSelectionAdmin";

const AdminDashboardPageUsers = () => {
  const router = useRouter();

  return (
    <ColumnSelectionAdmin activeSection="Users">
      <Users />
    </ColumnSelectionAdmin>
  );
};

export default AdminDashboardPageUsers;
