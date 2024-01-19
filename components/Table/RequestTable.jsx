import React from "react";

import styles from "./style.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

function RequestTable({ data }) {
  const router = useRouter();
  const handleClick = (item) => {
    console.log(item);
    if (item.request_type_id == 6) {
      router.push("/system/request/create/" + item.id);
    }
    if (item.request_type_id == 7) {
      router.push("/system/request/update/" + item.id);
    }
    if (item.request_type_id == 8) {
      router.push("/system/request/reset-password/" + item.id);
    }
  };
  if (data?.length === 0) return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <h1>Không có dữ liệu phù hợp tìm kiếm</h1>
    </div>
  )
  return (
    <div className={`${styles["table-wr"]}`}>
      <table className={`${styles["table"]}`}>
        <thead>
          <tr className={`${styles["table-tr"]}`}>
            <th className={`${styles["table-th"]}`}>ID</th>
            <th className={`${styles["table-th"]}`}>TÊN YÊU CẦU</th>
            <th className={`${styles["table-th"]}`}>NGƯỜI YÊU CẦU</th>
            <th className={`${styles["table-th"]}`}>THỜI GIAN TẠO</th>
            <th className={`${styles["table-th"]}`}>TRẠNG THÁI</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            console.log("item: ", item);
            return (
              <tr className={`${styles["table-tr"]}`} key={index}>
                <td className={`${styles["table-td"]}`}>#{item?.id}</td>
                <td className={`${styles["table-td"]}`}>
                  {item?.request_type?.name}
                </td>
                <td className={`${styles["table-td"]}`}>
                  {item?.admin_user_request_adminUser?.name}
                </td>
                <td className={`${styles["table-td"]}`}>
                  {moment(item?.created_at).format("DD/MM/YYYY, HH:mm:ss")}
                </td>
                <td
                  className={`${styles["table-td"]} ${item?.request_status_id == 0
                    ? styles["pending"]
                    : item.request_status_id == 1
                      ? styles["done"]
                      : styles["reject"]
                    }`}
                >
                  {item?.request_status?.name}
                </td>
                <td className={`${styles["table-td"]}`}>
                  <FiMoreHorizontal
                    className={`${styles["table-more-option"]}`}
                    onClick={() => handleClick(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;
