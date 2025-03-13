import App from "./App.jsx";
import ShopMain from "./components/Shop/ShopMain.jsx";
import ShopSectionMain from "./components/Shop/ShopSectionMain.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <div>Home</div> },
      { path: "/shop", element: <ShopMain /> },
      { path: "/shop/:section", element: <ShopSectionMain /> },
      { path: "/shop/c/:category", element: <div>Category</div> },
      { path: "/about", element: <div>About</div> },
    ],
  },
];

export default routes;
