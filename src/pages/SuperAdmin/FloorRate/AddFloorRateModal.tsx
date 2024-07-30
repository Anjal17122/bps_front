import { Cascader, Modal, message } from "antd";
import { Col, Form, Input, Row } from "antd";
import { FormProps, submitFailed } from "../../../Common/Form/FormData";
import {
  FloorListBody,
  FloorRateBody,
  POSTfloorRate,
  POSTFloorRateBody,
} from "../../../Services/SuperAdminService";
import "../../../Assets/scss/AddAdmin.scss";
import { Select } from "antd";
import { MappedAreaCat } from "./FloorRate";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  areaCategorys: MappedAreaCat[] | undefined;
  buildingCategorys: FloorListBody[] | undefined;
  floorCats: FloorListBody[] | undefined;
  isVisible: boolean;
  onClose: () => void;
  OnPOSTsuccess: (data: FloorRateBody) => void;
}

const AddFloorRateModal = ({
  isVisible,
  onClose,
  OnPOSTsuccess,
  areaCategorys,
  buildingCategorys,
  floorCats,
}: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  // const history = useNavigate();

  interface ValBOdy {
    areaCategoryId: number[];
    buildingCategoryId: number[];
    floorId: number;
    rate: string;
  }

  const onSubmit = (val: ValBOdy) => {
    const body: POSTFloorRateBody = {
      areaCategoryId: val.areaCategoryId[0],
      buildingCategoryId: val.buildingCategoryId[0],
      floorId: val.floorId,
      rate: val.rate,
    };

    POSTfloorRate(body, messageApi).then((res) => {
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
        <h1>Add Floor Ratesss</h1>
        {/* {JSON.stringify(areaCategorys)} */}
        <Row gutter={20}>
          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("areaCategoryId", "Area Category")}>
              <Cascader
                placeholder={"Area Category"}
                options={areaCategorys ? areaCategorys : []}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item
              {...FormProps("buildingCategoryId", "Building Category")}
            >
              <Cascader
                placeholder={"Building Category"}
                options={buildingCategorys ? buildingCategorys : []}
              />
              {/* <Select
                showSearch
                placeholder="Building Category"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.children as string).toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {buildingCategorys?.map((building) => (
                  <Select.Option key={building.id} value={building.id}>
                    {building.name}
                  </Select.Option>
                ))}
              </Select> */}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("floorId", "Floor Category")}>
              <Select
                showSearch
                placeholder="Floor Category"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.children as string)
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {floorCats?.map((floor) => (
                  <Select.Option key={floor.id} value={floor.id}>
                    {floor.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={24} lg={12} xl={12}>
            <Form.Item {...FormProps("rate", "Rate")}>
              <Input placeholder="Rate" />
            </Form.Item>
          </Col>
        </Row>
        <SubmitBtn />
      </Form>
    </Modal>
  );
};

export default AddFloorRateModal;
