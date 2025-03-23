import Heading from "../Generic/Heading.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import MessageWithImageBelow from "../Generic/MessageWithImageBelow.jsx";
import styled from "styled-components";

function Error({ error }) {
  return (
    <StyledError>
      <HeadingLevelContextProvider>
        <StyledHeading>Oops!</StyledHeading>
        <p>Something went wrong...</p>
        <MessageWithImageBelow
          imageUrl={`/images/vector/${
            error && error.status == 404 ? "404" : "error"
          }.jpg`}
        >
          <i>{error && (error.statusText || error.message)}</i>
        </MessageWithImageBelow>
      </HeadingLevelContextProvider>
    </StyledError>
  );
}

const StyledError = styled.main`
  display: flex;
  flex-direction: column;
  // gap: var(--page-gap);
  align-items: center;
  height: 100%;
`;

const StyledHeading = styled(Heading)`
  text-transform: uppercase;
`;

export default Error;
