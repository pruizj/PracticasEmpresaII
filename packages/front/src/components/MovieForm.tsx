import React, { useEffect, useRef, useState } from "react";
import { Days, ScheduleIn, useMoviesQuery } from "../generated/graphql";
import Input from "./Input";
import Button from "./Button";
import styled from "@emotion/styled";
import Alert from "./Alert";
import { FormData } from "../pages/editMovie";
import LocalSelect from "../components/LocalSelect";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import TextArea from "./TextArea";

interface MovieFormProps {
  error: boolean;
  initialValues: {
    title: string | undefined;
    synopsis: string | undefined;
    gender: string | undefined;
    duration: number | undefined;
    director: string | undefined;
    cast: string[] | undefined;
    release: Date | undefined;
    rating: number | undefined;
    image: string | undefined;
    trailer: string | undefined;
  };
  onCancel: () => void;
  onSubmit: (values: FormData) => Promise<void>;
}

const MovieForm: React.FC<MovieFormProps> = ({
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

  const [inputCast, setInputCast] = useState("");
  const [cast, setCast] = useState<string[]>(initialValues.cast || []);

  const onCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCancel();
  };

  const onAddCast = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    if (
      cast.find(cast => cast.toLocaleLowerCase() === item.toLocaleLowerCase())
    ) {
      return;
    }
    setCast([...cast, item]);
    setValue("cast", [...cast, item]);
  };

  const onDeleteCast = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    const newCast = cast.filter(cast => cast !== item);
    setCast(newCast);
    setValue("cast", newCast);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result?.toString();
        setValue("image", base64Image);
      };
    }
  };

  useEffect(() => {
    register("cast");
    register("image");
  }, []);

  return (
    <Form>
      <Content>
        <Label htmlFor="title">Título</Label>
        <LocalInput
          id="title"
          name="title"
          type="text"
          {...register("title", { required: true })}
        />
        <Label htmlFor="image">Imagen</Label>
        <LocalInput
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Label htmlFor="trailer">Trailer</Label>
        <LocalInput
          id="trailer"
          name="trailer"
          type="text"
          {...register("trailer", { required: true })}
        />
        <Label htmlFor="synopsis">Sinopsis</Label>
        <LocalInput
          id="synopsis"
          name="synopsis"
          type="text"
          {...register("synopsis", { required: true })}
        />
        <Label htmlFor="gender">Género</Label>
        <LocalInput
          id="gender"
          name="gender"
          type="text"
          {...register("gender", { required: true })}
        />
        <Label htmlFor="duration">Duración</Label>
        <LocalInput
          id="duration"
          name="duration"
          type="number"
          min={0}
          {...register("duration", { required: true })}
        />
        <Label htmlFor="director">Director</Label>
        <LocalInput
          id="director"
          name="director"
          type="text"
          {...register("director", { required: true })}
        />
        <Label htmlFor="cast">Reparto</Label>
        <Cast>
          <LocalInput1
            type="text"
            value={inputCast}
            onChange={event => {
              setInputCast(event.target.value);
            }}
            required
          />
          <LocalButton1
            type="button"
            onClick={e => {
              onAddCast(e, inputCast);
            }}
            disabled={!inputCast}
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
                      onDeleteCast(e, item);
                    }}
                    className="trash"
                    src="/images/close.svg"
                  ></img>
                </Buttons>
              </Item>
            </Casts>
          ))}
        <Label htmlFor="release">Fecha de estreno</Label>
        <LocalInput
          id="release"
          name="release"
          type="date"
          {...register("release", { required: true })}
        />
        <Label htmlFor="rating">Rating</Label>
        <LocalInput
          id="rating"
          name="rating"
          type="number"
          min={1}
          max={5}
          {...register("rating", { required: true })}
        />
      </Content>
      {error && (
        <ErrorAlert type="error">{"Esta pelicula ya existe"}</ErrorAlert>
      )}
      <BottomIndex>
        <LocalButton type="button" onClick={onCancelClick}>
          Cancelar
        </LocalButton>
        <LocalButton type="submit" onClick={handleSubmit(onSubmit)}>
          Guardar
        </LocalButton>
      </BottomIndex>
    </Form>
  );
};

export default MovieForm;

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
  width: 88%;
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
