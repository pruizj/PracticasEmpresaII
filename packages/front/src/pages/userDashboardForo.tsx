import ForumWeb from "../components/ForumWeb";
import { useRouter } from "next/router";
import ColumnSelectionUser from "../components/ColumnSelectionUser";

const UserDashboardPageForo = () => {
  const router = useRouter();

  return (
    <ColumnSelectionUser activeSection="Foro">
      <ForumWeb />
    </ColumnSelectionUser>
  );
};

export default UserDashboardPageForo;
