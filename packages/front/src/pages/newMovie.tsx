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
  useCreateMovieMutation
} from "../generated/graphql";
import TextArea from "../components/TextArea";

const NewMovie: FC = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState(0);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState<string[]>([]);
  const [castInput, setCastInput] = useState("");
  const [release, setRelease] = useState(new Date());
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState("");
  const [trailer, setTrailer] = useState("");
  const [createMovie] = useCreateMovieMutation();
  const [errorExists, setErrorExists] = useState<boolean>(false);
  const [invalidTrailer, setInvalidTrailer] = useState<boolean>(false);

  const handleDeleteClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setCast(cast.filter(c => c !== item));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createMovie({
        variables: {
          input: {
            title,
            synopsis,
            gender,
            duration,
            director,
            cast,
            rating,
            release,
            image,
            trailer
          }
        }
      });
      router.push(`/adminDashboard`);
    } catch (err) {
      console.log(err);
      if (err.message === ERROR.MOVIE_ALREADY_EXISTS.message) {
        setErrorExists(true);
      } else if (err.message === ERROR.INVALID_VIDEO_ID.message) {
        setInvalidTrailer(true);
      }
    }
  };

  return (
    <LayoutPage>
      <Form onSubmit={handleSubmit}>
        <Content>
          <Label>Title</Label>
          <LocalInput
            type="text"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
            required
          />
          <Label>Image</Label>
          <Label>Trailer</Label>
          <LocalInput
            type="text"
            value={trailer}
            onChange={event => {
              setTrailer(event.target.value);
            }}
            required
          />
          {invalidTrailer && (
            <ErrorAlert type="error" onClose={() => setInvalidTrailer(false)}>
              {"El id del trailer no es válido"}
            </ErrorAlert>
          )}
          <Label>Sinopsis</Label>
          <LocalInput2
            type="text"
            value={synopsis}
            onChange={event => {
              setSynopsis(event.target.value);
            }}
            required
          />
          <Label>Género</Label>
          <LocalInput
            type="text"
            value={gender}
            onChange={event => {
              setGender(event.target.value);
            }}
            required
          />
          <Label>Duración</Label>
          <LocalInput
            type="number"
            value={duration}
            onChange={event => {
              setDuration(parseInt(event.target.value));
            }}
            required
          />
          <Label>Director</Label>
          <LocalInput
            type="text"
            value={director}
            onChange={event => {
              setDirector(event.target.value);
            }}
            required
          />
          <Label>Reparto</Label>
          <Cast>
            <LocalInput1
              type="text"
              value={castInput}
              onChange={event => {
                setCastInput(event.target.value);
              }}
              required
            />
            <LocalButton1
              type="button"
              onClick={() => {
                const exists = cast.some(
                  item =>
                    item.toLocaleLowerCase() === castInput.toLocaleLowerCase()
                );

                if (!exists) {
                  setCast([...cast, castInput]);
                }
              }}
              disabled={!castInput}
            >
              Añadir
            </LocalButton1>
          </Cast>
          {cast.length > 0 &&
            cast.map(item => (
              <Casts key={item}>
                <Item>
                  <p>Actor/Actriz:</p>
                  <p>{item}</p>
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
              </Casts>
            ))}
          <Label>Fecha de estreno</Label>
          <LocalInput
            type="date"
            value={release.toISOString().split("T")[0]}
            onChange={event => {
              setRelease(new Date(event.target.value));
            }}
            required
          />
          <Label>Valoración</Label>
          <LocalInput
            type="number"
            value={rating}
            min={1}
            max={5}
            onChange={event => {
              setRating(parseInt(event.target.value));
            }}
            required
          />
          {errorExists && (
            <ErrorAlert type="error" onClose={() => setErrorExists(false)}>
              {"Esta pelicula ya existe"}
            </ErrorAlert>
          )}
        </Content>
        <BottomIndex>
          <LocalButton
            type="submit"
            disabled={
              !(
                title &&
                synopsis &&
                gender &&
                duration &&
                director &&
                cast &&
                release &&
                rating
              )
            }
          >
            Añadir
          </LocalButton>
        </BottomIndex>
      </Form>
    </LayoutPage>
  );
};

export default NewMovie;

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

const LocalInput2 = styled(TextArea as any)`
  height: 80px;
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
  margin-top: 50px;
`;

const Cast = styled.div`
  display: flex;
  flex-direction: row;
  width: 93%;
  background-color: #ffffff;
  justify-content: space-around;
`;

const LocalInput1 = styled(Input)`
  height: 25px;
  margin-top: 10px;
`;

const LocalButton1 = styled(Button)`
  width: 10%;
  height: 40px;
  margin-top: 10px;
`;

const BottomIndex = styled.div`
  width: 96%;
  display: flex;
  justify-content: flex-end;
  margin: 0 0 60px 0px;
`;

const Casts = styled.div`
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
    margin-top: 20px;
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
