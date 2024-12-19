import PersonsForm from "../../../components/PersonsForm/PersonsForm";
import "./CreatePerson.scss";

function CreateNewPerson() {
  return (
    <div className="create-person">
      <div className="create-person__back">
        <div className="create-person__input">
          <PersonsForm person={null} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewPerson;
