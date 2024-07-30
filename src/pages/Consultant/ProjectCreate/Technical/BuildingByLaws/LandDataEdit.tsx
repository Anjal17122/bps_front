import React, { useState } from "react";
import { Button, Cascader, Form, Input, InputNumber } from "antd";
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
import { LandareaTyp } from "./ByLawsData";
import RemarksViewBtn from "./RemarksViewBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: LandareaTyp;
  edit: boolean;
  submitting: boolean;
  buildingArea: number;
}
const LandDataEdit = ({ onSubmit, data, edit, submitting }: Props) => {
  // const [culDeSac, setCulDeSac] = useState("");
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
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td> Actual plot area (in Sqm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data ? data.actualSqm : null}
                  className="NoMarginForm ErrorMsgIn"
                  name="actualSqm"
                >
                  <Input disabled={!edit} />
                  {/*    <Input disabled={!edit} /> */}
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualSqmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualSqmRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Actual plot area (in Ropani)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualRop}
                  className="NoMarginForm ErrorMsgIn"
                  name="actualRop"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualRopRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualRopRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Adopted Land Area (Ropani)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.adoptedRop}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("adoptedRop", "Email1")}
                >
                  <Cascader
                    disabled={!edit}
                    options={AdoptedLandArea}
                    placeholder="Select"
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.adoptedRopRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("adoptedRopRemark", "Email2")}
                >
                  <Input disabled={!edit} />
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
                  initialValue={data?.FAR}
                  className="NoMarginForm ErrorMsgIn"
                  name="FAR"
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <RemarksViewBtn onclick={openFARremarks} />
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FARRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FARRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ground Coverage (in Sqm) &nbsp; &nbsp;</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coverageSqm}
                  className="NoMarginForm ErrorMsgIn"
                  name="coverageSqm"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coverageSqmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("coverageSqmRemark", "Email3")}
                >
                  <Input disabled={!edit} />
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
                  initialValue={data?.coveragePer}
                  className="NoMarginForm ErrorMsgIn"
                  name="coveragePer"
                >
                  <InputNumber disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coveragePerRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("coveragePerRemark", "1234")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Length (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.lengthM}
                  className="NoMarginForm ErrorMsgIn"
                  name="lengthM"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.lengthMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("lengthMRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Width (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widthM}
                  className="NoMarginForm ErrorMsgIn"
                  name="widthM"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widthMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widthMRemark", "dsad")}
                >
                  <Input disabled={!edit} />
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
                  initialValue={data?.noOfStorey}
                  className="NoMarginForm ErrorMsgIn"
                  name="noOfStorey"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.noOfStoreyRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStoreyRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Building Height (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.buildingH}
                  className="NoMarginForm ErrorMsgIn"
                  name="buildingH"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.buildingHRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingHRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Road Width (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.roadWidthM}
                  className="NoMarginForm ErrorMsgIn"
                  name="roadWidthM"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.roadWidthMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("roadWidthMRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Cul de sac</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.CulDeSac}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("CulDeSac", "Email1")}
                >
                  <Cascader
                    disabled={!edit}
                    options={CulDeSac}
                    placeholder="Select"
                    // onChange={(val: any) => setCulDeSac(val[0])}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.CulDeSacRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CulDeSacRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> ROW (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rowM}
                  className="NoMarginForm ErrorMsgIn"
                  name="rowM"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rowMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rowMRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Front Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={data?.frontSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="frontSetback"
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <RemarksViewBtn onclick={openFARremarks} />
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.frontSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("frontSetbackRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Rear Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={data?.rearSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="rearSetback"
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <RemarksViewBtn onclick={openFARremarks} />
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rearSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rearSetbackRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Side Left Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={data?.leftSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="leftSetback"
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <RemarksViewBtn onclick={openFARremarks} />
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.leftSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("leftSetbackRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Side Right Setback (m)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={data?.rightSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="rightSetback"
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <RemarksViewBtn onclick={openFARremarks} />
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rightSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rightSetbackRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ceiling Height (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ceilingH}
                  className="NoMarginForm ErrorMsgIn"
                  name="ceilingH"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ceilingHRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ceilingHRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Parking Area (sq.m.)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.parkingArea}
                  className="NoMarginForm ErrorMsgIn"
                  name="parkingArea"
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.parkingAreaRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("parkingAreaRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Drawing Scale (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.drawingScale}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("drawingScale", "Email1")}
                >
                  <Cascader options={DrawingScale} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.drawingScaleRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("drawingScaleRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <Button
            htmlType="submit"
            size="middle"
            loading={submitting}
            type="primary"
            disabled={!edit}
          >
            Edit Form
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LandDataEdit;
