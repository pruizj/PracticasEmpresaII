import React, { FC } from "react";
import styled from "@emotion/styled";

export interface IModalProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  show?: boolean;
  title?: string;
}

const Modal: FC<IModalProps> = ({
  children,
  className,
  onClose,
  show = true,
  title,
  ...props
}) => (
  <Container show={show} onMouseDown={onClose} {...props}>
    <Background />
    <Content
      className={className}
      onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
    >
      {onClose && <CloseButton onClick={onClose}>X</CloseButton>}
      {title && <h2>{title}</h2>}
      {children}
    </Content>
  </Container>
);

export default Modal;

const Background = styled.div`
  background: rgba(51, 51, 51, 0.5);
  backdrop-filter: blur(1px);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const CloseButton = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  cursor: pointer;
  height: 32px;
  position: absolute;
  right: 10px;
  top: 20px;
  width: 32px;
`;

const Container = styled.div<{ show: boolean }>`
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 25;

  ${props =>
    props.show
      ? `
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s linear;
  `
      : `
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s, opacity 0.5s linear;
  `};
`;

const Content = styled.div`
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 24px 40px 20px;
  position: relative;
  margin: auto 10px;
  max-width: 980px;
  width: 100%;

  h2 {
    font-family: Roboto;
    margin-bottom: 12px;
    color: #2f0139;
  }
`;
