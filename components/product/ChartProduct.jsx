import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import axiosInstance from "@/utils/axiosIntance";
import { Button, Spin, message } from "antd";
import { filterDataLastMonths } from "@/utils/filterDataLastMonths";
import AreaChartComponent from "./AreaChartComponent";
import { fundText } from "../Constants";

const months = [
  {
    label: `1 tháng`,
    value: 1,
  },
  {
    label: `3 tháng`,
    value: 3,
  },
  {
    label: `6 tháng`,
    value: 6,
  },
  {
    label: `1 năm`,
    value: 12,
  },
  {
    label: "Tất cả",
    value: 100,
  },
];

const ChartProduct = ({
  dataProductCcq,
  handleCrawlDataChart,
  loadingCrawl,
}) => {
  const [dataChart, setDataChart] = useState([]);
  const [isActiveMonth, setActiceMoth] = useState(3);
  const [allDataChart, setAllDataChart] = useState([]);
  const [loading, setLoading] = useState();
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(3);
  const [nav, setNav] = useState(0);

  useEffect(() => {
    getDataChart(dataProductCcq?.name);
  }, [dataProductCcq]);

  const getDataChart = async (nameFund) => {
    try {
      const response = await axiosInstance.get(
        `/admin/get-data-chart?fund_name=${nameFund}`
      );
      if (response.data?.data?.code === 200) {
        const dataChartResponse = response.data?.data?.data;
        const handleChartResponse = dataChartResponse?.map((item) => {
          return {
            date_yaxis: item.date_yaxis,
            value_xaxis: item.value_xaxis,
          };
        });

        const filterDataFirst = filterDataLastMonths(
          dataChartResponse,
          isActiveMonth,
          setStartMonth,
          setEndMonth,
          setNav
        );
        setAllDataChart(handleChartResponse);

        setDataChart(filterDataFirst);
      } else {
        message.error("Có lỗi khi lấy dữ liệu biểu đồ!");
      }
    } catch (error) {
      message.error(`${error?.message}` || "Có lỗi khi lấy dữ liệu biểu đồ!");
    }
  };

  useEffect(() => {
    const filterData = filterDataLastMonths(
      allDataChart,
      isActiveMonth,
      setStartMonth,
      setEndMonth,
      setNav
    );
    setDataChart(filterData);
  }, [isActiveMonth]);

  return (
    <div style={{ minHeight: "500px" }}>
      <div className={`${styles.chart_CCQ}`}>
        <div>
          <p>Giá gần nhất: </p>
          {/* <p>AUM:</p> */}
          <p>Biểu đồ tăng trưởng NAV:</p>
        </div>
        <div className={styles.value}>
          <p>{Number(dataProductCcq?.current_price)?.toLocaleString()} VND</p>
          {/* <p>1,000,000,000,000 VND</p> */}
          <p className={`${styles.chart_percent}`}>{Number(nav).toFixed(2)}%</p>
        </div>
      </div>
      <div
        style={{
          margin: "",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Button onClick={handleCrawlDataChart}>
          <Spin spinning={loadingCrawl}>{fundText.updataFund}</Spin>
        </Button>
      </div>
      <div className={styles.chart_CCQ_container}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {months.map((month, index) => (
            <div
              key={index}
              style={{
                border: "1px solid",
                borderRadius: "5px",
                width: "70px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderColor:
                  isActiveMonth === month.value ? "#1870F5" : "#9C9AC1",
              }}
              onClick={() => setActiceMoth(month.value)}
            >
              <p
                style={{
                  color: isActiveMonth === month.value ? "#1870F5" : "#9C9AC1",
                  margin: 0,
                }}
              >
                {month.label}
              </p>
            </div>
          ))}
        </div>

        <div>
          {/* <LineChart width={1200} height={600} style={{}} data={dataChart}>
            <XAxis dataKey="date_yaxis" />
            <YAxis tickCount={5000} domain={[3000, maxUVValue + 500]} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="value_xaxis" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
          </LineChart> */}
        </div>
        <AreaChartComponent chartData={dataChart} />
      </div>
    </div>
  );
};

export default ChartProduct;
