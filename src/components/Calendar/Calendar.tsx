import { IconContext } from "react-icons";
import Persons from "../Persons/Persons";
import "./Calendar.scss";
import { IoMdPersonAdd } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import Serviceblock from "../Serviceblock/Serviceblock";

function Calendar() {
  const navigate = useNavigate();
  const days = [1, 2, 3, 4, 5, 6, 7];
  // function addNewPerson() {
  //   PersonsForm({null});
  // }
  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <div className="calendar">
        <div className="calendar__menu">
          <IoMdPersonAdd
            className="calendar__add-person"
            onClick={() => {
              navigate("/create/");
            }}
          />
          menu
        </div>
        <div className="calendar__head">
          <div className="calendar__head-info"></div>
          <div className="calendar__head-date">
            <div className="calendar__days">
              {days.map((day) => {
                return (
                  <div key={day} className="calendar__day">
                    <div className="calendar__day-date">
                      <p>09.12</p>
                      <p>2024</p>
                    </div>
                    <div className="calendar__day-weekday">
                      <p>Mo.</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="calendar__wrapper">
          <div className="calendar__persons">
            <Persons />
          </div>
          <div className="calendar__body">
            <Serviceblock />
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Calendar;
