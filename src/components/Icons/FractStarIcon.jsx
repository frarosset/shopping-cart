import { useState } from "react";
import Icon from "./Icon.jsx";

// svg code from "star" icon of Phosphor Icons:
// source: https://phosphoricons.com/

function FractStarIcon({ fract = 1 }) {
  const clipFract = fract < 0 ? 0 : fract < 1 ? fract : 1;
  const offset = `${clipFract * 100}%`;

  const [id] = useState(crypto.randomUUID());

  const gFillId = `gFill-${id}`;
  const gStrokeId = `gStoke-${id}`;

  return (
    <Icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 256 256"
      >
        <path
          d="M128,189.09l54.72,33.65a8.4,8.4,0,0,0,12.52-9.17l-14.88-62.79,48.7-42A8.46,8.46,0,0,0,224.27,94L160.36,88.8,135.74,29.2a8.36,8.36,0,0,0-15.48,0L95.64,88.8,31.73,94a8.46,8.46,0,0,0-4.79,14.83l48.7,42L60.76,213.57a8.4,8.4,0,0,0,12.52,9.17Z"
          fill={`url(#${gFillId})`}
          stroke={`url(#${gStrokeId})`}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        />
        <linearGradient id={gFillId} x1="0" x2="100%" y1="0" y2="0">
          <stop stopColor="var(--star-fill)" offset={offset} />
          <stop stopColor="transparent" offset={offset} />
        </linearGradient>
        <linearGradient id={gStrokeId} x1="0" x2="100%" y1="0" y2="0">
          <stop stopColor="var(--star-fill)" offset={offset} />
          <stop stopColor="var(--star-stroke)" offset={offset} />
        </linearGradient>
      </svg>
    </Icon>
  );
}

export default FractStarIcon;
