import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { FormProps } from "../../../Common/Form/FormData";
import CommonHeader from "../../Admin/ProjectActionsAdmin/UploadCertificate/CommonHeader";
import "./ChangePassword.scss";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
// import { CaretRightOutlined } from "@ant-design/icons";

const ChangePassword = () => {
  const onSubmit = () => {
    alert("in development");
  };

  return (
    <div>
      <CommonHeader></CommonHeader>
      <div className="ForgotPassWrap">
        <Form
          className="ForgotPass"
          size="middle"
          layout="vertical"
          onFinish={onSubmit}
        >
          <div className="flexSpaceB">
            <span style={{ fontSize: 20, marginBottom: 20, color: "#7393B3" }}>
              Change Password
            </span>
            <Link
              to="/public/login"
              style={{ textDecoration: "underline", fontSize: 12.5 }}
            >
              Login
            </Link>
          </div>
          <Form.Item {...FormProps("oldPassword", "Old Password")}>
            <Input placeholder="Old Password" />
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
    </div>
  );
};

export default ChangePassword;
