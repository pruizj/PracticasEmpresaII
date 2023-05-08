import { gql } from "@apollo/react-hooks";

export const ON_MESSAGE_ADDED = gql`
  subscription {
    onMessageAdded {
      id
      text
      createdBy {
        id
        email
        name
        surname
      }
      channel {
        id
        name
        messages {
          id
          text
          createdBy {
            id
            email
            name
            surname
          }
        }
        participants {
          id
          name
          surname
          email
        }
      }
    }
  }
`;
