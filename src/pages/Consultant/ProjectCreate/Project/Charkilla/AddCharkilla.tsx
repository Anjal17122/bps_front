import { Cascader, Col, Form, Input, Row, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ColHeight,
  FormNReq,
  FormProps,
  UnicodeValid,
  ValidSetback,
  submitFailedFinal,
} from "../../../../../Common/Form/FormData";
import {
  addCharkilla,
  AddCharkillaBody,
} from "../../../../../Services/CreateProjectService";
import { switchUrl } from "../Create/ViewCreate";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

export const landscape = [
  { value: "Road", label: "Road", nepali: "सडक" },
  { value: "Land", label: "Land", nepali: "जमिन" },
  { value: "House", label: "House", nepali: "घर" },
  { value: "Temple", label: "Temple", nepali: "मन्दिर" },
  { value: "School", label: "School", nepali: "विद्यालय" },
  { value: "River", label: "River", nepali: "नदी" },
  { value: "Jungle", label: "Jungle", nepali: "जङ्गल" },
  {
    value: "High Tension Line",
    label: "High Tension Line",
    nepali: "विधुत लाइन",
  },
];



export const direction = [
  { value: "East", label: "East", nepali: "पु", nepaliFull: "पुर्व" },
  { value: "West", label: "West", nepali: "प", nepaliFull: "पश्चिम" },
  { value: "North", label: "North", nepali: "उ", nepaliFull: "उत्तर" },
  { value: "South", label: "South", nepali: "द", nepaliFull: "दक्षिण" },
];

export const side = [
  { value: "Front", label: "Front" },
  { value: "Back", label: "Back" },
  { value: "Right", label: "Right" },
  { value: "Left", label: "Left" },
];
const AddCharkilla = () => {
  const params = useParams();
  const pid = params.pid ?? "";
  const [messageApi, contextHolder] = message.useMessage();

  const [lsType, setLsType] = useState("");
  const history = useNavigate();

  const onSubmit = (val: {
    direction: string[];
    side: string[];
    landscapeType: string[];
    nameNep: string;
    nameEng: string;
    kittaNo: string;
    actualSetBack: string;
    standardSetBack: string;
    width: string;
  }) => {
    const body: AddCharkillaBody = {
      direction: val.direction[0],
      side: val.side[0],
      landscapeType: val.landscapeType[0],
      nameNep: val.nameNep,
      nameEng: val.nameEng,
      kittaNo: val.kittaNo,
      actualSetBack: val.actualSetBack,
      standardSetBack: val.standardSetBack,
      width: val.width,
      landId: pid,
    };
    addCharkilla(
      body,
      messageApi,
      switchUrl("/charkilla", "/charkilla/perma")
    ).then(() => history(-1));
  };

  return (
    <Form
      onFinishFailed={(err) => submitFailedFinal(err, messageApi)}
      size="middle"
      layout="vertical"
      onFinish={onSubmit}
    >
      {contextHolder}
      <Row gutter={20}>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("direction", "Direction")}>
            <Cascader options={direction} placeholder="Direction" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("side", "Side")}>
            <Cascader options={side} placeholder="Side" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormProps("landscapeType", "Landscape Type")}>
            <Cascader
              options={landscape}
              placeholder="Landscape Type"
              onChange={(e) => setLsType(e[0].toString())}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormNReq("nameEng", lsType + " Name")}>
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          <Form.Item {...FormNReq("nameNep", "नाम")}>
            <Input placeholder="नाम" />
          </Form.Item>
        </Col>
        <Col {...ColHeight(8)}>
          {lsType === "Road" ? null : (
            <Form.Item {...FormNReq("kittaNo", "Kitta No.")}>
              <Input placeholder="Kitta No." />
            </Form.Item>
          )}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col {...ColHeight(8)}>
          <Form.Item
            {...ValidSetback("actualSetBack", "Actual setback (Eg: 5'3\")")}
          >
            <Input placeholder="Actual setback" />
          </Form.Item>
        </Col>
        {/* {lsType === "Road" && ( */}
        <>
          <Col {...ColHeight(8)}>
            <Form.Item
              {...ValidSetback(
                "standardSetBack",
                "Standard setback (Eg: 5'3\")"
              )}
            >
              <Input placeholder="Standard setback" />
            </Form.Item>
          </Col>
          <Col {...ColHeight(8)}>
            <Form.Item {...ValidSetback("width", "Width (Eg: 5'3\")")}>
              <Input placeholder={`eg: 14'2"`} />
            </Form.Item>
          </Col>
        </>
        {/* )} */}
      </Row>
      <Row justify="end">
        <SubmitBtn />
      </Row>
    </Form>
  );
};

export default AddCharkilla;
