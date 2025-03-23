import { useRouteError, Navigate } from "react-router-dom";

function ErrorRedirect() {
  const error = useRouteError();

  return <Navigate to="/error" replace={true} state={{ error: error }} />;
}

export default ErrorRedirect;
