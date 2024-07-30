import React, { useState } from "react";
import {
  EnvironmentFilled,
  MailFilled,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "../../../Assets/scss/LandingPage.scss";
import { NoLabelReq, submitFailedFinal } from "../../../Common/Form/FormData";
import { municipalityDetails } from "../../../constants/constants";
import { postHelp } from "../../../Services/AdminService";
import { isNagarjun } from "../../../constants/CommonFunctions";
import LoginNoticeModal from "../FinalPDF/Nagarjung/LoginNoticeMdal";

const ContactUs = () => {
  const [submit, setSubmit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  type SubmitValues = {
    email: string;
    message: string;
    phone: string;
    name: string;
  };

  function onSubmit({ email, message, phone, name }: SubmitValues) {
    postHelp({ email, message, name, phone }, setSubmit);
  }
  return (
    <div>
      <LoginNoticeModal />
      {contextHolder}
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          paddingTop: 30,
          fontSize: 40,
        }}
      >
        सम्पर्क
      </h1>
      <div className="BPScontactUs">
        <div className="details">
          <div>
            <span>
              <EnvironmentFilled style={{ fontSize: 30, color: "grey" }} />
            </span>
            <br />
            <b>
              {municipalityDetails.address1} <br />{" "}
              {municipalityDetails.address2}
            </b>
          </div>
          <div>
            <span>
              <MailFilled style={{ fontSize: 30, color: "grey" }} />
            </span>
            <br />
            <b>{municipalityDetails.email}</b>
          </div>
          <div>
            <span>
              <PhoneFilled
                style={{
                  fontSize: 30,
                  color: "grey",
                  transform: "rotate(90deg)",
                }}
              />
            </span>
            <br />
            {isNagarjun() ? (
              <div
                style={{ color: "#1890ff", marginBottom: -30, marginTop: 10 }}
              >
                Support: <WhatsAppOutlined style={{ color: "#22c55e" }} />{" "}
                9863849266{" "}
              </div>
            ) : null}
            <b style={{ fontWeight: 500 }}>{municipalityDetails.phone}</b>
          </div>
        </div>
        <div id="iframeBox">
          <Form
            onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
            size="middle"
            layout="vertical"
            onFinish={onSubmit}
          >
            <h3 style={{ paddingBottom: 10, textAlign: "center" }}>
              Message us:
            </h3>
            <Form.Item {...NoLabelReq("name", "Name")}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item {...NoLabelReq("email", "Email")}>
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item {...NoLabelReq("phone", "Phone")}>
              <Input type="number" placeholder="Phone: 98xxxxxxxx" />
            </Form.Item>
            <Form.Item {...NoLabelReq("message", "Message")}>
              <Input.TextArea placeholder="Message" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={submit}>
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactUs);

/* <iframe
  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpurayoo&tabs=messages&width=400&height=480&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
  width="400"
  height="480"
  style={{ border: "none", overflow: "hidden" }}
  scrolling="no"
  frameBorder="0"
  allow="encrypted-media"
  title="facebookIframe"
></iframe> */

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
