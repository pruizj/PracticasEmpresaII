import styled from "@emotion/styled";
import React, { FC } from "react";
import { MovieData } from "../generated/graphql";
import router from "next/router";
import MovieIndex from "./MovieIndex";

export interface MovieListProps {
  movies: MovieData[];
  onDelete?: (movie: MovieData) => any;
}

const MovieList: FC<MovieListProps> = ({ movies = [], onDelete }) => {
  const onDeleteClick = (e: React.MouseEvent, movie: MovieData) => {
    e.stopPropagation();
    onDelete!(movie);
  };

  return (
    <Container>
      {movies.length === 0 && (
        <EmptyResults>
          <img src="/images/close.svg" />
          <p>No hay resultados</p>
        </EmptyResults>
      )}
      {movies.length !== 0 &&
        movies.map(movie => (
          <a key={movie.id}>
            <MovieContainer
              onClick={() => {
                router.push(`/editMovie?id=${movie.id}`);
              }}
            >
              <MovieContent>
                <Image src={movie.image} alt="movie" />
                <Info>
                  <Item1>
                    <h4>Película:</h4>
                    <p>{movie.title}</p>
                  </Item1>
                  <Item1>
                    <h4>Fecha de estreno:</h4>
                    <p>{new Date(movie.release).toLocaleDateString("es-ES")}</p>
                  </Item1>
                  <Item1>
                    <h4>Valoración:</h4>
                    <p>{movie.rating}</p>
                  </Item1>
                </Info>
              </MovieContent>
              <Buttons>
                <TrashIcon
                  onClick={e => {
                    e.preventDefault();
                    onDeleteClick(e, movie);
                    window.location.reload();
                  }}
                  className="trash"
                  src="/images/close.svg"
                ></TrashIcon>
              </Buttons>
            </MovieContainer>
          </a>
        ))}
    </Container>
  );
};

export default MovieList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 93%;
  padding: 50px;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }

  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Item1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: "Courier New";

  h4 {
    color: #9f67ad;
    margin: 0;
  }
`;

const MovieContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Image = styled.img`
  width: 189px;
  height: 267px;
  padding: 30px;
`;

const TrashIcon = styled.img`
  height: 50px;
  width: 50px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;
`;

export const EmptyResults = styled.div`
  color: #2f0139;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  height: 100px;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
`;
