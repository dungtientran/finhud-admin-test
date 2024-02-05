import axiosInstance from "@/utils/axiosIntance";
import { Button, Form, Input, Spin, message } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const passwordValidator = (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-"!@#%&/,><\':;|_~`])\S{7,99}$/;

  if (value.match(passwordRegex)) {
    return true;
  }

  return false;
};

const RecoverPassword = () => {
  const router = useRouter();

  const email = router.query?.email;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRecoverPassword = async (values) => {
    try {
      setLoading(true);
      const userRecover = { email, ...values };
      const response = await axiosInstance.post(
        "/admin/recover-password",
        userRecover
      );

      console.log("response__________________", response.data.code);

      if (response.data?.code === 200) {
        setLoading(false);

        return setSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      message.success("Lỗi server, Thử f5 lại xem!");
    }
  };

  if (!email) {
    return (
      <div>
        <h1>Té!</h1>
      </div>
    );
  }

  if (success) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Thành công!</h2>
          <p>Quay lại app để đăng nhập!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "50px",
          border: "1px solid #D9D9D9",
          padding: "20px",
          borderRadius: 8,
        }}
      >
        <h2>Điền mật khẩu mới của bạn</h2>
        <Form
          name="register"
          layout="vertical"
          autoComplete="off"
          onFinish={handleRecoverPassword}
          style={{ width: "600px" }}
          scrollToFirstError
        >
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Mật khẩu!",
              },
              {
                validator(_, value) {
                  if (!value || passwordValidator(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "Mật khẩu tối thiểu 8 ký tự và phải có ít nhất 1 chữ số, 1 chữ cái in hoa và 1 kí tự đặc biệt"
                    )
                  );
                },
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Mật khẩu không trùng!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin spinning={loading}>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Spin>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RecoverPassword;
