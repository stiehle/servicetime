import { createContext, Dispatch } from "react";
import {
  PersonManagementState,
  PersonMangementAction,
} from "./../hooks/personManagementReducer";

export const PersonContext = createContext<{
  persons: PersonManagementState;
  personsDispatch: Dispatch<PersonMangementAction>;
}>({
  persons: [],
  personsDispatch: () => {},
});
