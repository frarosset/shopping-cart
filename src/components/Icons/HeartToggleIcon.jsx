import Icon from "./Icon.jsx";
import HeartIcon from "./HeartIcon.jsx";
import HeartFillIcon from "./HeartFillIcon.jsx";

function HeartToggleIcon({ fill = false }) {
  return fill ? <HeartFillIcon /> : <HeartIcon />;
}

export default HeartToggleIcon;
