import styled from "@emotion/styled";
import router from "next/router";
import { FC, useEffect, useState } from "react";
import {
  GeneralOrderType,
  useDeleteCinemaMutation,
  usePaginatedCinemasQuery
} from "../generated/graphql";
import Button from "./Button";
import CinemaList from "./CinemaList";
import Input from "./Input";
import Loading from "./Loading";
import LocalSelect from "./LocalSelect";
import Pagination from "./Pagination";

const Cinemas: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchName, setSearchName] = useState<string>("");
  const [searchNameFinal, setSearchNameFinal] = useState<string>("");
  const [order, setOrder] = useState<GeneralOrderType>(GeneralOrderType.NameAz);
  const [deleteCinema] = useDeleteCinemaMutation();

  const { data, loading, error, refetch } = usePaginatedCinemasQuery({
    variables: {
      page,
      pageSize: 4,
      order,
      searchName: searchNameFinal
    }
  });

  useEffect(() => {
    refetch();
  }, [refetch, page, order, searchName]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Content>
      <HeaderRow>
        <Button
          onClick={() => {
            router.push("/newCinema");
          }}
        >
          Añadir cine
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
            value={searchName}
            onChange={e => {
              setSearchName(e.target.value);
              {
                e.target.value === "" && setSearchNameFinal("");
              }
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                {
                  page > 1 && setPage(1);
                }
                setSearchNameFinal(searchName);
              }
            }}
          />
          <button
            className="search"
            onClick={() => {
              setSearchNameFinal(searchName);
            }}
          />
        </Filter>
      </FiltersDiv>
      {data && (
        <CinemaList
          cinemas={data?.paginatedCinemas?.data}
          onDelete={async cinema => {
            deleteCinema({
              variables: { deleteCinemaId: cinema.id }
            });
          }}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <>
          {data && (
            <LocalPagination
              numberPages={data.paginatedCinemas?.totalPages}
              currentPage={data.paginatedCinemas?.page}
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

export default Cinemas;

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
