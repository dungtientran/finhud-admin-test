import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { FiChevronDown } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import InputDate from "../Input/InputDate";
import moment from "moment";

const roleItems = [
  {
    label: "Tất cả",
    value: "",
  },
  {
    label: "NV kiểm soát",
    value: "0",
  },
  {
    label: "NV báo cáo",
    value: 2,
  },
  {
    label: "NV hệ thống",
    value: 3,
  },
  {
    label: "NV quản trị",
    value: 4,
  },
  {
    label: "NV IT",
    value: 5,
  },
];

const statusItems = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: 1,
    label: "Đang hoạt động",
  },
  {
    value: 0,
    label: "Ngừng hoạt động",
  },
];

function Filter({ handleSelected = () => {}, filter, setFilter }) {
  const [roleValue, setRoleValue] = useState(roleItems[0]);
  // date picker control
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [createdDateValue, setCreatedDateValue] = useState({
    start: null,
    end: null,
  });

  const [statusValue, setStatusValue] = useState(statusItems[0]);

  const [showSelect, setShowSelect] = useState("");

  const [roles, setRoles] = useState(roleItems);
  const [statusOptions, setStatusOptions] = useState(statusItems);

  const roleRef = useRef();
  const createdDateRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (
        roleRef.current &&
        !roleRef.current.contains(event.target) &&
        // createdDateRef.current &&
        // !createdDateRef.current.contains(event.target) &&
        statusRef.current &&
        !statusRef.current.contains(event.target)
      ) {
        setShowSelect("");
      }
    });
  }, []);

  const selectDate = (type, value) => {
    const objDate = {
      ...createdDateValue,
      [type]: value === null ? value : value.$d,
    };
    setCreatedDateValue(objDate);
    const new_filter = {
      ...filter,
      [type]: value === null ? value : value.$d,
    };
    setFilter(new_filter);
    if (type === "end") {
      setShowDatePicker(false);
    }

    if (new_filter.start && new_filter.end) {
      // lọc theo ngày thì phải đủ cả 2 ngày
      handleSelected(new_filter);
    }
  };

  const onRoleSelected = (item) => {
    const new_filter = {
      ...filter,
      role: item.value,
    };
    setFilter(new_filter);
    setRoleValue(item);
    setShowSelect("");
    handleSelected(new_filter);
  };

  const onActiveStatus = (item) => {
    const new_filter = {
      ...filter,
      status: item.value,
    };
    setFilter(new_filter);
    setStatusValue(item);
    setShowSelect("");
    handleSelected(new_filter);
  };

  const resetFilter = () => {
    setRoleValue(roleItems[0]);
    setCreatedDateValue({
      start: null,
      end: null,
    });
    setStatusValue(statusItems[0]);
    setFilter({
      role: "",
      status: "",
      start: "",
      end: "",
    });
    // -------------
    handleSelected({
      role: "",
      status: "",
      start: "",
      end: "",
    });
  };

  const isDateSelected = () => {
    if (createdDateValue.start !== null || createdDateValue.end !== null) {
      return true;
    }
    return false;
  };

  return (
    <div className={`${styles["select-box"]}`}>
      <div className={styles["bs-sliders-parent"]}>
        <BsSliders className={styles["bs-sliders"]} />
      </div>
      <div
        className={`${styles["select"]}`}
        onClick={() => setShowSelect("roles")}
        ref={roleRef}
      >
        <p className={roleValue !== roleItems[0] ? "text-blue" : "text"}>
          Vai trò
        </p>
        <FiChevronDown className={`${styles["chevron-down"]}`} />
        {showSelect === "roles" && (
          <ul className={`${styles["select-list"]}`}>
            {roles?.map((item, index) => (
              <li
                className={`${styles["select-option"]} ${
                  item.value === roleValue.value ? styles["selected"] : ""
                }`}
                key={`role_${index}`}
                onClick={() => onRoleSelected(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={`${styles["select"]}`}

        // ref={createdDateRef}
      >
        <p
          onClick={() => {
            setShowDatePicker(true);
          }}
          className={isDateSelected() ? "text-blue" : "text"}
        >
          Thời gian tạo
        </p>
        <FiChevronDown className={`${styles["chevron-down"]}`} />
        {showDatePicker && (
          <ul className={`${styles["select-list-date"]}`}>
            <li className={`${styles["select-date"]}`}>
              Ngày bắt đầu
              <InputDate
                onChange={(e) => selectDate("start", e)}
                value={createdDateValue.start}
              />
            </li>
            <li className={`${styles["select-date"]}`}>
              Ngày kết thúc
              <InputDate
                disableBeforeDay={createdDateValue.start}
                onChange={(e) => selectDate("end", e)}
                value={createdDateValue.end}
              />
            </li>
          </ul>
        )}
      </div>

      <div
        className={`${styles["select"]}`}
        onClick={() => setShowSelect("status")}
        ref={statusRef}
      >
        <p className={statusValue !== statusItems[0] ? "text-blue" : "text"}>
          Trạng thái
        </p>
        <FiChevronDown className={`${styles["chevron-down"]}`} />
        {showSelect === "status" && (
          <ul className={`${styles["select-list"]}`}>
            {statusOptions?.map((item, index) => (
              <li
                className={`${styles["select-option"]} ${
                  item.value === statusValue.value ? styles["selected"] : ""
                }`}
                key={`status_${index}`}
                onClick={() => onActiveStatus(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`${styles["delete"]}`} onClick={resetFilter}>
        <p>Xóa</p>
      </div>
    </div>
  );
}

export default Filter;
