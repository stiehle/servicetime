import "./EditPerson.scss";
import { useParams } from "react-router-dom";
import PersonsForm from "../../../components/PersonsForm/PersonsForm";
import { PersonContext } from "../../../context/PersonContext";
import { useContext } from "react";
import { ServicePerson } from "../../../types/person";

function EditPerson() {
  const { persons } = useContext(PersonContext);
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
