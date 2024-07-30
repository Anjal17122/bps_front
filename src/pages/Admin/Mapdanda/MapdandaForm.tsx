import { Col, Form, FormInstance, Row, message } from "antd";
import { handleSubmitFailed } from "../../../constants/constants";
import FormInputNoLabel from "../../../Components/forms/FormInputNoLabel";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import FormTextAreaNoLabel from "../../../Components/forms/FormTextAreaNoLabel";
import { MapdandaValues } from "./types";

type Props = {
  initialValues?: any;
  handleFinish: (e: MapdandaValues, form: FormInstance<any>) => void;
};

export const ft = {
  groundCoverageStandard: "मापदण्ड",
  groundCoverageActual: "नक्सा अनुसार",
  groundCoverageRemarks: "कैफियत",
  totalFloorAreaStandard: "मापदण्ड",
  totalFloorAreaActual: "नक्सा अनुसार",
  totalFloorAreaRemarks: "कैफियत",
  tallaStandard: "मापदण्ड",
  tallaActual: "नक्सा अनुसार",
  tallaRemarks: "कैफियत",
  rowStandard: "मापदण्ड",
  rowActual: "नक्सा अनुसार",
  rowRemarks: "कैफियत",
  setBackStandard: "मापदण्ड",
  setBackActual: "नक्सा अनुसार",
  setBackRemarks: "कैफियत",
  highTensionStandard: "मापदण्ड",
  highTensionActual: "नक्सा अनुसार",
  highTensionRemarks: "कैफियत",
  riverStandard: "मापदण्ड",
  riverActual: "नक्सा अनुसार",
  riverRemarks: "कैफियत",
  farStandard: "मापदण्ड",
  farActual: "नक्सा अनुसार",
  farRemarks: "कैफियत",
};

const MapdandaForm = ({ initialValues, handleFinish }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  return (
    <div>
      {contextHolder}

      <Form
        form={form}
        initialValues={initialValues}
        className="form-grid"
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinishFailed={(val) => handleSubmitFailed(val, messageApi)}
        onFinish={(e) => handleFinish(e, form)}
      >
        <Row gutter={24}>
          <Col span={6}>
            <>(क) ग्राउण्ड कभरेज</>
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.groundCoverageStandard}
              name="groundCoverageStandard"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.groundCoverageActual}
              name="groundCoverageActual"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.groundCoverageRemarks}
              name="groundCoverageRemarks"
            />
          </Col>
          <Col span={6}>
            <>(ख) कुल फ्लोर एरिया</>
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.totalFloorAreaStandard}
              name="totalFloorAreaStandard"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.totalFloorAreaActual}
              name="totalFloorAreaActual"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.totalFloorAreaRemarks}
              name="totalFloorAreaRemarks"
            />
          </Col>
          <Col span={6}>(ग) तल्ला</Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.tallaStandard} name="tallaStandard" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.tallaActual} name="tallaActual" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.tallaRemarks} name="tallaRemarks" />
          </Col>
          <Col span={6}>(घ) R.O.W.</Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.rowStandard} name="rowStandard" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.rowActual} name="rowActual" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.rowRemarks} name="rowRemarks" />
          </Col>
          <Col span={6}>(ङ) Set Back</Col>
          <Col span={6}>
            <FormTextAreaNoLabel
              label={ft.setBackStandard}
              name="setBackStandard"
            />
          </Col>
          <Col span={6}>
            <FormTextAreaNoLabel
              label={ft.setBackActual}
              name="setBackActual"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.setBackRemarks} name="setBackRemarks" />
          </Col>
          <Col span={6}>(च) विधुत लाइन</Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.highTensionStandard}
              name="highTensionStandard"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.highTensionActual}
              name="highTensionActual"
            />
          </Col>
          <Col span={6}>
            <FormInputNoLabel
              label={ft.highTensionRemarks}
              name="highTensionRemarks"
            />
          </Col>
          <Col span={6}>(छ) नदि /खोल्सा / किनारा</Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.riverStandard} name="riverStandard" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.riverActual} name="riverActual" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.riverRemarks} name="riverRemarks" />
          </Col>
          <Col span={6}>(ज) भुईं क्षेत्रको अनुपात (FAR)</Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.farStandard} name="farStandard" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.farActual} name="farActual" />
          </Col>
          <Col span={6}>
            <FormInputNoLabel label={ft.farRemarks} name="farRemarks" />
          </Col>

          <Col span={24}>
            <SubmitBtn />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MapdandaForm;
