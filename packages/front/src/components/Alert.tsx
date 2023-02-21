import React, { FC } from "react";
import styled from "@emotion/styled";

type AlertProps = {
  children: React.ReactNode;
  onClose?: () => void;
  type: string;
};

const Alert: FC<AlertProps> = ({ children, onClose, ...props }) => (
  <div {...props}>
    <Content type={props.type} onClick={onClose}>
      {children}
    </Content>
  </div>
);

const Content = styled.div<{ type: string }>`
  font-family: "Courier New"
  align-items: center;
  display: flex;
  line-height: 1.25;
  margin: 0 32px 0 20px;
  overflow: hidden;
  padding: 10px 0px;
  color: ${props => {
    switch (props.type) {
      case "success":
        return "#06A904";
      case "error":
        return "#F81704";
      default:
        return "blue";
    }
  }};
`;

export default Alert;
