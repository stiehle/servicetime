import { useState } from "react";
import { ValidationError } from "./../types/Validation";

export function useFormInput(initialValue: string | null, required = false) {
  if (initialValue === null) {
    initialValue = "";
  }

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<ValidationError>({ isError: false, errorMessage: "" });

  const handleInputChangeEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);
    validateInput(inputValue);

    if (required) {
      if (inputValue === "") {
        setError({ isError: true, errorMessage: "Bitte geben Sie einen Wert ein" });
      } else {
        setError({ isError: false, errorMessage: "" });
      }
    }
  };

  function validateInput(inputValue: string): boolean {
    if (required) {
      if (inputValue === "") {
        setError({ isError: true, errorMessage: "Bitte geben Sie einen Wert ein" });
        return false;
      } else {
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
