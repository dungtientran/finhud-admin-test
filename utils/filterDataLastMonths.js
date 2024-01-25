export const filterDataLastMonths = (
  dataChart,
  numberOfMonths,
  setStartMonth,
  setEndMonth,
  setNav
) => {
  if (dataChart.length === 0) {
    return [];
  }

  // Sắp xếp mảng theo thời gian giảm dần
  const sortedData = dataChart?.sort((a, b) => {
    return new Date(b?.date_yaxis) - new Date(a?.date_yaxis);
  });

  // Lấy tháng cuối cùng trong mảng
  const endMonth = sortedData?.[0]?.date_yaxis;

  const startDate = new Date(endMonth);

  startDate.setMonth(startDate.getMonth() - numberOfMonths);
  const startMonth = startDate.toISOString().slice(0, 7);
  const filteredData = dataChart.filter((item) => {
    const itemDate = new Date(item.date_yaxis);
    return itemDate >= new Date(startMonth) && itemDate <= new Date(endMonth);
  });

  const resultFilterData = filteredData.reverse();
  const priceFirst = resultFilterData?.[0].value_xaxis;
  const priceEnd = resultFilterData?.[resultFilterData?.length - 1].value_xaxis;

  const nav =
    ((Number(priceEnd) - Number(priceFirst)) / Number(priceFirst)) * 100;

  setNav(nav);

  setStartMonth(resultFilterData?.[0].date_yaxis);
  setEndMonth(resultFilterData?.[resultFilterData?.length - 1].date_yaxis);

  return resultFilterData;
};
