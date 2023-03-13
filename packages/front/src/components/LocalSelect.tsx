import styled from "@emotion/styled";
import React from "react";

const LocalSelect = ({ value, onChange, options }) => {
  return (
    <Select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default LocalSelect;

const Select = styled.select`
  max-height: 44px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  padding: 5px 20px 5px;
  margin: 0 30px;
  font-size: 16px;
  font-family: "Courier New";
  color: #2f0139;
  background-color: #ffffff;
  outline: none;
  cursor: pointer;
`;
