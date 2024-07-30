import { Modal } from "antd";
import { Button, Col, Form, Input, Row } from "antd";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import { FloorRateBody } from "../../../Services/SuperAdminService";
// import "../../Assets/scss/AddAdmin.scss";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  currentFloor: FloorRateBody | undefined;
  OnEditFloorSuccess: (body: FloorRateBody) => void;
}
const EditFloorDataModal = ({
  isVisible,
  onClose,
  currentFloor,
}: // OnEditFloorSuccess,
Props) => {
  const [form] = Form.useForm();

  // const history = useNavigate();
  const onSubmit = (_: { name: string; rate: string }) => {
    // const body = {
    //   id: currentFloor?.id || 0,
    //   name: val.name,
    //   rate: val.rate,
    // };
    alert("in development");
    //   form.resetFields();
    //   OnEditFloorSuccess(body);
    // });
  };
  return (
    <Modal
      bodyStyle={{ borderTop: "5px solid rgb(35, 168, 221)" }}
      open={isVisible}
      footer={false}
      maskClosable={true}
      onCancel={onClose}
      // closable={false}
      destroyOnClose={true}
    >
      <Form
        form={form}
        initialValues={currentFloor}
        className="AddAdmin"
        onFinishFailed={submitFailed}
        size="middle"
        layout="vertical"
        onFinish={onSubmit}
      >
        <h1>Edit Floor Rate</h1>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("name", "Name")}>
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("rate", "Rate")}>
              <Input placeholder="Rate" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditFloorDataModal;
