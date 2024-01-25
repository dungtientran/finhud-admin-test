import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import axiosInstance from "@/utils/axiosIntance";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
import { message } from "antd";
import { filterDataLastMonths } from "@/utils/filterDataLastMonths";
// import { Line } from "react-chartjs-2";

const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

const options = {
  scales: {
    x: {
      type: "category",
      labels: data.labels,
    },
    y: {
      beginAtZero: false,
    },
  },
};

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
  isEdit,
  edit,
  fundForm,
  setIsEdit,
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
        message.error("Có lỗi khi lấy data chart!");
      }
    } catch (error) {
      message.error(`${error?.message}` || "Có lỗi khi lấy data chart!");
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

  const config = {
    data,
    xField: "year",
    yField: "value",
  };
  console.log("dataChart_________________________", dataChart);
  return (
    <div style={{ minHeight: "500px" }}>
      <div className={`${styles.chart_CCQ}`}>
        <div>
          <p>Giá gần nhất:</p>
          {/* <p>AUM:</p> */}
          <p>Biểu đồ tăng trưởng NAV:</p>
        </div>
        <div className={styles.value}>
          <p> VND</p>
          {/* <p>1,000,000,000,000 VND</p> */}
          <p className={`${styles.chart_percent}`}>{Number(nav).toFixed(2)}%</p>
        </div>
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
            <Line type="monotone" dataKey="value_xaxis" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
          </LineChart> */}
          {/* <Line {...config} />; */}
        </div>
      </div>
    </div>
  );
};

export default ChartProduct;
