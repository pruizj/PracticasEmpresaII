import styled from "@emotion/styled";
import { FC } from "react";

const MainHeader: FC = () => {
  return (
    <Header>
      <img src="/images/icon.jpg" />
      <Title>CINEBRIJA</Title>
    </Header>
  );
};

export default MainHeader;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #2f0139;
  img {
    height: 100px;
    margin-right: 16px;
  }
`;

const Title = styled.h1`
  color: #2f0139;
  font-size: 24px;
  font-family: "Courier New";
  font-weight: 500;
  margin-top: 40px;
`;
