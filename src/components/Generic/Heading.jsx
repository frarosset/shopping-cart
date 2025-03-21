import styled from "styled-components";
import { createElement } from "react";
import { useContext } from "react";
import HeadingLevelContext from "../../contexts/HeadingLevelContext.jsx";

// This styled component dynamically dynamically creates a heading based on the hLevel prop
// If hLevel is "auto", the current level is taken from the context
// If hLevel is smaller than 1, a simple span is created
// If hLevel is between 1 and 6, a h1/h2/h3/h4/h5/h6 heading element is created
// If hLevel is grater than 6, a div is created, with aria attributes set to heading at the corresponding level
// based on: https://medium.com/@victorhcharry/how-to-create-a-dynamic-typography-component-with-react-styled-components-c838c571c3d6
// and: https://sergiodxa.com/tutorials/keep-heading-levels-consistent-with-react-context

const getLevel = (propLevel, contextLevel) =>
  propLevel === "auto" && contextLevel ? contextLevel : propLevel;

const Heading = styled(({ propLevel = "auto", children, ...props }) => {
  const contextLevel = useContext(HeadingLevelContext);
  const level = getLevel(propLevel, contextLevel);

  const tag = level > 6 ? "div" : level > 0 ? `h${level}` : "span";
  const [role, ariaLevel] = level > 6 ? ["heading", level] : [null, null];

  return createElement(
    tag,
    { ...props, role: role, "aria-level": ariaLevel },
    children
  );
})`
  font-family: var(--heading-font);
  font-size: var(--heading-size);

  ${({ propLevel = "auto" }) => {
    const contextLevel = useContext(HeadingLevelContext);
    const level = getLevel(propLevel, contextLevel);
    return (
      level > 0 &&
      `
  font-weight: bold;
  font-size: var(--heading-${level}-size);`
    );
  }}
`;

export default Heading;
