import React from "react";
import styles from "./style.module.css";
import { useRouter } from "next/router";

function ChangeButton({ onClick, currentValue, title }) {
  const router = useRouter();
  return (
    <button
      onClick={() => onClick(!currentValue)}
      className={`${styles["goback-btn"]} ${styles["change-btn"]}`}
    >
      <span className={`${styles["goback-btn-text"]}`}>{title}</span>
    </button>
  );
}

export default ChangeButton;
