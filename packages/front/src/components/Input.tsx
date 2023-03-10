import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0.5rem;
  font-family: "Courier New";
  border: 1px solid gray;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 80%;

  &:focus {
    outline: none;
    border-color: #b604ff;
  }
`;

export default Input;
