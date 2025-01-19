import { useContext } from "react";
import "./Serviceblock.scss";
import { NewPersonContext } from "../../context/PersonContextProvider";
import { CalendarContext } from "../../context/CalendarContext";
import { NewServiceBlockContext } from "../../context/ServiceBlockProvider";
import { useNavigate } from "react-router-dom";

function Serviceblock() {
  const navigate = useNavigate();

  const { persons } = useContext(NewPersonContext);
  const { days } = useContext(CalendarContext);
  const { serviceBlockData } = useContext(NewServiceBlockContext);

  function serviceblockSelect(block: number) {
    navigate("/edit/serviceblock/" + block);
  }

  function searchServiceBlocksPerDay(person: number, day: number) {
    const personServiceBlocks = serviceBlockData.filter((block) => block.technician === person && block.date_of_action === getISODateFormat(day));

    return personServiceBlocks;
  }

  function getISODateFormat(day: number) {
    return new Date(day).toISOString().split("T")[0];
  }

  function getNewTime(startTime: {} | null, endTime: {} | null) {
    let newStartTime = "";
    let newEndTime = "";

    if (startTime !== null && endTime !== null) {
      newStartTime = String(startTime).substring(0, 5) + "-";
      newEndTime = String(endTime).substring(0, 5);
    } else {
      if (startTime !== null && endTime === null) {
        newStartTime = String(startTime).substring(0, 5);
      } else {
        newStartTime = "?-";
        newEndTime = "?";
      }
    }

    return newStartTime + newEndTime;
  }

  return (
    <div className="serviceblock">
      {persons.map((person) => {
        return (
          <div key={person.id} className="serviceblock__wrapper">
            {days.map((day) => {
              return (
                <div key={day} className="serviceblock__day">
                  <div className="serviceblock__head">
                    <h6>{`${new Date(day).getDate()}`}</h6>
                  </div>

                  {searchServiceBlocksPerDay(person.id, day).map((block) => {
                    return (
                      block.date_of_action === getISODateFormat(day) && (
                        <div
                          key={block.id}
                          className={"serviceblock__work serviceblock__work-priority--" + `${block.priority}`}
                          onClick={() => serviceblockSelect(block.id)}>
                          <p className="serviceblock__work-id">SB{block.id}</p>
                          <hr />

                          <p className="serviceblock__work-customer">{block.customer}</p>
                          <p className="serviceblock__work-time">{getNewTime(block.time_of_action_start, block.time_of_action_end)}</p>
                        </div>
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Serviceblock;
