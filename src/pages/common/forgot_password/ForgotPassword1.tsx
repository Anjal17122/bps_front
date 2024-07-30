import { useState } from "react";
import { Button, Input, message, Radio } from "antd";
import "./ForgotPass.scss";
import { useNavigate } from "react-router-dom";
import {
  forgotPassSendEmail,
  forgotPassSendPhone,
} from "../../../Services/ForgotPassService";
import { useStoreGlobal } from "../../../Store/StoreGlobal/StoreGlobal";

const ForgotPassword1 = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [type, setType] = useState<"Email" | "Phone">("Email");
  const [input, setInput] = useState("");

  const { disabled } = useStoreGlobal();

  const history = useNavigate();
  const onSubmit = () => {
    if (!input) {
      return message.error("Pls input Email/Phone!");
    } else if (type === "Email") {
      forgotPassSendEmail(input, messageApi).then(() => {
        sessionStorage.setItem("emailFP", input);
        sessionStorage.setItem("forgotPassType", type);
        history("/public/forgotpassword-step2");
      });
    } else {
      forgotPassSendPhone(input, messageApi).then(() => {
        sessionStorage.setItem("forgotPassType", type);
        sessionStorage.setItem("phoneFP", input);
        history("/public/forgotpassword-step2");
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="ForgotPassWrap">
        <div className="ForgotPass" style={{ paddingBottom: 50 }}>
          <h2 style={{ marginBottom: 20 }}>Forgot Password?</h2>
          {/* <Input.Group compact style={{ marginBottom: 20 }} size="large"> */}
          <Radio.Group
            style={{ marginBottom: 10 }}
            optionType="button"
            buttonStyle="solid"
            onChange={(val) => setType(val.target.value)}
            value={type}
          >
            <Radio value={"Email"}>Email</Radio>
            <Radio value={"Phone"}>Phone</Radio>
          </Radio.Group>

          <Input
            style={{ width: "70%" }}
            onChange={(val) => setInput(val.target.value)}
          />

          {/* </Input.Group> */}
          <Button type="primary" loading={disabled} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword1;
