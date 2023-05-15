import styled from "@emotion/styled";
import router from "next/router";
import { FC, useEffect, useState } from "react";
import {
  GeneralOrderType,
  useDeleteMovieMutation,
  usePaginatedMoviesQuery
} from "../generated/graphql";
import Button from "./Button";
import Input from "./Input";
import Loading from "./Loading";
import LocalSelect from "./LocalSelect";
import Pagination from "./Pagination";
import MovieList from "./MovieList";

const Movies: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchTitleFinal, setSearchTitleFinal] = useState<string>("");
  const [order, setOrder] = useState<GeneralOrderType>(GeneralOrderType.NameAz);
  const [deleteMovie] = useDeleteMovieMutation();
  const { data, loading, error, refetch } = usePaginatedMoviesQuery({
    variables: {
      page,
      pageSize: 6,
      order,
      searchTitle: searchTitleFinal
    }
  });

  useEffect(() => {
    refetch();
  }, [refetch, page, order, searchTitle]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Content>
      <HeaderRow>
        <Button
          onClick={() => {
            router.push("/newMovie");
          }}
        >
          Añadir pelicula
        </Button>
      </HeaderRow>
      <FiltersDiv>
        <LocalSelect
          value={order}
          onChange={e => {
            setOrder(e);
            setPage(1);
          }}
          options={[
            { value: GeneralOrderType.NameAz, label: "A-Z" },
            { value: GeneralOrderType.NameZa, label: "Z-A" }
          ]}
        />
        <Filter>
          <Input
            placeholder={"Buscar por nombre"}
            value={searchTitle}
            onChange={e => {
              setSearchTitle(e.target.value);
              {
                e.target.value === "" && setSearchTitleFinal("");
              }
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                {
                  page > 1 && setPage(1);
                }
                setSearchTitleFinal(searchTitle);
              }
            }}
          />
          <button
            className="search"
            onClick={() => {
              setSearchTitleFinal(searchTitle);
            }}
          />
        </Filter>
      </FiltersDiv>
      <MovieList
        movies={data?.paginatedMovies?.data}
        onDelete={async movie => {
          deleteMovie({
            variables: { deleteMovieId: movie.id }
          });
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          {data && (
            <LocalPagination
              numberPages={data.paginatedMovies?.totalPages}
              currentPage={data.paginatedMovies?.page}
              changePage={(page: number) => {
                setPage(page);
              }}
              background={true}
            />
          )}
        </>
      )}
    </Content>
  );
};

export default Movies;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const HeaderRow = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid "#cccccc";
`;

const FiltersDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  margin: 0px 0px 20px 20px;
`;

const Filter = styled.div`
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    height: 27px;
    width: 27px;
    margin-top: 4px;
    position: absolute;
    right: 68px;
    background-image: url("/images/search.svg");
    background-size: 27px;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }

  input {
    padding-right: 47px;
    width: 87%;
  }
`;

const LocalPagination = styled(Pagination)`
  margin: 40px 50px 60px 50px;
`;
