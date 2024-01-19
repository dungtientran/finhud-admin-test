import React, { useContext, useEffect, useState } from "react";
import styles from "../style.module.css";
import AccountTable from "@/components/Table/AccountTable";
import Pagination from "@/components/Pagination/Pagination";
import SortSelect from "@/components/Select/SortSelect";
import axiosInstance from "@/utils/axiosIntance";
import { SearchContext } from "@/context/searchContext";
import CustomSkeletion from "@/components/Skeleton/CustomSkeletion";
import AccountFilter from "@/components/Filter/AccountFilter";
import moment from "moment";
import FilterComponent from "@/components/Filter/FilterComponent";
import { sortSystemAccount } from "@/utils/filter/sortList";
import SelectFilter from "@/components/Filter/SelectFilter";
import { roleFilterSystem, statusSystemFilter } from "@/utils/filter/filterList";
import DateFilter from "@/components/Filter/DateFilter";
import { getSystemAccount } from "@/apiClient/system";
import getQueryUrl from "@/utils/getQueryUrl";
import { useRouter } from "next/router";
import CheckBoxFilter from "@/components/Filter/CheckBoxFilter";

function Account() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const { query } = useRouter();
  const { page, size, search, order, role_id, start_date, end_date, admin_user_status_id } = getQueryUrl();
  const fetchSystemAccount = async () => {
    setLoading(true);
    const res = await getSystemAccount(
      page,
      size,
      order,
      search,
      start_date,
      end_date,
      role_id,
      admin_user_status_id,
    )
    if (res?.code === 200) {
      setData(res?.data?.rows);
      setTotalPage(Math.round(res?.data?.count / Number(size)))

    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSystemAccount();
  }, [query]);



  return (
    <div className="main-content">
      <FilterComponent
        sortList={sortSystemAccount}
      >
        <CheckBoxFilter
          title={'Vai trò'}
          queryString={'role_id'}
          listCheck={roleFilterSystem}
        />
        <DateFilter
          title={'Thời gian tạo'}
        />
        <CheckBoxFilter
          title={'Trạng thái'}
          listCheck={statusSystemFilter}
          queryString={'admin_user_status_id'}
        />
      </FilterComponent>

      {loading ? (
        <CustomSkeletion style={{ marginTop: "52px" }} />
      ) : (
        <>
          <div className={`${styles["table"]}`} style={{ marginTop: "52px" }}>
            <AccountTable data={data} />
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
  );
}

export default Account;
