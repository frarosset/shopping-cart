import Header from "../Header/Header.jsx";
import Error from "./Error.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import { useLocation } from "react-router-dom";

function ErrorPage() {
  // get current state (set by ErrorRedirect component)
  const location = useLocation();

  return (
    <HeadingLevelContextProvider>
      <Header />
      <Error error={location.state.error} />
    </HeadingLevelContextProvider>
  );
}

export default ErrorPage;
