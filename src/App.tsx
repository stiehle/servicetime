import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";

import ErrorPage from "./routes/Error/ErrorPage";
import Main from "./routes/Main/Main";
import EditPerson from "./routes/Edit/Person/EditPerson";
import { useEffect, useReducer } from "react";
import userManagementReducer from "./hooks/personManagementReducer";
import { supabase } from "./utils/supabase";
import { PersonContext } from "./context/PersonContext";

function App() {
  // signInWithPassword();

  const [persons, personsDispatch] = useReducer(userManagementReducer, []);

  useEffect(() => {
    // checkUserLogIn();
    fetchPersonData();
    //
  }, []);

  // "id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)",
  async function fetchPersonData() {
    // const { data, error } = await supabase.from("service_technician").select("*");
    const { data, error } = await supabase
      .from("service_technician")
      .select("id, personal_nr,  first_name, last_name, technician_field_of_app(*), field_of_application(*)");

    if (error) {
      console.log(error);
    }

    if (data) {
      personsDispatch({ type: "INIT_PERSONS", person: data });
    } else return;

    console.log(data);
  }

  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
          { path: "/edit/person/:itemId", element: <EditPerson /> },
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
      <PersonContext.Provider value={{ persons, personsDispatch }}>
        <RouterProvider router={router} />
      </PersonContext.Provider>
    </>
  );
}

export default App;
