import React, { useEffect, useState } from "react";
import { Avatar, Button, Form, Input, Space, Spin, Upload } from "antd";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import { getUrlImageUpload } from "@/utils/getUrlImageUpload";

const Forma = ({ initForm, createRecruitment, updateRecruitment }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    if (!!initForm) {
      form.setFieldsValue({
        ...initForm,
        deadline: dayjs(`${initForm?.apply_deadline}`),
      });
    } else {
      form.resetFields();
    }
  }, [initForm]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    const handleValue = {
      ...values,
      apply_deadline: values?.deadline,
      avatar: "",
    };

    if (!!fileList) {
      const urlAvatar = await getUrlImageUpload(fileList);
      handleValue.avatar = urlAvatar;
    }

    if (!!initForm) {
      await updateRecruitment(initForm?.id, handleValue);
    } else {
      await createRecruitment(handleValue);
    }
    setLoading(false);
  };

  const onChange = (date, dateString) => {
    console.log(dateString);
  };

  const handleRichText = (data) => setRichText(data);

  const handleImageChange = (infor) => {
    setFileList(infor.file);
  };

  console.log("fileList", fileList);
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
        label="Tên giảng viên"
        name="name"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Avatar"
        name="avatar"
        // rules={[{ required: true, message: "Không đc bỏ trống !" }]}
        valuePropName="fileList"
      >
        <Space>
          <Avatar src={initForm?.avatar} size="large" />
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

      <Form.Item
        label="Chuyên ngành"
        name="major"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Địa chỉ" name="location" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Facebook url" name="facebook_url">
        <Input />
      </Form.Item>
      <Form.Item label="Lindedin url" name="linkedin_url">
        <Input />
      </Form.Item>
      <Form.Item label="Instagram url" name="instagram_url">
        <Input />
      </Form.Item>
      <Form.Item label="Twitter url" name="twitter_url">
        <Input />
      </Form.Item>
      <Form.Item label="Giới thiệu" name="description">
        <Input.TextArea style={{ height: "250px" }} />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          <Spin spinning={loading}>Submit</Spin>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forma;
