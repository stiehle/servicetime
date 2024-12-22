import { ChangeEventHandler } from "react";
import "./Dateinput.scss";
import { ValidationError } from "./../../types/Validation";

type DateInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  error: ValidationError;
  name: string;
};

function DateInput({ value, onChange, error, id, name }: DateInputProps) {
  function displayError() {
    if (error.isError) {
      return (
        <>
          <p className={"date-input__error"}>{error.errorMessage}</p>
        </>
      );
    }
  }
  return (
    <div className="date-input">
      <label className="date-input__label" htmlFor={id}>
        {name}:
      </label>
      <input className="date-input__date" type="date" id={id} value={value} onChange={onChange} />
      {displayError()}
    </div>
  );
}

export default DateInput;
