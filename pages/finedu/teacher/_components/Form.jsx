import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import dayjs from "dayjs";

const Forma = ({ initForm, createRecruitment, updateRecruitment }) => {
  const [loading, setLoading] = useState(false);

  const [richText, setRichText] = useState("");
  const [initRichtext, setInitRichtext] = useState("");

  useEffect(() => {
    if (!!initForm) {
      form.setFieldsValue({
        ...initForm,
        deadline: dayjs(`${initForm?.apply_deadline}`),
      });

      setInitRichtext(initForm?.job_description);
    } else {
      form.resetFields();
      setInitRichtext("");
    }
  }, [initForm]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);

    const handleValue = {
      ...values,
      apply_deadline: values?.deadline,
      job_description: richText,
    };

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
        label="Avatar_url"
        name="avatar"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
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

      <Form.Item
        label="Facebook url"
        name="facebook_url"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lindedin url"
        name="linkedin_url"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Instagram url"
        name="instagram_url"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Twitter url"
        name="twitter_url"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Giới thiệu"
        name="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
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
