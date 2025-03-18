import styled from "styled-components";

function Icon({ children, className = "" }) {
  return <span className={`icon ${className}`}>{children}</span>;
}

const StyledIcon = styled(Icon)`
  width: 1em;
  height: 1em;
  display: inline-block;
`;

export default StyledIcon;
