import styled from "@emotion/styled";
import React, { FC } from "react";
import { CinemaData } from "../generated/graphql";
import CinemaIndex from "./CinemaIndex";
import router from "next/router";

export interface CinemaListProps {
  cinemas: CinemaData[];
  onDelete?: (cinema: CinemaData) => any;
}

const CinemaList: FC<CinemaListProps> = ({ cinemas = [], onDelete }) => {
  const onDeleteClick = (e: React.MouseEvent, cinema: CinemaData) => {
    e.stopPropagation();
    onDelete!(cinema);
  };

  return (
    <Container>
      <CinemaIndex />
      {cinemas.length === 0 && (
        <EmptyResults>
          <img src="/images/close.svg" />
          <p>No hay resultados</p>
        </EmptyResults>
      )}
      {cinemas.length !== 0 &&
        cinemas.map(cinema => (
          <a key={cinema.id}>
            <CinemaContainer
              onClick={() => {
                router.push(`/editCinema?id=${cinema.id}`);
              }}
            >
              <CinemaContent>
                <p>{cinema.name}</p>
                <p>{cinema.address}</p>
                <p>{cinema.rooms}</p>
                <p>{cinema.capacity}</p>
              </CinemaContent>
              <Buttons>
                <img
                  onClick={e => {
                    e.preventDefault();
                    onDeleteClick(e, cinema);
                    window.location.reload();
                  }}
                  className="trash"
                  src="/images/close.svg"
                ></img>
              </Buttons>
            </CinemaContainer>
          </a>
        ))}
    </Container>
  );
};

export default CinemaList;

const Container = styled.div`
  /* background-color: "gray"; */
  border-radius: 6px;
  margin: 20px 50px;

  > a {
    text-decoration: none;
    color: "black";
  }
`;

const CinemaContainer = styled.div`
  height: 64px;
  display: flex;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  padding-right: 20px;
  overflow: hidden;
`;

const CinemaContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 85%;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-top: 30px;
  p {
    margin-left: 30px;
    width: 20%;
    height: 10%;
    font-family: "Courier New";
  }
`;

const Buttons = styled.div`
  width: 10%;
  display: flex;
  justify-content: right;

  .trash {
    margin: 0 -10px 0 20px;
  }
`;

export const EmptyResults = styled.div`
  color: #2f0139;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  height: 100px;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
`;
