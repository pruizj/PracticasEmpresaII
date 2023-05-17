import { FC, ReactNode } from "react";
import LayoutPage from "./LayoutPage";
import styled from "@emotion/styled";
import Button from "./Button";
import { useRouter } from "next/router";

const ColumnSelectionAdmin: FC<{
  children: ReactNode;
  activeSection: string;
}> = ({ children, activeSection }) => {
  const router = useRouter();
  const setActiveSection = (activeSection: string) => {
    router.push(`/userDashboard${activeSection}`);
  };

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
      </ColumnButtons>
      <Section>{children}</Section>
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

export default ColumnSelectionAdmin;
