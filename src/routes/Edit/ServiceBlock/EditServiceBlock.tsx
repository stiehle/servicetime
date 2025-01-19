import { useContext } from "react";
import "./EditServiceBlock.scss";
import { NewServiceBlockContext } from "../../../context/ServiceBlockProvider";
import { ServiceBlock } from "../../../types/person";
import { useParams } from "react-router-dom";
import ServiceblockForm from "../../../components/ServiceblockForm/ServiceblockForm";

function EditServiceBlock() {
  const { serviceBlockData } = useContext(NewServiceBlockContext);
  const { itemId } = useParams();
  const selectedServiceBlock: ServiceBlock | undefined = serviceBlockData.find((item) => item.id === Number(itemId));

  if (selectedServiceBlock) {
    return (
      <div className="edit-serviceblock">
        <div className="edit-serviceblock__back">
          <div className="edit-serviceblock__input">
            <ServiceblockForm serviceblock={selectedServiceBlock} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-serviceblock">
      <div className="edit-serviceblock__back">
        <div className="edit-serviceblock__input">
          <h2>Bitte ServiceBlock ID prüfen!</h2>
        </div>
      </div>
    </div>
  );
}

export default EditServiceBlock;
