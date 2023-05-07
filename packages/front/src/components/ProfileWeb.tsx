import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import {
  Days,
  Role,
  useChangeRoleMutation,
  useDeleteBookingMutation,
  useMeQuery,
  useUserBookingsQuery,
  useUsersQuery
} from "../generated/graphql";
import Button from "./Button";
import Loading from "./Loading";
import { EmptyResults } from "./MovieList";
import BookingList from "./BookingList";

const ProfileWeb: FC = () => {
  const { data, loading, refetch } = useMeQuery();
  const [deleteBooking] = useDeleteBookingMutation();
  const { loading: loadingBookings, data: bookings } = useUserBookingsQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <Content>
      <User>
        <Item1>
          <h4>NOMBRE</h4>
          <p>{data.me.name}</p>
        </Item1>
        <Item1>
          <h4>APELLIDO</h4>
          <p>{data.me.surname}</p>
        </Item1>
        <Item1>
          <h4>CORREO ELECTRÓNICO</h4>
          <p>{data.me.email}</p>
        </Item1>
      </User>
      <h4 style={{ color: "#9f67ad" }}>ENTRADAS</h4>
      <BookingList
        bookings={bookings?.userBookings}
        onDelete={async booking => {
          deleteBooking({
            variables: { deleteBookingId: booking.id }
          });
        }}
      />
    </Content>
  );
};

export default ProfileWeb;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  padding: 30px;
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
