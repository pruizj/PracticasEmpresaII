import styled from "@emotion/styled";
import React, { FC } from "react";
import { MovieData } from "../generated/graphql";
import router from "next/router";
export interface MovieListProps {
  movies: MovieData[];
}

const MovieListWeb: FC<MovieListProps> = ({ movies = [] }) => {
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
                router.push(`/webMovie?id=${movie.id}`);
              }}
            >
              <MovieContent>
                <h2>{movie.title.toUpperCase()}</h2>
                <Image1 src={movie.image} alt="movie" />
                <p>
                  {movie.rating === 1 ? (
                    <Image className="rating" src="/images/star.jpg" />
                  ) : movie.rating === 2 ? (
                    <Rating>
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                    </Rating>
                  ) : movie.rating === 3 ? (
                    <Rating>
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                    </Rating>
                  ) : movie.rating === 4 ? (
                    <Rating>
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                    </Rating>
                  ) : movie.rating === 5 ? (
                    <Rating>
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                      <Image className="rating" src="/images/star.jpg" />
                    </Rating>
                  ) : (
                    <div></div>
                  )}
                </p>
              </MovieContent>
            </MovieContainer>
          </a>
        ))}
    </Container>
  );
};

export default MovieListWeb;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  margin: 20px 40px;
  justify-content: center;
  > a {
    text-decoration: none;
    color: "black";
  }
`;

const Image1 = styled.img`
  width: 189px;
  height: 267px;
  padding-right: 30px;
  padding-left: 30px;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const MovieContainer = styled.div`
  height: 550px;
  width: 350px;
  display: flex;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(159, 103, 173, 1);
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
  flex-direction: column;
  align-items: center;
  margin: 50px;
  p {
    margin-top: 10px;
    font-family: "Courier New";
  }
  h2 {
    font-family: "Courier New";
    color: #9f67ad;
  }
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
