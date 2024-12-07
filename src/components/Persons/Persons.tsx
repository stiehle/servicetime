import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { PersonContext } from "../../context/PersonContext";
import "./Persons.scss";
import { newPersonContext } from "../../context/PersonContextProvider";

function Persons() {
  const navigate = useNavigate();

  // const { persons } = useContext(PersonContext);
  const { persons } = useContext(newPersonContext);
  // const { itemId } = useParams();

  function personSelect(id: number) {
    console.log("id:", id);
    navigate("/edit/person/" + id);
  }

  return (
    <div className="person">
      {persons.map((person) => {
        return (
          <div key={person.id} className="person__item" onClick={() => personSelect(person.id)}>
            <div className="person__name">{person.first_name + " " + person.last_name}</div>
            <div className="person__number">{person.id + ", " + person.personal_nr}</div>

            {person.tech_field &&
              person.tech_field.map((field) => {
                // console.log(":", field);
                return (
                  <div key={field.field_of_app}>
                    <div>
                      <p>#{field.field_of_app}</p>
                    </div>
                    <h6>{field.note}</h6>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default Persons;
