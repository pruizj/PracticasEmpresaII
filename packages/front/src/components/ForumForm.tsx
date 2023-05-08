import { useState } from "react";
import { useJoinMutation, useSendMessageMutation } from "../generated/graphql";
import { ON_MESSAGE_ADDED } from "../lib/subscriptions";
import { useSubscription } from "@apollo/react-hooks";
import Button from "./Button";
import { EmptyResults } from "./CinemaList";
import styled from "@emotion/styled";
import Input from "./Input";

interface ForumFormProps {
  initialData: any;
}

const ForumForm: React.FC<ForumFormProps> = ({ initialData }) => {
  const [joinChat] = useJoinMutation();
  const [sendMessage] = useSendMessageMutation();

  const [sendMessageText, setSendMessageText] = useState("");
  const [chat, setChat] = useState(initialData);

  useSubscription(ON_MESSAGE_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("subscriptionData", subscriptionData);
      const { onMessageAdded } = subscriptionData.data;
      const { channel } = onMessageAdded;
      setChat(channel);
    }
  });

  const onSendMessage = async (text: string) => {
    const joinned = await joinChat({
      variables: {
        channelName: "General"
      }
    });

    joinned &&
      (await sendMessage({
        variables: {
          text,
          channelName: "General"
        }
      }));
  };

  return (
    <Content>
      <Message>
        <LocalInput
          type="text"
          value={sendMessageText}
          onChange={e => setSendMessageText(e.target.value)}
        />
        <LocalButton onClick={() => onSendMessage(sendMessageText)}>
          Enviar mensaje
        </LocalButton>
      </Message>

      <List>
        {chat.messages && chat.messages.length === 0 && (
          <EmptyResults>No hay mensajes</EmptyResults>
        )}
        {chat.messages &&
          chat.messages.length > 0 &&
          chat.messages.map(message => {
            return (
              <Chat key={message.id}>
                <h3>
                  {message.createdBy.name} {message.createdBy.surname}
                </h3>
                <p>{message.text}</p>
              </Chat>
            );
          })}
      </List>
    </Content>
  );
};

export default ForumForm;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  font-family: "Courier New";
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
`;

const LocalInput = styled(Input)`
  width: 100%;
  margin: 0;
`;

const LocalButton = styled(Button)`
  padding: 10px;
  width: 100px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);

  h3 {
    margin: 0;
    color: #9f67ad;
  }

  p {
    margin: 0;
  }
`;
