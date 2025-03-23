import Heading from "../Generic/Heading.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import MessageWithImageBelow from "../Generic/MessageWithImageBelow.jsx";

function Error({ error }) {
  return (
    <main>
      <HeadingLevelContextProvider>
        <Heading>Oops!</Heading>
        <p>Something went wrong...</p>
        <MessageWithImageBelow
          imageUrl={`/images/vector/${
            error && error.status == 404 ? "404" : "error"
          }.jpg`}
        ></MessageWithImageBelow>
      </HeadingLevelContextProvider>
    </main>
  );
}

export default Error;
