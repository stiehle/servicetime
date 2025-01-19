import { ServicePerson } from "../types/person";

export type PersonManagementState = ServicePerson[];

export type PersonMangementAction =
  | {
      type: "INIT_PERSONS";
      person: ServicePerson[];
    }
  | {
      type: "ADD_PERSON" | "REMOVE_PERSON" | "UPDATE_PERSON";
      person: ServicePerson;
    };

export default function userManagementReducer(prevState: PersonManagementState, action: PersonMangementAction) {
  let updatedState: ServicePerson[];

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

      break;
    }

    default: {
      updatedState = prevState;

      break;
    }
  }

  return updatedState;
}
