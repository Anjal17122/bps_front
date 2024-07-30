import { Col, Form, Input, Row, Modal, message } from "antd";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import {
  FloorListBody,
  POSTfloorCategory,
} from "../../../Services/SuperAdminService";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  OnPOSTsuccess: (body: FloorListBody) => void;
}

const AddFloorCategory = ({ isVisible, onClose, OnPOSTsuccess }: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  // const history = useNavigate();
  const onSubmit = (val: { name: string }) => {
    const body = { name: val.name };
    POSTfloorCategory(body, messageApi).then((res) => {
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
        <h1>Add Category</h1>
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

export default AddFloorCategory;
