import React from "react";
import styles from "./style.module.css";
import { generateRandomString } from "@/utils/helper";

function Checkbox({ title, value, checked = false, currentValue, onChange }) {
  const id = generateRandomString();
  const selectItem = (e) => {
    console.log(`Checkbox value ${value}`);
    if (e.target.checked) {
      currentValue.push(value);
    } else {
      currentValue = currentValue.filter(x => x !== value);
    }
    onChange(currentValue);
  }
  return (
    <fieldset className={styles["v-checkbox"]}>
      <input className={styles["field"]} id={id} type="checkbox" defaultChecked={checked} onChange={selectItem}/>
      <label className={styles["label"]} htmlFor={id}>{title}</label>
    </fieldset>
  );
}

export default Checkbox;
