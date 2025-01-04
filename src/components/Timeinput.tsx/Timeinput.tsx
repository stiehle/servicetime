import { ChangeEventHandler } from "react";
import "./Timeinput.scss";
import { ValidationError } from "../../types/Validation";

type DateInputProps = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id: string;
  error: ValidationError;
  name: string;
};

function TimeInput({ value, onChange, error, id, name }: DateInputProps) {
  function displayError() {
    if (error.isError) {
      return (
        <>
          <p className={"time-input__error"}>{error.errorMessage}</p>
        </>
      );
    }
  }
  return (
    <div className="time-input">
      <label className="time-input__label" htmlFor={id}>
        {name}:
      </label>
      <input className="time-input__time" type="time" id={id} value={value} onChange={onChange} />
      {displayError()}
    </div>
  );
}

export default TimeInput;
