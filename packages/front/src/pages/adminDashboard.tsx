import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import {
  Role,
  useGiveAdminRoleMutation,
  useUsersQuery
} from "../generated/graphql";

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState<"Movies" | "Users">(
    "Movies"
  );
  const [id, setId] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [giveAdminRole] = useGiveAdminRoleMutation();

  const { loading: usersLoading, data: usersData, refetch } = useUsersQuery();
  //const { loading: moviesLoading, data: moviesData } = useMoviesQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await giveAdminRole({
        variables: {
          giveAdminRoleId: id
        }
      });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Page>
      <Header>
        <Logo src="/images/icon.jpg" alt="icon" />
        <Title>CARTELERA</Title>
        <LogButton
          onClick={() => {
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/access";
          }}
        >
          Cerrar sesión
        </LogButton>
      </Header>
      <Layout>
        <ColumnButtons>
          <Button
            style={{
              marginRight: 16,
              backgroundColor:
                activeSection === "Movies" ? "#9f67ad" : "#2f0139",
              width: "100%"
            }}
            onClick={() => setActiveSection("Movies")}
          >
            PELICULAS
          </Button>
          <Button
            style={{
              backgroundColor:
                activeSection === "Users" ? "#9f67ad" : "#2f0139",
              width: "100%"
            }}
            onClick={() => setActiveSection("Users")}
          >
            USUARIOS
          </Button>
        </ColumnButtons>
        <Section>
          {/* {activeSection === 'Movies' && (
            <div>
              <h2>Peliculas</h2>

              {moviesLoading && <Loading/>}
              {moviesData && (
                <ul>
                  {moviesData.movies.map((movie: any) => (
                    <li key={movie.id}>{movie.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )} */}

          {activeSection === "Users" && (
            <div>
              {usersLoading && <Loading />}
              <Form onSubmit={handleSubmit}>
                <Input
                  style={{ marginBottom: 0 }}
                  type="text"
                  placeholder="ID del usuario"
                  value={id}
                  onChange={event => {
                    setId(event.target.value);
                  }}
                  required
                />
                <RolButton type="submit"> Dar rol de administrador </RolButton>
              </Form>
              {error && (
                <ErrorAlert type="error" onClose={() => setError(false)}>
                  {"El usuario no existe"}
                </ErrorAlert>
              )}
              <Index>
                <ComponentIndex>
                  <MiniComponentIndex>
                    <h4>ID</h4>
                  </MiniComponentIndex>
                  <MiniComponentIndex>
                    <h4>NOMBRE</h4>
                  </MiniComponentIndex>
                  <MiniComponentIndex>
                    <h4>APELLIDO</h4>
                  </MiniComponentIndex>
                  <MiniComponentIndex>
                    <h4>CORREO ELECTRÓNICO</h4>
                  </MiniComponentIndex>
                  <MiniComponentIndex>
                    <h4>ROL</h4>
                  </MiniComponentIndex>
                </ComponentIndex>
              </Index>
              {usersData && (
                <List>
                  {usersData.users.map((user: any) => (
                    <Component key={user.id}>
                      <MiniComponent>{user.id}</MiniComponent>
                      <MiniComponent>{user.name}</MiniComponent>
                      <MiniComponent>{user.surname}</MiniComponent>
                      <MiniComponent>{user.email}</MiniComponent>
                      <MiniComponent>
                        {user.role === Role.Admin ? "Administrador" : "Usuario"}
                      </MiniComponent>
                    </Component>
                  ))}
                </List>
              )}
            </div>
          )}
        </Section>
      </Layout>
    </Page>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #2f0139;
`;

const LogButton = styled(Button)`
  width: 150px;
  margin-left: 77%;
  background-color: #2f0139;
`;

const Logo = styled.img`
  height: 100px;
  margin-right: 16px;
`;

const Title = styled.h1`
  color: #2f0139;
  font-size: 24px;
  font-family: "Courier New";
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  color: white;
  font-family: "Courier New";
  flex-direction: row;
  align-items: center;
  margin-left: 50px;
  margin-right: 20px;
  margin-bottom: 0px;
  margin-top: 30px;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorAlert = styled(Alert)`
  font-size: 14px;
  margin-left: 35px;
`;

const RolButton = styled(Button)`
  margin-left: 10px;
  margin-bottom: 0px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Index = styled.div`
  margin-left: 50px;
  margin-right: 10px;
`;

const ComponentIndex = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
  margin-bottom: 0px;
  padding: 8px;
  padding-bottom: 0px;
`;

const Component = styled.div`
  display: flex;
  flex-direction: row;
  border: 3px solid #2f0139;
  margin: 8px;
  padding: 8px;
`;

const MiniComponentIndex = styled.div`
  width: 20%;
  margin-left: 12px;
  padding-left: 12px;
  color: #9f67ad;
  font-family: "Courier New";
`;

const MiniComponent = styled.div`
  width: 20%;
  margin: 12px;
  padding: 12px;
  font-family: "Courier New";
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

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
