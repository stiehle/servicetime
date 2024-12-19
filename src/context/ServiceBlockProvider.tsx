import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { Tables } from "../types/database.types";
// import { CalendarContext } from "./CalendarContext";
import { ServiceBlock } from "../types/person";

export const NewServiceBlockContext = createContext<{
  // test3: number;
  serviceBlockData: ServiceBlock[];
}>({
  // test3: 1234,
  serviceBlockData: [],
});

// type Props = {
//   children: ReactNode;
// };

function ServiceBlockProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    fetchServiceBlockData();
  }, []);

  // const test3 = 1234;

  const [serviceBlockData, setServiceBlockData] = useState<Tables<"service_block">[]>([]);
  // useState<Tables<"tasklist">[]>([]);
  // const { serviceBlockData } = useContext(NewServiceBlockContext);

  function fetchServiceBlockData() {
    // console.log("in fechtServiceBlocks");
    // getFistLastCalendarDay();

    const fetchServiceBlock = async () => {
      history;
      const { data, error } = await supabase.from("service_block").select("*, service_field(*)");

      if (error) {
        console.log(error);
      }

      if (data) {
        setServiceBlockData(data);
      } else return;

      console.log(data);
    };

    fetchServiceBlock();
  }

  // function getFistLastCalendarDay() {
  //   // console.log(days);
  //   const firstDay = days[0];
  //   const lastDay = days[days.length - 1];
  //   // console.log(firstDay, lastDay, new Date(firstDay).toLocaleDateString("de-DE"), new Date(lastDay).toLocaleDateString("de-DE"));
  //   // console.log(firstDay, lastDay);
  // }

  return <NewServiceBlockContext.Provider value={{ serviceBlockData }}>{children}</NewServiceBlockContext.Provider>;
}

export default ServiceBlockProvider;
