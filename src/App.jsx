import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import { HeadingLevelContextProvider } from "./contexts/HeadingLevelContext.jsx";

function App() {
  return (
    <HeadingLevelContextProvider>
      <Header />
      <HeadingLevelContextProvider>
        <Outlet />
      </HeadingLevelContextProvider>
    </HeadingLevelContextProvider>
  );
}

export default App;
