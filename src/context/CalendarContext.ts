import { createContext } from "react";

export const CalendarContext = createContext<{
  days: number[];
}>({
  days: [],
});
