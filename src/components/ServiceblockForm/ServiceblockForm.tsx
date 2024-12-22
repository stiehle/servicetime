import "./ServiceblockForm.scss";
import { useContext } from "react";
import { NewFieldOfAppContext } from "../../context/FieldOfAppContextProvider";
import { ServiceBlock } from "../../types/person";
import { IconContext } from "react-icons";
import { FaListAlt, FaRegTrashAlt } from "react-icons/fa";
import { MdCancel, MdSaveAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NewServiceBlockContext } from "../../context/ServiceBlockProvider";
import { useFormInput } from "../../hooks/useFormInput";
import TextInput from "../Textinput/Textinput";
import DateInput from "../Dateinput/Dateinput";
import TimeInput from "../Timeinput.tsx/Timeinput";
import { CgAdd } from "react-icons/cg";
import { HiComputerDesktop, HiWrenchScrewdriver } from "react-icons/hi2";
import { IoFlash } from "react-icons/io5";

type ServiceProp = {
  serviceblock: ServiceBlock | null;
};

function ServiceblockForm({ serviceblock }: ServiceProp) {
  // console.log(serviceblock, typeof serviceblock?.date_of_action);
  const { fieldOfApplication } = useContext(NewFieldOfAppContext);
  const { deleteServiceblock } = useContext(NewServiceBlockContext);
  const navigate = useNavigate();
  // console.log(fieldOfApplication);

  const customer = useFormInput(serviceblock ? String(serviceblock.customer) : "", false);
  const location = useFormInput(serviceblock ? String(serviceblock.location) : "", false);
  const unit = useFormInput(serviceblock ? String(serviceblock.unit) : "", false);
  const action = useFormInput(serviceblock ? String(serviceblock.action) : "", false);
  const note = useFormInput(serviceblock ? String(serviceblock.note) : "", false);
  const communication = useFormInput(serviceblock ? String(serviceblock.communication) : "", false);
  const technician = useFormInput(serviceblock ? String(serviceblock.technician) : "", false);
  const priority = useFormInput(serviceblock ? String(serviceblock.priority) : "", false);

  const dateOfAction = useFormInput(serviceblock ? serviceblock.date_of_action : "", false);
  // const timeOfActionStart = useFormInput(serviceblock ? (serviceblock.time_of_action_start !== null ? serviceblock.time_of_action_start : "") : "", false);
  const timeOfActionStart = useFormInput(serviceblock ? serviceblock.time_of_action_start : "", false);
  // console.log(timeOfActionStart);
  const timeOfActionEnd = useFormInput(serviceblock ? serviceblock.time_of_action_end : "", false);

  const timePeriodOf = useFormInput(serviceblock ? serviceblock.time_period_of : "", false);
  const timePeriodUtil = useFormInput(serviceblock ? serviceblock.time_period_util : "", false);

  function cancelForm() {
    navigate("/");
  }

  function deleteButton() {
    if (serviceblock) {
      const question = confirm("Soll der Serviceblock wirklich gelöscht werden");
      if (question) {
        // personsDispatch({ type: "REMOVE_PERSON", person: person });
        deleteServiceblock(serviceblock);
        navigate("/");
      }
    } else {
      cancelForm();
    }
  }

  function selectFieldOfApp(field: number) {
    console.log(field);
  }

  function showFieldOfApplication() {
    const iconStock = [<CgAdd />, <HiWrenchScrewdriver />, <IoFlash />, <HiComputerDesktop />, <FaListAlt />];
    // console.log(personTechField);

    function selectIcon(id: number) {
      if (id > 4) id = 0;
      return <>{iconStock[id]}</>;
    }
    return (
      <div className="service-fieldofapp">
        <div className="service-fieldofapp__header">
          <h3>Einsatzbereiche wählen</h3>
        </div>
        <div className="service-fieldofapp__fields">
          {fieldOfApplication.map((field) => {
            return (
              <div
                key={field.id}
                className={"service-fieldofapp__field service-fieldofapp__field--" + `${field.id}`}
                onClick={() => selectFieldOfApp(field.id)}>
                {selectIcon(field.id)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function saveServiceblock() {
    console.log("Save");
  }

  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <div className="serviceblock-form">
        <div className="serviceblock-form__menu">
          {serviceblock ? (
            <div className="serviceblock-form__menu-wrapper">
              <h2>Serviceblock ändern </h2>
              <h2>{serviceblock && "[SB" + serviceblock.id + "]"}</h2>
            </div>
          ) : (
            <div className="serviceblock-form__menu-wrapper">
              <h2>Serviceblock hinzufügen</h2>
            </div>
          )}

          <div className="serviceblock-form__menu-wrapper">
            <FaRegTrashAlt className="serviceblock-form__delete-button" onClick={deleteButton} />
            <MdCancel className="serviceblock-form__cancel-button" onClick={cancelForm} />
          </div>
        </div>
        <TextInput value={customer.value} onChange={customer.handleInputChangeEvent} error={customer.error} id={"customer"} name={"Firma"} size={"xxl"} />
        <TextInput value={location.value} onChange={location.handleInputChangeEvent} error={location.error} id={"location"} name={"Adresse"} size={"xxl"} />
        <TextInput
          value={communication.value}
          onChange={communication.handleInputChangeEvent}
          error={communication.error}
          id={"communication"}
          name={"Kommunikation"}
          size={"xxl"}
        />
        <TextInput value={action.value} onChange={action.handleInputChangeEvent} error={action.error} id={"action"} name={"Aufgaben"} />
        <div className="serviceblock-form__input-wrapper">
          <TextInput
            value={technician.value}
            onChange={technician.handleInputChangeEvent}
            error={technician.error}
            id={"technician"}
            name={"Service-Techniker"}
            size={"long"}
          />
          <TextInput value={unit.value} onChange={unit.handleInputChangeEvent} error={unit.error} id={"unit"} name={"Anlagen Nummer"} size={"middle"} />
          <TextInput
            value={priority.value}
            onChange={priority.handleInputChangeEvent}
            error={priority.error}
            id={"priority"}
            name={"Priorität"}
            size={"short"}
          />
        </div>
        <TextInput value={note.value} onChange={note.handleInputChangeEvent} error={note.error} id={"note"} name={"Bemerkungen"} />

        <div className="serviceblock-form__input-wrapper">
          <DateInput
            value={dateOfAction.value}
            onChange={dateOfAction.handleInputChangeEvent}
            id={"date-action"}
            name={"Service-Datum"}
            error={dateOfAction.error}
          />
          <TimeInput
            value={timeOfActionStart.value}
            onChange={timeOfActionStart.handleInputChangeEvent}
            id={"time-action-start"}
            name={"Start"}
            error={timeOfActionStart.error}
          />
          <TimeInput
            value={timeOfActionEnd.value}
            onChange={timeOfActionEnd.handleInputChangeEvent}
            id={"time-action-end"}
            name={"Ende"}
            error={timeOfActionEnd.error}
          />
        </div>
        <div className="serviceblock-form__input-wrapper">
          <DateInput
            value={timePeriodOf.value}
            onChange={timePeriodOf.handleInputChangeEvent}
            id={"time-period-of"}
            name={"Service-Zeitraum von..."}
            error={timePeriodOf.error}
          />
          <DateInput
            value={timePeriodUtil.value}
            onChange={timePeriodUtil.handleInputChangeEvent}
            id={"time-period-util"}
            name={"...bis"}
            error={timePeriodUtil.error}
          />
        </div>
        {showFieldOfApplication()}

        <button className={"serviceblock-form__button"} onClick={saveServiceblock}>
          <MdSaveAlt />
          <h3>Speichern</h3>
        </button>
      </div>
    </IconContext.Provider>
  );
}

export default ServiceblockForm;
