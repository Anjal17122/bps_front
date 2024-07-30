import { Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./ForgotPass.scss";
import { resetPassword } from "../../../Services/ForgotPassService";
import { submitFailedFinal } from "../../../Common/Form/FormData";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

const ResetPasswordLink = () => {
  const params = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const history = useNavigate();

  const onSubmit = (val: {
    password: string;
    repassword: string;
    username: string;
  }) => {
    if (val.password !== val.repassword)
      return message.error("Passwords do not match!");

    const body = {
      token: params.token?.replaceAll("+", ".") ?? "",
      password: val.password,
      username: val.username,
    };
    resetPassword(body, messageApi).then(() => {
      message.success("Password Reset successfully!");
      history("/public/login");
    });
  };

  return (
    <>
      <div className="ForgotPassWrap">
        {contextHolder}
        <Form
          className="ForgotPass"
          size="middle"
          layout="vertical"
          onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
          onFinish={onSubmit}
        >
          <h1>Set New Password</h1>
          <p style={{ color: "rgba(0, 0, 0, 0.35)" }}>
            Note: link in valid for 12 hours
          </p>
          <Form.Item {...FormProps("username", "Username")}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item {...FormProps("password", "New Password")}>
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item {...FormProps("repassword", "Re-type New Password")}>
            <Input.Password placeholder="Re-type New Password" />
          </Form.Item>
          <SubmitBtn />
        </Form>
      </div>
    </>
  );
};

export default ResetPasswordLink;

export const FormProps = (name: string, label: string) => {
  return {
    label: label,
    required: false,
    name: name,
    rules: RequiredRule(label),
  };
};

export const RequiredRule = (name: string) => [
  {
    required: true,
    message: `Please input your ${name}!`,
  },
];
