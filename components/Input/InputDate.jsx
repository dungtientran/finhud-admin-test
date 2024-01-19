import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function InputDate({ onChange, styleWr, value, disableBeforeDay }) {
  const dateFormat = "DD/MM/YYYY";
  const disabledDate = (current) => {
    if (disableBeforeDay) {
      return current && current < disableBeforeDay;
    }
    else return false;
  };
  return (
    <div style={styleWr ? styleWr : {}}>
      <DatePicker
        disabledDate={disabledDate}
        onChange={onChange}
        format={dateFormat}
        defaultValue={value ? dayjs(value, dateFormat) : null}
      />
    </div>
  );
}

export default InputDate;
