import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import ErrorPage from "./routes/Error/ErrorPage";
import Main from "./routes/Main/Main";
import EditPerson from "./routes/Edit/Person/EditPerson";
import CreateNewPerson from "./routes/Create/CreatePerson";
import PersonContextProvider from "./context/PersonContextProvider";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
          { path: "/edit/person/:itemId", element: <EditPerson /> },
          { path: "/create", element: <CreateNewPerson /> },
        ],
      },
    ],
    { basename: "/servicetime/" }
  );

  return (
    <>
      <PersonContextProvider>
        <RouterProvider router={router} />
      </PersonContextProvider>
    </>
  );
}

export default App;
