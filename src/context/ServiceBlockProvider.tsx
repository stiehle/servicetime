import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../database/supabase";
// import { Tables } from "../types/database.types";

import { ServiceBlock } from "../types/person";
import { spliceServiceBlock } from "../utils/serviceblock-help";
// import { useNavigate } from "react-router-dom";

export const NewServiceBlockContext = createContext<{
  serviceBlockData: ServiceBlock[];
  setServiceBlockData: (serviceBlockData: ServiceBlock[]) => void;
  deleteServiceblock: (selectedServiceblock: ServiceBlock) => void;
  saveUpdatedServiceBlock: (serviceBlock: ServiceBlock) => void;
  // saveNewServiceBlock: (serviceBlock: {}) => {};
}>({
  serviceBlockData: [],
  deleteServiceblock: function () {},
  saveUpdatedServiceBlock: function () {},
  setServiceBlockData: function () {},
  // saveNewServiceBlock: function () {
  //   return {};
  // },
});

// type Props = {
//   children: ReactNode;
// };

function ServiceBlockProvider({ children }: { children: ReactNode }) {
  // const [serviceBlockData, setServiceBlockData] = useState<Tables<"service_block">[]>([]);
  const [serviceBlockData, setServiceBlockData] = useState<ServiceBlock[]>([]);
  // const [serviceBlockData, setServiceBlockData] = useState<Tables<"service_block" & "service_field">[]> ([]);

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

  async function removeFieldOfApp(blockId: number, field: number) {
    // console.log("remove", personId);
    const { error } = await supabase.from("service_field").delete().eq("service_block, field_of_app", blockId).in("field_of_app", [field]);
    if (error) {
      console.log(error);
    }
    // console.log(data);
  }

  async function writeNewFieldOFApp(field: { field_of_app: number; service_block: number }) {
    const { error } = await supabase.from("service_field").insert({
      field_of_app: field.field_of_app,
      service_block: field.service_block,
    });
    if (error) {
      console.log(error);
    }
    // console.log(data);
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

  // function spliceServiceBlock(serviceBlock: ServiceBlock) {
  //   const selectServiceBlock = (({
  //     action,
  //     unit,
  //     communication,
  //     customer,
  //     date_of_action,
  //     location,
  //     note,
  //     priority,
  //     technician,
  //     time_of_action_end,
  //     time_of_action_start,
  //     time_period_of,
  //     time_period_util,
  //   }) => ({
  //     action,
  //     unit,
  //     communication,
  //     customer,
  //     date_of_action,
  //     location,
  //     note,
  //     priority,
  //     technician,
  //     time_of_action_end,
  //     time_of_action_start,
  //     time_period_of,
  //     time_period_util,
  //   }))(serviceBlock);

  //   const selectServiceField = (({ service_field }) => ({ service_field }))(serviceBlock);

  //   // const check = ["technician", "date_of_action", "time_of_action_end", "time_of_action_start", "time_period_of", "time_period_util"];
  //   // check.map((key) => {
  //   //   if (selectServiceBlock[key as keyof typeof selectServiceBlock] === "" || selectServiceBlock[key as keyof typeof selectServiceBlock] === 0) {
  //   //     console.log("ok", key);
  //   //     selectServiceBlock[key as keyof typeof selectServiceBlock] = null;
  //   //   }
  //   // });

  //   const check: Array<keyof typeof selectServiceBlock> = [
  //     "technician",
  //     "date_of_action",
  //     "time_of_action_end",
  //     "time_of_action_start",
  //     "time_period_of",
  //     "time_period_util",
  //   ];

  //   check.map((key) => {
  //     if (selectServiceBlock[key] === "" || selectServiceBlock[key] === 0) {
  //       console.log("ok", key);
  //       selectServiceBlock[key] = null;
  //     }
  //   });

  //   return { selectServiceBlock, selectServiceField };
  // }

  function saveUpdatedServiceBlock(serviceBlock: ServiceBlock) {
    // const { serviceBlockData } = useContext(NewServiceBlockContext);
    console.log(serviceBlock);

    const update = async () => {
      // selectServiceBlock.date_of_action = null;
      const { error } = await supabase.from("service_block").update(selectServiceBlock).eq("id", serviceBlock.id).select();
      if (error) {
        console.log(error);
      }
      // fetchServiceBlockData();
    };

    const { selectServiceBlock, selectServiceField, newServiceblock } = spliceServiceBlock(serviceBlock);
    console.log(selectServiceBlock);
    update();
    // fetchServiceBlockData();

    const updatedState = serviceBlockData.map((block) => (block.id === serviceBlock.id ? newServiceblock : block));
    console.log(updatedState);
    setServiceBlockData([...updatedState]);

    let arrayPrev: number[] = [];
    let arraySelected: number[] = [];

    const prevServiceBlock = serviceBlockData.find((block) => block.id === serviceBlock.id);
    console.log(prevServiceBlock);

    if (prevServiceBlock) {
      prevServiceBlock.service_field.map((field) => {
        console.log("#", field.field_of_app);
        arrayPrev.push(field.field_of_app);
      });

      selectServiceField.service_field.map((selectedField) => {
        // console.log("**", selectedField.field_of_app);
        arraySelected.push(selectedField.field_of_app);
      });

      let symDifference = arrayPrev.filter((x) => !arraySelected.includes(x)).concat(arraySelected.filter((x) => !arrayPrev.includes(x)));
      console.log(arrayPrev, arraySelected, symDifference);

      symDifference.map((x) => {
        if (arrayPrev.includes(x)) {
          console.log("delete", x);
          removeFieldOfApp(serviceBlock.id, x);
        }

        if (arraySelected.includes(x)) {
          console.log("write", x);
          writeNewFieldOFApp({
            field_of_app: x,
            service_block: serviceBlock.id,
          });
        }
      });
    }
  }

  // function saveNewServiceBlock(serviceblock: {}): {} {
  //   console.log(serviceblock);
  //   const newServiceblock = async () => {
  //     const { data, error } = await supabase.from("service_block").insert({}).select();
  //     if (error) {
  //       console.log(error);
  //     }

  //     if (data) {
  //       console.log(data);
  //       return newServiceblock();
  //       fetchServiceBlockData();

  //       return data;
  //     }
  //   };

  //   return newServiceblock();
  // }

  return (
    <NewServiceBlockContext.Provider value={{ serviceBlockData, setServiceBlockData, deleteServiceblock, saveUpdatedServiceBlock }}>
      {children}
    </NewServiceBlockContext.Provider>
  );
}

export default ServiceBlockProvider;
