import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { ERROR } from "../../../api/src/errors";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import LayoutPage from "../components/LayoutPage";
import router from "next/router";
import { Days, useCinemaQuery, useMovieQuery } from "../generated/graphql";

const SummaryBooking = ({ seats, price, cinema, day, time, room, movie }) => {
  const {
    data: movieData,
    loading: movieLoading,
    refetch: refetch1
  } = useMovieQuery({
    variables: { movieId: movie }
  });
  const movieQuery = movieData?.movie;

  const {
    data: cinemaData,
    loading: cinemaLoading,
    refetch
  } = useCinemaQuery({
    variables: { cinemaId: cinema }
  });
  const cinemaQuery = cinemaData?.cinema;

  return (
    <LayoutPage>
      <Content>
        <Title>
          <h3>Resumen de la compra</h3>
        </Title>
        <Item>
          <ItemContent>
            <h4>CINE:</h4>
            <p>{cinemaLoading ? "Cargando..." : cinemaQuery.name}</p>
          </ItemContent>
          <ItemContent>
            <h4>PELÍCULA:</h4>
            <p>{movieLoading ? "Cargando..." : movieQuery.title}</p>
          </ItemContent>
          <ItemContent>
            <h4>ENTRADAS:</h4>
            <p>{seats}</p>
          </ItemContent>
          <ItemContent>
            <h4>PRECIO:</h4>
            <p>{price}€</p>
          </ItemContent>
          <ItemContent>
            <h4>SALA:</h4>
            <p>{room}</p>
          </ItemContent>
          <ItemContent>
            <h4>HORARIO:</h4>
            <p>
              {day === Days.Monday
                ? "Lunes"
                : day === Days.Tuesday
                ? "Martes"
                : day === Days.Wednesday
                ? "Miércoles"
                : day === Days.Thursday
                ? "Jueves"
                : day === Days.Friday
                ? "Viernes"
                : day === Days.Saturday
                ? "Sábado"
                : "Domingo"}{" "}
              {time}
            </p>
          </ItemContent>
        </Item>
        <BottomIndex>
          <LocalButton
            onClick={() => {
              router.push(`/bookingSuccess`);
            }}
          >
            Continuar
          </LocalButton>
        </BottomIndex>
      </Content>
    </LayoutPage>
  );
};

SummaryBooking.getInitialProps = async ({ query }) => {
  return {
    cinema: query.cinema,
    day: query.day,
    time: query.time,
    room: query.room,
    movie: query.movie,
    seats: query.seats,
    price: query.price
  };
};

export default SummaryBooking;

const LocalButton = styled(Button)`
  width: 15%;
  margin: 0 0 0 80%;
`;

const Content = styled.div`
  display: flex;
  color: #000000;
  width: 100%;
  height: 80%;
  font-family: "Courier New";
  flex-direction: column;
  align-items: center;
  margin: 50px 350px 50px 350px;
  background-color: #ffffff;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);

  p {
    font-size: 18px;
    font-family: "Courier New";
  }
`;

const Title = styled.p`
  font-weight: bold;
  color: #9f67ad;
  font-family: "Courier New";
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0px 0 0 800px;
`;

const BottomIndex = styled.div`
  width: 96%;
  display: flex;
  justify-content: flex-end;
  margin: 0 0 20px 0;
`;

const Item = styled.div`
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  padding: 30px;
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  font-family: "Courier New";
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }

  h4 {
    color: #9f67ad;
  }
`;
