import moment from "moment";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = ({ chartData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "gray",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p style={{ color: "#FFFFFF" }}>{`Giá: ${Number(
            payload[0].value
          ).toLocaleString()}`}</p>
          <p style={{ color: "#FFFFFF" }}>{`Ngày: ${moment(label).format(
            "DD/MM/YYYY"
          )}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date_yaxis" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value_xaxis"
          stackId="1"
          stroke="#1870F5"
          fill="#0DA6C2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
