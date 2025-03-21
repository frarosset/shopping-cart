import styled from "styled-components";
import Select from "./Select.jsx";

const SelectWithLabel = (props) => (
  <StyledSelectWithLabel>
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    <Select {...props} />
  </StyledSelectWithLabel>
);

const StyledSelectWithLabel = styled.span`
  & select {
    font-weight: bold;
  }
`;

export default SelectWithLabel;
