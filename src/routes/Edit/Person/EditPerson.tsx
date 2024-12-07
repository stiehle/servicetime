import "./EditPerson.scss";
import { useParams } from "react-router-dom";

import { useContext } from "react";
import { ServicePerson } from "../../../types/person";
import { newPersonContext } from "../../../context/PersonContextProvider";
import PersonsForm from "../../../components/PersonsForm/PersonsForm";

function EditPerson() {
  const { persons } = useContext(newPersonContext);
  const { itemId } = useParams();
  const selectedPerson: ServicePerson | undefined = persons.find((item) => item.id === Number(itemId));
  // console.log(itemId, selectedPerson);

  if (selectedPerson) {
    return (
      <div className="editperson">
        <div className="editperson__back">
          <div className="editperson__input">
            <PersonsForm person={selectedPerson} />
            {/* <PersonsForm person={null} /> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editperson">
      <div className="editperson__back">
        <div className="editperson__input">
          <h2>Bitte PersonID prüfen!</h2>
        </div>
      </div>
    </div>
  );
}

export default EditPerson;
