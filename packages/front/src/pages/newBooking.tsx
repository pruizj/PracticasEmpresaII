import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { ERROR } from "../../../api/src/errors";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import LayoutPage from "../components/LayoutPage";
import router from "next/router";
import {
  useCinemaQuery,
  useCreateBookingMutation,
  useMovieQuery
} from "../generated/graphql";

const NewBooking = ({ cinema, day, time, room, movie }) => {
  const [cinemaId, seCinemaId] = useState(cinema);
  const [movieId, setMovieId] = useState(movie);
  const [daySchedule, setDaySchedule] = useState(day);
  const [timeSchedule, setTimeSchedule] = useState(time);
  const [roomSchedule, setRoomSchedule] = useState(room);
  const [seats, setSeats] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [price, setPrice] = useState(parseFloat("8.5"));

  const [createBooking] = useCreateBookingMutation();
  const [errorFull, setErrorFull] = useState<boolean>(false);
  const [errorInvalidNumber, setErrorInvalidNumber] = useState<boolean>(false);

  const {
    data: movieData,
    loading: movieLoading,
    refetch: refetch1
  } = useMovieQuery({
    variables: { movieId: movieId }
  });
  const movieQuery = movieData?.movie;

  const {
    data: cinemaData,
    loading: cinemaLoading,
    refetch
  } = useCinemaQuery({
    variables: { cinemaId: cinemaId }
  });
  const cinemaQuery = cinemaData?.cinema;

  useEffect(() => {
    setPrice(seats * parseFloat("8.5"));
  }, [seats]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createBooking({
        variables: {
          cinema: cinemaId,
          schedule: {
            day: daySchedule,
            time: timeSchedule,
            room: parseInt(roomSchedule),
            movie: movieId
          },
          seats: seats,
          cardNumber: cardNumber,
          expiryDate: expiryDate,
          securityCode: cvv
        }
      });
      router.push(
        `/summaryBooking?seats=${seats}&price=${price}&cinema=${cinemaId}&day=${daySchedule}&time=${timeSchedule}&room=${roomSchedule}&movie=${movieId}`
      );
    } catch (err) {
      if (err.message === ERROR.BOOKING_FULL.message) {
        setErrorFull(true);
      } else if (err.message === ERROR.CARD_NUMBER_INVALID.message) {
        setErrorInvalidNumber(true);
      }
    }
  };

  const onCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/webCinema?id=${cinema}`);
  };

  return (
    <LayoutPage>
      <Form onSubmit={handleSubmit}>
        <Title1>
          <h1>Compra de entradas</h1>
        </Title1>
        <Content>
          <p>Elige el número de entradas</p>
          <LocalInput
            type="text"
            value={seats}
            onChange={event => {
              const value = parseFloat(event.target.value);
              setSeats(isNaN(value) ? 0 : value);
            }}
            required
          />
          <p>Precio (por persona 8.5€): {price}€</p>
          <Item>
            <Title>
              <h3>Método de pago</h3>
            </Title>
            <p>Introduce el número de tu tarjeta</p>
            <LocalInput
              type="text"
              value={cardNumber}
              onChange={event => {
                setCardNumber(event.target.value);
              }}
              required
            />
            <p>Fecha de caducidad</p>
            <LocalInput
              type="date"
              value={expiryDate}
              onChange={event => {
                setExpiryDate(event.target.value);
              }}
              required
            />
            <p>Código de seguridad</p>
            <LocalInput
              type="text"
              value={cvv}
              onChange={event => {
                setCvv(event.target.value);
              }}
              required
            />
            {errorFull && (
              <ErrorAlert type="error" onClose={() => setErrorFull(false)}>
                {"Esta sala ya está llena"}
              </ErrorAlert>
            )}
            {errorInvalidNumber && (
              <ErrorAlert
                type="error"
                onClose={() => setErrorInvalidNumber(false)}
              >
                {"La tarjeta no es válida"}
              </ErrorAlert>
            )}
          </Item>
        </Content>
        <BottomIndex>
          <LocalButton type="button" onClick={onCancelClick}>
            Cancelar
          </LocalButton>
          <LocalButton
            type="submit"
            disabled={!(seats && cardNumber && expiryDate && cvv)}
          >
            Comprar Entrada
          </LocalButton>
        </BottomIndex>
      </Form>
    </LayoutPage>
  );
};

NewBooking.getInitialProps = async ({ query }) => {
  return {
    cinema: query.cinema,
    day: query.day,
    time: query.time,
    room: query.room,
    movie: query.movie
  };
};

export default NewBooking;

const Title1 = styled.div`
  font-weight: bold;
  color: #9f67ad;
  font-family: "Courier New";
  margin: 0px;
`;

const ErrorAlert = styled(Alert)`
  font-size: 14px;
  margin: 0 21px 0;
`;

const Form = styled.form`
  display: flex;
  color: #000000;
  width: 100%;
  font-family: "Courier New";
  flex-direction: column;
  align-items: center;
  margin: 40px 50px 60px 150px;
  background-color: #ffffff;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const LocalInput = styled(Input)`
  margin-top: 10px;
  margin-left: 40px;
  padding: 10px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
`;

const LocalButton = styled(Button)`
  width: 20%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 660px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  padding: 20px;

  p {
    font-size: 18px;
    margin-bottom: 10px;
    margin-left: 40px;
    font-family: "Courier New";
  }
`;

const Title = styled.p`
  font-weight: bold;
  color: #9f67ad;
  font-family: "Courier New";
  margin-right: 5px;
`;

const BottomIndex = styled.div`
  width: 48%;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  padding: 20px;
`;

const Item = styled.div`
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  padding: 20px;

  p {
    font-size: 18px;
    margin-bottom: 10px;
    font-family: "Courier New";
  }
`;
