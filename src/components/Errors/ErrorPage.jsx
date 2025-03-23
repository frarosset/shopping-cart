import Header from "../Header/Header.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";

function ErrorPage() {
  return (
    <HeadingLevelContextProvider>
      <Header />
    </HeadingLevelContextProvider>
  );
}

export default ErrorPage;
