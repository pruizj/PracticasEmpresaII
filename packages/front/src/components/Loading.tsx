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
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
