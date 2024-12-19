import { createContext, ReactNode, useEffect, useState } from "react";
import { FieldOFApplication } from "../types/person";
import { supabase } from "../database/supabase";

export const NewFieldOfAppContext = createContext<{
  fieldOfApplication: FieldOFApplication[];
  // setFieldOfApp: Dispatch<FieldOFApp[]>;
  setFieldOfApplication: ([{ id, type }]: FieldOFApplication[]) => void;
}>({
  fieldOfApplication: [],
  setFieldOfApplication: () => {},
});

function FieldOfAppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    fetchFieldOfApplication();
    // console.log(person);
  }, []);

  const [fieldOfApplication, setFieldOfApplication] = useState<FieldOFApplication[]>([]);

  async function fetchFieldOfApplication() {
    console.log("fetch");

    // const { data, error } = await supabase.from("service_technician").select("*");
    const { data, error } = await supabase.from("field_of_application").select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      setFieldOfApplication(data);
    }
  }

  return <NewFieldOfAppContext.Provider value={{ fieldOfApplication, setFieldOfApplication }}>{children}</NewFieldOfAppContext.Provider>;
}

export default FieldOfAppProvider;
