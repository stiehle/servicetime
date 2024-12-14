import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Serviceblock.scss";
import { newPersonContext } from "../../context/PersonContextProvider";
import { CalendarContext } from "../../context/CalendarContext";
import ServiceBlockProvider, { newServiceBlockContext } from "../../context/ServiceBlockProvider";

function Persons() {
  const navigate = useNavigate();

  const { persons } = useContext(newPersonContext);
  const { days } = useContext(CalendarContext);
  const { test3, serviceBlockData } = useContext(newServiceBlockContext);

  function serviceblockSelect(personId: number, day: number, block: number) {
    console.log("Block", personId, day, block);
    // navigate("/edit/person/" + id);
  }

  function searchServiceBlocksPerDay(person: number, day: number) {
    // console.log(serviceBlockData);
    const personServiceBlocks = serviceBlockData.filter((block) => block.technician === person && block.date_of_action === getISODateFormat(day));
    // console.log(personServiceBlocks);

    return personServiceBlocks;
  }

  function getISODateFormat(day: number) {
    // const newDate = new Date(day).toISOString().split("T")[0];
    // console.log(day, newDate);
    return new Date(day).toISOString().split("T")[0];
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
                    <h6>{person.id + "-" + `${new Date(day).getDate()}`}</h6>
                  </div>

                  {searchServiceBlocksPerDay(person.id, day).map((block) => {
                    return (
                      block.date_of_action === getISODateFormat(day) && (
                        <div key={block.id} className="serviceblock__work" onClick={() => serviceblockSelect(person.id, day, block.id)}>
                          <p className="serviceblock__work-id">SB{block.id}</p>
                          <hr />
                          <p className="serviceblock__work-time">
                            {block.time_of_action_start}-{block.time_of_action_end}
                          </p>
                          <p>{block.customer}</p>
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

export default Persons;

// {
//   console.log(blocks.date_of_action);
// }
// {blocks.date_of_action === "2024-12-23" ? return (
//    (<div className="serviceblock__work" onClick={() => serviceblockSelect(person.id, day)}>
//     {blocks.id} {blocks.customer}
//   </div>)
// ) : return (
//    <h6>"No"</h6>
// )}
// })}

// blocks.date_of_action === "2024-12-" + `${new Date(day).getDate()}` && (
