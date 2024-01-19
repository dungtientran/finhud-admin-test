import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import Pagination from "@/components/Pagination/Pagination";
import CustomSkeletion from "@/components/Skeleton/CustomSkeletion";
import TransactionRequestTable from "@/components/Table/TransactionRequestTable";
import FilterComponent from "@/components/Filter/FilterComponent";
import { sortTransactionRequest } from "@/utils/filter/sortList";
import { useRouter } from "next/router";
import { getTransactionRequest } from "@/apiClient/transaction";
import CheckBoxFilter from "@/components/Filter/CheckBoxFilter";
import DateFilter from "@/components/Filter/DateFilter";
import { requetTypeTransactionOrderFilter, statusItemCheckbox } from "@/utils/filter/filterList";
import getQueryUrl from "@/utils/getQueryUrl";

function CustomerRequest() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, order, search, start_date, end_date, request_status_id, type_id } = getQueryUrl();

  const fetchCustomerAccount = async () => {
    setLoading(true)
    const res = await getTransactionRequest(
      page,
      size,
      order,
      search,
      start_date,
      end_date,
      request_status_id,
      type_id,
    )
    setLoading(false);
    setData(res?.data?.rows);
    setTotalPage(Math.round(res?.data?.count / Number(size)))

  }
  useEffect(() => {
    fetchCustomerAccount();
  }, [query]);

  return (
    <div className="main-content">
      <FilterComponent
        sortList={sortTransactionRequest}
      >
        <CheckBoxFilter
          listCheck={requetTypeTransactionOrderFilter}
          title={'Loại lệnh'}
          queryString={'type_id'}
        />
        <DateFilter
          title={'Thời gian tạo'}
        />
        <CheckBoxFilter
          title={"Trạng thái"}
          listCheck={statusItemCheckbox}
          queryString={'request_status_id'}
        />
      </FilterComponent>
      {loading ? (
        <CustomSkeletion style={{ marginTop: "52px" }} />
      ) : (
        <>
          <div className={`${styles["table"]}`} style={{ marginTop: "52px" }}>
            <TransactionRequestTable
              data={data}
            />
          </div>
        </>
      )}
      <div>
        <Pagination
          page={(Number(page))}
          total={totalPage}
        />
      </div>
    </div>
  );
}

export default CustomerRequest;

