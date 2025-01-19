import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Persons.scss";
import { NewPersonContext } from "../../context/PersonContextProvider";
import { TechField } from "../../types/person";
import { IconContext } from "react-icons";
import { CgAdd } from "react-icons/cg";
import { HiComputerDesktop, HiWrenchScrewdriver } from "react-icons/hi2";
import { IoFlash } from "react-icons/io5";
import { FaListAlt } from "react-icons/fa";

function Persons() {
  const navigate = useNavigate();

  const { persons } = useContext(NewPersonContext);

  function personSelect(id: number) {
    navigate("/edit/person/" + id);
  }

  function createTechField(personTechField: TechField[]) {
    const iconStock = [<CgAdd />, <HiWrenchScrewdriver />, <IoFlash />, <HiComputerDesktop />, <FaListAlt />];

    const sortedPersonTechField = personTechField.sort((A, B) => A.field_of_app - B.field_of_app);

    function selectIcon(id: number) {
      if (id > 4) id = 0;
      return <>{iconStock[id]}</>;
    }

    return sortedPersonTechField.map((field) => {
      return (
        <div key={field.field_of_app}>
          <IconContext.Provider value={{ size: "20px" }}>
            <div className={"person__techfield--" + `${field.field_of_app}`}>{selectIcon(field.field_of_app)}</div>
          </IconContext.Provider>
        </div>
      );
    });
  }

  return (
    <div className="person">
      {persons.map((person) => {
        return (
          <div key={person.id} className="person__item" onClick={() => personSelect(person.id)}>
            <div className="person__wrapper">
              <div className="person__name">{person.first_name}</div>
              <div className="person__name">{person.last_name}</div>
              <div className="person__number">{person.personal_nr}</div>
            </div>
            <div className="person__techfield">{createTechField(person.tech_field)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Persons;
