import { Col, Form, FormInstance, Input, Row, Spin, message } from "antd";
import { handleSubmitFailed } from "../../../constants/constants";
import FormInput from "../../../Components/forms/FormInput";
import { ColHeight, toList } from "../../../Common/Form/FormData";
import FormListOldPermit from "../../../Components/forms/FormListOldPermit";
import FormTextArea from "../../../Components/forms/FormTextArea";
import { SubmitBtn } from "../../../Components/Common/SubmitBtn/SubmitBtn";
import { OldPermitValuesPOST } from "./types";
import { InputDateValid, useBuildingType, useHouseType } from "./useOldPermit";
import FormCascader from "../../../Components/forms/FormCascader";
import { wards } from "../../../Common/Constants";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ProjectType } from "../../Consultant/ProjectCreate/SelectProjectType";
import { useParams } from "react-router-dom";

type Props = {
  initialValues?: OldPermitValuesPOST;
  handleFinish: (e: OldPermitValuesPOST, form: FormInstance<any>) => void;
  disabled?: boolean;
};

export const ft = {
  dartaNumber: "Darta Number", // 1
  dartaDateNep: "Darta Date", // 2
  homeOwnerNameEng: "Home Owner Name (Eng)", // 3
  homeOwnerNameNep: "Home Owner (Nepali)", // 4
  homeOwnerCitizenshipNumber: "Home Owner Citizenship Number", // 5
  orgNameEng: "Organization Name (Eng)", // 6
  orgNepali: "Organization (Nepali)", // 7
  orgRegNo: "Organization Reg No", // 8
  phoneNo: "Phone Number", // 9
  isHomeOwnerAndLandOwnerSame: "Is the Home Owner and Land Owner same?", // 10
  clientNameEng: "Land Owner Name (Eng)", // 11
  clientNameNep: "Land Owner Name (Nepali)", // 12
  clientCitizenshipNumber: "Land Owner Citizenship Number", // 13
  asthaiDateNep: "Asthaai Date", // 14
  asthaiDateEng: "Asthaai Date (Eng)", // 15
  mapSheetNo: "Map Sheet Number", // 16
  // buildingArea: "Building Area (Square Feet)", // 17
  panchayatWardString: "Address (Sabik)", // 18
  houseLength: "House Length", // 19
  houseWidth: "House Width", // 20
  houseHeight: "House Height", // 21
  totalArea: "Total Square Foot", // 22
  email: "Email", // 23
  kittaNumber: "Kitta Number", // 24
  revenueAmount: "Paid Revenue Amount (NRS)", // 25
  plotArea: "Plot Area (sq feet)", // 26
  plinthArea: "Plinth Area (Square feet)", // 27
  houseType: "House Type", // 28
  buildingType: "Building Type", // 29
  ward: "Address (Haal) Ward", // 30
  tole: "Tole", // 31
  roadWidth: "Road Width", // 32
  roadDistance: "Distance From Road", // 33
  electricityCapacity: "Electricity Line Capacity", // 34
  electricityDistance: "Distance from Electricity Line", // 35
  riverWidth: "River/Kulo/Kholsa Width", // 36
  riverDistance: "Distance from River/Kulo/Kholsa", // 37
  kittaNo: "Kitta No", // 38
  charkilla: "Charkilla", // 39
  eastName: "East Name", // 40
  eastKittaNo: "East Kitta Number", // 41
  westName: "West Name", // 42
  westKittaNo: "West Kitta Number", // 43
  northName: "North Name", // 44
  northKittaNo: "North Kitta Number", // 45
  southName: "South Name", // 46
  southKittaNo: "South Kitta Number", // 47
  buildingCompletion: "Building Completion", // 48
  floorName: "Floor Name", // 49
  floorArea: "Floor Area", // 50
  remarks: "Remarks", // 51
};

const OldPermitForm = ({
  initialValues,
  handleFinish,
  disabled = false,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const params = useParams();
  const type: "h" | "i" | "j" | "k" | "m" = params.type as
    | "h"
    | "i"
    | "j"
    | "k"
    | "m";

  const { buildingType, isLoading: loading1 } = useBuildingType(messageApi);
  const { houseType, isLoading } = useHouseType(messageApi);

  return (
    <div>
      {contextHolder}
      <h1 style={{ marginBottom: 30 }}>DPC Data {ProjectType[type]}</h1>
      {isLoading || loading1 ? (
        <Spin />
      ) : (
        <Form
          disabled={disabled}
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
            <Col {...ColHeight(9)}>
              <FormInput label={ft.dartaNumber} name="dartaNumber" />
            </Col>
            <Col {...ColHeight(9)}>
              <Form.Item
                tooltip={{
                  title: "format: 2070-01-10",
                  icon: <InfoCircleOutlined />,
                }}
                {...InputDateValid("dartaDateNep", "Darta Date ")}
              >
                <Input autoComplete="off" placeholder="format: 2080-01-10" />
              </Form.Item>
            </Col>
            <Col {...ColHeight(24)}>
              <h3 style={{ marginTop: 35 }}>Home Owners Details:</h3>
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.homeOwnerNameEng} name="homeOwnerNameEng" />
            </Col>

            <Col {...ColHeight(8)}>
              <FormInput label={ft.homeOwnerNameNep} name="homeOwnerNameNep" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput
                label={ft.homeOwnerCitizenshipNumber}
                name="homeOwnerCitizenshipNumber"
              />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.phoneNo} name="phoneNo" />
            </Col>
            <Col span={24}>
              <h3>Land Owners Details:</h3>
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.clientNameEng} name="clientNameEng" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.clientNameNep} name="clientNameNep" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput
                label={ft.clientCitizenshipNumber}
                name="clientCitizenshipNumber"
              />
            </Col>
            <Col span={24}>
              <h3>Other Details:</h3>
            </Col>
            <Col {...ColHeight(8)}>
              <Form.Item
                tooltip={{
                  title: "format: 2070-01-10",
                  icon: <InfoCircleOutlined />,
                }}
                {...InputDateValid("asthaiDateNep", ft.asthaiDateNep)}
              >
                <Input autoComplete="off" placeholder="format: 2080-01-10" />
              </Form.Item>
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.kittaNumber} name="kittaNumber" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.revenueAmount} name="revenueAmount" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.mapSheetNo} name="mapSheetNo" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.plotArea} name="plotArea" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.plinthArea} name="plinthArea" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.totalArea} name="totalArea" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormCascader
                label={ft.houseType}
                name="houseType"
                options={toList(houseType ?? [])}
              />
            </Col>
            <Col {...ColHeight(8)}>
              <FormCascader
                label={ft.buildingType}
                name="buildingType"
                options={toList(buildingType ?? [])}
              />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput
                label={ft.panchayatWardString}
                name="panchayatWardString"
              />
            </Col>
            <Col {...ColHeight(8)}>
              <FormCascader label={ft.ward} name="ward" options={wards} />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.tole} name="tole" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.houseLength} name="houseLength" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.houseWidth} name="houseWidth" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.houseHeight} name="houseHeight" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.totalArea} name="totalArea" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.roadWidth} name="roadWidth" />
            </Col>
            <Col {...ColHeight(8)}>
              <FormInput label={ft.roadDistance} name="roadDistance" />
            </Col>

            <Col {...ColHeight(9)}>
              <FormInput
                label={ft.electricityCapacity}
                name="electricityCapacity"
              />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput
                label={ft.electricityDistance}
                name="electricityDistance"
              />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.riverWidth} name="riverWidth" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.riverDistance} name="riverDistance" />
            </Col>
            <Col {...ColHeight(24)}>
              <h3>{ft.charkilla}</h3>
            </Col>
            {/* <FormListOldPermitCharkilla name="charkilla" /> */}
            <Col {...ColHeight(9)}>
              <FormInput label={ft.eastName} name="eastName" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.eastKittaNo} name="eastKittaNo" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.westName} name="westName" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.westKittaNo} name="westKittaNo" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.northName} name="northName" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.northKittaNo} name="northKittaNo" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.southName} name="southName" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormInput label={ft.southKittaNo} name="southKittaNo" />
            </Col>
            <Col {...ColHeight(24)}>
              <h3>{ft.buildingCompletion}</h3>
            </Col>
            <Col {...ColHeight(24)}>
              <FormListOldPermit name="floorDetails" />
            </Col>
            <Col {...ColHeight(9)}>
              <FormTextArea label={ft.remarks} name="remarks" />
            </Col>
            <Col {...ColHeight(24)}>
              <SubmitBtn />
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default OldPermitForm;
