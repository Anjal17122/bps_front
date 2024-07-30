import { Button, Cascader, Form, Input } from "antd";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  ConcreteGrade,
  BoundaryCondition,
} from "../../../../../constants/AllOptions/AllOptionsStructural";
import { SlabDesignTyp } from "../../../../../Services/StructuralService";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
  data: SlabDesignTyp;
  edit: boolean;
}
const SlabDesignEdit = ({ onSubmit, data, edit }: Props) => {
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
              <td>Boundary Condition of Slab</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ConSlab}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("ConSlab", "Email1")}
                >
                  <Cascader options={BoundaryCondition} disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ConSlabRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ConSlabRemark", "Email")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Short Span of Critical Slab Panel (L) (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sSpanLmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sSpanLmm", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sSpanLmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sSpanLmmRemark", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Effective Thickness of Slab (d) (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ETSlabDmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ETSlabDmm", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ETSlabDmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ETSlabDmmRemark", "Email2")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Calculated short span to effective depth ratio (L/d) for
                corresponding slab
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.EDRLd}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("EDRLd", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.EDRLdRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("EDRLdRemark", "Email22")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Basic (L/d) ratio</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.BasicLdRatio}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BasicLdRatio", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.BasicLdRatioRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BasicLdRatioRemark", "Email3")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Required modification factor for tension reinforcement</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ReqMod}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ReqMod", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ReqModRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ReqModRemark", "1234")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Required Tension Reinforcement (Ast) Percentage (%) for short
                span bottom reinforcement
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.reqTRAst}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("reqTRAst", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.reqTRAstRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("reqTRAstRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Provided Tension Reinforcement (Ast) Percentage (%) for short
                span bottom reinforcement
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.proTRAst}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("proTRAst", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.proTRAstRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("proTRAstRemark", "dsad")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Actual Modification factor for tension reinforcement</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualMod}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualMod", "Email1")}
                >
                  <Input disabled={!edit} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualModRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualModRemark", "dsad")}
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

export default SlabDesignEdit;
