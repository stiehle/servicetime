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
      console.log(selectTechnician);
      setSelectTechnician(serviceblock.technician);
    } else {
      if (newblock === true) {
        createNewServiceblock();
        newblock = false;
      }
      // createNewServiceblock();
    }
  }, []);

  const { persons } = useContext(NewPersonContext);

  // console.log(serviceblock, serviceblock?.service_field);
  const { fieldOfApplication } = useContext(NewFieldOfAppContext);
  const { serviceBlockData, setServiceBlockData, deleteServiceblock, saveUpdatedServiceBlock } = useContext(NewServiceBlockContext);
  const navigate = useNavigate();
  // console.log(fieldOfApplication);

  const customer = useFormInput(serviceblock && serviceblock.customer, false);
  // const customer = useFormInput(serviceblock ? (serviceblock === null ? "" : serviceblock.customer) : "", false);
  const location = useFormInput(serviceblock && serviceblock.location, false);
  const unit = useFormInput(serviceblock && serviceblock.unit, false);
  const action = useFormInput(serviceblock && serviceblock.action, false);
  const note = useFormInput(serviceblock && serviceblock.note, false);
  const communication = useFormInput(serviceblock && serviceblock.communication, false);
  //const technician = useFormInput(serviceblock ? (serviceblock.technician === null ? "" : String(serviceblock.technician)) : "", false);
  const priority = useFormInput(serviceblock ? (serviceblock.priority === null ? "3" : String(serviceblock.priority)) : "3", false);

  const dateOfAction = useFormInput(serviceblock && serviceblock.date_of_action, false);
  const timeOfActionStart = useFormInput(serviceblock && serviceblock.time_of_action_start, false);
  const timeOfActionEnd = useFormInput(serviceblock && serviceblock.time_of_action_end, false);
  const timePeriodOf = useFormInput(serviceblock && serviceblock.time_period_of, false);
  const timePeriodUtil = useFormInput(serviceblock && serviceblock.time_period_util, false);

  // function getPersonFullName(personId: number) {
  //   const name = persons.find((name) => name.id === personId);
  //   if (name) {
  //     console.log(name.first_name);
  //     return name.first_name + " " + name.last_name;
  //   } else {
  //     return "";
  //   }
  // }

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
    const newServiceField: number[] = newFieldOfApp;
    console.log(field, newServiceField);
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
        // console.log(x.field_of_app);
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
    console.log(newField);
    return newField;
  }

  function createNewServiceblock() {
    const newServiceblock = async () => {
      const { data, error } = await supabase.from("service_block").insert({}).select();
      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data, data[0].id);
        const newData = {
          ...data[0],
          service_field: [],
        };
        console.log(newData);
        setServiceBlockData([...serviceBlockData, newData]);

        navigate("/edit/serviceblock/" + data[0].id);
      }
    };
    newServiceblock();
  }

  function saveServiceblock() {
    console.log("Save");

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
        // technician: Number(technician.value),
        technician: selectTechnician,
        time_of_action_end: timeOfActionEnd.value,
        time_of_action_start: timeOfActionStart.value,
        time_period_of: timePeriodOf.value,
        time_period_util: timePeriodUtil.value,
        service_field: getFieldOfApp(Number(serviceblock.id)),
      };

      // if (newServiceblock.technician === 0) newServiceblock.technician = null;
      // if (newServiceblock.date_of_action === "") newServiceblock.date_of_action = null;

      console.log(newServiceblock);
      saveUpdatedServiceBlock(newServiceblock);

      navigate("/");
      // cancelForm();
    }
  }

  function showFieldOfApplication() {
    const iconStock = [<CgAdd />, <HiWrenchScrewdriver />, <IoFlash />, <HiComputerDesktop />, <FaListAlt />];
    let checkField: boolean;
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
            // checkField = checkFieldOfApp(field.id);
            checkField = newFieldOfApp.includes(field.id);
            return (
              <div
                key={field.id}
                // className={"service-fieldofapp__field service-fieldofapp__field service-fieldofapp__field--" + `${field.id}`}
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

  // function getTechnicianList() {
  //   return persons.map((pers) => {
  //     return serviceblock && serviceblock.technician === pers.id ? (
  //       <div className="serviceblock-form-sidebar__technician serviceblock-form-sidebar__technician--select" key={pers.id}>
  //         <p>{pers.personal_nr} </p>
  //         <p>
  //           {pers.first_name} {pers.last_name}{" "}
  //         </p>
  //       </div>
  //     ) : (
  //       <div className="serviceblock-form-sidebar__technician " key={pers.id}>
  //         {/* <p>{pers.personal_nr} </p> */}
  //         <p>
  //           {pers.first_name} {pers.last_name}{" "}
  //         </p>
  //       </div>
  //     );
  //   });
  // }

  function changeTechnician(persId: number) {
    console.log(persId);

    // const newServiceblock = { ...serviceblock };
    if (serviceblock) {
      serviceblock.technician = persId;
      //technician.value = String(persId);
    }

    //console.log(technician);
    if (persId === selectTechnician) {
      setSelectTechnician(null);
    } else {
      setSelectTechnician(persId);
    }

    // console.log(technician.value);

    // getTechnicianList();
  }

  function getFilterdPersonList() {
    console.log("Hello", newFieldOfApp, persons[0].tech_field);
    const newPersonList: ServicePerson[] = [];
    let fieldPers: number[] = [];

    persons.map((pers) => {
      // let check = 0;

      pers.tech_field.map((field) => {
        if (newFieldOfApp.includes(field.field_of_app)) {
          fieldPers.push(field.field_of_app);
        }
      });

      //let symDifference = arrayPrev.filter((x) => !arraySelected.includes(x)).concat(arraySelected.filter((x) => !arrayPrev.includes(x)));

      // newPersonList.push(pers);
      const diff = newFieldOfApp.filter((x) => !fieldPers.includes(x));
      if (diff.length === 0) newPersonList.push(pers);
      console.log(diff, fieldPers, newFieldOfApp);
      fieldPers = [];
      // if (check != pers.tech_field.length) newPersonList.push(pers);
    });
    console.log(newPersonList);
    return newPersonList;
  }

  function getTechnicianList() {
    // persons.map getFilterdPersonList();
    return getFilterdPersonList().map((pers) => {
      return (
        <div
          className={"serviceblock-form-sidebar__technician" + `${pers.id === selectTechnician ? " serviceblock-form-sidebar__technician--select" : ""}`}
          key={pers.id}
          onClick={() => {
            changeTechnician(pers.id);
          }}>
          {/* <p>{pers.personal_nr} </p> */}
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
            {/* <TextInput
            value={technician.value}
            onChange={technician.handleInputChangeEvent}
            error={technician.error}
            id={"technician"}
            name={"Service-Techniker"}
            size={"middle"}
          /> */}
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
          {/* <div className="serviceblock-form__input-wrapper">
            <TextInput
              value={technician.value}
              onChange={technician.handleInputChangeEvent}
              error={technician.error}
              id={"technician"}
              name={"Nr."}
              size={"short"}
            />
            <TextInput
              // value={getPersonFullName(Number(technician.value))}
              value={getPersonFullName(selectTechnician)}
              onChange={technician.handleInputChangeEvent}
              error={technician.error}
              id={"name"}
              name={"Name"}
              size={"long"}
            />
          </div> */}

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
