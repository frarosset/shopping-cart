import styled from "styled-components";

const HighlightButtonWithIconAndLabel = styled.button`
  display: flex;
  gap: var(--small-gap);
  align-items: center;
  justify-content: center;

  background-color: var(--col-highlight);
  color: var(--col-txt-alt);

  width: var(--cart-summary-max-width);
  max-width: 100%;

  *:has(> svg) {
    width: 1lh;
    height: 1lh;
  }
`;

export default HighlightButtonWithIconAndLabel;
