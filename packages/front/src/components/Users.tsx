import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import {
  Role,
  useChangeRoleMutation,
  useMeQuery,
  useUsersQuery
} from "../generated/graphql";
import Button from "./Button";
import Loading from "./Loading";
import { EmptyResults } from "./MovieList";

const Users: FC = () => {
  const { loading, data, refetch } = useUsersQuery();
  const { data: datame } = useMeQuery();
  const [changeRole] = useChangeRoleMutation();

  const giveRole = async (id, role) => {
    try {
      if (id === datame.me.id) return alert("NO PUEDES CAMIBIAR TU PROPIO ROL");
      await changeRole({
        variables: {
          changeRoleId: id,
          role
        }
      });
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Loading />;

  return (
    <Content>
      <Index>
        <h4>NOMBRE</h4>
        <h4>APELLIDO</h4>
        <h4>CORREO</h4>
        <h4>ROL</h4>
      </Index>
      {data.users.length === 0 && (
        <EmptyResults>
          <img src="/images/close.svg" />
          <p>No hay resultados</p>
        </EmptyResults>
      )}
      {data.users.length &&
        data.users.map(user => {
          return (
            <User key={user.id}>
              <Item>
                <P>{user.name}</P>
                <P1>{user.surname}</P1>
                <P2>{user.email}</P2>
                <P3>
                  {user.role === Role.Admin ? "Administrador" : "Usuario"}
                </P3>
              </Item>
              <UserButton
                onClick={() => {
                  giveRole(
                    user.id,
                    user.role === Role.Admin ? Role.User : Role.Admin
                  );
                }}
              >
                Rol
              </UserButton>
            </User>
          );
        })}
    </Content>
  );
};

export default Users;

const Index = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 50px 50px 0px 50px;
  font-family: "Courier New";
  h4 {
    color: purple;
    padding-left: 85px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const P = styled.p`
  padding-left: 85px;
`;

const P1 = styled.p`
  padding-left: 110px;
`;

const P2 = styled.p`
  padding-left: 90px;
`;

const P3 = styled.p`
  padding-left: 120px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 50px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const Item = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 0px 20px 0px;
  font-family: "Courier New";

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const UserButton = styled(Button)`
  width: 5%;
  height: 10%;
  margin-top: 30px;
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
`;
