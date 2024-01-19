import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { FiChevronDown } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import InputDate from "../Input/InputDate";
import moment from "moment";
import Checkbox from "../Checkbox/Checkbox";

const requestItems = [
  {
    value: 5,
    label: "Mua",
  },
  {
    value: 9,
    label: "Bán",
  },
];

const statusItems = [
  {
    value: 0,
    label: "Chờ phê duyệt",
  },
  {
    value: 1,
    label: "Đã được phê duyệt",
  },
  {
    value: 2,
    label: "Không được phê duyệt",
  },
];

function Filter({filter, setFilter }) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [createdDateValue, setCreatedDateValue] = useState({
    start: null,
    end: null,
  });


  const [requestTypeValue, setRequestTypeValue] = useState(requestItems.map(x => x.value));
  const [statusValue, setStatusValue] = useState(statusItems.map(x => x.value));

  const [showSelect, setShowSelect] = useState("");

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
      [type]: value
    };
    setCreatedDateValue(objDate);
    const new_filter = {
      ...filter,
      [type]: value === null ? value : value.$d
    }
    setFilter(new_filter);
    if(type === "end"){
      setShowDatePicker(false)
    }
  };

  const resetFilter = () => {
    console.log("resetFilter")
    setShowDatePicker(false)
    setFilter({
      request_type_id: requestItems.map(x => x.value),
      request_status_id: statusItems.map(x => x.value),
      start: '',
      end: '',
    })
    setCreatedDateValue({
      start: null,
      end: null,
    });
    setRequestTypeValue(requestItems.map(x => x.value));
    setStatusValue(statusItems.map(x => x.value));
    
  };

  return (
    <div className={`${styles["select-box"]}`}>
      <div className={styles["bs-sliders-parent"]}>
        <BsSliders className={`${styles["bs-sliders"]} ${(createdDateValue.start || createdDateValue.end || requestTypeValue.length != requestItems.length || statusValue.length != statusItems.length) ? styles['changed'] : ''}`} />
      </div>
      <div
        className={`${styles["select"]}`}
        onClick={() => setShowSelect("request_types")}
        ref={roleRef}
      >
        <p className={`text ${requestTypeValue.length != requestItems.length ? styles['changed'] : ''}`}>Loại lệnh</p>
        <FiChevronDown className={`${styles["chevron-down"]} ${requestTypeValue.length != requestItems.length ? styles['changed'] : ''}`} />
        {showSelect === "request_types" && (
          <ul className={`${styles["select-list"]}`}>
            {requestItems?.map((item, index) => (
              <li
                className={`${styles["select-option"]}`}
                key={`request_type_${index}`}
              >
                <Checkbox
                 title={item.label} 
                 value={item.value} 
                 checked={requestTypeValue.includes(item.value)} 
                 currentValue={requestTypeValue} 
                 onChange={(value)=>{
                  setShowSelect('')
                  setRequestTypeValue(value)
                  setFilter({
                    ...filter,
                    request_type_id: value
                  })
                 }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={`${styles["select"]}`}
      >
        <p 
          onClick={() =>{
            setShowDatePicker(true)
          }} 
          className={`text ${(createdDateValue.start || createdDateValue.end) ? styles['changed'] : ''}`}>
            Thời gian tạo
          </p>
        <FiChevronDown className={`${styles["chevron-down"]} ${(createdDateValue.start || createdDateValue.end) ? styles['changed'] : ''}`} />
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
        <p className={`text ${statusValue.length != statusItems.length ? styles['changed'] : ''}`}>Trạng thái</p>
        <FiChevronDown className={`${styles["chevron-down"]} ${statusValue.length != statusItems.length ? styles['changed'] : ''}`} />
        {showSelect === "status" && (
          <ul className={`${styles["select-list"]}`}>
            {statusItems?.map((item, index) => (
              <li
                className={`${styles["select-option"]}`}
                key={`status_${index}`}
              >
                <Checkbox
                 title={item.label} 
                 value={item.value} 
                 checked={statusValue.includes(item.value)} 
                 currentValue={statusValue} 
                 onChange={(value) => {
                  setShowSelect('')
                  console.log(value);
                  setStatusValue(value);
                  setFilter({
                    ...filter,
                    request_status_id: value
                  })
                 }}
                />
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
