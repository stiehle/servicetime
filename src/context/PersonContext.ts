import { createContext, Dispatch } from "react";
import { personManagementState, personMangementAction } from "./../hooks/personManagementReducer";

export const PersonContext = createContext<{
  persons: personManagementState;
  personsDispatch: Dispatch<personMangementAction>;
}>({
  persons: [],
  personsDispatch: () => {},
});
