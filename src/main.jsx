import React, { children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Logout from "./routes/Logout.jsx";
import Register from "./routes/Register.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import CreatePostpage from "./componant/CreatePostpage";
import Home from "./componant/Home.jsx";
import { Postpage } from "./componant/Postpage.jsx";
import EditPost from "./componant/EditPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Postpage /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
      { path: "createPost", element: <CreatePostpage /> },
      // { path: "posts/:postId", element: <Postpage /> },
      { path: "editPost/:postId", element: <EditPost /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
