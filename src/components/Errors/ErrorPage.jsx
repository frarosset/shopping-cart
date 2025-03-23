import Header from "../Header/Header.jsx";
import Error from "./Error.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import { useLocation, Navigate } from "react-router-dom";

function ErrorPage() {
  // get current state (set by ErrorRedirect component)
  const location = useLocation();

  //   go to homepage if no error data is provided
  if (!location.state || !location.state.error)
    return <Navigate to="/" replace={true} />;

  return (
    <HeadingLevelContextProvider>
      <Header />
      <Error error={location.state.error} />
    </HeadingLevelContextProvider>
  );
}

export default ErrorPage;
