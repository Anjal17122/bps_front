import { Cascader, Form, Input } from "antd";
import React from "react";
import { TypeofFoundations } from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { NoLblNoReq, FormReq } from "../../../../../../Common/Form/FormData";
import { FoundationTyp } from "../../../../../../Services/StructuralService";
// import {
//   TypeofFoundations,
//   ConcreteGrade,
// } from "../../../../Common/AllOptions/AllOptionsStructural";
// import { FormIsReq } from "../../../../Common/Form/FormDatas";
// import { FoundationTyp } from "../../../../Services/StructuralService";

interface Props {
  data: FoundationTyp;
  // onSubmit: (val: any) => void;
  // edit: boolean;
}

const FoundationEdit = ({ data }: Props) => {
  return (
    <div className="MyTableOuter">
      <Form size="small">
        <table className="MyTable">
          <tbody>
            <tr>
              <td>Type of Foundations</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.type}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("type", "Email1")}
                >
                  <Cascader options={TypeofFoundations} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.typeRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("typeRemark", "Email")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>
                Depth of foundation from ground level to the bottom of footing
                (in m)
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthGtB}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthGtB", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthGtBRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthGtBRemark", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            {/* <tr>
              <td>Depth of Foundations from ground level (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthGm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthGm", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.depthGmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("depthGmRemark", "Email2")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr> */}
            {/* <tr>
              <td>Width of Foundations (in m)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widthFm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widthFm", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.widthFmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("widthFmRemark", "Email22")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Concrete Grade</td>
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
              <td> Brick crushing strength (in N/mm2)</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bcStrnmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bcStrnmm", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.bcStrnmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("bcStrnmmRemark", "1234")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Mortar ratio for load bearing masonry</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.morRatio}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("morRatio", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.morRatioRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("morRatioRemark", "dsad")}
                >
                  <Input disabled={true} />
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

export default FoundationEdit;
