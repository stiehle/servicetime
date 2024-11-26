import PersonsForm from "../../components/PersonsForm/PersonsForm";
import "./CreatePerson.scss";

function CreateNewPerson() {
  return (
    <div className="createperson">
      <div className="createperson__back">
        <div className="createperson__input">
          <PersonsForm person={null} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewPerson;
