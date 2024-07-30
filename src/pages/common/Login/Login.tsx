import { Form, Input, message } from "antd";
import { Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FormProps } from "../../../Common/Form/FormData";
import { Login } from "../../../Services/UserService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import LoginNoticeModal from "../FinalPDF/Nagarjung/LoginNoticeMdal";

const Signin = () => {
  const history = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (val: { Username: string; Password: string }) => {
    Login({ userName: val.Username, password: val.Password }, messageApi).then(
      (res) => {
        if (res.data.roles === "ROLE_Consultant") {
          history("/user/project/pending");
        } else if (res.data.roles === "ROLE_Admin") {
          history("/superadmin/home");
        } else if (res.data.roles === "ROLE_DataEntry") {
          history("/admin/dataentry");
        } else if (
          res.data.roles === "ROLE_Engineer" ||
          res.data.roles === "ROLE_Executive" ||
          res.data.roles === "ROLE_Sub_Engineer" ||
          res.data.roles === "ROLE_BuildingR_LandM" ||
          res.data.roles === "ROLE_Asst_Sub_Engineer"
        ) {
          history("/admin/adminpanel/technical");
        } else if (
          res.data.roles === "ROLE_Ward" ||
          res.data.roles === "ROLE_Technical_Department" ||
          res.data.roles === "ROLE_Registration" ||
          res.data.roles === "ROLE_Revenue" ||
          res.data.roles === "ROLE_Napi" ||
          res.data.roles === "ROLE_Ward_Technical"
        ) {
          history("/admin/adminpanel/ondesk");
        } else {
          history("/404");
        }
      }
    );
  };

  // function selectUserType(val: any) {
  //   setUsertype(val.target.value);
  // }

  return (
    <>
      <LoginNoticeModal />
      {contextHolder}
      <Row
        justify="center"
        style={{
          padding: "10% 0",
          backgroundColor: "#b1cff825",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Col xs={24} sm={20} md={12} lg={7} xl={7} className="Login">
          <div className="heading">Login</div>
          <div className="FormOnly">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item {...FormProps("Username", "Username")}>
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item {...FormProps("Password", "Password")}>
                <Input.Password placeholder="Password" />
              </Form.Item>
              {/* <div className="LoginUserType">
                <Radio.Group onChange={selectUserType} value={usertype}>
                  <Radio value={"admin"}>Admin</Radio>
                  <Radio value={"user"}>User</Radio>
                </Radio.Group>
              </div> */}
              <Form.Item>
                <>
                  <SubmitBtn text="Log In" width={"100%"} />
                  {/* <Button
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Log In
                  </Button> */}
                  <div id="forgotPass">
                    <Link to="/public/forgotpassword-step1">
                      Forgot Password?
                    </Link>
                    <div>
                      Or
                      <Link to="/public/register"> Register now!</Link>
                    </div>
                  </div>
                </>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Signin;
