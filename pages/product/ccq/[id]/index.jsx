import React, { useEffect, useState } from "react";
import styles from "../../style.module.css";
import GoBackButton from "@/components/Button/GoBackButton";
import { Button, Spin, Tabs, message } from "antd";
import { useRouter } from "next/router";
import ChangeButton from "@/components/Button/ChangeButton";

import axiosInstance from "@/utils/axiosIntance";
import CustomSkeletion from "@/components/Skeleton/CustomSkeletion";
import ModelDeleteCcq from "@/components/Modal/ModelDeleteCcq";
import axios from "axios";
import moment from "moment";
import InfoProductCcq from "@/components/product/InfoProductCcq";
import CostProduct from "@/components/product/CostProduct";
import TradingSchedule from "@/components/product/TradingSchedule";
import ChartProduct from "@/components/product/ChartProduct";
import { splitArray } from "@/utils/splitArray";

import { errMessage, fundText } from "@/components/Constants";
import { findFirstDayOfNearestYearItem } from "@/utils/findFirstDayOfNearestYearItem";

const onChange = (key) => {
  console.log(key);
};

const ProductCcqDetal = () => {
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fundForm, setFundForm] = useState({});
  const [openModel, setOpenModle] = useState(false);
  const [loadingCrawl, setLoadingCrawl] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const fetchProductCcqDetal = async (id) => {
    setLoading(true);
    const res = await axiosInstance.get(`admin/product-ccq/${id}`);
    if (res.data?.code === 200) {
      setData(res?.data?.data);
      setFundForm(res?.data?.data);
    }
    setLoading(false);
  };

  const editProductCcq = (form) => setFundForm(form);

  const items = [
    {
      key: "1",
      label: `Thông tin`,
      children: (
        <InfoProductCcq
          dataProductCcq={data}
          isEdit={isEdit}
          edit={editProductCcq}
          fundForm={fundForm}
          setIsEdit={setIsEdit}
          setFundForm={setFundForm}
        />
      ),
    },
    {
      key: "2",
      label: `Biểu phí`,
      children: (
        <CostProduct
          dataProductCcq={data}
          isEdit={isEdit}
          edit={setFundForm}
          fundForm={fundForm}
        />
      ),
    },
    {
      key: "3",
      label: `Lịch giao dịch`,
      children: (
        <TradingSchedule
          dataProductCcq={data}
          isEdit={isEdit}
          edit={editProductCcq}
          fundForm={fundForm}
        />
      ),
    },
    {
      key: "4",
      label: `Biểu đồ`,
      children: (
        <ChartProduct
          dataProductCcq={data}
          isEdit={isEdit}
          edit={editProductCcq}
          fundForm={fundForm}
        />
      ),
    },
  ];

  useEffect(() => {
    if (id !== "create" || isEdit) {
      fetchProductCcqDetal(id);
    }
  }, [id, isEdit]);

  const handelOpenDelete = () => {
    setOpenModle(true);
  };

  const handleCrawlDataChart = async () => {
    setLoadingCrawl(true);
    try {
      const toDate = moment(new Date()).format("YYYYMMYY");
      const idCrawlResponse = await axiosInstance.get(
        `/admin/get-fm-id?fund_name=${data?.name}`
      );
      const productId = idCrawlResponse.data?.data?.idFm;
      if (!productId) {
        return message.error(errMessage.errGetIdFund);
      }
      const payload = {
        isAllData: 1,
        productId,
        fromDate: null,
        toDate,
      };
      const dataCrawlFm = await axios.post(
        process.env.NEXT_PUBLIC_FM_API,
        payload
      );

      const dataFmResponse = dataCrawlFm.data?.data;

      if (dataCrawlFm.data?.code !== 200) {
        setLoadingCrawl(false);
        return message.error(errMessage.errGetDataChart1);
      }

      if (dataFmResponse?.length === 0) {
        return message.error(errMessage.errGetDataChart1);
      }

      const latestPrice = dataFmResponse[dataFmResponse.length - 1].nav;
      const latestDate = dataFmResponse[dataFmResponse.length - 1].navDate;

      const firstDayOfNearestYear =
        findFirstDayOfNearestYearItem(dataFmResponse);

      const navFund =
        ((Number(latestPrice) - Number(firstDayOfNearestYear?.nav)) /
          Number(firstDayOfNearestYear?.nav)) *
        100;
      await axiosInstance.put(`/admin/edit-product-ccq/${id}`, {
        current_price: latestPrice,
        latest_date: latestDate,
        navFund,
      });

      const dataSaveDb = dataFmResponse?.map((item) => {
        return {
          date_yaxis: item?.navDate,
          value_xaxis: item?.nav,
          id_chart: item?.id,
        };
      });

      const splitDataSaveDb = splitArray(dataSaveDb);
      for (const dataChart of splitDataSaveDb) {
        try {
          const updateChart = await axiosInstance.post(`/admin/create-chart`, {
            fundName: data?.name,
            dataChart: dataChart,
          });
          message.success(updateChart?.data?.message);
        } catch (error) {
          setLoadingCrawl(false);
          return message.error(errMessage.errGetDataChart);
        }
      }
      fetchProductCcqDetal(id);
    } catch (error) {
      setLoadingCrawl(false);
      return message.error(errMessage.errGetDataChart);
    }
    setLoadingCrawl(false);
  };

  return (
    <div className="main-content">
      <div className={styles.box_nav_header}>
        <GoBackButton />
        {!isEdit && router.query.id !== "create" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ChangeButton
              currentValue={isEdit}
              onClick={setIsEdit}
              title="Thay đổi"
            />
            <ChangeButton
              currentValue={isEdit}
              onClick={handelOpenDelete}
              title="Xóa"
            />
          </div>
        )}
      </div>
      {loading ? (
        <CustomSkeletion style={{ marginTop: "52px" }} />
      ) : (
        <div className={`${styles["account"]}`}>
          <div style={{ margin: "30px 12px" }}>
            <Button onClick={handleCrawlDataChart}>
              <Spin spinning={loadingCrawl}>{fundText.updataFund}</Spin>
            </Button>
          </div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      )}
      <ModelDeleteCcq
        open={openModel}
        setOpen={setOpenModle}
        id={id}
        name={data?.name}
      />
    </div>
  );
};

export default ProductCcqDetal;
