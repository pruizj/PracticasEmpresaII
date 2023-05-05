import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import { ERROR } from "../../../api/src/errors";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import LayoutPage from "../components/LayoutPage";
import LocalSelect from "../components/LocalSelect";
import router from "next/router";
import {
  Days,
  Movie,
  Schedule,
  useCreateCinemaMutation,
  useMoviesQuery
} from "../generated/graphql";

const NewCinema: FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rooms, setRooms] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [schedule, setSchedule] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [selectedDay, setSelectedDay] = useState<Days>(Days.Monday);
  const [createCinema] = useCreateCinemaMutation();
  const [errorExists, setErrorExists] = useState<boolean>(false);

  const {
    data: moviesData,
    loading: moviesLoading,
    refetch
  } = useMoviesQuery();
  const movies = moviesData?.movies || [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createCinema({
        variables: {
          input: {
            name,
            address,
            rooms,
            capacity,
            schedule
          }
        }
      });
    } catch (err) {
      if (err.message === ERROR.CINEMA_ALREADY_EXISTS.message) {
        setErrorExists(true);
      }
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, item: Schedule) => {
    e.preventDefault();
    setSchedule(schedule.filter(i => i !== item));
  };

  return (
    <LayoutPage>
      <Form onSubmit={handleSubmit}>
        <Content>
          <Label>Nombre</Label>
          <LocalInput
            type="text"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            required
          />
          <Label>Dirección</Label>
          <LocalInput
            type="text"
            value={address}
            onChange={event => {
              setAddress(event.target.value);
            }}
            required
          />
          <Label>Salas</Label>
          <LocalInput
            type="number"
            value={rooms}
            min={0}
            onChange={event => {
              setRooms(Number(event.target.value));
            }}
            required
          />
          <Label>Capacidad</Label>
          <LocalInput
            type="number"
            value={capacity}
            min={0}
            onChange={event => {
              setCapacity(Number(event.target.value));
            }}
            required
          />
          <Label>Horarios</Label>
          <Schedule>
            <Day>
              <Label>Día</Label>
              <LocalSelect
                value={selectedDay}
                options={[
                  { label: "Lunes", value: Days.Monday },
                  { label: "Martes", value: Days.Tuesday },
                  { label: "Miércoles", value: Days.Wednesday },
                  { label: "Jueves", value: Days.Thursday },
                  { label: "Viernes", value: Days.Friday },
                  { label: "Sábado", value: Days.Saturday },
                  { label: "Domingo", value: Days.Sunday }
                ]}
                onChange={e => {
                  setSelectedDay(e as Days);
                }}
              />
            </Day>
            <Time>
              <Label>Hora</Label>
              <LocalInput1
                type="time"
                value={selectedTime}
                onChange={event => {
                  setSelectedTime(event.target.value);
                }}
                required
              />
            </Time>
            <Room>
              <Label>Sala</Label>
              <LocalInput1
                type="number"
                value={selectedRoom}
                min={1}
                max={rooms}
                onChange={event => {
                  setSelectedRoom(Number(event.target.value));
                }}
                required
              />
            </Room>
            <Movie>
              <Label>Película</Label>
              <LocalSelect
                value={selectedMovie}
                options={
                  moviesLoading
                    ? [{ label: "Cargando...", value: "" }]
                    : movies.map(movie => ({
                        label: movie.title,
                        value: movie.id
                      })) || []
                }
                onChange={e => {
                  setSelectedMovie(e);
                }}
              />
            </Movie>
            <LocalButton1
              type="button"
              onClick={() => {
                const exists = schedule.some(
                  item =>
                    item.day === selectedDay &&
                    item.time === selectedTime &&
                    item.movie === selectedMovie &&
                    item.room === selectedRoom
                );

                if (!exists) {
                  setSchedule([
                    ...schedule,
                    {
                      day: selectedDay,
                      time: selectedTime,
                      room: selectedRoom,
                      movie: selectedMovie
                    }
                  ]);
                }
              }}
              disabled={
                !selectedDay && !selectedTime && !selectedMovie && !selectedRoom
              }
            >
              Añadir
            </LocalButton1>
          </Schedule>
          {schedule.length > 0 &&
            schedule.map(item => (
              <Movies key={`${item.day}-${item.time}-${item.room}`}>
                <Item>
                  <p>{item.day}</p>
                  <p>{item.time}</p>
                  <p>{item.room}</p>
                  <p>{movies.find(movie => movie.id === item.movie)?.title}</p>
                  <Buttons>
                    <img
                      onClick={e => {
                        e.preventDefault();
                        handleDeleteClick(e, item);
                      }}
                      className="trash"
                      src="/images/close.svg"
                    ></img>
                  </Buttons>
                </Item>
              </Movies>
            ))}
        </Content>
        {errorExists && (
          <ErrorAlert type="error" onClose={() => setErrorExists(false)}>
            {"Este cine ya existe"}
          </ErrorAlert>
        )}
        <BottomIndex>
          <LocalButton
            type="submit"
            disabled={
              !(name && address && rooms && capacity && schedule.length > 0)
            }
            onClick={() => {
              router.push(`/adminDashboard`);
            }}
          >
            Añadir
          </LocalButton>
        </BottomIndex>
      </Form>
    </LayoutPage>
  );
};

export default NewCinema;

const Label = styled.label`
  font-size: 14px;
  font-family: "Courier New";
  margin: 0 40px 8px;
  align-self: flex-start;
  color: #2f0139;
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
  align-items: start;
  margin: 40px 50px 60px 150px;
  background-color: #ffffff;
  border-radius: 10px;
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const LocalInput = styled(Input)`
  width: 93%;
`;

const LocalButton = styled(Button)`
  width: 15%;
  margin: 0 0 0 80%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98%;
  margin-top: 80px;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: row;
  width: 93%;
  padding: 25px 25px 25px 0px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  margin: 10px 0px 20px 0px;
  justify-content: space-around;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const LocalInput1 = styled(Input)`
  margin: 0 40px 8px;
`;

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const LocalButton1 = styled(Button)`
  width: 15%;
  height: 40px;
  margin-top: 20px;
`;

const BottomIndex = styled.div`
  width: 96%;
  display: flex;
  justify-content: flex-end;
  margin: 0 0 20px 0;
`;

const Movies = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  width: 100%;
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
    margin: 10px 10px 10px 10px;
  }
`;
