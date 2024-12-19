import "./ServiceblockForm.scss";
import { useContext } from "react";
import { NewFieldOfAppContext } from "../../context/FieldOfAppContextProvider";
import { ServiceBlock } from "../../types/person";
import { IconContext } from "react-icons";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type ServiceProp = {
  serviceblock: ServiceBlock | null;
};

function ServiceblockForm({ serviceblock }: ServiceProp) {
  const { fieldOfApplication } = useContext(NewFieldOfAppContext);
  // console.log(fieldOfApplication);

  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <div className="serviceblock-form">
        <div className="serviceblock-form__menu">
          {serviceblock ? (
            <div className="serviceblock-form__menu-wrapper">
              <h2>Serviceblock ändern </h2>
            </div>
          ) : (
            <div className="serviceblock-form__menu-wrapper">
              <h2>Serviceblock hinzufügen</h2>
            </div>
          )}

          <div className="serviceblock-form__menu-wrapper">
            <FaRegTrashAlt className="serviceblock-form__delete-button" />
            <MdCancel className="serviceblock-form__cancel-button" />
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default ServiceblockForm;
