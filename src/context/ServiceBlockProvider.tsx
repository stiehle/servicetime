import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { Tables } from "../types/database.types";

import { ServiceBlock } from "../types/person";

export const NewServiceBlockContext = createContext<{
  serviceBlockData: ServiceBlock[];
  deleteServiceblock: (selectedServiceblock: ServiceBlock) => void;
}>({
  serviceBlockData: [],
  deleteServiceblock: function () {},
});

// type Props = {
//   children: ReactNode;
// };

function ServiceBlockProvider({ children }: { children: ReactNode }) {
  const [serviceBlockData, setServiceBlockData] = useState<Tables<"service_block">[]>([]);

  useEffect(() => {
    fetchServiceBlockData();
  }, []);

  function fetchServiceBlockData() {
    console.log("in fechtServiceBlocks");
    // getFistLastCalendarDay();
    const fetchServiceBlock = async () => {
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

  function deleteServiceblock(selectedServiceblock: ServiceBlock) {
    console.log(selectedServiceblock);
    const deleteServiceblockData = async () => {
      const { data, error } = await supabase.from("service_block").delete().eq("id", selectedServiceblock.id).select();
      if (error) {
        console.log(error);
      }
      console.log(data);
      // fetchServiceBlockData();
    };

    deleteServiceblockData();

    const newData = serviceBlockData.filter((block) => block.id !== selectedServiceblock.id);
    console.log("remove", newData);
    setServiceBlockData([...newData]);
  }

  return <NewServiceBlockContext.Provider value={{ serviceBlockData, deleteServiceblock }}>{children}</NewServiceBlockContext.Provider>;
}

export default ServiceBlockProvider;
