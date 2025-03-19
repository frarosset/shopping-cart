import FractStarIcon from "./FractStarIcon.jsx";
import styled from "styled-components";

//The rating can be any number between 0 and 1.

function StarRatingIcons({ rating, total = 5 }) {
  const stars = [];
  let n = rating;

  for (let i = 0; i < total; i++) {
    const fract = n > 1 ? 1 : n == 0 ? 0 : n;
    stars.push(<FractStarIcon key={i} fract={fract} />);
    n = n - fract;
  }

  return (
    <StyledRowIcons aria-label={`Rating is ${rating} out of ${total}`}>
      {stars}
    </StyledRowIcons>
  );
}

const StyledRowIcons = styled.span`
  display: flex;
  align-items: center;
`;

export default StarRatingIcons;
