import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Spin } from "antd";
import dayjs from "dayjs";

const FormCecruitment = ({
  initForm,
  createRecruitment,
  updateRecruitment,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!initForm) {
      form.setFieldsValue({
        ...initForm,
        jobDescription: initForm?.job_description?.[0].desc,
        jobRequirements: initForm?.job_description?.[1].desc,
        benefit: initForm?.job_description?.[2].desc,
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
      job_description: [
        {
          title: "Mô tả công việc",
          desc: values?.jobDescription,
        },
        {
          title: "Yêu cầu công việc",
          desc: values?.jobRequirements,
        },
        {
          title: "Lợi ích",
          desc: values?.benefit,
        },
      ],
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
        label="Title"
        name="title"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Deadline" name="deadline" rules={[{ required: true }]}>
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item
        label="Mô tả công việc"
        name="jobDescription"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Yêu cầu công việc"
        name="jobRequirements"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lợi ích"
        name="benefit"
        rules={[{ required: true, message: "Không đc bỏ trống !" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tag"
        name="tag"
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

export default FormCecruitment;
