import styled from "@emotion/styled";
import { FC, ReactNode } from "react";
import { useMeQuery } from "../generated/graphql";
import Button from "./Button";

const LayoutPage: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading, error } = useMeQuery();

  return (
    <Layout>
      <Header>
        <img src="/images/icon.jpg" />
        <Title>CARTELERA</Title>
        {data?.me && (
          <LogButton
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/access";
            }}
          >{`${data.me.name} ${data.me.surname} Cerrar sesión`}</LogButton>
        )}
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default LayoutPage;

const Header = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  img {
    width: 100px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2f0139;
  font-family: "Courier New";
  margin-right: 75%;
`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LogButton = styled(Button)`
  width: 8%;
`;

const Content = styled.div`
  display: flex;
  margin-top: 98px;
  min-height: calc(100vh - 98px);
`;
