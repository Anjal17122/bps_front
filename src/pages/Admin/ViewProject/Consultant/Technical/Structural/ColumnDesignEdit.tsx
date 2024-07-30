import { Cascader, Form, Input } from "antd";
import React from "react";
import {
  ConcreteGrade,
  Shortcolumneffect,
  sampledesignfoundations,
} from "../../../../../../constants/AllOptions/AllOptionsStructural";
import { FormReq, NoLblNoReq } from "../../../../../../Common/Form/FormData";
import { CriticalBeamtyp } from "../../../../../../Services/StructuralService";

interface Props {
  data: CriticalBeamtyp;
}
const ColumnDesignEdit = ({ data }: Props) => {
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
              <td>Critical column length</td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.cricolLen}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("cricolLen", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.cricolLenRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("cricolLenRemark", "dsad")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Minimum size of column (in mm)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={data?.minColmm}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmm", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
                <span style={{ padding: "0 2px" }}>x</span>
                <Form.Item
                  initialValue={data?.minColmm2}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmm2", "Email1")}
                >
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minColmmRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmmRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Cascader options={Shortcolumneffect} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.shortColRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("shortColRemark", "dsad")}
                >
                  <Input disabled={true} />
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
                  <Input disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.minLongitRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLongitRemark", "1234")}
                >
                  <Input disabled={true} />
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
                  <Cascader options={sampledesignfoundations} disabled={true} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  initialValue={data?.isFCBSsubRemark}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("isFCBSsubRemark", "dsad")}
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

export default ColumnDesignEdit;
