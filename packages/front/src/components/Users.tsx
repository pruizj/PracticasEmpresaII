import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import {
  Role,
  useChangeRoleMutation,
  useMeQuery,
  useUsersQuery
} from "../generated/graphql";
import Button from "./Button";
import Loading from "./Loading";
import UserIndex from "./UserIndex";

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
      <UserIndex />
      {loading ? (
        <Loading />
      ) : (
        data &&
        data.users.map(user => {
          return (
            <User key={user.id}>
              <Item>
                <p>{user.name}</p>
                <p>{user.surname}</p>
                <p>{user.email}</p>
                <p>{user.role === Role.Admin ? "Administrador" : "Usuario"}</p>
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
        })
      )}
    </Content>
  );
};

export default Users;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 80%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
  margin-left: 30px;
  p {
    margin-left: 30px;
    width: 20%;
    height: 10%;
    font-family: "Courier New";
  }
`;

const UserButton = styled(Button)`
  width: 10%;
  height: 10%;
  margin-top: 10px;
  margin-right: 100px;
  margin-bottom: 10px;
`;
