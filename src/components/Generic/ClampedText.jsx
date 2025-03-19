import styled from "styled-components";

// This styled component clamps the text within it to props.nRows rows

const ClampedText = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.$nRows};
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: ${(props) => props.$nRows};
`;

export default ClampedText;
