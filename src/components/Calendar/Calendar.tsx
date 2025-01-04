import { IconContext } from "react-icons";
import Persons from "../Persons/Persons";
import "./Calendar.scss";
import { IoMdPersonAdd } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import Serviceblock from "../Serviceblock/Serviceblock";
import { useEffect, useState } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import { PiListPlusFill } from "react-icons/pi";

function Calendar() {
  const [days, setDays] = useState<number[]>([]);
  const navigate = useNavigate();
  const weekDayNameShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  useEffect(() => {
    createCalendarDays(0, 12, false);
  }, []);

  function createCalendarDays(daysOffset: number, duration: number, firstDayOfWeek = false) {
    let i: number = 0;
    const calendarDays: number[] = [];
    const now = Date.now();

    for (i; i < duration; i++) {
      // console.log(i);
      if (firstDayOfWeek) {
        calendarDays.push(Number(getFirstDateOfWeek(now)) + (daysOffset + i) * 86400000);
      } else {
        calendarDays.push(now + (daysOffset + i) * 86400000);
      }
    }
    setDays([...calendarDays]);
  }

  function getFirstDateOfWeek(selectDay: number | string) {
    const newDate = new Date(selectDay);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(newDate.setDate(diff));
  }

  return (
    <IconContext.Provider value={{ size: "30px" }}>
      <CalendarContext.Provider value={{ days }}>
        <div className="calendar">
          <div className="calendar__menu">
            <IoMdPersonAdd
              className="calendar__add-person"
              onClick={() => {
                navigate("/create/person/");
              }}
            />
            <PiListPlusFill
              className="calendar__add-serviceblock"
              onClick={() => {
                navigate("/create/serviceblock/");
                // navigate("/edit/serviceblock/");
              }}
            />
          </div>
          <div className="calendar__head">
            <div className="calendar__head-info">
              <div className="calendar__head-info-placeholder"></div>
            </div>
            <div className="calendar__head-date">
              <div className="calendar__days">
                {days.map((day) => {
                  return (
                    <div key={day} className={"calendar__day calendar__day--" + `${new Date(day).getDay()}`}>
                      <div className="calendar__day-date">
                        <p>{`${new Date(day).getDate()}`}</p>
                      </div>
                      <div className="calendar__day-month">
                        <p>{`${new Date(day).getMonth() + 1}`}</p>
                      </div>
                      <div className="calendar__day-year">
                        <p>{`${new Date(day).getFullYear()}`}</p>
                      </div>
                      <div className="calendar__day-weekday">
                        <p>{weekDayNameShort[`${new Date(day).getDay()}`]}</p>
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
      </CalendarContext.Provider>
    </IconContext.Provider>
  );
}

export default Calendar;
