import React, { useContext, useEffect, useState } from "react";
import styles from "../style.module.css";
import RequestTable from "@/components/Table/RequestTable";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/router";
import SortSelect from "@/components/Select/SortSelect";
import axiosInstance from "@/utils/axiosIntance";
import { SearchContext } from "@/context/searchContext";
import CustomSkeletion from "@/components/Skeleton/CustomSkeletion";
import useUser from "@/hooks/useUser";
import RequestFilter from "@/components/Filter/RequestFilter";
import moment from "moment";
import FilterComponent from "@/components/Filter/FilterComponent";
import { sortSystemAccount } from "@/utils/filter/sortList";
import CheckBoxFilter from "@/components/Filter/CheckBoxFilter";
import DateFilter from "@/components/Filter/DateFilter";
import { requestItems, statusItems } from "@/utils/filter/filterList";
import { getSystemRequest } from "@/apiClient/system";
import getQueryUrl from "@/utils/getQueryUrl";

function Request() {
  const { query } = useRouter();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);


  const { page, size, search, order, request_type_id, start_date, end_date, request_status_id } = getQueryUrl();
  const fetchSystemRequest = async () => {
    setLoading(true);
    const res = await getSystemRequest(
      page,
      size,
      order,
      search,
      start_date,
      end_date,
      request_type_id,
      request_status_id,
    );
    if (res?.code === 200) {
      setData(res?.data?.rows);
      setTotalPage(Math.round(res?.data?.count / Number(size)))

    }
    setLoading(false);
  };


  useEffect(() => {
    fetchSystemRequest();
  }, [query]);



  return (
    <div className="main-content">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <FilterComponent
          sortList={sortSystemAccount}
        >
          <CheckBoxFilter
            title={'Loại yêu cầu'}
            listCheck={requestItems}
            queryString={'request_type_id'}
          />
          <DateFilter
            title={'Thời gian tạo'}
          />
          <CheckBoxFilter
            title={'Trạng thái'}
            listCheck={statusItems}
            queryString={'request_status_id'}
          />
        </FilterComponent>
        <div>
          <button
            className={`${styles["request-btn"]}`}
            onClick={() => router.push("/system/request/create-request")}
          >
            Tạo yêu cầu
          </button>
        </div>
      </div>

      {loading ? (
        <CustomSkeletion style={{ marginTop: "52px" }} />
      ) : (
        <>
          <div className={`${styles["table"]}`} style={{ marginTop: "52px" }}>
            <RequestTable data={data} />
          </div>
        </>
      )}
      <Pagination
        page={Number(page)}
        total={totalPage}
      />
    </div>
  );
}

export default Request;
