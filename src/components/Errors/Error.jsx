import Heading from "../Generic/Heading.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";

function Error({ error }) {
  return (
    <main>
      <HeadingLevelContextProvider>
        <Heading>Oops!</Heading>
        <p>Something went wrong...</p>
        <i>{error && (error.statusText || error.message)}</i>
      </HeadingLevelContextProvider>
    </main>
  );
}

export default Error;
