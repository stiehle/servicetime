import { useState } from "react";
import { ValidationError } from "./../types/Validation";

export function useFormInput(initialValue: string, required = false) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<ValidationError>({ isError: false, errorMessage: "" });

  const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
    validateInput(inputValue);

    if (required) {
      if (inputValue === "") {
        //setze Fehler
        setError({ isError: true, errorMessage: "Bitte geben Sie einen Wert ein" });
      } else {
        // Reset
        setError({ isError: false, errorMessage: "" });
      }
    }
  };

  function validateInput(inputValue: string): boolean {
    if (required) {
      if (inputValue === "") {
        //setze Fehler
        setError({ isError: true, errorMessage: "Bitte geben Sie einen Wert ein" });
        return false;
      } else {
        // Reset
        setError({ isError: false, errorMessage: "" });
        return true;
      }
    }
    return true;
  }

  return {
    value,
    handleInputChangeEvent,
    error,
    validateInput: validateInput,
  };
}
