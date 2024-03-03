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

  const [richText, setRichText] = useState("");
  const [richText2, setRichText2] = useState("");
  const [initRichtext, setInitRichtext] = useState("");
  const [initRichtext2, setInitRichtext2] = useState("");

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

  const onFinish = async (values) => {
    setLoading(true);

    const handleValue = {
      ...values,
      what_you_can_learn: richText,
      requirement: richText2,
    };

    if (!!initForm) {
      await updateClassList(initForm?.id, handleValue);
    } else {
      await createClassList(handleValue);
    }
    setLoading(false);
  };
  const onChange = (date, dateString) => {
    console.log(dateString);
  };

  const handleRichText = (data) => setRichText(data);
  const handleRichText2 = (data) => setRichText2(data);

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
        label="thumbnail_url"
        name="thumbnail_url"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Sale Price" name="sale_price">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Student count" name="student_count">
          <InputNumber />
        </Form.Item>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Form.Item label="teacher_id" name="teacher_id">
          <InputNumber />
        </Form.Item>

        <Form.Item label="sub_program_id" name="sub_program_id">
          <InputNumber />
        </Form.Item>

        <Form.Item label="program_id" name="program_id">
          <InputNumber />
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
          <Editor handleRichText={handleRichText2} initialData={initRichtext} />
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
