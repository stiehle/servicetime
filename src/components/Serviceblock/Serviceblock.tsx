import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Serviceblock.scss";
import { newPersonContext } from "../../context/PersonContextProvider";
import { CalendarContext } from "../../context/CalendarContext";

function Persons() {
  const navigate = useNavigate();

  const { persons } = useContext(newPersonContext);
  const { days } = useContext(CalendarContext);

  function serviceblockSelect(id: number, day: number) {
    console.log("Block", id, day);
    // navigate("/edit/person/" + id);
  }

  // const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className="serviceblock">
      {persons.map((person) => {
        return (
          <div key={person.id} className="serviceblock__wrapper">
            {days.map((day) => {
              return (
                <div key={day} className="serviceblock__day">
                  <div className="serviceblock__head">
                    <h6>{person.id + "-" + `${new Date(day).getDate()}`}</h6>
                  </div>
                  {/* <div className="serviceblock__person">
                    <p>Urlaub</p>
                  </div>
                  <div className="serviceblock__work">
                    <p>08:00-10:30</p>
                    <p>Firma A</p>
                  </div>
                  <div className="serviceblock__work">
                    <p>11:00-12:00</p>
                    <p>Firma B</p>
                  </div>
                  <div className="serviceblock__work">
                    <p>13:30-15:00</p>
                    <p>Firma C</p>
                  </div> */}
                  <div className="serviceblock__work" onClick={() => serviceblockSelect(person.id, day)}>
                    <p>08:00-10:30</p>
                    <p>Firma A</p>
                  </div>
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
