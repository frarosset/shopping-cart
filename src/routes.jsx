import App from "./App.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <div>Home</div> },
      { path: "/shop", element: <div>Shop</div> },
      { path: "/about", element: <div>About</div> },
    ],
  },
];

export default routes;
