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
import UserIndex from "./UserIndex";
import BookingList from "./BookingList";

const Bookings: FC = () => {
  const { loading, data, refetch } = useBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Loading />;

  return (
    <Content>
      <BookingList
        bookings={data.bookings}
        onDelete={async booking => {
          deleteBooking({
            variables: { deleteBookingId: booking.id }
          });
        }}
        optionalUser={true}
      />
    </Content>
  );
};

export default Bookings;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 80%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
  margin-left: 30px;
  p {
    margin-left: 30px;
    width: 20%;
    height: 10%;
    font-family: "Courier New";
  }
`;

const UserButton = styled(Button)`
  width: 10%;
  height: 10%;
  margin-top: 10px;
  margin-right: 100px;
  margin-bottom: 10px;
`;
