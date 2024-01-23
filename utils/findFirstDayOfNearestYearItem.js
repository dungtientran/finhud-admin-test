export const findFirstDayOfNearestYearItem = (data) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nearestYearData = data.find((entry) => {
    const entryYear = new Date(entry.navDate).getFullYear();
    return entryYear === currentYear;
  });

  return nearestYearData || null;
};
