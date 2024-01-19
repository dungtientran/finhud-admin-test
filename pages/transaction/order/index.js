import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import CustomSkeletion from "@/components/Skeleton/CustomSkeletion";
import Pagination from "@/components/Pagination/Pagination";
import TransactionTable from "@/components/Table/TransactionTable";
import FilterComponent from "@/components/Filter/FilterComponent";
import { sortTransactionOrder } from "@/utils/filter/sortList";
import { getTransactionOrder } from "@/apiClient/transaction";
import { useRouter } from "next/router";
import { requetTypeTransactionOrderFilter, statusTransactionOrderFilter } from "@/utils/filter/filterList";
import DateFilter from "@/components/Filter/DateFilter";
import CheckBoxFilter from "@/components/Filter/CheckBoxFilter";
import getQueryUrl from "@/utils/getQueryUrl";

function Transaction() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, order, search, start_date, end_date, status_id, type_id } = getQueryUrl();

  const fetchCustomerAccount = async () => {
    setLoading(true);
    const res = await getTransactionOrder(
      page,
      size,
      order,
      search,
      start_date,
      end_date,
      status_id,
      type_id,
    );
    setLoading(false);
    setData(res?.data?.rows);
    setTotalPage(Math.round(res?.data?.count / Number(size)));
  }
  useEffect(() => {
    fetchCustomerAccount();
  }, [query]);
  return (
    <>
      <div className="main-content">
        <FilterComponent
          sortList={sortTransactionOrder}
        >
          <CheckBoxFilter
            listCheck={requetTypeTransactionOrderFilter}
            title={"Loại lệnh"}
            queryString={'type_id'}
          />
          <DateFilter
            title={"Thời gian tạo"}
          />
          <CheckBoxFilter
            title={"Trạng thái"}
            listCheck={statusTransactionOrderFilter}
            queryString={'status_id'}
          />
        </FilterComponent>

        {loading ? (
          <CustomSkeletion style={{ marginTop: "52px" }} />
        ) : (
          <>
            <div className={`${styles["table"]}`} style={{ marginTop: "52px" }}>
              <TransactionTable
                data={data}
              />
            </div>
          </>
        )}
        <div>
          <Pagination
            page={Number(page)}
            total={totalPage}
          />
        </div>
      </div>
    </>
  );
}

export default Transaction;

