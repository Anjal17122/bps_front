import { useState } from "react";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FormProps,
  InputDateValid,
  submitFailed,
} from "../../../Common/Form/FormData";
import { DownloadOutlined } from "@ant-design/icons";
import {
  POSTnoticePublish,
  POSTnoticePublishBody,
} from "../../../Services/NoticeTypeService";
import { bsToAd } from "./NoticeTypes/NoticeTypes";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  currentID: number;
  CloseModal: (id: number) => void;
}

const PublishNoticeModal = ({
  isVisible,
  onClose,
  currentID,
  CloseModal,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState({
    patraSankhya: "",
    chalaniNo: "",
    publishDate: "",
  });

  const onSubmit = (val: {
    patra: string;
    chalani: string;
    publishDate: string;
  }) => {
    if (val.chalani.includes("/") || val.patra.includes("/")) {
      return message.error("Patra Shankhya and Chalani No Cannot include /");
    }
    const body: POSTnoticePublishBody = {
      chalaninum: val.chalani,
      dateEng: bsToAd(val.publishDate),
      dateNep: val.publishDate,
      // filename: "",
      noticeProjectType: "days15",
      noticeStatus: "no",
      patrasankhya: val.patra,
      projectId: currentID,
    };
    POSTnoticePublish(body, messageApi).then(() => {
      CloseModal(currentID);
      message.success("Notice Published Successfully");
    });
  };

  return (
    <Modal
      className="SelectUserModal"
      bodyStyle={{ borderRadius: 16 }}
      open={isVisible}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      destroyOnClose={true}
    >
      {contextHolder}
      <Form
        onFinishFailed={submitFailed}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row justify="start" gutter={20} style={{ paddingRight: 35 }}>
          <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
            <Form.Item {...FormProps("patra", "Patra Sankhya")}>
              <Input
                placeholder="Patra Sankhya"
                onChange={(e) =>
                  setData({ ...data, patraSankhya: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
            <Form.Item {...FormProps("chalani", "Chalani No")}>
              <Input
                placeholder="Chalani No"
                onChange={(e) =>
                  setData({ ...data, chalaniNo: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={7} xl={7} xxl={7}>
            <Form.Item {...InputDateValid("publishDate", "Date (B.S.)")}>
              <Input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) =>
                  setData({ ...data, publishDate: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={3}
            xl={3}
            xxl={3}
            style={{ textAlign: "left" }}
          >
            {data.chalaniNo && data.patraSankhya ? (
              // /noticepdf/:pid/:chalanino/:patrasankhya/:date/:type
              <Link
                to={`/noticepdf/${currentID}/${data.chalaniNo}/${data.patraSankhya}/${data.publishDate}/days15`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button icon={<DownloadOutlined />}></Button>
              </Link>
            ) : (
              <span style={{ fontSize: 12 }}>No Data</span>
            )}
          </Col>
          <SubmitBtn text="Publish" />
        </Row>
      </Form>
    </Modal>
  );
};

export default PublishNoticeModal;
