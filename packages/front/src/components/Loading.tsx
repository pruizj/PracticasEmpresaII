import styled from "@emotion/styled";
import React, { FC } from "react";
import BeatLoader from "react-spinners/BeatLoader";

export interface LoadingProps {
  className?: string;
}

const Loading: FC<LoadingProps> = ({ ...props }) => (
  <Container {...props}>
    <BeatLoader size={20} color={"#e60000"} />
  </Container>
);

export default Loading;

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;
