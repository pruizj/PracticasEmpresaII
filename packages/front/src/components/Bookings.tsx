import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import {
  Role,
  useBookingsQuery,
  useChangeRoleMutation,
  useDeleteBookingMutation,
  useMeQuery,
  useUsersQuery
} from "../generated/graphql";
import Button from "./Button";
import Loading from "./Loading";
import BookingList from "./BookingList";
import { EmptyResults } from "./MovieList";

const Bookings: FC = () => {
  const { loading, data, refetch } = useBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Loading />;

  return (
    <Content>
      <Index>
        <h4>CORREO</h4>
        <h4>CINE</h4>
        <h4>PELÍCULA</h4>
        <h4>ENTRADAS</h4>
        <h4>PRECIO</h4>
      </Index>
      {data.bookings.length === 0 && (
        <EmptyResults>
          <img src="/images/close.svg" />
          <p>No hay resultados</p>
        </EmptyResults>
      )}
      {data.bookings.length > 0 &&
        data.bookings.map(booking => {
          return (
            <Booking key={booking.id}>
              <Item>
                <P>{booking.user.email}</P>
                <P1>{booking.cinema.name}</P1>
                <P2>{booking.movie.title}</P2>
                <P3>{booking.seats}</P3>
                <P4>{booking.price}€</P4>
              </Item>
              <Buttons>
                <img
                  onClick={e => {
                    e.preventDefault();
                    deleteBooking({
                      variables: { deleteBookingId: booking.id }
                    });
                    window.location.reload();
                  }}
                  className="trash"
                  src="/images/close.svg"
                  style={{ cursor: "pointer" }}
                ></img>
              </Buttons>
            </Booking>
          );
        })}
    </Content>
  );
};

export default Bookings;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Index = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  padding: 50px 50px 0px 50px;
  font-family: "Courier New";
  h4 {
    color: purple;
    padding-left: 85px;
  }
`;

const Booking = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 50px 0px 50px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  padding: 20px 0px 20px 0px;
  font-family: "Courier New";

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const P = styled.p`
  padding-left: 50px;
`;

const P1 = styled.p`
  padding-left: 40px;
`;

const P2 = styled.p`
  padding-left: 100px;
`;

const P3 = styled.p`
  padding-left: 150px;
`;

const P4 = styled.p`
  padding-left: 130px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
`;
