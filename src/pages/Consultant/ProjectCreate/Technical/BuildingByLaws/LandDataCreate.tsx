import { Button, Cascader, Form, Input, InputNumber } from "antd";
import { useState } from "react";
import {
  submitFailed,
  NoLblNoReq,
  FormReq,
} from "../../../../../Common/Form/FormData";
import MyInfoBtn from "../../../../../Common/InfoIcon/MyInfoBtn";
import ViewRemarks from "../../../../../Components/Consultant/ViewRemarks/ViewRemarks";
import {
  AdoptedLandArea,
  CulDeSac,
  DrawingScale,
} from "../../../../../constants/AllOptions/AllOptionsByLaws";
import {
  StandardFARsetback,
  StandardBuildingSetback,
} from "../../../../../constants/constants";
import RemarksViewBtn from "./RemarksViewBtn";

interface Props {
  onSubmit: (val: any) => void;
  submitting: boolean;
  buildingArea: number;
}
const LandDataCreate = ({ onSubmit, submitting, buildingArea }: Props) => {
  // const [actualPlotArea, setActualPlotArea] = useState(0);
  const [culDeSac, setCulDeSac] = useState("");

  const [form] = Form.useForm();
  // const value = form.getFieldValue("coveragePer");

  // form.setFieldsValue({
  //   ["coveragePer"]: { ...value, ["type"]: buildingArea / actualPlotArea },
  // });

  const [remarks, setOpenRemarks] = useState(false);
  const [isFAR, setIsFAR] = useState(true);

  const openFARremarks = (isFAR?: boolean) => {
    if (isFAR) {
      setIsFAR(isFAR);
    } else {
      setIsFAR(false);
    }
    setOpenRemarks(!remarks);
  };

  return (
    <div className="MyTableOuter">
      <ViewRemarks
        title={isFAR ? "Floor Area Ratio (FAR)" : "Standard Setback"}
        isOpen={remarks}
        onModalClose={openFARremarks}
        data={isFAR ? StandardFARsetback : StandardBuildingSetback}
      />
      <Form
        onFinishFailed={submitFailed}
        size="small"
        onFinish={onSubmit}
        form={form}
      >
        <table className="MyTable">
          <tbody>
            <tr>
              <td> Actual plot area (in Sqm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="actualSqm"
                >
                  <InputNumber
                  // onChange={(e) =>
                  //   setActualPlotArea(typeof e === "number" ? e : parseInt(e))
                  // }
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualSqmRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Actual plot area (in Ropani)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="actualRop"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualRopRemark", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Adopted Land Area (Ropani)</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("adoptedRop", "Email1")}
                >
                  <Cascader options={AdoptedLandArea} placeholder="Select" />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("adoptedRopRemark", "Email2")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Floor Area Ratio (FAR) &nbsp; &nbsp;
                <MyInfoBtn info="FAR = Plinth Area / Actual Plot Area" />
              </td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="FAR"
                >
                  <Input />
                </Form.Item>
                <RemarksViewBtn onclick={() => openFARremarks(true)} />
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FARRemark", "Email22")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ground Coverage (in Sqm) &nbsp; &nbsp;</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="coverageSqm"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("coverageSqmRemark", "Email3")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Ground Coverage (%) &nbsp;
                <MyInfoBtn info="= Building Area/Actual Plot Area  * 100%" />
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="coveragePer"
                >
                  <InputNumber />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("coveragePerRemark", "1234")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Length (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="lengthM"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("lengthMRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Width (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widthM", "dsad")}
                  // name="widthM"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widthMRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Number of Storey (Nos) (Starting from ground floor excluding
                basement and semi-basement)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="noOfStorey"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStoreyRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Height (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="buildingH"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingHRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Road Width (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="roadWidthM"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("roadWidthMRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Cul de sac</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("CulDeSac", "Email1")}
                >
                  <Cascader
                    options={CulDeSac}
                    placeholder="Select"
                    onChange={(val: any) => setCulDeSac(val[0])}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CulDeSacRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>ROW (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="rowM"
                >
                  <Input />
                </Form.Item>
                {culDeSac === "With cul de sac" ? (
                  <span style={{ fontSize: 11 }}>
                    Standard: 3 meter from center.
                  </span>
                ) : null}
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rowMRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Front Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="frontSetback"
                >
                  <Input />
                </Form.Item>
                <RemarksViewBtn onclick={() => openFARremarks(false)} />
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("frontSetbackRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Rear Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="rearSetback"
                >
                  <Input />
                </Form.Item>
                <RemarksViewBtn onclick={() => openFARremarks(false)} />
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rearSetbackRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Side Left Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="leftSetback"
                >
                  <Input />
                </Form.Item>
                <RemarksViewBtn onclick={() => openFARremarks(false)} />
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("leftSetbackRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Side Right Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="rightSetback"
                >
                  <Input />
                </Form.Item>
                <RemarksViewBtn onclick={() => openFARremarks(false)} />
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rightSetbackRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ceiling Height (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="ceilingH"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ceilingHRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Parking Area (sq.m.)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  name="parkingArea"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("parkingAreaRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Drawing Scale (m)</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("drawingScale", "Email1")}
                >
                  <Cascader options={DrawingScale} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("drawingScaleRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <Form.Item>
            <Button
              htmlType="submit"
              size="middle"
              loading={submitting}
              type="primary"
            >
              Submit Form
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default LandDataCreate;
