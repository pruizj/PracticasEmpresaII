import styled from "@emotion/styled";
import React, { FC } from "react";
import { CinemaData } from "../generated/graphql";
import router from "next/router";

export interface CinemaListProps {
  cinemas: CinemaData[];
}

const CinemaListWeb: FC<CinemaListProps> = ({ cinemas = [] }) => {
  return (
    <Container>
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
                router.push(`/webCinema?id=${cinema.id}`);
              }}
            >
              <CinemaContent>
                <h2>{cinema.name.toUpperCase()}</h2>
                <p>Dirección: {cinema.address}</p>
                <p>Número de salas: {cinema.rooms}</p>
                <p>Capacidad por sala: {cinema.capacity}</p>
              </CinemaContent>
            </CinemaContainer>
          </a>
        ))}
    </Container>
  );
};

export default CinemaListWeb;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  margin: 20px 40px;
  justify-content: center;
  > a {
    text-decoration: none;
    color: "black";
  }
`;

const CinemaContainer = styled.div`
  height: 250px;
  width: 350px;
  display: flex;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(159, 103, 173, 1);
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
  flex-direction: column;
  align-items: start;
  margin: 50px;
  p {
    margin-top: 10px;
    font-family: "Courier New";
  }
  h2 {
    font-family: "Courier New";
    color: #9f67ad;
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
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
`;
