import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 80%;

  &:focus {
    outline: none;
    border-color: blue;
  }
`;

export default Input;
