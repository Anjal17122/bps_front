import { Col, Form, Input, Modal, Row, message } from "antd";

import "../../../Assets/scss/AddAdmin.scss";
import { MappedAreaCat } from "./FloorRate";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import {
  POSTbuildingCategoryBody,
  POSTareaCategoryBody,
  POSTbuildingCategory,
} from "../../../Services/SuperAdminService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  OnPOSTsuccess: (body: MappedAreaCat) => void;
}

const AddBuildingCategory = ({ isVisible, onClose, OnPOSTsuccess }: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = (val: POSTbuildingCategoryBody) => {
    const body: POSTareaCategoryBody = {
      name: val.name,
      level: 0,
      parentId: 0,
    };
    POSTbuildingCategory(body, messageApi).then((res) => {
      form.resetFields();
      OnPOSTsuccess(res.data);
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
      // closable={false}
      destroyOnClose={true}
    >
      {contextHolder}
      <Form
        form={form}
        className="AddAdmin"
        onFinishFailed={submitFailed}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <h1>Add Building Category</h1>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item {...FormProps("name", "Name")}>
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
        </Row>
        <SubmitBtn />
      </Form>
    </Modal>
  );
};

export default AddBuildingCategory;
