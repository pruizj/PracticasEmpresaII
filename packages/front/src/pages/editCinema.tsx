import React, { useState } from "react";
import LayoutPage from "../components/LayoutPage";
import router from "next/router";
import {
  ScheduleIn,
  useCinemaQuery,
  useUpdateCinemaMutation
} from "../generated/graphql";
import Loading from "../components/Loading";
import CinemaForm from "../components/CinemaForm";

export interface FormData {
  name: string;
  address: string;
  rooms: number;
  capacity: number;
  schedule: ScheduleIn[];
}

const EditCinema = ({ id }) => {
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [updateCinema] = useUpdateCinemaMutation();

  const onSubmit = async (formData: FormData) => {
    setErrorAlert(false);
    setLoadingSave(true);
    const input: FormData = {
      name: formData.name,
      address: formData.address,
      rooms: parseInt(`${formData.rooms}`),
      capacity: parseInt(`${formData.capacity}`),
      schedule: formData.schedule
    };

    const { errors } = await updateCinema({
      variables: { updateCinemaId: id, input }
    });

    if (!errors) {
      router.push("/adminDashboardCinemas");
    } else {
      setErrorAlert(true);
      setLoadingSave(false);
    }
  };

  const { data, loading, error } = useCinemaQuery({
    variables: { cinemaId: id }
  });

  if (loading) {
    return <Loading />;
  }
  const initialValues = {
    name: data?.cinema.name || "",
    address: data?.cinema.address || "",
    rooms: data?.cinema.rooms || (0 as number),
    capacity: data?.cinema.capacity || (0 as number),
    schedule:
      data?.cinema.schedule.map(item => ({
        movie: item.movie.id,
        day: item.day,
        time: item.time,
        room: item.room
      })) || []
  };

  const onCancel = () => {
    router.push(`/adminDashboardCinemas`);
  };

  return (
    <LayoutPage>
      {loadingSave ? (
        <Loading />
      ) : (
        <>
          {data && (
            <CinemaForm
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

EditCinema.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

EditCinema.requiresDeveloperLogin = true;

export default EditCinema;
