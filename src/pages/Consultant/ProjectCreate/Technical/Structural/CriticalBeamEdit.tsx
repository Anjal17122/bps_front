import { Cascader, Form, Input } from "antd";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  ConcreteGrade,
  Supportcondition,
} from "../../../../../constants/AllOptions/AllOptionsStructural";
import { CriticalBeamtyp } from "../../../../../Services/StructuralService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: CriticalBeamtyp) => void;
  data: CriticalBeamtyp;
  edit: boolean;
}
const CriticalBeamEdit = ({ onSubmit, data, edit }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
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
                  <Cascader options={ConcreteGrade} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.conGradeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("conGradeRemark", "Email3")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthBeamMMRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthBeamMMRemark", "Email")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.criticalLmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("criticalLmmRemark", "Email1")}
                >
                  <Input disabled={!edit} />
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
                  <Cascader options={Supportcondition} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.supportRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("supportRemark", "Email2")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.basicLDRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("basicLDRemark", "Email22")}
                >
                  <Input disabled={!edit} />
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
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.calCriSpanRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("calCriSpanRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>

            {/* <tr>
              <td>Critical column length</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.cricolLen}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("cricolLen", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.cricolLenRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("cricolLenRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Minimum size of column (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minColmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmm", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
                <span style={{ padding: "0 2px" }}>x</span>
                <Form.Item
                  initialValue={data?.minColmm2}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmm2", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minColmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmmRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Short column effect considered or not</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.shortCol}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("shortCol", "Email1")}
                >
                  <Cascader options={Shortcolumneffect} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.shortColRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("shortColRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Minimum area of longitudinal reinforcement provided (%)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minLongit}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLongit", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minLongitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLongitRemark", "1234")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Design Philosophy</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.designPhil}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("designPhil", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.designPhilRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("designPhilRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Whether sample design calculations of foundations, columns,
                beams and slabs are submitted
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.isFCBSsub}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("isFCBSsub", "Email1")}
                >
                  <Cascader
                    options={sampledesignfoundations}
                    disabled={!edit}
                  />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.isFCBSsubRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("isFCBSsubRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr> */}
            <tr>
              <td>Minimum percentage of reinforcement provided</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minPerRein}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("minPerRein", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minPerReinRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPerReinRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <SubmitBtn text="Edit Form" disable={!edit} />
        </div>
      </Form>
    </div>
  );
};

export default CriticalBeamEdit;
