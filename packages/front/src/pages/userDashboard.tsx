import { NextPage } from "next";
import { useEffect, useState } from "react";
import LayoutPage from "../components/LayoutPage";
import styled from "@emotion/styled";
import Button from "../components/Button";
import CinemasWeb from "../components/CinemasWeb";
import MoviesWeb from "../components/MoviesWeb";
import ProfileWeb from "../components/ProfileWeb";

const isLocalStorageAvailable = () => {
  const testKey = "test";
  try {
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const UserDashboardPage: NextPage = () => {
  const lastActiveSection = isLocalStorageAvailable()
    ? (localStorage.getItem("activeSection") as
        | "Cinemas"
        | "Movies"
        | "Foro"
        | "Profile")
    : null;
  const [activeSection, setActiveSection] = useState<
    "Cinemas" | "Movies" | "Foro" | "Profile"
  >(lastActiveSection || "Cinemas");

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  return (
    <LayoutPage>
      <RowButtons>
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
            backgroundColor: activeSection === "Foro" ? "#9f67ad" : "#2f0139",
            width: "100%"
          }}
          onClick={() => setActiveSection("Foro")}
        >
          FORO
        </Button>
        <Button
          style={{
            backgroundColor:
              activeSection === "Profile" ? "#9f67ad" : "#2f0139",
            width: "100%"
          }}
          onClick={() => setActiveSection("Profile")}
        >
          PERFIL
        </Button>
      </RowButtons>
      <Section>
        {activeSection === "Cinemas" && <CinemasWeb />}
        {activeSection === "Movies" && <MoviesWeb />}
        {/* {activeSection === "Foro" && <Foro />} */}
        {activeSection === "Profile" && <ProfileWeb />}
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

const RowButtons = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2f0139;
  width: 15%;
`;

export default UserDashboardPage;
