import styled from "@emotion/styled";
import React, { FC } from "react";
import { Booking, CinemaData, Days } from "../generated/graphql";
import CinemaIndex from "./CinemaIndex";
import router from "next/router";
import { EmptyResults } from "./CinemaList";

export interface BookingListProps {
  bookings: any[];
  onDelete?: (booking: Booking) => any;
}

const BookingList: FC<BookingListProps> = ({ bookings = [], onDelete }) => {
  const onDeleteClick = (e: React.MouseEvent, booking: Booking) => {
    e.stopPropagation();
    onDelete!(booking);
  };

  return (
    <Container>
      {bookings.length === 0 && (
        <EmptyResults>
          <img src="/images/close.svg" />
          <p>No hay resultados</p>
        </EmptyResults>
      )}
      {bookings.length !== 0 &&
        bookings.map(booking => (
          <Booking key={booking.id}>
            <Item>
              <Image1 src={booking.movie.image}></Image1>
              <ItemContent>
                <Item1>
                  <h4>Cine:</h4>
                  <p>{booking.cinema.name}</p>
                </Item1>
                <Item1>
                  <h4>Dirección:</h4>
                  <p>{booking.cinema.address}</p>
                </Item1>
                <Item1>
                  <h4>Película:</h4>
                  <p>{booking.movie.title}</p>
                </Item1>
                <Item1>
                  <h4>Duración:</h4>
                  <p>{booking.movie.duration} min</p>
                </Item1>
                <Item1>
                  <h4>Sala:</h4>
                  <p>{booking.room}</p>
                </Item1>
                <Item1>
                  <h4>Entradas:</h4>
                  <p>{booking.seats}</p>
                </Item1>
                <Item1>
                  <h4>Precio:</h4>
                  <p>{booking.price} €</p>
                </Item1>
                <Item1>
                  <h4>Horario</h4>
                  <p>
                    {booking.day === Days.Monday
                      ? "Lunes"
                      : booking.day === Days.Tuesday
                      ? "Martes"
                      : booking.day === Days.Wednesday
                      ? "Miércoles"
                      : booking.day === Days.Thursday
                      ? "Jueves"
                      : booking.day === Days.Friday
                      ? "Viernes"
                      : booking.day === Days.Saturday
                      ? "Sábado"
                      : "Domingo"}{" "}
                    {booking.time}
                  </p>
                </Item1>
              </ItemContent>
            </Item>
            <Buttons>
              <TrashIcon
                onClick={e => {
                  e.preventDefault();
                  onDeleteClick(e, booking);
                  window.location.reload();
                }}
                className="trash"
                src="/images/close.svg"
              ></TrashIcon>
            </Buttons>
          </Booking>
        ))}
    </Container>
  );
};

const Container = styled.div<{ optionalUser?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  width: 93%;
  padding: 50px 0px 50px 90px;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 120px 30px 120px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  h3 {
    margin-left: 55px;
    color: purple;
  }
`;

const Item1 = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-family: "Courier New";

  h4 {
    color: #9f67ad;
    margin: 0;
  }
`;

const Booking = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const Item = styled.div<{ optionalUser?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }
`;

const ItemContent = styled.div<{ optionalUser?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 30px 30px 30px 0px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
`;

const TrashIcon = styled.img`
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

const Image1 = styled.img`
  width: 189px;
  height: 267px;
  padding: 45px 0px 30px 30px;
`;

export default BookingList;
