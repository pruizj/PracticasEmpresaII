import styled from "@emotion/styled";
import React, { useState } from "react";
import LayoutPage from "../components/LayoutPage";
import {
  useAddRatingToMovieMutation,
  useMovieQuery
} from "../generated/graphql";
import Loading from "../components/Loading";
import Button from "../components/Button";
import Input from "../components/Input";

export interface FormData {
  title: string;
  synopsis: string;
  gender: string;
  duration: number;
  director: string;
  cast: [string];
  release: Date;
  rating: number;
  image: string;
  trailer: string;
}

const WebMovie = ({ id }) => {
  const { data, loading, error, refetch } = useMovieQuery({
    variables: { movieId: id }
  });

  const [addRatingToMovie] = useAddRatingToMovieMutation();

  const [rating, setRating] = useState(5);
  const [onClicked, setOnClicked] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <LayoutPage>
      {data && (
        <Container>
          <Content>
            <Image>
              <h3>IMAGE</h3>
              <p>
                {data.movie.rating === 1 ? (
                  <RatingImage className="rating" src="/images/star.jpg" />
                ) : data.movie.rating === 2 ? (
                  <Rating>
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                  </Rating>
                ) : data.movie.rating === 3 ? (
                  <Rating>
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                  </Rating>
                ) : data.movie.rating === 4 ? (
                  <Rating>
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                  </Rating>
                ) : data.movie.rating === 5 ? (
                  <Rating>
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                    <RatingImage className="rating" src="/images/star.jpg" />
                  </Rating>
                ) : (
                  <div></div>
                )}
              </p>
            </Image>
            <Info>
              <Item>
                <h2>{data.movie.title.toUpperCase()}</h2>
                <p>{data.movie.synopsis}</p>
                <Item1>
                  <Item2>
                    <Title>DURACIÓN: </Title>
                    <p>{data.movie.duration} min</p>{" "}
                  </Item2>
                  <Item2>
                    <Title>GÉNERO: </Title>
                    <p>{data.movie.gender}</p>
                  </Item2>
                </Item1>
                <Item1>
                  <Item2>
                    <Title>DIRECTOR: </Title>
                    <p>{data.movie.director}</p>
                  </Item2>
                  <Item2>
                    <Title>FECHA DE ESTRENO: </Title>
                    <p>
                      {new Date(data.movie.release).toLocaleDateString("es-ES")}
                    </p>
                  </Item2>
                </Item1>
                <Title>ACTORES:</Title>
                <Item2>
                  {data.movie.cast.length > 0 &&
                    data.movie.cast.map((actor, index) => (
                      <p key={index}>
                        {actor}
                        {index < data.movie.cast.length - 1 && <span>,</span>}
                      </p>
                    ))}
                </Item2>
              </Item>
              <Item2>
                <Video>
                  {data.movie.trailer !== "" ? (
                    <iframe
                      width="600"
                      height="315"
                      src={`https://www.youtube.com/embed/${data.movie.trailer}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p>Trailer no disponible</p>
                  )}
                </Video>
                <Item3>
                  <Title>Valoración:</Title>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={e => setRating(parseInt(e.target.value))}
                  />
                  <Button1
                    onClick={e => {
                      e.preventDefault();
                      setOnClicked(true);
                      addRatingToMovie({
                        variables: {
                          addRatingToMovieId: data.movie.id,
                          rating: rating
                        }
                      });
                    }}
                  >
                    Añadir
                  </Button1>
                </Item3>
              </Item2>
            </Info>
          </Content>
        </Container>
      )}
    </LayoutPage>
  );
};

WebMovie.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default WebMovie;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 50px;
  margin-top: 50px;
  width: 100%;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: row;
`;

const RatingImage = styled.img`
  width: 50px;
  height: 50px;
`;

const Button1 = styled(Button)`
  width: 100%;
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

  h3 {
    font-family: "Courier New";
    height: 350px;
  }
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
const Item3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
  box-shadow: 0 1px 2px 0 rgba(159, 103, 173, 1);
  height: 140px;
`;

const Video = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 20px 20px 30px 20px;
  p {
    font-family: "Courier New";
  }
`;

const Item2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  p {
    font-family: "Courier New";
    margin-right: 5px;
  }
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

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  text-align: center;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgba(159, 103, 173, 1);
  margin-bottom: 20px;
`;
