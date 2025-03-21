import styled from "styled-components";

function Icon({ children }) {
  return <StyledIcon>{children}</StyledIcon>;
}

const StyledIcon = styled.span`
  font-size: inherit;
  width: 1em;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Icon;
