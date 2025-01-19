import "./ServiceblockForm.scss";
import { useContext, useEffect, useState } from "react";
import { NewFieldOfAppContext } from "../../context/FieldOfAppContextProvider";
import { Service_Field, ServiceBlock, ServicePerson } from "../../types/person";
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
import { supabase } from "../../database/supabase";
import { NewPersonContext } from "../../context/PersonContextProvider";

type ServiceProp = {
  serviceblock: ServiceBlock | null;
  newblock?: boolean;
};

function ServiceblockForm({ serviceblock, newblock }: ServiceProp) {
  const [newFieldOfApp, setNewFieldOfApp] = useState<number[]>([]);
  const [selectTechnician, setSelectTechnician] = useState<number | null>(null);

  useEffect(() => {
    if (serviceblock) {
      setFieldOfApplication();

      setSelectTechnician(serviceblock.technician);
    } else {
      if (newblock === true) {
        createNewServiceblock();
        newblock = false;
      }
    }
  }, []);

  const { persons } = useContext(NewPersonContext);

  const { fieldOfApplication } = useContext(NewFieldOfAppContext);
  const { serviceBlockData, setServiceBlockData, deleteServiceblock, saveUpdatedServiceBlock } = useContext(NewServiceBlockContext);
  const navigate = useNavigate();

  const customer = useFormInput(serviceblock && serviceblock.customer, false);
  const location = useFormInput(serviceblock && serviceblock.location, false);
  const unit = useFormInput(serviceblock && serviceblock.unit, false);
  const action = useFormInput(serviceblock && serviceblock.action, false);
  const note = useFormInput(serviceblock && serviceblock.note, false);
  const communication = useFormInput(serviceblock && serviceblock.communication, false);

  const priority = useFormInput(serviceblock ? (serviceblock.priority === null ? "3" : String(serviceblock.priority)) : "3", false);

  const dateOfAction = useFormInput(serviceblock && serviceblock.date_of_action, false);
  const timeOfActionStart = useFormInput(serviceblock && serviceblock.time_of_action_start, false);
  const timeOfActionEnd = useFormInput(serviceblock && serviceblock.time_of_action_end, false);
  const timePeriodOf = useFormInput(serviceblock && serviceblock.time_period_of, false);
  const timePeriodUtil = useFormInput(serviceblock && serviceblock.time_period_util, false);

  function cancelForm() {
    navigate("/");
  }

  function deleteButton() {
    if (serviceblock) {
      const question = confirm("Soll der Serviceblock wirklich gelöscht werden");
      if (question) {
        deleteServiceblock(serviceblock);
        navigate("/");
      }
    } else {
      cancelForm();
    }
  }

  function selectFieldOfApp(field: number) {
    const newServiceField: number[] = newFieldOfApp;

    if (newServiceField.includes(field)) {
      newServiceField.splice(newServiceField.indexOf(field), 1);
    } else {
      newServiceField.push(field);
    }
    setNewFieldOfApp([...newServiceField]);
  }

  function setFieldOfApplication() {
    const newServiceField: number[] = [];

    if (serviceblock) {
      serviceblock.service_field.map((x) => {
        newServiceField.push(x.field_of_app);
      });
    }
    setNewFieldOfApp(newServiceField);
  }

  function getFieldOfApp(blockId: number) {
    let newField: Service_Field[] = [];

    newFieldOfApp.map((field) => {
      newField.push({ field_of_app: field, service_block: blockId });
    });

    return newField;
  }

  function createNewServiceblock() {
    const newServiceblock = async () => {
      const { data, error } = await supabase.from("service_block").insert({}).select();
      if (error) {
        console.log(error);
      }

      if (data) {
        const newData = {
          ...data[0],
          service_field: [],
        };

        setServiceBlockData([...serviceBlockData, newData]);

        navigate("/edit/serviceblock/" + data[0].id);
      }
    };
    newServiceblock();
  }

  function saveServiceblock() {
    if (serviceblock) {
      const newServiceblock: ServiceBlock = {
        action: action.value,
        unit: unit.value,
        communication: communication.value,
        created_at: String(serviceblock.created_at),
        customer: customer.value,
        date_of_action: dateOfAction.value,
        duration: serviceblock.duration,
        id: serviceblock.id,
        location: location.value,
        note: note.value,
        priority: Number(priority.value),
        technician: selectTechnician,
        time_of_action_end: timeOfActionEnd.value,
        time_of_action_start: timeOfActionStart.value,
        time_period_of: timePeriodOf.value,
        time_period_util: timePeriodUtil.value,
        service_field: getFieldOfApp(Number(serviceblock.id)),
      };

      saveUpdatedServiceBlock(newServiceblock);
      navigate("/");
    }
  }

  function showFieldOfApplication() {
    const iconStock = [<CgAdd />, <HiWrenchScrewdriver />, <IoFlash />, <HiComputerDesktop />, <FaListAlt />];
    let checkField: boolean;

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
            checkField = newFieldOfApp.includes(field.id);
            return (
              <div
                key={field.id}
                className={
                  "service-fieldofapp__field--" +
                  `${checkField}` +
                  " " +
                  "service-fieldofapp__field service-fieldofapp__field" +
                  " service-fieldofapp__field--" +
                  `${field.id}`
                }
                onClick={() => selectFieldOfApp(field.id)}>
                {selectIcon(field.id)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function changeTechnician(persId: number) {
    if (serviceblock) {
      serviceblock.technician = persId;
    }

    if (persId === selectTechnician) {
      setSelectTechnician(null);
    } else {
      setSelectTechnician(persId);
    }
  }

  function getFilterdPersonList(personList: ServicePerson[], currentField: number[]) {
    const newPersonList: ServicePerson[] = [];
    let fieldPers: number[] = [];

    personList.map((pers) => {
      pers.tech_field.map((field) => {
        if (currentField.includes(field.field_of_app)) {
          fieldPers.push(field.field_of_app);
        }
      });

      const diff = newFieldOfApp.filter((x) => !fieldPers.includes(x));
      if (diff.length === 0) newPersonList.push(pers);

      fieldPers = [];
    });

    return newPersonList;
  }

  function getTechnicianList() {
    return getFilterdPersonList(persons, newFieldOfApp).map((pers) => {
      return (
        <div
          className={"serviceblock-form-sidebar__technician" + `${pers.id === selectTechnician ? " serviceblock-form-sidebar__technician--select" : ""}`}
          key={pers.id}
          onClick={() => {
            changeTechnician(pers.id);
          }}>
          <p>
            {pers.first_name} {pers.last_name}
          </p>
          <p>{pers.personal_nr}</p>
        </div>
      );
    });
  }

  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <div className="serviceblock-form-wrapper">
        <div className="serviceblock-form-sidebar">{getTechnicianList()}</div>
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

          {serviceblock && showFieldOfApplication()}

          <button className={"serviceblock-form__button"} onClick={saveServiceblock}>
            <MdSaveAlt />
            <h3>Speichern</h3>
          </button>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default ServiceblockForm;
