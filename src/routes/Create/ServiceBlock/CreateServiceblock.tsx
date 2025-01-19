import ServiceblockForm from "../../../components/ServiceblockForm/ServiceblockForm";
import "./CreateServiceblock.scss";

function CreateNewServiceblock() {
  return (
    <div className="create-serviceblock">
      <ServiceblockForm serviceblock={null} newblock={true} />
    </div>
  );
}

export default CreateNewServiceblock;
