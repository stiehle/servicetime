import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";

import ErrorPage from "./routes/Error/ErrorPage";
import Main from "./routes/Main/Main";
import EditPerson from "./routes/Edit/Person/EditPerson";

function App() {
  // signInWithPassword();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
          { path: "edit/person", element: <EditPerson /> },
          //   //   { path: "/overview", element: <Overview /> },
          //   //   { path: "/edit/:itemId", element: <EditView /> },
          //   //   { path: "/create", element: <Createview /> },
        ],
      },
    ],
    { basename: "/servicetime/" }
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
