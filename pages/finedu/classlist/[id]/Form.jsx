import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Spin } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => {
    return import("@/components/Editor/Editor");
  },
  { ssr: false }
);
const FormClassList = ({ initForm, createClassList, updateClassList }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!initForm) {
      form.setFieldsValue({
        course_id: initForm?.id,
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
    };

    if (!!initForm) {
      await updateClassList(initForm?.id, handleValue);
    } else {
      await createClassList(handleValue);
    }
    setLoading(false);
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
        label="id"
        name="course_id"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Video url"
        name="video_url"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          <Spin spinning={loading}>Submit</Spin>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormClassList;
