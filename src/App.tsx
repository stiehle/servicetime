import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import ErrorPage from "./routes/Error/ErrorPage";
import Main from "./routes/Main/Main";
import EditPerson from "./routes/Edit/Person/EditPerson";
import CreateNewPerson from "./routes/Create/Person/CreatePerson";
import PersonContextProvider from "./context/PersonContextProvider";
import ServiceBlockProvider from "./context/ServiceBlockProvider";
import EditServiceBlock from "./routes/Edit/ServiceBlock/EditServiceBlock";
import FieldOfAppProvider from "./context/FieldOfAppContextProvider";
import CreateNewServiceblock from "./routes/Create/ServiceBlock/CreateServiceblock";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
          { path: "/edit/person/:itemId", element: <EditPerson /> },
          { path: "/edit/serviceblock/:itemId", element: <EditServiceBlock /> },
          { path: "/create/person", element: <CreateNewPerson /> },
          { path: "/create/serviceblock", element: <CreateNewServiceblock /> },
        ],
      },
    ],
    { basename: "/servicetime/" }
  );

  return (
    <>
      <PersonContextProvider>
        <ServiceBlockProvider>
          <FieldOfAppProvider>
            <RouterProvider router={router} />
          </FieldOfAppProvider>
        </ServiceBlockProvider>
      </PersonContextProvider>
    </>
  );
}

export default App;
