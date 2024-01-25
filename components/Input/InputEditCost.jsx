import React, { useEffect, useState } from "react";
import style from "./style.module.css";

const InputEditCost = ({ hidden, onInputChange, initialValues }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [percentValue, setPercentValue] = useState(null);

  useEffect(() => {
    if (initialValues) {
      const formFormatFrom = formatNumber(initialValues.from);
      const formFormatTo = formatNumber(initialValues.to);
      const formFormatValue = formatNumber(initialValues.value);
      setFrom(formFormatFrom);
      setTo(formFormatTo);
      setPercentValue(formFormatValue);
    }
  }, [initialValues]);

  const formatNumber = (input) => {
    // Xóa tất cả các ký tự không phải số và chỉ giữ lại số và dấu chấm phẩy
    const cleanedValue = input?.replace(/[^\d.]/g, "");

    // Chia thành phần nguyên và phần thập phân
    const parts = cleanedValue?.split(".");
    let integerPart = parts?.[0];
    let decimalPart = parts?.[1];

    // Thêm dấu chấm phẩy vào phần nguyên để tạo định dạng số
    integerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Nếu có phần thập phân, thêm lại vào giá trị định dạng
    const formattedValue =
      decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;

    return formattedValue;
  };

  const handleChangeFrom = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatNumber(inputValue);
    setFrom(formattedValue);
    onInputChange({ from: formattedValue, to, percentValue });
  };
  const handleChangeTo = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatNumber(inputValue);
    setTo(formattedValue);
    onInputChange({ from, to: formattedValue, percentValue });
  };
  const handleChangePercentValue = (event) => {
    const inputValue = event.target.value;
    const formattedValue = formatNumber(inputValue);
    setPercentValue(formattedValue);
    onInputChange({ from, to, value: formattedValue });
  };

  return (
    <>
      <div className={`${style.input_edit_cost}`}>
        {/* From */}
        <span>Từ</span>
        <div className="">
          <input
            type="text"
            style={{
              display: `${hidden ? "none" : "block"}`,
            }}
            placeholder="0 VND"
            value={from}
            onChange={handleChangeFrom}
          />
        </div>
        {/* To */}
        <span
          style={{
            position: "relative",
          }}
        >
          Đến
        </span>
        <div className="">
          <input
            type="text"
            value={to}
            onChange={handleChangeTo}
            style={{
              display: `${hidden ? "none" : "block"}`,
            }}
            placeholder="0 VND"
          />
        </div>
        {/* PercentValue */}
        <input
          type="text"
          value={percentValue}
          onChange={handleChangePercentValue}
          style={{
            display: `${hidden ? "none" : "flex"}`,
          }}
          placeholder="0%"
        />
      </div>
    </>
  );
};

export default InputEditCost;
