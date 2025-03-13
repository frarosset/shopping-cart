import App from "./App.jsx";
import ShopMain from "./components/Shop/ShopMain.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <div>Home</div> },
      { path: "/shop", element: <ShopMain /> },
      { path: "/shop/:section", element: <div>Section</div> },
      { path: "/about", element: <div>About</div> },
    ],
  },
];

export default routes;
