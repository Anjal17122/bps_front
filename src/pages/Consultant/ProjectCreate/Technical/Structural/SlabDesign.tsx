import { Cascader, Form, Input } from "antd";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  ConcreteGrade,
  BoundaryCondition,
} from "../../../../../constants/AllOptions/AllOptionsStructural";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";
import { SlabDesignTyp } from "../../../../../Services/StructuralService";

interface Props {
  onSubmit: (val: SlabDesignTyp) => void;
}

const SlabDesign = ({ onSubmit }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form onFinishFailed={submitFailed} size="small" onFinish={onSubmit}>
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Grade of Concrete</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("conGrade", "Email1")}
                >
                  <Cascader options={ConcreteGrade} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("conGradeRemark", "Email3")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Boundary Condition of Slab</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("ConSlab", "Email1")}
                >
                  <Cascader options={BoundaryCondition} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ConSlabRemark", "Email")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Short Span of Critical Slab Panel (L) (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sSpanLmm", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sSpanLmmRemark", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Effective Thickness of Slab (d) (in mm)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ETSlabDmm", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ETSlabDmmRemark", "Email2")}
                >
                  <Input />
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
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("EDRLd", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("EDRLdRemark", "Email22")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Basic (L/d) ratio</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BasicLdRatio", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BasicLdRatioRemark", "Email3")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Required modification factor for tension reinforcement</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ReqMod", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ReqModRemark", "1234")}
                >
                  <Input />
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
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("reqTRAst", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("reqTRAstRemark", "dsad")}
                >
                  <Input />
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
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("proTRAst", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("proTRAstRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Actual Modification factor for tension reinforcement</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualMod", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualModRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="formSubmitDiv">
          <SubmitBtn />
        </div>
      </Form>
    </div>
  );
};

export default SlabDesign;
