import styled from "styled-components";
import { createElement } from "react";

// This styled component dynamically dynamically creates a heading based on the hLevel prop
// If hLevel is smaller than 1, a simple span is created
// If hLevel is between 1 and 6, a h1/h2/h3/h4/h5/h6 heading element is created
// If hLevel is grater than 6, a div is created, with aria attributes set to heading at the corresponding level
// based on: https://medium.com/@victorhcharry/how-to-create-a-dynamic-typography-component-with-react-styled-components-c838c571c3d6
// and: https://sergiodxa.com/tutorials/keep-heading-levels-consistent-with-react-context

const Heading = styled(({ hLevel, children, ...props }) => {
  const tag = hLevel > 6 ? "div" : hLevel > 0 ? `h${hLevel}` : "span";
  const [role, ariaLevel] = hLevel > 6 ? ["heading", hLevel] : [null, null];

  return createElement(
    tag,
    { ...props, role: role, "aria-level": ariaLevel },
    children
  );
})``;

export default Heading;
