import { message } from "antd";
import axios from "axios";
import axiosInstance from "./axiosIntance";
const IMAGE_BUCKET = process.env.NEXT_PUBLIC_IMAGE_BUCKET;

export const getUrlImageUpload = async (files) => {
  try {
    const payload = {
      Bucket: `${IMAGE_BUCKET}/logofund`,
      Key: files.name,
      ContentType: files.type,
    };

    const getUrlSeverS3 = await axiosInstance.post(
      "/admin/get_pre_signed_url_put",
      payload
    );

    const urlS3 = getUrlSeverS3.data.url;

    const options = {
      headers: {
        "Content-Type": files.type,
      },
    };

    await axios.put(urlS3, files, options);

    const imageUrl = await axiosInstance.post(
      "/admin/get_pre_signed_url_get",
      payload
    );

    return imageUrl.data?.url;
  } catch (error) {
    console.log(error);
    message.error(`${error?.message}` || "Upload thất bại");

    return false;
  }
};
