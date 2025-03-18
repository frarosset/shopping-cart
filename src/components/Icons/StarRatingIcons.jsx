import FractStarIcon from "./FractStarIcon.jsx";

//The rating can be any number between 0 and 1.

function StarRatingIcons({ rating, total = 5 }) {
  const stars = [];
  let n = rating;

  for (let i = 0; i < total; i++) {
    const fract = n > 1 ? 1 : n == 0 ? 0 : n;
    stars.push(<FractStarIcon key={i} fract={fract} />);
    n = n - fract;
  }

  return <div aria-label={`Rating is ${rating} out of ${total}`}>{stars}</div>;
}

export default StarRatingIcons;
