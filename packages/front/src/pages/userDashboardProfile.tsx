import ProfileWeb from "../components/ProfileWeb";
import { useRouter } from "next/router";
import ColumnSelectionUser from "../components/ColumnSelectionUser";

const UserDashboardPageProfile = () => {
  const router = useRouter();

  return (
    <ColumnSelectionUser activeSection="Profile">
      <ProfileWeb />
    </ColumnSelectionUser>
  );
};

export default UserDashboardPageProfile;
