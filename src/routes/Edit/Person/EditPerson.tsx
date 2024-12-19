import "./EditPerson.scss";
import { useParams } from "react-router-dom";

import { useContext } from "react";
import { ServicePerson } from "../../../types/person";
import { NewPersonContext } from "../../../context/PersonContextProvider";
import PersonsForm from "../../../components/PersonsForm/PersonsForm";

function EditPerson() {
  const { persons } = useContext(NewPersonContext);
  const { itemId } = useParams();
  const selectedPerson: ServicePerson | undefined = persons.find((item) => item.id === Number(itemId));
  // console.log(itemId, selectedPerson);

  if (selectedPerson) {
    return (
      <div className="edit-person">
        <div className="edit-person__back">
          <div className="edit-person__input">
            <PersonsForm person={selectedPerson} />
            {/* <PersonsForm person={null} /> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-person">
      <div className="edit-person__back">
        <div className="edit-person__input">
          <h2>Bitte Person ID prüfen!</h2>
        </div>
      </div>
    </div>
  );
}

export default EditPerson;
