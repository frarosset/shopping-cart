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
      { path: "/shop/c/:category", element: <div>Category</div> },
      { path: "/about", element: <div>About</div> },
    ],
  },
];

export default routes;
