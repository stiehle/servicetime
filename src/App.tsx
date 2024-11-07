import "./App.scss";
// import { createClient } from "@supabase/supabase-js";
// import { Database } from "./types/database.types";
import { supabase } from "./utils/supabase";

function App() {
  // signInWithPassword();

  fetchData();

  async function fetchData() {
    const { data, error } = await supabase
      .from("service_technician")
      .select(
        "id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)"
      );

    if (error) {
      console.log(error);
    }
    console.log(data);
    return data;
  }

  //     type: "READ_DATA",
  //     table: tableName.technician,
  //     command:
  //       "id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)",
  //     row: { personal_nr: 1018, first_name: "Duke", last_name: "Power" },
  //   });
  //   console.log(x);
  // }

  // test();

  // async function test() {
  //   let x = supabaseReducer({
  //     type: "READ_DATA",
  //     table: "service_technician",
  //     command: "id, first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)",
  //   });

  //   console.log(x);
  // }

  return (
    <>
      <h1>Hallo</h1>
    </>
  );
}

export default App;
