import { Cascader, Form, Input } from "antd";
import React from "react";
import { BoundaryCondition } from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { SlabDesignTyp } from "../../../../../../Services/StructuralService";
// import { BoundaryCondition } from "../../../../Common/AllOptions/AllOptionsStructural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { SlabDesignTyp } from "../../../../Services/StructuralService";

interface Props {
  data: SlabDesignTyp;
  // onSubmit: (val: any) => void;
  // edit: boolean;
}
const SlabDesignEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Boundary Condition of Slab</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ConSlab}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("ConSlab", "Email1")}
                >
                  <Cascader options={BoundaryCondition} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ConSlabRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ConSlabRemark", "Email")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.sSpanLmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("sSpanLmmRemark", "Email1")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ETSlabDmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ETSlabDmmRemark", "Email2")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.EDRLdRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("EDRLdRemark", "Email22")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.BasicLdRatioRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("BasicLdRatioRemark", "Email3")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.ReqModRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("ReqModRemark", "1234")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.reqTRAstRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("reqTRAstRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.proTRAstRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("proTRAstRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.actualModRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("actualModRemark", "dsad")}
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

export default SlabDesignEdit;
