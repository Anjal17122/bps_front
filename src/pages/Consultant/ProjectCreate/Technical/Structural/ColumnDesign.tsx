import { Button, Cascader, Form, Input } from "antd";
import React from "react";
import {
  submitFailed,
  FormReq,
  NoLblNoReq,
} from "../../../../../Common/Form/FormData";
import {
  ConcreteGrade,
  Shortcolumneffect,
  sampledesignfoundations,
} from "../../../../../constants/AllOptions/AllOptionsStructural";
import { SubmitBtn } from "../../../../../Components/Common/SubmitBtn/SubmitBtn";

interface Props {
  onSubmit: (val: any) => void;
}

const ColumnDesign = ({ onSubmit }: Props) => {
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
              <td>Critical column length</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("cricolLen", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("cricolLenRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Minimum size of column (in mm)</td>
              <td className="width80" style={{ display: "flex" }}>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmm", "Email1")}
                >
                  <Input />
                </Form.Item>
                <span style={{ padding: "0 2px" }}>x</span>
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmm2", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minColmmRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Short column effect considered or not</td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("shortCol", "Email1")}
                >
                  <Cascader options={Shortcolumneffect} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("shortColRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Minimum area of longitudinal reinforcement provided (%)</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLongit", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minLongitRemark", "1234")}
                >
                  <Input />
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
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("isFCBSsub", "Email1")}
                >
                  <Cascader options={sampledesignfoundations} />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("isFCBSsubRemark", "dsad")}
                >
                  <Input />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td>Minimum percentage of reinforcement provided</td>
              <td className="width80">
                <Form.Item
                  initialValue={0}
                  className="NoMarginForm ErrorMsgIn"
                  {...FormReq("minPerRein", "Email1")}
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="width80">
                <Form.Item
                  className="NoMarginForm ErrorMsgIn"
                  {...NoLblNoReq("minPerReinRemark", "Email3")}
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

export default ColumnDesign;
