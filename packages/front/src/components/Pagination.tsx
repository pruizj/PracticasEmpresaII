import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "@emotion/styled";

export interface PaginationProps {
  currentPage: number;
  numberPages: number;
  changePage(page: number): void;
  background: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const [pageState, setPageState]: [
    number | string,
    Dispatch<SetStateAction<number | string>>
  ] = useState(props.currentPage);

  return (
    <Content
      className={props.className + (props.background ? " background" : "")}
    >
      {props.currentPage === 1 ? (
        <img
          className="icon left"
          src="/images/arrow-light.svg"
          alt="Anterior"
        />
      ) : (
        <img
          className="icon left clickable"
          src="/images/arrow.svg"
          onClick={() => {
            props.changePage(props.currentPage - 1);
            setPageState(props.currentPage - 1);
          }}
          alt="Anterior"
        />
      )}
      <div className="pages">
        <p>
          <input
            className="current-page-input"
            type="number"
            value={pageState && props.currentPage}
            min="1"
            max={props.numberPages}
            onChange={event => {
              let newPage: number = +event.target.value;
              newPage =
                newPage > props.numberPages ? props.numberPages : newPage;
              newPage = newPage < 0 ? 1 : newPage;
              setPageState(newPage || "");

              if (newPage) {
                props.changePage(newPage);
              }
            }}
          />
        </p>
        <p className="center">{"of"}</p>
        <p>{props.numberPages}</p>
      </div>
      {props.currentPage === props.numberPages ? (
        <img
          className="icon right"
          src="/images/arrow-light.svg"
          alt="Siguiente"
        />
      ) : (
        <img
          className="icon right clickable"
          src="/images/arrow.svg"
          onClick={() => {
            props.changePage(props.currentPage + 1),
              setPageState(props.currentPage + 1);
          }}
          alt="Siguiente"
        />
      )}
    </Content>
  );
};

export default Pagination;

const Content = styled.div`
  align-items: center;
  color: #333333;
  display: flex;
  font-family: "Courier New";
  font-size: 18px;
  height: 60px;
  justify-content: center;
  line-height: 1.33;

  &.background {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  }

  .left {
    transform: rotate(90deg);
  }

  .right {
    transform: rotate(270deg);
  }

  .icon {
    height: 16px;
    margin: 0 46px;
    width: 30px;

    &.clickable {
      cursor: pointer;
    }
  }

  .pages {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;

    .center {
      margin: 0 15px;
    }
  }

  .current-page-input::-webkit-outer-spin-button,
  .current-page-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .current-page-input {
    -moz-appearance: textfield;
    border: solid 1px #999999;
    border-radius: 3px;
    font-weight: bold;
    height: 39px;
    padding: 0;
    text-align: center;
    width: 30px;
  }

  @media screen and (min-width: 768px) {
    height: 80px;
  }
`;
