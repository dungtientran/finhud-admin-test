const getRecruitment = async () => {
  try {
    const res = await axiosInstance.get("/admin/job");

    if (res.data?.data?.code === 200) {
      const dataResponse = res.data?.data?.data;

      return dataResponse;
    }

    return [];
  } catch (error) {
    console.log(error);
  }
};
