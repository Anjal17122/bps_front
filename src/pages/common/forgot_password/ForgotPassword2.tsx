import { Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./ForgotPass.scss";
import { forgotPasswordCodeSub } from "../../../Services/ForgotPassService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

const ForgotPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const email = sessionStorage.getItem("emailFP");
  const phone = sessionStorage.getItem("phoneFP");
  const history = useNavigate();

  const onSubmit = (val: {
    password: string;
    repassword: string;
    code: string;
  }) => {
    if (val.password !== val.repassword) {
      return message.error("Passwords do not match!");
    } else if (sessionStorage.getItem("forgotPassType") === "Email") {
      const body = {
        code: val.code,
        email: email ? email : "",
        newp: val.password,
      };
      forgotPasswordCodeSub(body, messageApi).then(() =>
        history("/public/login")
      );
    } else if (sessionStorage.getItem("forgotPassType") === "Phone") {
      const body = {
        code: val.code,
        phone: phone ? phone : "",
        newp: val.password,
      };
      forgotPasswordCodeSub(body, messageApi).then(() =>
        history("/public/login")
      );
    }
  };

  return (
    <>
      {/* <Navbar onWhyUsClick={() => {}} onContactUsClick={() => {}} /> */}

      <div className="ForgotPassWrap">
        {contextHolder}
        <Form
          className="ForgotPass"
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <h1>Set New Password</h1>
          <Form.Item {...FormProps("code", "Code")}>
            <InputNumber min={100000} max={999999} placeholder="Code" />
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

export default ForgotPassword;

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
