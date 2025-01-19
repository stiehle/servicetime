import { createContext, ReactNode, useEffect, useState } from "react";
import { FieldOFApplication } from "../types/person";
import { supabase } from "../database/supabase";

export const NewFieldOfAppContext = createContext<{
  fieldOfApplication: FieldOFApplication[];
  setFieldOfApplication: ([{ id, type }]: FieldOFApplication[]) => void;
}>({
  fieldOfApplication: [],
  setFieldOfApplication: () => {},
});

function FieldOfAppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    fetchFieldOfApplication();
  }, []);

  const [fieldOfApplication, setFieldOfApplication] = useState<FieldOFApplication[]>([]);

  async function fetchFieldOfApplication() {
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
