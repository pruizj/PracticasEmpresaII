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
      <MovieIndex />
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
                <p>{movie.image}</p>
                <p>{movie.title}</p>
                <p>{new Date(movie.release).toLocaleDateString("es-ES")}</p>
                <p>{movie.rating}</p>
              </MovieContent>
              <Buttons>
                <img
                  onClick={e => {
                    e.preventDefault();
                    onDeleteClick(e, movie);
                    window.location.reload();
                  }}
                  className="trash"
                  src="/images/close.svg"
                ></img>
              </Buttons>
            </MovieContainer>
          </a>
        ))}
    </Container>
  );
};

export default MovieList;

const Container = styled.div`
  /* background-color: "gray"; */
  border-radius: 6px;
  margin: 20px 50px;

  > a {
    text-decoration: none;
    color: "black";
  }
`;

const MovieContainer = styled.div`
  height: 64px;
  display: flex;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  background-color: #ffffff;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  padding-right: 20px;
  overflow: hidden;
`;

const MovieContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 85%;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-top: 30px;
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
    margin: 0 -10px 0 20px;
  }
`;

export const EmptyResults = styled.div`
  color: #2f0139;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  height: 100px;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
`;
