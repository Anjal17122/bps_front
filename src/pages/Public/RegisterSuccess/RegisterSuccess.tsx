import { AlignLeftOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Result } from "antd";

const RegisterSuccess = () => {
  return (
    <Divider orientation="center" dashed={false} style={{ width: "100%" }}>
      <Result
        status={"success"}
        title={`You have registered successfully !!`}
        subTitle={[
          <div key="1" style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ margin: 0 }}>
              Username:
              <b
                style={{ color: "black", paddingLeft: "4px" }}
              >{`usernamehere`}</b>
            </p>

            <p style={{ margin: 0 }}>
              Email:
              <b
                style={{ color: "black", paddingLeft: "4px" }}
              >{`emailhere`}</b>
            </p>
            <Alert
              message={"Please don't share your password with others"}
              type="warning"
            />
          </div>,
        ]}
        extra={[
          <Button type="default" key="Back">
            <AlignLeftOutlined /> Back
          </Button>,
          <Button type="primary" key="Login">
            Login
          </Button>,
        ]}
      />
    </Divider>
  );
};

export default RegisterSuccess;
