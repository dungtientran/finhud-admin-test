import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Avatar,
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Space,
  Spin,
  Upload,
} from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import axiosInstance from "@/utils/axiosIntance";
import { UploadOutlined } from "@ant-design/icons";
import { getUrlImageUpload } from "@/utils/getUrlImageUpload";

const Editor = dynamic(
  () => {
    return import("@/components/Editor/Editor");
  },
  { ssr: false }
);
const FormClassList = ({ initForm, createClassList, updateClassList }) => {
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState([]);
  const [option2, setOption2] = useState([]);
  const [option3, setOption3] = useState([]);

  const [richText, setRichText] = useState("");
  const [richText2, setRichText2] = useState("");
  const [initRichtext, setInitRichtext] = useState("");
  const [initRichtext2, setInitRichtext2] = useState("");
  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    if (!!initForm) {
      form.setFieldsValue({
        ...initForm,
      });

      setInitRichtext(initForm?.what_you_can_learn);
      setInitRichtext2(initForm?.requirement);
    } else {
      form.resetFields();
      setInitRichtext("");
      setInitRichtext2("");
    }
  }, [initForm]);
  const [form] = Form.useForm();

  useEffect(() => {
    getTeacher();
    getProgram();
    getSubProgram();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const teacher_id = option.find(
      (item) => item.value === values?.teacher
    )?.id;

    const program_id = option2.find(
      (item) => item.value === values?.program
    )?.id;

    const sub_program_id = option2.find(
      (item) => item.value === values?.sub_program
    )?.id;

    const handleValue = {
      ...values,
      what_you_can_learn: richText,
      requirement: richText2,
      teacher_id,
      program_id,
      sub_program_id,
    };

    if (!!fileList) {
      const urlThumbnail = await getUrlImageUpload(fileList);
      handleValue.thumbnail_url = urlThumbnail;
    }

    if (!!initForm) {
      await updateClassList(initForm?.id, handleValue);
    } else {
      await createClassList(handleValue);
    }
    setLoading(false);
  };

  const handleRichText = (data) => setRichText(data);
  const handleRichText2 = (data) => setRichText2(data);

  const getTeacher = async () => {
    try {
      const res = await axiosInstance.get("/admin/edu/lecturer");
      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data?.rows;
        const newOption = dataResponse?.map((item) => ({
          id: item?.id,
          value: item?.name,
        }));
        setOption(newOption);
      } else {
        message.error("Lỗi khi lấy dữ liệu giảng viên");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const getSubProgram = async () => {
    try {
      const res = await axiosInstance.get("/admin/edu/sub-program");
      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data;
        const newOption = dataResponse?.map((item) => ({
          id: item?.id,
          value: item?.name,
        }));
        setOption3(newOption);
      } else {
        message.error("Lỗi khi lấy dữ liệu sub program");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };
  const getProgram = async () => {
    try {
      const res = await axiosInstance.get("/admin/edu/program");
      if (res.data?.data?.code === 200) {
        const dataResponse = res.data?.data?.data;
        const newOption = dataResponse?.map((item) => ({
          id: item?.id,
          value: item?.name,
        }));
        setOption2(newOption);
      } else {
        message.error("Lỗi khi lấy dữ liệu program");
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  const handleImageChange = (infor) => {
    setFileList(infor.file);
  };
  return (
    <Form
      form={form}
      name="register"
      layout="vertical"
      autoComplete="off"
      style={{ maxWidth: 600 }}
      scrollToFirstError
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="short_description"
        name="short_description"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Thumbnail"
        name="thumbnail_url"
        // rules={[{ required: true, message: "Không đc bỏ trống !" }]}
        valuePropName="fileList"
      >
        <Space direction="vertical">
          <Image src={initForm?.thumbnail_url} />
          <Upload
            action=""
            listType="picture"
            maxCount={1}
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImageChange}
            beforeUpload={(_) => {
              return false;
            }}
          >
            <Space size="large">
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Space>
          </Upload>
        </Space>
      </Form.Item>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Form.Item label="Price" name="price" style={{ flex: 1 }}>
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item label="Sale Price" name="sale_price" style={{ flex: 1 }}>
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item
          label="Student count"
          name="student_count"
          style={{ flex: 1 }}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
      </div>

      <div>
        <Form.Item name="teacher" label="Giảng viên">
          <AutoComplete
            style={{ width: "300px" }}
            options={option}
            placeholder="Nhập giảng viên"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            size="large"
          />
        </Form.Item>

        <Form.Item name="sub_program" label="Sub program">
          <AutoComplete
            style={{ width: "300px" }}
            options={option3}
            placeholder="Nhập sub program"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            size="large"
          />
        </Form.Item>

        <Form.Item name="program" label="program_id">
          <AutoComplete
            style={{ width: "300px" }}
            options={option2}
            placeholder="Nhập program"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            size="large"
          />
        </Form.Item>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Form.Item label="language" name="language">
          <Input />
        </Form.Item>

        <Form.Item label="level" name="level">
          <Input />
        </Form.Item>
      </div>

      <div>
        <p>Bạn có thể học được gì</p>
        <div style={{ margin: "20px 0" }}>
          <Editor handleRichText={handleRichText} initialData={initRichtext} />
        </div>
      </div>
      <div>
        <p>Yêu cầu</p>
        <div style={{ margin: "20px 0" }}>
          <Editor
            handleRichText={handleRichText2}
            initialData={initRichtext2}
          />
        </div>
      </div>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          <Spin spinning={loading}>Submit</Spin>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormClassList;
