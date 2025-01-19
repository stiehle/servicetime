import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import { ServiceBlock } from "../types/person";
import { spliceServiceBlock } from "../utils/serviceblock-help";

export const NewServiceBlockContext = createContext<{
  serviceBlockData: ServiceBlock[];
  setServiceBlockData: (serviceBlockData: ServiceBlock[]) => void;
  deleteServiceblock: (selectedServiceblock: ServiceBlock) => void;
  saveUpdatedServiceBlock: (serviceBlock: ServiceBlock) => void;
  fetchServiceBlockData: () => void;
}>({
  serviceBlockData: [],
  deleteServiceblock: function () {},
  saveUpdatedServiceBlock: function () {},
  setServiceBlockData: function () {},
  fetchServiceBlockData: function () {},
});

function ServiceBlockProvider({ children }: { children: ReactNode }) {
  const [serviceBlockData, setServiceBlockData] = useState<ServiceBlock[]>([]);

  useEffect(() => {
    fetchServiceBlockData();
  }, []);

  function fetchServiceBlockData() {
    const fetchServiceBlock = async () => {
      const { data, error } = await supabase.from("service_block").select("*, service_field(*)");

      if (error) {
        console.log(error);
      }

      if (data) {
        setServiceBlockData(data);
      } else return;
    };

    fetchServiceBlock();
  }

  async function removeFieldOfApp(blockId: number, field: number) {
    const { error } = await supabase.from("service_field").delete().eq("service_block, field_of_app", blockId).in("field_of_app", [field]);
    if (error) {
      console.log(error);
    }
  }

  async function writeNewFieldOFApp(field: { field_of_app: number; service_block: number }) {
    const { error } = await supabase.from("service_field").insert({
      field_of_app: field.field_of_app,
      service_block: field.service_block,
    });
    if (error) {
      console.log(error);
    }
  }

  function deleteServiceblock(selectedServiceblock: ServiceBlock) {
    const deleteServiceblockData = async () => {
      const { data, error } = await supabase.from("service_block").delete().eq("id", selectedServiceblock.id).select();
      if (error) {
        console.log(error);
      }
    };

    deleteServiceblockData();

    const newData = serviceBlockData.filter((block) => block.id !== selectedServiceblock.id);

    setServiceBlockData([...newData]);
  }

  function saveUpdatedServiceBlock(serviceBlock: ServiceBlock) {
    const update = async () => {
      const { error } = await supabase.from("service_block").update(selectServiceBlock).eq("id", serviceBlock.id).select();
      if (error) {
        console.log(error);
      }
    };

    const { selectServiceBlock, selectServiceField, newServiceblock } = spliceServiceBlock(serviceBlock);

    update();

    const updatedState = serviceBlockData.map((block) => (block.id === serviceBlock.id ? newServiceblock : block));

    setServiceBlockData([...updatedState]);

    let arrayPrev: number[] = [];
    let arraySelected: number[] = [];

    const prevServiceBlock = serviceBlockData.find((block) => block.id === serviceBlock.id);

    if (prevServiceBlock) {
      prevServiceBlock.service_field.map((field) => {
        arrayPrev.push(field.field_of_app);
      });

      selectServiceField.service_field.map((selectedField) => {
        arraySelected.push(selectedField.field_of_app);
      });

      let symDifference = arrayPrev.filter((x) => !arraySelected.includes(x)).concat(arraySelected.filter((x) => !arrayPrev.includes(x)));

      symDifference.map((x) => {
        if (arrayPrev.includes(x)) {
          removeFieldOfApp(serviceBlock.id, x);
        }

        if (arraySelected.includes(x)) {
          writeNewFieldOFApp({
            field_of_app: x,
            service_block: serviceBlock.id,
          });
        }
      });
    }
  }

  return (
    <NewServiceBlockContext.Provider value={{ serviceBlockData, setServiceBlockData, deleteServiceblock, saveUpdatedServiceBlock, fetchServiceBlockData }}>
      {children}
    </NewServiceBlockContext.Provider>
  );
}

export default ServiceBlockProvider;
