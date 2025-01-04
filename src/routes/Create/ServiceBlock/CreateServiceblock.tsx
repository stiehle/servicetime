import ServiceblockForm from "../../../components/ServiceblockForm/ServiceblockForm";
import "./CreateServiceblock.scss";

function CreateNewServiceblock() {
  return (
    <div className="create-serviceblock">
      <ServiceblockForm serviceblock={null} newblock={true} />
    </div>

    // <div className="create-serviceblock">
    //   <div className="create-serviceblock__back">
    //     <div className="create-serviceblock__input">
    //       <ServiceblockForm serviceblock={null} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default CreateNewServiceblock;
