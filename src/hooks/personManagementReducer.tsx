import { service_person, service_persons } from "../types/person";

export type personManagementState = service_persons;

export type personMangementAction =
  | {
      type: "INIT_PERSONS";
      person: service_persons;
    }
  | {
      type: "ADD_PERSON" | "REMOVE_PERSON" | "UPDATE_PERSON";
      person: service_person;
    };

export default function userManagementReducer(prevState: personManagementState, action: personMangementAction) {
  let updatedState: service_persons;
  // console.log(prevState);

  switch (action.type) {
    case "ADD_PERSON": {
      updatedState = [...prevState, action.person];
      break;
    }

    case "REMOVE_PERSON": {
      updatedState = prevState.filter((pers) => pers.id !== action.person.id);
      break;
    }

    case "UPDATE_PERSON": {
      updatedState = prevState.map((pers) => (pers.id === action.person.id ? action.person : pers));
      break;
    }

    case "INIT_PERSONS": {
      // updatedState = [...prevState, ...action.person];
      updatedState = [...action.person];
      // console.log(updatedState);
      break;
    }

    default: {
      updatedState = prevState;

      break;
    }
  }

  return updatedState;
}
