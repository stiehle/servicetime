import Persons from "../Persons/Persons";
import "./Calendar.scss";
function Calendar() {
  return (
    <div className="calendar">
      <div className="calendar__menu">menu</div>
      <div className="calendar__head">
        <div className="calendar__head-info">A</div>
        <div className="calendar__head-date">B</div>
      </div>
      <div className="calendar__wrapper">
        <div className="calendar__persons">
          <Persons />
        </div>
        <div className="calendar__body"></div>
      </div>
    </div>
  );
}

export default Calendar;
