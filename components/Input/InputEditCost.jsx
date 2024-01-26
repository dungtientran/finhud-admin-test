import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { InputNumber } from "antd";

const InputEditCost = ({ hidden, onInputChange, initialValues, type }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [percentValue, setPercentValue] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFrom(initialValues.from);
      setTo(initialValues.to);
      setPercentValue(initialValues.value);
    }
  }, [initialValues]);

  const handleChangeFrom = (value) => {
    setFrom(value);
    onInputChange({ from: value, to, percentValue });
  };

  const handleChangeTo = (value) => {
    setTo(value);
    onInputChange({ from, to: value, percentValue });
  };

  const handleChangePercentValue = (value) => {
    setPercentValue(value);
    onInputChange({ from, to, value: value });
  };

  const formatterValue = (value) => {
    return `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div className={`${style.input_edit_cost}`}>
      <div>
        <span>Từ</span>
        <InputNumber
          style={{
            width: "100%",
            height: "40px",
          }}
          formatter={formatterValue}
          placeholder={type === "buy" ? "0 VND" : "0 tháng"}
          value={from}
          onChange={handleChangeFrom}
        />
      </div>
      <div>
        <span style={{ position: "relative" }}>Đến</span>
        <InputNumber
          style={{
            width: "100%",
            height: "40px",
          }}
          formatter={formatterValue}
          placeholder={type === "buy" ? "0 VND" : "0 tháng"}
          value={to}
          onChange={handleChangeTo}
        />
      </div>
      <div>
        <InputNumber
          style={{
            width: "150px",
            height: "40px",
          }}
          formatter={formatterValue}
          placeholder="0 %"
          value={percentValue}
          onChange={handleChangePercentValue}
        />
      </div>
    </div>
  );
};

export default InputEditCost;
