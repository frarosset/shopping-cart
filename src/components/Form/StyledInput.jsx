import styled from "styled-components";

const StyledInput = styled.input`
  font-size: var(--input-fontsize, inherit);
  background-color: var(--input-bg-color, inherit);
  border-radius: var(--input-border-radius, 0);
  border: var(--input-border, none);
  padding: var(--input-padding, 0);
  color: var(--input-color, inherit);
  width: max-content;

  &:hover,
  &:focus,
  &:focus-visible {
    outline: none;
  }

  &[type="search"] {
    width: 100%;
    border-bottom: 1px solid var(--col-txt);
  }
`;

export default StyledInput;
