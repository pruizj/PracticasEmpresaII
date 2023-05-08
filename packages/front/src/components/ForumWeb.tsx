import { FC } from "react";
import { useGetChatsQuery } from "../generated/graphql";
import ForumForm from "./ForumForm";
import styled from "@emotion/styled";

const ForumWeb: FC = () => {
  const { data, loading, error } = useGetChatsQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Content>
      <ForumForm initialData={data.getChats[0]} />
    </Content>
  );
};

export default ForumWeb;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
`;
