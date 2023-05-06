import React, { useEffect, useState } from "react";
import { Days, ScheduleIn, useMoviesQuery } from "../generated/graphql";
import Input from "./Input";
import Button from "./Button";
import styled from "@emotion/styled";
import Alert from "./Alert";
import { FormData } from "../pages/editCinema";
import LocalSelect from "../components/LocalSelect";
import { useForm } from "react-hook-form";
import Loading from "./Loading";

interface CinemaFormProps {
  error: boolean;
  initialValues: {
    name: string | undefined;
    address: string | undefined;
    rooms: number | undefined;
    capacity: number | undefined;
    schedule: ScheduleIn[] | undefined;
  };
  onCancel: () => void;
  onSubmit: (values: FormData) => Promise<void>;
}

const CinemaForm: React.FC<CinemaFormProps> = ({
  error,
  initialValues,
  onCancel,
  onSubmit
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm<FormData>({
    defaultValues: initialValues
  });

  const [schedule, setSchedule] = useState<ScheduleIn[]>(
    initialValues.schedule || []
  );
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [selectedDay, setSelectedDay] = useState<Days>(Days.Monday);

  const {
    data: moviesData,
    loading: moviesLoading,
    refetch
  } = useMoviesQuery();
  const movies = moviesData?.movies || [];

  const onCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCancel();
  };

  const onAddSchedule = (e: React.MouseEvent, item: ScheduleIn) => {
    e.preventDefault();
    if (schedule.find(schedule => schedule === item)) {
      return;
    }
    setSchedule([...schedule, item]);
    setValue("schedule", [...schedule, item]);
  };

  const onDeleteSchedule = (e: React.MouseEvent, item: ScheduleIn) => {
    e.preventDefault();
    const newSchedule = schedule.filter(schedule => schedule !== item);
    setSchedule(newSchedule);
    setValue("schedule", newSchedule);
  };

  useEffect(() => {
    register("schedule");
  }, []);

  return (
    <Form>
      <Content>
        <Label htmlFor="name">Nombre</Label>
        <LocalInput
          id="name"
          name="name"
          type="text"
          {...register("name", { required: true })}
        />
        <Label htmlFor="address">Dirección</Label>
        <LocalInput
          id="address"
          name="address"
          type="text"
          {...register("address", { required: true })}
        />
        <Label htmlFor="rooms">Salas</Label>
        <LocalInput
          id="rooms"
          name="rooms"
          type="number"
          min={0}
          {...register("rooms", { required: true })}
        />
        <Label htmlFor="capacity">Capacidad</Label>
        <LocalInput
          id="capacity"
          name="capacity"
          type="number"
          min={0}
          {...register("capacity", { required: true })}
        />
        <Label htmlFor="schedule">Horarios</Label>
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
              max={initialValues.rooms}
              onChange={event => {
                setSelectedRoom(Number(event.target.value));
              }}
            />
          </Room>
          <Movie>
            <Label>Película</Label>
            <LocalSelect
              value={selectedMovie}
              options={
                moviesLoading
                  ? [{ label: "Cargando...", value: "" }]
                  : movies
                      .filter(movie => new Date(movie.release) <= new Date())
                      .map(movie => ({
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
            onClick={e => {
              onAddSchedule(e, {
                day: selectedDay,
                time: selectedTime,
                movie: selectedMovie,
                room: selectedRoom
              });
            }}
          >
            Añadir
          </LocalButton1>
        </Schedule>
        {moviesLoading ? (
          <Loading />
        ) : (
          schedule.map(item => (
            <Movies key={item.day + item.time + item.movie}>
              <Item>
                <p>{item.day}</p>
                <p>{item.time}</p>
                <p>{item.room}</p>
                <p>{movies.find(movie => movie.id === item.movie)?.title}</p>
                <Buttons>
                  <img
                    onClick={e => {
                      e.preventDefault();
                      onDeleteSchedule(e, item);
                    }}
                    className="trash"
                    src="/images/close.svg"
                  ></img>
                </Buttons>
              </Item>
            </Movies>
          ))
        )}
      </Content>
      {error && <ErrorAlert type="error">{"Este cine ya existe"}</ErrorAlert>}
      <BottomIndex>
        <LocalButton type="button" onClick={onCancelClick}>
          Cancelar
        </LocalButton>
        <LocalButton
          type="submit"
          disabled={moviesLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Guardar
        </LocalButton>
      </BottomIndex>
    </Form>
  );
};

export default CinemaForm;

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
  margin-right: 10px;
`;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
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
  width: 90%;
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
