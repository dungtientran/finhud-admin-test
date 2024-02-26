import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";

const { TextArea } = Input;

const FormCecruitment = ({ initForm, createTerms, updateTerms }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!!initForm) {
      form.setFieldsValue(initForm);
    } else {
      form.resetFields();
    }
  }, [initForm]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);

    if (!!initForm) {
      await updateTerms(initForm?.id, values);
    } else {
      await createTerms(values);
    }
    setLoading(false);
  };
  const onChange = (date, dateString) => {
    console.log(dateString);
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
        label="Letter"
        name="letter"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Term"
        name="term"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Definition"
        name="definition"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <TextArea rows={10} placeholder="Definition" />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          <Spin spinning={loading}>Submit</Spin>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCecruitment;
