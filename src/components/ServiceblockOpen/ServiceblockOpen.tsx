import "./ServiceblockOpen.scss";
import { useContext } from "react";
import { NewServiceBlockContext } from "../../context/ServiceBlockProvider";
import { ServiceBlock } from "../../types/person";
import { useNavigate } from "react-router-dom";

function ServiceblockOpen() {
  const navigate = useNavigate();
  const { serviceBlockData } = useContext(NewServiceBlockContext);

  function getServiceblockOpen(): ServiceBlock[] {
    const serviceblockOpen = serviceBlockData.filter((block) => {
      return block.technician === null || block.date_of_action === null;
    });

    return serviceblockOpen;
  }

  function serviceblockOpenSelect(block: number) {
    navigate("/edit/serviceblock/" + block);
  }

  return (
    <>
      {getServiceblockOpen().map((block) => {
        return (
          <div className="serviceblock-open" key={block.id} onClick={() => serviceblockOpenSelect(block.id)}>
            <div className="serviceblock-open__info">
              <p>SB{block.id}</p>
              <hr></hr>
              <p className="serviceblock-open__customer">{block.customer}</p>
              <p>{block.location}</p>
              <p>{block.note}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ServiceblockOpen;
