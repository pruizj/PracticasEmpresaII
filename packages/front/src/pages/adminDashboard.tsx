import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import LayoutPage from "../components/LayoutPage";
import Users from "../components/Users";
import Cinemas from "../components/Cinemas";
import Movies from "../components/Movies";
import Bookings from "../components/Bookings";

const isLocalStorageAvailable = () => {
  try {
    const testKey = "test";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const AdminDashboardPage = () => {
  const lastActiveSection = isLocalStorageAvailable()
    ? (localStorage.getItem("activeSection") as
        | "Cinemas"
        | "Movies"
        | "Users"
        | "Bookings")
    : null;
  const [activeSection, setActiveSection] = useState<
    "Cinemas" | "Movies" | "Users" | "Bookings"
  >(lastActiveSection || "Cinemas");

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  return (
    <LayoutPage>
      <ColumnButtons>
        <Button
          style={{
            backgroundColor:
              activeSection === "Cinemas" ? "#9f67ad" : "#2f0139",
            width: "100%"
          }}
          onClick={() => setActiveSection("Cinemas")}
        >
          CINES
        </Button>
        <Button
          style={{
            backgroundColor: activeSection === "Movies" ? "#9f67ad" : "#2f0139",
            width: "100%"
          }}
          onClick={() => setActiveSection("Movies")}
        >
          PELICULAS
        </Button>
        <Button
          style={{
            backgroundColor:
              activeSection === "Bookings" ? "#9f67ad" : "#2f0139",
            width: "100%"
          }}
          onClick={() => setActiveSection("Bookings")}
        >
          ENTRADAS
        </Button>
        <Button
          style={{
            backgroundColor: activeSection === "Users" ? "#9f67ad" : "#2f0139",
            width: "100%"
          }}
          onClick={() => setActiveSection("Users")}
        >
          USUARIOS
        </Button>
      </ColumnButtons>
      <Section>
        {activeSection === "Cinemas" && <Cinemas />}
        {activeSection === "Users" && <Users />}
        {activeSection === "Movies" && <Movies />}
        {activeSection === "Bookings" && <Bookings />}
      </Section>
    </LayoutPage>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 100%;
`;

const ColumnButtons = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2f0139;
  width: 15%;
`;

export default AdminDashboardPage;
