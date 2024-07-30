import {
  dispatchGlobal,
  useStoreGlobal,
} from "../../Store/StoreGlobal/StoreGlobal";
import { AcG } from "../../Store/StoreGlobal/types";
import { CloseOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { FormProps } from "../Form/FormData";
import { SubmitBtn } from "../../Components/Common/SubmitBtn/SubmitBtn";
import { Login } from "../../Services/UserService";

const LoginModal = () => {
  const { loginModal } = useStoreGlobal();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (val: { Username: string; Password: string }) => {
    Login({ userName: val.Username, password: val.Password }, messageApi);
  };

  return (
    <dialog
      data-modal
      open={loginModal}
      style={{ zIndex: 100000, width: 320, height: 300 }}
    >
      {contextHolder}
      <button
        onClick={() =>
          dispatchGlobal({ type: AcG.setLoginModal, payload: false })
        }
      >
        <CloseOutlined />
      </button>
      <h2>Login</h2>
      <div>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item {...FormProps("Username", "Username")}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item {...FormProps("Password", "Password")}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <>
              <SubmitBtn text="Log In" width={"100%"} />
            </>
          </Form.Item>
        </Form>
      </div>
    </dialog>
  );
};

export default LoginModal;
