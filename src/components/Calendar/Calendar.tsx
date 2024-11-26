import { IconContext } from "react-icons";
import Persons from "../Persons/Persons";
import "./Calendar.scss";
import { IoMdPersonAdd } from "react-icons/io";

import { useNavigate } from "react-router-dom";

function Calendar() {
  const navigate = useNavigate();
  // function addNewPerson() {
  //   PersonsForm({null});
  // }
  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <div className="calendar">
        <div className="calendar__menu">menu</div>
        <div className="calendar__head">
          <div className="calendar__head-info">
            <IoMdPersonAdd
              className="calendar__add-person"
              onClick={() => {
                navigate("/create/");
              }}
            />
          </div>
          <div className="calendar__head-date">B</div>
        </div>
        <div className="calendar__wrapper">
          <div className="calendar__persons">
            <Persons />
          </div>
          <div className="calendar__body"></div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Calendar;
