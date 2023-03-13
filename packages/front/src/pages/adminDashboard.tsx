import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import LayoutPage from "../components/LayoutPage";
import Users from "../components/Users";
import Cinemas from "../components/Cinemas";

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState<"Cinemas" | "Users">(
    "Cinemas"
  );

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
