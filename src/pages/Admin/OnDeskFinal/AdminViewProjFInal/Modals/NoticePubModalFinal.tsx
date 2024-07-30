import { useState } from "react";
import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import {
  InputDateValid,
  FormProps,
  submitFailedFinal,
  FormNReq,
} from "../../../../../Common/Form/FormData";
import { POSTnoticePublishBody } from "../../../../../Services/NoticeTypeService";
import useStoreViewProj, {
  delProjById,
  dispatch,
} from "../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../Store/StoreViewProject/types";
import { POSTnoticePublishFinal } from "../../OnDeskService/OnDeskService/OnDeskService";
import { bsToAd } from "./NoticeTabModals/MuchulkaNoticeModalFinal";

const NoticePubModalFinal = () => {
  const { currentPid, disabled, noticePubModal } = useStoreViewProj();

  const [data, setData] = useState({
    patraSankhya: "",
    chalaniNo: "",
    publishDate: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (val: {
    patra: string;
    chalani: string;
    publishDate: string;
  }) => {
    if (val.chalani.includes("/") || val.patra.includes("/")) {
      return messageApi.error("Patra Shankhya and Chalani No Cannot include /");
    }
    const body: POSTnoticePublishBody = {
      chalaninum: val.chalani,
      dateEng: bsToAd(val.publishDate),
      dateNep: val.publishDate,
      noticeProjectType: "days15",
      noticeStatus: "no",
      patrasankhya: val.patra,
      projectId: currentPid,
    };
    POSTnoticePublishFinal(body, messageApi).then(() => {
      delProjById();
      messageApi.success("Notice Published Successfully");
    });
  };

  const onClose = () => {
    dispatch({
      type: Ac.setNoticePubModal,
      payload: { currentPid: 0, noticePubModal: false, projCreationDate: "" },
    });
  };

  return (
    <Modal
      title="१५ दिने सुचना प्रकाशनको लागि तलको विवरण भर्नुहोस"
      className="SelectUserModal"
      open={noticePubModal}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      destroyOnClose={true}
      // width={1000}
    >
      {contextHolder}
      <Form
        style={{ marginTop: 30 }}
        onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row justify="start" gutter={20} style={{ paddingRight: 35 }}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Form.Item {...FormProps("patra", "पत्र संख्या")}>
              <Input
                placeholder="पत्र संख्या"
                onChange={(e) =>
                  setData({ ...data, patraSankhya: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Form.Item {...FormNReq("chalani", "चलानी नं")}>
              <Input
                placeholder="चलानी नं"
                onChange={(e) =>
                  setData({ ...data, chalaniNo: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Form.Item {...InputDateValid("publishDate", "मिति (वि.सं.)")}>
              <Input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) =>
                  setData({ ...data, publishDate: e.target.value })
                }
              />
            </Form.Item>
          </Col>

          <div>
            {data.patraSankhya && data.publishDate ? (
              // /noticepdf/:pid/:chalanino/:patrasankhya/:date/:type
              <Link
                to={`/noticepdf/${currentPid}/${data.chalaniNo}/${data.patraSankhya}/${data.publishDate}/days15`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="primary" ghost>
                  <EyeOutlined /> सुचना निकाल्नु पहिले हेर्नुहोस
                </Button>
              </Link>
            ) : (
              <span style={{ fontSize: 12 }}></span>
            )}
          </div>
          <Form.Item>
            <Button htmlType="submit" type="primary" disabled={disabled}>
              Publish
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default NoticePubModalFinal;
