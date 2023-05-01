import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import { ERROR } from "../../../api/src/errors";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import LayoutPage from "../components/LayoutPage";
import LocalSelect from "../components/LocalSelect";
import router from "next/router";
import { useMovieQuery, useUpdateMovieMutation } from "../generated/graphql";
import Loading from "../components/Loading";
import CinemaForm from "../components/CinemaForm";
import MovieForm from "../components/MovieForm";

export interface FormData {
  title: string;
  synopsis: string;
  gender: string;
  duration: number;
  director: string;
  cast: string[];
  release: Date;
  rating: number;
  image: string;
  trailer: string;
}

const EditMovie = ({ id }) => {
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [updateMovie] = useUpdateMovieMutation();

  const onSubmit = async (formData: FormData) => {
    setErrorAlert(false);
    setLoadingSave(true);
    const input: FormData = {
      title: formData.title,
      synopsis: formData.synopsis,
      gender: formData.gender,
      duration: parseInt(`${formData.duration}`),
      director: formData.director,
      cast: formData.cast,
      release: new Date(formData.release),
      rating: parseInt(`${formData.rating}`),
      image: formData.image,
      trailer: formData.trailer
    };

    const { errors } = await updateMovie({
      variables: { updateMovieId: id, input }
    });

    if (!errors) {
      router.push("/adminDashboard");
    } else {
      setErrorAlert(true);
      setLoadingSave(false);
    }
  };

  const { data, loading, error } = useMovieQuery({
    variables: { movieId: id }
  });

  if (loading) {
    return <Loading />;
  }
  const initialValues = {
    title: data.movie.title || "",
    synopsis: data.movie.synopsis || "",
    gender: data.movie.gender || "",
    duration: data.movie.duration || (0 as number),
    director: data.movie.director || "",
    cast: data.movie.cast || [],
    release: data.movie.release || (new Date() as Date),
    rating: data.movie.rating || (0 as number),
    image: data.movie.image || "",
    trailer: data.movie.trailer || ""
  };

  const onCancel = () => {
    router.push("/adminDashboard");
  };

  return (
    <LayoutPage>
      {loadingSave ? (
        <Loading />
      ) : (
        <>
          {data && (
            <MovieForm
              error={errorAlert}
              onSubmit={onSubmit}
              onCancel={onCancel}
              initialValues={initialValues}
            />
          )}
        </>
      )}
    </LayoutPage>
  );
};

EditMovie.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

EditMovie.requiresDeveloperLogin = true;

export default EditMovie;
