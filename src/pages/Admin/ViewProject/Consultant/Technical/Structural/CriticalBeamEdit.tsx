import { Cascader, Form, Input } from "antd";
import React from "react";
import {
  Supportcondition,
  ConcreteGrade,
} from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { CriticalBeamtyp } from "../../../../../../Services/StructuralService";
// import {
//   Supportcondition,
//   Shortcolumneffect,
//   sampledesignfoundations,
// } from "../../../../Common/AllOptions/AllOptionsStructural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { CriticalBeamtyp } from "../../../../Services/StructuralService";

interface Props {
  data: CriticalBeamtyp;
  // onSubmit: (val: any) => void;
  // edit: boolean;
}
const CriticalBeamEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Grade of Concrete</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.conGrade}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("conGrade", "Email1")}
                >
                  <Cascader options={ConcreteGrade} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.conGradeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("conGradeRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Effective depth of beam (d) (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthBeamMM}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthBeamMM", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthBeamMMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthBeamMMRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Critical span (L) (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.criticalLmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("criticalLmm", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.criticalLmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("criticalLmmRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Support condition</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.support}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("support", "Email1")}
                >
                  <Cascader options={Supportcondition} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.supportRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("supportRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td> Basic (L/d) ratio</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.basicLD}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("basicLD", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.basicLDRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("basicLDRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Calculated Critical Span to effective depth ratio (L/d)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.calCriSpan}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("calCriSpan", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.calCriSpanRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("calCriSpanRemark", "Email3")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td>Minimum percentage of reinforcement provided</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minPerRein}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("minPerRein", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minPerReinRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPerReinRemark", "Email3")}
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

export default CriticalBeamEdit;
