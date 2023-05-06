import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import LayoutPage from "../components/LayoutPage";
import router from "next/router";
import { Days, ScheduleIn, useCinemaQuery } from "../generated/graphql";
import Loading from "../components/Loading";
import { EmptyResults } from "../components/CinemaList";
import Button from "../components/Button";
import Link from "next/link";

export interface FormData {
  name: string;
  address: string;
  rooms: number;
  capacity: number;
  schedule: ScheduleIn[];
}

const WebCinema = ({ id }) => {
  const { data, loading, error } = useCinemaQuery({
    variables: { cinemaId: id }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <LayoutPage>
      {data && (
        <Container>
          <Cinema>
            <h2>{data.cinema.name.toUpperCase()}</h2>
          </Cinema>
          <Schedule>
            {data.cinema.schedule.length === 0 ? (
              <EmptyResults>
                <img src="/images/close.svg" />
                <p>No hay resultados</p>
              </EmptyResults>
            ) : (
              data.cinema.schedule
                .filter(
                  (item, index, self) =>
                    index === self.findIndex(t => t.movie.id === item.movie.id)
                )
                .map(item => (
                  <a key={item.movie.id}>
                    <Content>
                      <Image>
                        <img
                          src={item.movie.image}
                          alt="movie"
                          style={{ paddingBottom: "20px" }}
                        />
                        <ImageLink
                          href={`https://www.youtube.com/watch?v=${item.movie.trailer}`}
                          passHref={true}
                          legacyBehavior={true}
                        >
                          <a target="_blank">
                            <Button style={{ width: "100%" }}>
                              Ver trailer
                            </Button>
                          </a>
                        </ImageLink>
                      </Image>
                      <Info>
                        <Item>
                          <h2>{item.movie.title.toUpperCase()}</h2>
                          <p>{item.movie.synopsis}</p>
                          <Item1>
                            <Item2>
                              <Title>DURACIÓN: </Title>
                              <p>{item.movie.duration} min</p>{" "}
                            </Item2>
                            <Item2>
                              <Title>GÉNERO: </Title>
                              <p>{item.movie.gender}</p>
                            </Item2>
                          </Item1>
                        </Item>
                        <Title1>HORARIO:</Title1>
                        <Horario>
                          {data.cinema.schedule.map(item1 =>
                            item1.movie.title === item.movie.title ? (
                              <a key={item.movie.id}>
                                <ItemHorario
                                  onClick={() => {
                                    router.push(
                                      `/newBooking?cinema=${data.cinema.id}&day=${item1.day}&time=${item1.time}&room=${item1.room}&movie=${item1.movie.id}`
                                    );
                                  }}
                                >
                                  <p>
                                    {item1.day === Days.Monday
                                      ? "Lunes"
                                      : item1.day === Days.Tuesday
                                      ? "Martes"
                                      : item1.day === Days.Wednesday
                                      ? "Miércoles"
                                      : item1.day === Days.Thursday
                                      ? "Jueves"
                                      : item1.day === Days.Friday
                                      ? "Viernes"
                                      : item1.day === Days.Saturday
                                      ? "Sábado"
                                      : "Domingo"}
                                  </p>
                                  <p>{item1.time}</p>
                                  <p>Sala: {item1.room}</p>
                                </ItemHorario>
                              </a>
                            ) : null
                          )}
                        </Horario>
                      </Info>
                    </Content>
                  </a>
                ))
            )}
          </Schedule>
        </Container>
      )}
    </LayoutPage>
  );
};

WebCinema.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default WebCinema;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
  width: 100%;
`;

const Cinema = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    font-size: 28px;
    color: #9f67ad;
    font-family: "Courier New";
  }

  p {
    font-size: 16px;
    margin-bottom: 5px;
    font-family: "Courier New";
  }
`;

const Schedule = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  width: 100%;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 65px;
  width: 30%;
  height: 450px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-right: 20px;
  align-items: start;

  p {
    font-size: 16px;
    font-family: "Courier New";
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 20px;
  p {
    margin-top: 10px;
    font-family: "Courier New";
    text-align: justify;
    line-height: 1.5;
  }
  h2 {
    font-family: "Courier New";
    color: #9f67ad;
  }
`;

const Horario = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }
  width: 95%;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 20px;
  p {
    margin-top: 10px;
    font-family: "Courier New";
    text-align: justify;
  }
`;

const Item2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Item1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  width: 100%;
  p {
    margin-top: 10px;
    font-family: "Courier New";
  }
`;

const Title = styled.p`
  font-weight: bold;
  color: #9f67ad;
  font-family: "Courier New";
  margin-right: 5px;
`;

const Title1 = styled.p`
  font-weight: bold;
  color: #9f67ad;
  font-family: "Courier New";
  margin-right: 5px;
  margin-left: 20px;
`;

const ItemHorario = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(159, 103, 173, 1);
  border-radius: 0px 0px 20px 0px;
  border: 1px solid #9f67ad;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;

  p {
    font-family: "Courier New";
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  text-align: center;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(159, 103, 173, 1);
  margin-bottom: 20px;
`;

const ImageLink = styled(Link)`
  width: 100%;
`;
