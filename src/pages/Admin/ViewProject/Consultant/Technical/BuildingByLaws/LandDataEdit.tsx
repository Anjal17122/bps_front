import React from "react";
import { Cascader, Form, Input } from "antd";
import {
  AdoptedLandArea,
  CulDeSac,
  DrawingScale,
} from "../../../../../../constants/AllOptions/AllOptionsByLaws";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { LandareaTyp } from "../../../../../Consultant/ProjectCreate/Technical/BuildingByLaws/ByLawsData";
// import {
//   AdoptedLandArea,
//   CulDeSac,
//   DrawingScale,
// } from "../../../../Common/AllOptions/AllOptionsByLaws";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";

interface Props {
  data: LandareaTyp;
  // onSubmit: (val: any) => void;
  // edit: boolean;
}
const LandDataEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
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
                  <Input disabled={true} />
                  {/*    <Input disabled={true} /> */}
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualSqmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualSqmRemark", "Email")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualRopRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualRopRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Adopted Land Area (Ropani)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.adoptedRop}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("adoptedRop", "Email")}
                >
                  <Cascader
                    disabled={true}
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Floor Area Ratio (FAR)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FAR}
                  className="NoMarginForm ErrorMsgIn"
                  name="FAR"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.FARRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("FARRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ground Coverage (in Sqm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coverageSqm}
                  className="NoMarginForm ErrorMsgIn"
                  name="coverageSqm"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coverageSqmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("coverageSqmRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Ground Coverage (%)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coveragePer}
                  className="NoMarginForm ErrorMsgIn"
                  name="coveragePer"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.coveragePerRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("coveragePerRemark", "1234")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.lengthMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("lengthMRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widthMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widthMRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.noOfStoreyRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("noOfStoreyRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.buildingHRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("buildingHRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.roadWidthMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("roadWidthMRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Cul de sac</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.CulDeSac}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("CulDeSac", "Email")}
                >
                  <Cascader
                    disabled={true}
                    options={CulDeSac}
                    placeholder="Select"
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.CulDeSacRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("CulDeSacRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rowMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rowMRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Front Setback (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.frontSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="frontSetback"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.frontSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("frontSetbackRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Rear Setback (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rearSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="rearSetback"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rearSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rearSetbackRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Side Left Setback (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.leftSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="leftSetback"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.leftSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("leftSetbackRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Side Right Setback (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rightSetback}
                  className="NoMarginForm ErrorMsgIn"
                  name="rightSetback"
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.rightSetbackRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("rightSetbackRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ceilingHRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ceilingHRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.parkingAreaRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("parkingAreaRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Drawing Scale (m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.drawingScale}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("drawingScale", "Email")}
                >
                  <Cascader options={DrawingScale} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.drawingScaleRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("drawingScaleRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
};

export default LandDataEdit;
