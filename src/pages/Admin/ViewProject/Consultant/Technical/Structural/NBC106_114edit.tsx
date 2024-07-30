import { Cascader, Form, Input } from "antd";
import React from "react";
import {
  Snowfalltype,
  firesafetyreq,
  downwardslopeis50m,
  riverbankis50m,
  safetymeasuresfulfill,
  Concretegrade,
  ReinforcementSteelGrade,
} from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { NBC106typ } from "../../../../../../Services/StructuralService";
// import {
//   Snowfalltype,
//   firesafetyreq,
//   downwardslopeis50m,
//   riverbankis50m,
//   soiltestreport,
//   Concretegrade,
//   ReinforcementSteelGrade,
//   safetymeasuresfulfill,
// } from "../../../../Common/AllOptions/AllOptionsStructural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { NBC106typ } from "../../../../Services/StructuralService";

interface Props {
  // onSubmit: (val: any) => void;
  data: NBC106typ;
  // edit: boolean;
}
const NBC106_114edit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Snowfall type or condition</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.snowType}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("snowType", "Email1")}
                >
                  <Cascader options={Snowfalltype} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.snowTypeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("snowTypeRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Have you considered fire safety requirement?</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.fireSafety}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("fireSafety", "Email1")}
                >
                  <Cascader options={firesafetyreq} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.fireSafetyRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("fireSafetyRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Whether distance of construction site from toe/beginning of
                downward slope is within 50m?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.toe50m}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("toe50m", "Email1")}
                >
                  <Cascader options={downwardslopeis50m} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.toe50mRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("toe50mRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Whether distance of construction site from river bank is within
                50m?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.river50m}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("river50m", "Email1")}
                >
                  <Cascader options={riverbankis50m} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.river50mRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("river50mRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td>
                Are you sure that all safety measures will be fulfilled in the
                construction site as per this code?
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.safetyCode}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("safetyCode", "Email1")}
                >
                  <Cascader options={safetymeasuresfulfill} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.safetyCodeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("safetyCodeRemark", "1234")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Safety wares use</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.SafetyWares}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("SafetyWares", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.SafetyWaresRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("SafetyWaresRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Concrete grade in structure</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.conGrade}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("conGrade", "Email1")}
                >
                  <Cascader options={Concretegrade} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.conGradeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("conGradeRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Reinforcement Steel Grade</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.reinSteel}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("reinSteel", "Email1")}
                >
                  <Cascader options={ReinforcementSteelGrade} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.reinSteelRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("reinSteelRemark", "dsad")}
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

export default NBC106_114edit;
